import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/generated/**', 'src/**/*.d.ts', '**/*.test.ts'],
    },
    setupFiles: ['src/test/setup.ts'],
    alias: {
      '@': '/home/ceceps/projects/legenda-aistudio/apps/api/src',
      '@legenda/shared-types': '/home/ceceps/projects/legenda-aistudio/packages/shared-types/src',
    },
  },
});