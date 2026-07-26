import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { initWebSocket } from './lib/websocket.js';
import { projectsRouter } from './routes/projects.js';
import { pipelineRouter } from './routes/pipeline.js';
import { storyboardRouter } from './routes/storyboard.js';
import { assetsRouter } from './routes/assets.js';
import { audioRouter } from './routes/audio.js';

// ── Register all workers (starts listening to queues) ────────────────────────
import './workers/story.worker.js';
import './workers/asset.worker.js';
import './workers/audio.worker.js';
import './workers/storyboard.worker.js';
import './workers/video.worker.js';
import './workers/assemble.worker.js';

const app = express();
const httpServer = createServer(app);

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
// Support multiple origins: comma-separated FRONTEND_URL or single URL
const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, same-origin)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.some(
          (allowed) =>
            origin === allowed ||
            // Support Vercel preview URLs: *.vercel.app
            (allowed.includes('vercel.app') && origin.endsWith('.vercel.app')),
        )
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/projects', projectsRouter);
app.use('/api/projects', storyboardRouter);
app.use('/api/projects', assetsRouter);
app.use('/api/projects', audioRouter);
app.use('/api/pipeline', pipelineRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── WebSocket ─────────────────────────────────────────────────────────────────
initWebSocket(httpServer);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 3001);
httpServer.listen(PORT, () => {
  console.info(`✅ API server running on http://localhost:${PORT}`);
  console.info(`✅ Workers registered: story, asset, audio, storyboard, video, assemble`);
});
