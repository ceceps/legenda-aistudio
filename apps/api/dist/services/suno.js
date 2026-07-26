const SUNO_API_BASE = 'https://api.suno.ai/v1'; // update if official endpoint changes
async function sunoFetch(path, body) {
    const res = await fetch(`${SUNO_API_BASE}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SUNO_API_KEY ?? ''}`,
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Suno API error ${res.status}: ${text}`);
    }
    return res.json();
}
export async function generateSoundtrack(prompt) {
    return sunoFetch('/generate', {
        prompt: prompt.sunoPrompt,
        lyrics: prompt.lyrics,
        duration: prompt.duration,
        instrumental: false,
        tags: `${prompt.genre}, ${prompt.mood}`,
        title: 'Legenda AI Soundtrack',
    });
}
export async function generateBacksound(prompt) {
    return sunoFetch('/generate', {
        prompt: `${prompt.sunoPrompt}, no vocals, instrumental only, cinematic`,
        duration: prompt.duration,
        instrumental: true,
        tags: `${prompt.genre}, cinematic, ${prompt.mood}, no vocals`,
        title: 'Legenda AI Backsound',
    });
}
export async function checkSunoJob(jobId) {
    const res = await fetch(`${SUNO_API_BASE}/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${process.env.SUNO_API_KEY ?? ''}` },
    });
    return res.json();
}
// ── Poll until done ───────────────────────────────────────────────────────────
export async function waitForSunoJob(jobId, maxWaitMs = 180_000) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
        const job = await checkSunoJob(jobId);
        if (job.status === 'completed' && job.audio_url)
            return job.audio_url;
        if (job.status === 'failed')
            throw new Error(`Suno job ${jobId} failed: ${job.error}`);
        await new Promise((r) => setTimeout(r, 5000));
    }
    throw new Error(`Suno job ${jobId} timed out`);
}
//# sourceMappingURL=suno.js.map