import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['firebase/app', 'firebase/database', 'firebase/analytics'], // Add other Firebase modules as needed
  },
});
