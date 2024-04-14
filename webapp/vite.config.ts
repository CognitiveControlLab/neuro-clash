import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load the .env file

export default defineConfig({
  plugins: [react()],
  // Patch dev1
  define: {
    'process.env.PORT': process.env.PORT || 5001,
    ...(process.env.APP_ENV === 'production' ? {} : { global: {} }),
  },
});