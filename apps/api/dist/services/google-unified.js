// Unified Google Services - Supports both direct Google Cloud and Composio proxy
// Automatically chooses the best available method based on environment variables
import { uploadFileToDrive as uploadDirect } from './drive.js';
import { synthesizeVoiceOver as synthesizeDirect } from './tts.js';
import { uploadFileToDriveViaComposio, synthesizeVoiceOverViaComposio, isComposioGoogleConfigured, getComposioGoogleConnectionStatus, } from './composio-google.js';
import { readFileSync } from 'fs';
// ── Configuration Detection ───────────────────────────────────────────────────
function hasDirectGoogleCredentials() {
    return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}
function hasComposioGoogleAccess() {
    return isComposioGoogleConfigured();
}
export var GoogleServiceMode;
(function (GoogleServiceMode) {
    GoogleServiceMode["DIRECT"] = "direct";
    GoogleServiceMode["COMPOSIO"] = "composio";
    GoogleServiceMode["NONE"] = "none";
})(GoogleServiceMode || (GoogleServiceMode = {}));
export function getGoogleServiceMode() {
    if (hasDirectGoogleCredentials())
        return GoogleServiceMode.DIRECT;
    if (hasComposioGoogleAccess())
        return GoogleServiceMode.COMPOSIO;
    return GoogleServiceMode.NONE;
}
// ── Unified Drive Upload ──────────────────────────────────────────────────────
export async function uploadFileToDrive(filePath, fileName, mimeType) {
    const mode = getGoogleServiceMode();
    switch (mode) {
        case GoogleServiceMode.DIRECT:
            console.log('📤 Using direct Google Drive API');
            return uploadDirect(filePath, fileName, mimeType);
        case GoogleServiceMode.COMPOSIO:
            console.log('📤 Using Composio proxy for Google Drive');
            const fileContent = readFileSync(filePath);
            return uploadFileToDriveViaComposio(fileContent, fileName, mimeType, process.env.GOOGLE_DRIVE_FOLDER_ID);
        case GoogleServiceMode.NONE:
            throw new Error('No Google Drive access configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or configure Composio Google integration.');
    }
}
// ── Unified Text-to-Speech ────────────────────────────────────────────────────
export async function synthesizeVoiceOver(text, outputPath, languageCode = 'id-ID') {
    const mode = getGoogleServiceMode();
    switch (mode) {
        case GoogleServiceMode.DIRECT:
            console.log('🎤 Using direct Google TTS API');
            return synthesizeDirect(text, outputPath, languageCode);
        case GoogleServiceMode.COMPOSIO:
            console.log('🎤 Using Composio proxy for Google TTS');
            const audioBuffer = await synthesizeVoiceOverViaComposio(text, languageCode);
            const fs = await import('fs');
            fs.writeFileSync(outputPath, audioBuffer);
            return outputPath;
        case GoogleServiceMode.NONE:
            throw new Error('No Google TTS access configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or configure Composio Google integration.');
    }
}
// ── Health Check ──────────────────────────────────────────────────────────────
export async function checkGoogleServicesHealth() {
    const mode = getGoogleServiceMode();
    if (mode === GoogleServiceMode.NONE) {
        return {
            mode,
            drive: false,
            tts: false,
            details: 'No Google services configured',
        };
    }
    if (mode === GoogleServiceMode.DIRECT) {
        return {
            mode,
            drive: true,
            tts: true,
            details: 'Using direct Google Cloud credentials',
        };
    }
    // Composio mode - check connection status
    const status = await getComposioGoogleConnectionStatus();
    const hasDrive = status.integrations.some((i) => i.includes('DRIVE'));
    const hasTTS = status.integrations.some((i) => i.includes('TTS'));
    return {
        mode,
        drive: hasDrive,
        tts: hasTTS,
        details: `Composio connected: ${status.integrations.join(', ')}`,
    };
}
//# sourceMappingURL=google-unified.js.map