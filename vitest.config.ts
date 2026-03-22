import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  test: {
    include: [
      'packages/shared/src/**/*.test.ts',
      'apps/diagnosis-app/src/**/*.test.tsx',
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['apps/diagnosis-app/src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/diagnosis-app/src'),
    },
  },
});
