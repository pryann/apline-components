import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig({
  plugins: [
    pugPlugin() 
  ],
  build: {
    rollupOptions: {
      external: [
        /^\/core\//,  
        /^node_modules/ 
      ],
      input: {
        index: 'src/page/index.js',
        default: 'src/layout/default.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
