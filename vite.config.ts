import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],



  // Configure the development server
  server: {
    // host: '192.168.10.20',  
    host: '164.90.205.5', 
    // port: 5000,      
  },
});