import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/index.js',
          filename: 'index.html',
          template: 'src/view/page/index.html',
        },
        {
          entry: 'src/about.js',
          filename: 'about.html',
          template: 'src/view/page/about.html',
        },
      ],
    }),
  ],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "bulma/sass/utilities/_index" as *;
        `,
        charset: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})