-- CreateEnum
CREATE TYPE "StoryStyle" AS ENUM ('KLASIK', 'SAAT_INI', 'FUTURISTIK', 'SUPER_HERO');

-- CreateEnum
CREATE TYPE "HistoricalEra" AS ENUM ('SEBELUM_MASEHI', 'MASEHI');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'STORY_GENERATING', 'STORY_DONE', 'ASSETS_GENERATING', 'ASSETS_DONE', 'AUDIO_GENERATING', 'AUDIO_DONE', 'STORYBOARD_GENERATING', 'STORYBOARD_DONE', 'VIDEO_GENERATING', 'VIDEO_DONE', 'ASSEMBLING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('CHARACTER', 'ITEM', 'BACKGROUND');

-- CreateEnum
CREATE TYPE "AudioType" AS ENUM ('SOUNDTRACK', 'BACKSOUND', 'VOICE_OVER');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "ide" TEXT NOT NULL,
    "gaya" "StoryStyle" NOT NULL,
    "tokohUtama" TEXT NOT NULL,
    "asalDaerah" TEXT NOT NULL,
    "latar" "HistoricalEra" NOT NULL,
    "latarDetail" TEXT,
    "plot" TEXT NOT NULL,
    "screenplay" JSONB,
    "finalVideoUrl" TEXT,
    "driveFileId" TEXT,
    "driveShareLink" TEXT,
    "totalScenes" INTEGER NOT NULL DEFAULT 0,
    "completedScenes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "sceneNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "setting" TEXT NOT NULL,
    "timeOfDay" TEXT,
    "action" TEXT NOT NULL,
    "voiceOver" TEXT NOT NULL,
    "musicMood" TEXT,
    "actors" TEXT[],
    "imagePrompt" TEXT,
    "videoPrompt" TEXT,
    "cameraAngle" TEXT,
    "transition" TEXT,
    "storyboardUrl" TEXT,
    "clipUrl" TEXT,
    "durationSeconds" INTEGER NOT NULL DEFAULT 10,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,
    "imageUrl" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioAsset" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "AudioType" NOT NULL,
    "sunoPrompt" TEXT NOT NULL,
    "sunoJobId" TEXT,
    "audioUrl" TEXT,
    "lyrics" TEXT,
    "mood" TEXT,
    "genre" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "payload" JSONB,
    "result" JSONB,
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scene_projectId_sceneNumber_key" ON "Scene"("projectId", "sceneNumber");

-- AddForeignKey
ALTER TABLE "Scene" ADD CONSTRAINT "Scene_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioAsset" ADD CONSTRAINT "AudioAsset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
