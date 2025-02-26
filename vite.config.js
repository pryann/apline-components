import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig({
  plugins: [
    pugPlugin() 
  ],
  assetsInclude: ['**/*.pug'],
  build: {
    rollupOptions: {
      external: [
        /^\/core\//,  
        /^node_modules/ 
      ],
      input: {
        index: 'src/page/index/index.js',
        default: 'src/layout/default/default.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});
