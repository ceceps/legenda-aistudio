import OpenAI from 'openai';
// NVIDIA Nemotron via OpenAI-compatible API
const client = new OpenAI({
    apiKey: process.env.NEMOTRON_API_KEY ?? '',
    baseURL: 'https://integrate.api.nvidia.com/v1',
});
const MODEL = 'nvidia/llama-3.1-nemotron-70b-instruct';
// ── Asset Prompts ─────────────────────────────────────────────────────────────
export async function generateAssetPrompts(screenplay) {
    const systemPrompt = `You are a professional concept artist and visual director specializing in Indonesian folklore and mythology. 
Generate highly detailed image generation prompts for characters, items, and backgrounds.
Always respond with valid JSON only.`;
    const userPrompt = `Based on this screenplay, generate detailed image prompts for all visual assets.

Title: "${screenplay.title}"
Era: "${screenplay.era}"
Setting: "${screenplay.setting}"
Wardrobe Notes: "${screenplay.wardrobeNotes}"

Actors:
${screenplay.actors.map((a) => `- ${a.name}: ${a.persona}. Costume: ${a.costume}`).join('\n')}

Generate a JSON array of AssetPrompt objects covering:
1. CHARACTER assets — one per actor
2. ITEM assets — weapons, tools, props mentioned in the story  
3. BACKGROUND assets — one per unique setting/location

Format:
[{
  "name": "string",
  "type": "CHARACTER" | "ITEM" | "BACKGROUND",
  "description": "string (50 words)",
  "imagePrompt": "string (detailed Stable Diffusion prompt, 200+ words, include: art style, lighting, color palette, composition, era-appropriate details, Indonesian cultural elements)"
}]`;
    const response = await client.chat.completions.create({
        model: MODEL,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
    });
    const text = response.choices[0]?.message.content ?? '[]';
    // Extract JSON from response
    const match = text.match(/\[[\s\S]*\]/);
    if (!match)
        throw new Error('Nemotron: no JSON array in response');
    return JSON.parse(match[0]);
}
// ── Video Prompt Enhancement ──────────────────────────────────────────────────
export async function enhanceVideoPrompt(sceneDescription, style) {
    const response = await client.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: 'system',
                content: 'You are a video director. Enhance scene descriptions into detailed video generation prompts for AI video tools like Runway or Kling. Be specific about camera movement, lighting, and action. Respond with the enhanced prompt only, no explanation.',
            },
            {
                role: 'user',
                content: `Style: ${style}\nScene: ${sceneDescription}\n\nEnhance into a detailed video prompt (100-150 words):`,
            },
        ],
        temperature: 0.6,
        max_tokens: 300,
    });
    return response.choices[0]?.message.content?.trim() ?? sceneDescription;
}
//# sourceMappingURL=nemotron.js.map