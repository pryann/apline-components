import { defineConfig } from 'vite'
import nunjucks from 'vite-plugin-nunjucks'

export default defineConfig({

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "bulma/sass/utilities/_index" as *;`,
        charset: false,
      },
    },
  }
})