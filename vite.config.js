import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// U produkciji se servira s GitHub Pages putanje /rick-morty-explorer/,
// a lokalno (dev) s korijena /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/rick-morty-explorer/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
