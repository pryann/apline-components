import { defineConfig } from 'vite'
import nunjucks from 'vite-plugin-nunjucks'

export default defineConfig({
  plugins: [
    nunjucks({
      templatesDir: './src/view',
      nunjucksConfigure: {
        autoescape: true,
        throwOnUndefined: false,
      },
    }),
  ],
  server: {
    port: 5173,
    open: true,
    watch: {
      usePolling: true,
      ignored: ['!**/node_modules/**']
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Don't empty the dist folder as Eleventy uses it too
    rollupOptions: {
      input: './src/index.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "bulma/sass/utilities/_index" as *;`,
        charset: false,
      },
    },
  }
})