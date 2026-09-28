import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({isSsrBuild})=>({ plugins: [react()], build: { rollupOptions: { output: isSsrBuild ? {} : { manualChunks: { graphics: ['three'] } } } } }));
