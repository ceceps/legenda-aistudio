import { PrismaClient } from '../../src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Menyemui database...');

  // Check if projects already exist
  const existing = await prisma.project.findMany();
  if (existing.length > 0) {
    console.log('Data seed sudah ada, lewati.');
    return;
  }

  // 1. Project DRAFT
  const draftProject = await prisma.project.create({
    data: {
      title: 'Proyek Baru',
      status: 'DRAFT',
      ide: 'fantasy',
      gaya: 'KLASIK',
      tokohUtama: 'Arya',
      asalDaerah: 'Bali',
      latar: 'MASEHI',
      plot: 'Cerita tentang petualangan di pulau ajaib',
      screenplay: null,
      totalScenes: 0,
      completedScenes: 0,
    },
  });
  console.log('✓ DRAFT:', draftProject.id);

  // 2. Project STORY_DONE
  const storyDoneProject = await prisma.project.create({
    data: {
      title: 'Naskah Siap Lanjut',
      status: 'STORY_DONE',
      ide: 'fantasy',
      gaya: 'KLASIK',
      tokohUtama: 'Pangeran',
      asalDaerah: 'Jawa',
      latar: 'MASEHI',
      plot: 'Petualangan mencari harta karun',
      screenplay: {
        title: 'Petualangan Pangeran',
        logline: 'Seekor pangeran berani menemukan harta karun tersembunyi',
        genre: 'Petualangan',
        era: 'Kuno',
        setting: 'Hutan ajaib',
        actors: [{ name: 'Pangeran', role: 'Protagonis', persona: 'Berani', costume: 'Baju kerajaan', voiceOver: 'Tegas' }],
        plotOutline: { pembuka: 'Pangeran menyadari kerajaan sedang krisis', klimaks: 'Pertarungan dengan raksasa hutan', resolusi: 'Harta karun ditemukan dan kerajaan kembali makmur' },
        scenes: [
          { sceneNumber: 1, title: 'Pembuka', setting: 'Kerajaan', timeOfDay: 'Siang', durationSeconds: 30, action: 'Pangeran duduk di singgasana', voiceOver: 'Kerajaan sedang krisis...', musicMood: 'Dramatis', actors: ['Pangeran'], imagePrompt: 'Pangeran di kerajaan', videoPrompt: 'Pangeran di singgasana', cameraAngle: 'medium shot', transition: 'fade in', dialog: 'Aku harus temukan harta karun!' },
          { sceneNumber: 2, title: 'Masa Lalu', setting: 'Hutan', timeOfDay: 'Malam', durationSeconds: 45, action: 'Pangeran memasuki hutan gelap', voiceOver: 'Menurut legenda, harta karun di sini...', musicMood: 'Misterius', actors: ['Pangeran'], imagePrompt: 'Hutan gelap', videoPrompt: 'Pangeran berjalan malam', cameraAngle: 'wide shot', transition: 'cut', dialog: 'Aku tak takut gelap!' },
        ],
        musicTheme: 'Epic',
        wardrobeNotes: 'Baju kerajaan tradisional Jawa',
      },
      totalScenes: 2,
      completedScenes: 2,
    },
  });
  console.log('✓ STORY_DONE:', storyDoneProject.id);

  // 3. Project ASSETS_DONE
  const assetsDoneProject = await prisma.project.create({
    data: {
      title: 'Aset Siap',
      status: 'ASSETS_DONE',
      ide: 'sci-fi',
      gaya: 'FUTURISTIK',
      tokohUtama: 'Astro',
      asalDaerah: 'Jawa',
      latar: 'SEBELUM_MASEHI',
      plot: 'Petualangan ke luar angkasa',
      screenplay: {
        title: 'Legenda Astro',
        logline: 'Astro menjelajahi galaksi yang tak dikenal',
        genre: 'Sains Fiksi',
        era: 'Masa Depan',
        setting: 'Bintang terpencil',
        actors: [{ name: 'Astro', role: 'Pilot', persona: 'Pemberani', costume: 'Pakaian astronot', voiceOver: 'Tenang' }],
        plotOutline: { pembuka: 'Astro lepas landas', klimaks: 'Pertemuan dengan makhluk asing', resolusi: 'Kembali dengan pengetahuan baru' },
        scenes: [{ sceneNumber: 1, title: 'Lepas Landi', setting: 'Stasiun Luar Angkasa', timeOfDay: 'Siang', durationSeconds: 60, action: 'Astro masuk kapsul', voiceOver: 'Lilis landasi!', musicMood: 'Epic', actors: ['Astro'], imagePrompt: 'Capsule lepas landas', videoPrompt: 'Capsule meluncur', cameraAngle: 'wide shot', transition: 'fade in', dialog: 'Ke luar angkasa, mari!' }],
        musicTheme: 'Orchestral',
        wardrobeNotes: 'Pakaian astronot futuristik',
      },
      totalScenes: 1,
      completedScenes: 1,
    },
  });
  console.log('✓ ASSETS_DONE:', assetsDoneProject.id);

  // 4. Project AUDIO_DONE
  const audioDoneProject = await prisma.project.create({
    data: {
      title: 'Audio Siap',
      status: 'AUDIO_DONE',
      ide: 'drama',
      gaya: 'SAAT_INI',
      tokohUtama: 'Siti',
      asalDaerah: 'Sunda',
      latar: 'MASEHI',
      plot: 'Cerita tentang perjuangan hidup di kota',
      screenplay: {
        title: 'Kota Tanpa Batas',
        logline: 'Siti berjuang menggapai mimpi di ibu kota',
        genre: 'Drama',
        era: 'Modern',
        setting: 'Jakarta',
        actors: [{ name: 'Siti', role: 'Protagonis', persona: 'Tekun', costume: 'Pakaian kerja', voiceOver: 'Penuh harap' }],
        plotOutline: { pembuka: 'Siti tiba di kota', klimaks: 'Ujian sulit menjelang', resolusi: 'Siti berhasil mencapai mimpi' },
        scenes: [{ sceneNumber: 1, title: 'Tiba di Kota', setting: 'Stasiun kereta', timeOfDay: 'Pagi', durationSeconds: 45, action: 'Siti turun kereta', voiceOver: 'Ini awal baru saya', musicMood: 'Menyentuh', actors: ['Siti'], imagePrompt: 'Siti stasiun kereta', videoPrompt: 'Siti berjalan stasiun', cameraAngle: 'medium shot', transition: 'cut', dialog: 'Saya pasti bisa di sini!' }],
        musicTheme: 'Piano',
        wardrobeNotes: 'Pakaian kerja modern',
      },
      totalScenes: 1,
      completedScenes: 1,
    },
  });
  console.log('✓ AUDIO_DONE:', audioDoneProject.id);

  // 5. Project COMPLETED
  const completedProject = await prisma.project.create({
    data: {
      title: 'Video Siap Tonton',
      status: 'COMPLETED',
      ide: 'fantasy',
      gaya: 'SUPER_HERO',
      tokohUtama: 'Bayu',
      asalDaerah: 'Sumatra',
      latar: 'MASEHI',
      plot: 'Pahlawan yang melindungi rakyat',
      screenplay: {
        title: 'Legenda Bayu',
        logline: 'Bayu melindungi rakyat dari ancaman gelap',
        genre: 'Petualangan',
        era: 'Kuno',
        setting: 'Gunung api',
        actors: [{ name: 'Bayu', role: 'Pahlawan', persona: 'Berani', costume: 'Baju super hero', voiceOver: 'Tegas' }],
        plotOutline: { pembuka: 'Bayu menerima misi', klimaks: 'Pertarungan akhir', resolusi: 'Damai kembali' },
        scenes: [
          { sceneNumber: 1, title: 'Menerima Tugas', setting: 'Kerajaan', timeOfDay: 'Siang', durationSeconds: 30, action: 'Raja memberikan pedang pada Bayu', voiceOver: 'Kerajaan butuh pahlawan', musicMood: 'Heroik', actors: ['Bayu', 'Raja'], imagePrompt: 'Raja memberikan pedang', videoPrompt: 'Raja dan Bayu kerajaan', cameraAngle: 'medium shot', transition: 'fade in', dialog: 'Perlunate kerajaan!' },
          { sceneNumber: 2, title: 'Pertarungan', setting: 'Kawah Gunung', timeOfDay: 'Malam', durationSeconds: 60, action: 'Bayu melawan monster', voiceOver: 'Aku akan menang untuk kalian!', musicMood: 'Intensif', actors: ['Bayu', 'Monster'], imagePrompt: 'Bayu pertarungan kawah', videoPrompt: 'Pertarungan gunung malam', cameraAngle: 'wide shot', transition: 'cut', dialog: 'Inilah akhirmu!' },
        ],
        musicTheme: 'Orchestral Epic',
        wardrobeNotes: 'Baju super hero tradisional Sumatra',
      },
      totalScenes: 2,
      completedScenes: 2,
      finalVideoUrl: 'https://example.com/final-video.mp4',
      driveFileId: 'file123',
      driveShareLink: 'https://drive.google.com/file/view?id=file123',
    },
  });
  console.log('✓ COMPLETED:', completedProject.id);

  // 6. Project FAILED
  const failedProject = await prisma.project.create({
    data: {
      title: 'Proyek Gagal',
      status: 'FAILED',
      ide: 'horror',
      gaya: 'KLASIK',
      tokohUtama: 'Hantu',
      asalDaerah: 'Kalimantan',
      latar: 'SEBELUM_MASEHI',
      plot: 'Legenda hantu hutan Kalimantan',
      screenplay: null,
      totalScenes: 0,
      completedScenes: 0,
    },
  });
  console.log('✓ FAILED:', failedProject.id);

  console.log('\n✓ Semua data dummy berhasil diseed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });