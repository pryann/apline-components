import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from "path";
import { sync as globSync } from "glob";

export default defineConfig({
  plugins: [
    nunjucks({
      templatesDir: './src/view',
    }),
  ],
  root: path.join(__dirname, "src"),
  build: {
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src', 'view', 'index.html'),
      }
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "bulma/sass/utilities/_index" as *;`,
        charset: false,
      },
    },
  }
});