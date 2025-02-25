import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from "path";
import { sync as globSync } from "glob";
import { fileURLToPath, URL } from 'node:url'
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    nunjucks({
      templatesDir: './src',
    }),
  ],
  root: path.join(__dirname, "src"),
  server: {
    port: 8088,
    open: true,
    fs: {
      allow: ['..', 'node_modules']
    }
  },
  build: {
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src',  'index.html'),
        test: path.resolve(__dirname, 'src',  'test.html'),
        style: path.resolve(__dirname, 'src/assets/scss/main.scss')
      },
      output: {
        dir: path.resolve(__dirname, 'dist'),
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
});