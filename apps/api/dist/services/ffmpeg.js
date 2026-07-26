import { execFile } from 'child_process';
import { promisify } from 'util';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import os from 'os';
const execFileAsync = promisify(execFile);
const TMP_DIR = process.env.TMP_VIDEO_DIR ?? path.join(os.tmpdir(), 'legenda');
function ensureTmpDir() {
    if (!existsSync(TMP_DIR))
        mkdirSync(TMP_DIR, { recursive: true });
}
export function getTmpPath(projectId, filename) {
    const dir = path.join(TMP_DIR, projectId);
    if (!existsSync(dir))
        mkdirSync(dir, { recursive: true });
    return path.join(dir, filename);
}
export async function mergeVideoWithAudio(opts) {
    ensureTmpDir();
    const { clipPaths, backsoundPath, soundtrackPath, voiceOverPath, outputPath } = opts;
    // 1. Concatenate all clips into one video (no audio)
    const concatListPath = getTmpPath(opts.projectId, 'concat.txt');
    const concatContent = clipPaths.map((p) => `file '${p.replace(/'/g, "'\\''")}'`).join('\n');
    const { writeFileSync } = await import('fs');
    writeFileSync(concatListPath, concatContent);
    const mergedVideoPath = getTmpPath(opts.projectId, 'merged_video.mp4');
    await execFileAsync('ffmpeg', [
        '-y',
        '-f', 'concat',
        '-safe', '0',
        '-i', concatListPath,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '23',
        '-an',
        mergedVideoPath,
    ]);
    // 2. Build audio mix command
    const inputArgs = ['-i', mergedVideoPath];
    const filterParts = [];
    let audioInputIdx = 1;
    const audioStreams = [];
    if (backsoundPath) {
        inputArgs.push('-i', backsoundPath);
        filterParts.push(`[${audioInputIdx}:a]volume=0.15,aloop=loop=-1:size=2e+09[bs]`);
        audioStreams.push('[bs]');
        audioInputIdx++;
    }
    if (soundtrackPath) {
        inputArgs.push('-i', soundtrackPath);
        filterParts.push(`[${audioInputIdx}:a]volume=0.3,aloop=loop=-1:size=2e+09[st]`);
        audioStreams.push('[st]');
        audioInputIdx++;
    }
    if (voiceOverPath) {
        inputArgs.push('-i', voiceOverPath);
        filterParts.push(`[${audioInputIdx}:a]volume=1.0[vo]`);
        audioStreams.push('[vo]');
        audioInputIdx++;
    }
    let ffmpegArgs;
    if (audioStreams.length > 0) {
        const mixInput = audioStreams.join('');
        const mixFilter = `${filterParts.join(';')};${mixInput}amix=inputs=${audioStreams.length}:duration=first:normalize=0[aout]`;
        ffmpegArgs = [
            '-y',
            ...inputArgs,
            '-filter_complex', mixFilter,
            '-map', '0:v',
            '-map', '[aout]',
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-b:a', '192k',
            '-shortest',
            outputPath,
        ];
    }
    else {
        // No audio — just copy video
        ffmpegArgs = ['-y', '-i', mergedVideoPath, '-c', 'copy', outputPath];
    }
    await execFileAsync('ffmpeg', ffmpegArgs);
    return outputPath;
}
// ── Download file from URL to local path ──────────────────────────────────────
export async function downloadFile(url, destPath) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`Failed to download ${url}: ${res.status}`);
    const buffer = await res.arrayBuffer();
    const { writeFileSync } = await import('fs');
    writeFileSync(destPath, Buffer.from(buffer));
}
//# sourceMappingURL=ffmpeg.js.map