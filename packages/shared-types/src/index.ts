// ─── Enums ──────────────────────────────────────────────────────────────────

export enum StoryStyle {
  KLASIK = 'KLASIK',
  SAAT_INI = 'SAAT_INI',
  FUTURISTIK = 'FUTURISTIK',
  SUPER_HERO = 'SUPER_HERO',
}

export enum HistoricalEra {
  SEBELUM_MASEHI = 'SEBELUM_MASEHI',
  MASEHI = 'MASEHI',
}

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  STORY_GENERATING = 'STORY_GENERATING',
  STORY_DONE = 'STORY_DONE',
  ASSETS_GENERATING = 'ASSETS_GENERATING',
  ASSETS_DONE = 'ASSETS_DONE',
  AUDIO_GENERATING = 'AUDIO_GENERATING',
  AUDIO_DONE = 'AUDIO_DONE',
  STORYBOARD_GENERATING = 'STORYBOARD_GENERATING',
  STORYBOARD_DONE = 'STORYBOARD_DONE',
  VIDEO_GENERATING = 'VIDEO_GENERATING',
  VIDEO_DONE = 'VIDEO_DONE',
  ASSEMBLING = 'ASSEMBLING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum AssetType {
  CHARACTER = 'CHARACTER',
  ITEM = 'ITEM',
  BACKGROUND = 'BACKGROUND',
}

export enum AudioType {
  SOUNDTRACK = 'SOUNDTRACK',
  BACKSOUND = 'BACKSOUND',
  VOICE_OVER = 'VOICE_OVER',
}

export enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// ─── Master Prompt Input ─────────────────────────────────────────────────────

export interface MasterPromptInput {
  ide: string;
  gaya: StoryStyle;
  tokohUtama: string;
  asalDaerah: string;
  latar: HistoricalEra;
  latarDetail?: string;
  plot: string;
}

// ─── Generated Screenplay ────────────────────────────────────────────────────

export interface Actor {
  name: string;
  role: string;
  persona: string;
  costume: string;
  voiceDescription: string;
}

export interface SceneScript {
  sceneNumber: number;
  title: string;
  setting: string;
  timeOfDay: string;
  durationSeconds: number;
  action: string;
  voiceOver: string;
  dialog: string;
  musicMood: string;
  actors: string[];
}

export interface Screenplay {
  title: string;
  logline: string;
  genre: string;
  era: string;
  setting: string;
  actors: Actor[];
  plotOutline: {
    pembuka: string;
    risingAction: string;
    klimaks: string;
    resolusi: string;
  };
  conflict: string;
  scenes: SceneScript[];
  musicTheme: string;
  wardrobeNotes: string;
}

// ─── Asset ───────────────────────────────────────────────────────────────────

export interface AssetPrompt {
  name: string;
  type: AssetType;
  description: string;
  imagePrompt: string;
}

// ─── Audio Prompt ─────────────────────────────────────────────────────────────

export interface AudioPrompt {
  type: AudioType;
  sunoPrompt: string;
  lyrics?: string;
  mood: string;
  genre: string;
  duration: number;
}

// ─── Storyboard ──────────────────────────────────────────────────────────────

export interface StoryboardScene {
  sceneNumber: number;
  title: string;
  imagePrompt: string;
  videoPrompt: string;
  cameraAngle: string;
  transition: string;
  voiceOver: string;
  musicNote: string;
  durationSeconds: number;
}

// ─── API Response shapes ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PipelineProgressEvent {
  projectId: string;
  stage: ProjectStatus;
  progress: number; // 0–100
  message: string;
  timestamp: string;
}

// ─── Project DTO ─────────────────────────────────────────────────────────────

export interface ProjectDTO {
  id: string;
  userId: string;
  title: string;
  status: ProjectStatus;
  masterPrompt: MasterPromptInput;
  screenplay?: Screenplay;
  finalVideoUrl?: string;
  driveFileId?: string;
  driveShareLink?: string;
  totalScenes: number;
  completedScenes: number;
  createdAt: string;
  updatedAt: string;
}
