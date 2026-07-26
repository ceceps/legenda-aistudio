// Composio SDK used for tool orchestration (image/video generation via FAL AI)
// Composio wraps tool calls to external image/video generation APIs
// Configure your tools in https://app.composio.dev
const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY ?? '';
// ── Image Generation via Composio (FAL / Replicate tool) ─────────────────────
export async function generateImage(prompt, style) {
    const res = await fetch('https://api.composio.dev/api/v1/actions/FAL_AI_ANY_ENDPOINT/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': COMPOSIO_API_KEY,
        },
        body: JSON.stringify({
            input: {
                path: 'fal-ai/flux/schnell',
                arguments: {
                    prompt: `${prompt}, ${style} style, high quality, detailed, cinematic`,
                    image_size: 'landscape_16_9',
                    num_inference_steps: 4,
                    num_images: 1,
                    enable_safety_checker: true,
                },
            },
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Composio image gen error ${res.status}: ${text}`);
    }
    const data = (await res.json());
    const imageUrl = data.data?.images?.[0]?.url;
    if (!imageUrl)
        throw new Error('No image URL returned from Composio');
    return { imageUrl };
}
// ── Video Generation via Composio (Kling / Hailuo tool) ──────────────────────
export async function generateVideoClip(videoPrompt, imageUrl, style) {
    const res = await fetch('https://api.composio.dev/api/v1/actions/FAL_AI_ANY_ENDPOINT/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': COMPOSIO_API_KEY,
        },
        body: JSON.stringify({
            input: {
                path: 'fal-ai/kling-video/v1.6/standard/image-to-video',
                arguments: {
                    prompt: `${videoPrompt}, ${style} style, cinematic, smooth motion`,
                    image_url: imageUrl,
                    duration: '5',
                    aspect_ratio: '16:9',
                },
            },
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Composio video gen error ${res.status}: ${text}`);
    }
    const data = (await res.json());
    if (data.data?.video?.url) {
        return { jobId: data.data.request_id ?? 'done', status: 'completed', videoUrl: data.data.video.url };
    }
    return {
        jobId: data.data?.request_id ?? '',
        status: data.data?.status ?? 'queued',
    };
}
// ── Poll video job status ─────────────────────────────────────────────────────
export async function waitForVideoClip(requestId, maxWaitMs = 300_000) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
        const res = await fetch(`https://api.composio.dev/api/v1/actions/FAL_AI_QUEUE_STATUS/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': COMPOSIO_API_KEY },
            body: JSON.stringify({ input: { path: 'fal-ai/kling-video/v1.6/standard/image-to-video', request_id: requestId } }),
        });
        const data = (await res.json());
        if (data.data?.video?.url)
            return data.data.video.url;
        if (data.data?.status === 'FAILED')
            throw new Error(`Video job ${requestId} failed`);
        await new Promise((r) => setTimeout(r, 8000));
    }
    throw new Error(`Video job ${requestId} timed out`);
}
//# sourceMappingURL=composio.js.map