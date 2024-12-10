import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],



  // Configure the development server
  server: {
    host: '192.168.10.20', 
    port: 5000,      
  },
});