import { defineConfig } from 'vite';

// Keep TypeORM external in the Electron main bundle because it declares
// optional database drivers that are not installed in this app.
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['typeorm'],
    },
  },
});
