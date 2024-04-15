import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Patch dev1
  define: {
    ...(process.env.APP_ENV === 'production' ? {} : { global: {} }),
  },
});