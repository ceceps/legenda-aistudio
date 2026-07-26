import { WebSocketServer, type WebSocket } from 'ws';
import { type Server } from 'http';
import { type PipelineProgressEvent } from '@legenda/shared-types';

const clients = new Map<string, Set<WebSocket>>();

export function initWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws, req) => {
    const url = new URL(req.url ?? '', `http://localhost`);
    const projectId = url.searchParams.get('projectId');
    if (!projectId) { ws.close(); return; }

    if (!clients.has(projectId)) clients.set(projectId, new Set());
    clients.get(projectId)!.add(ws);

    ws.on('close', () => clients.get(projectId)?.delete(ws));
  });

  console.info('WebSocket server initialised');
}

export function broadcastProgress(event: PipelineProgressEvent) {
  const sockets = clients.get(event.projectId);
  if (!sockets) return;
  const payload = JSON.stringify(event);
  sockets.forEach((ws) => {
    if (ws.readyState === 1) ws.send(payload);
  });
}
