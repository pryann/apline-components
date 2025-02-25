import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from "path";
import { sync as globSync } from "glob";
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
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
        main: path.resolve(__dirname, 'src',  'index.html'),
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