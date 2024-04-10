import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Patch dev
  define: {
    'process.env.PORT': 5001,
    ...(process.env.APP_ENV === 'production' ? {} : { global: {} }),
  },
});