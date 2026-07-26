import * as googleTTS from '@google-cloud/text-to-speech';
import { writeFileSync } from 'fs';
let ttsClient = null;
function getClient() {
    if (!ttsClient) {
        const clientOptions = {};
        if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
            clientOptions.keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
        }
        ttsClient = new googleTTS.TextToSpeechClient(clientOptions);
    }
    return ttsClient;
}
export async function synthesizeVoiceOver(text, outputPath, languageCode = 'id-ID') {
    const client = getClient();
    const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: {
            languageCode,
            name: 'id-ID-Wavenet-B', // Deep male narrator voice
            ssmlGender: 'MALE',
        },
        audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.9,
            pitch: -2.0,
            effectsProfileId: ['large-home-entertainment-class-device'],
        },
    });
    if (!response.audioContent)
        throw new Error('TTS returned no audio content');
    writeFileSync(outputPath, response.audioContent);
    return outputPath;
}
//# sourceMappingURL=tts.js.map