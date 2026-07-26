import { randomUUID } from 'node:crypto';
import { prisma } from '../src/lib/prisma.js';

async function main() {
  console.log('Starting seed...');

  // Clean up existing data (be careful - this drops all rows)
  await prisma.job.deleteMany();
  await prisma.scene.deleteMany();
  await prisma.audioAsset.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.project.deleteMany();

  const now = new Date();

  const projectId = randomUUID();

  const project = await prisma.project.create({
    data: {
      id: projectId,
      title: 'Demo Project',
      ide: 'Demo ide untuk seeder',
      gaya: 'KLASIK',
      tokohUtama: 'Si Jampang',
      asalDaerah: 'Betawi',
      latar: 'MASEHI',
      plot: 'Ini adalah plot demo yang dibuat oleh seeder.',
      updatedAt: now,
    },
  });

  await prisma.scene.createMany({
    data: [
      {
        id: randomUUID(),
        projectId: project.id,
        sceneNumber: 1,
        title: 'Pembukaan',
        setting: 'Desa kecil',
        timeOfDay: 'Pagi',
        action: 'Karakter utama muncul dan memperkenalkan konflik.',
        voiceOver: 'Suara narator membuka cerita.',
        actors: [],
        durationSeconds: 30,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        projectId: project.id,
        sceneNumber: 2,
        title: 'Konflik',
        setting: 'Balai desa',
        timeOfDay: 'Siang',
        action: 'Konflik meningkat antara tokoh utama dan antagonis.',
        voiceOver: '',
        actors: [],
        durationSeconds: 45,
        updatedAt: now,
      },
    ],
  });

  console.log('Seed finished. Created project:', project.id);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
