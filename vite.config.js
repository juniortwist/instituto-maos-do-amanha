import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const baseDir = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  root: resolve(baseDir, 'html'),
  base: './',
  build: { outDir: resolve(baseDir, 'dist'), emptyOutDir: true },
  server: { fs: { allow: [baseDir] } }
});
