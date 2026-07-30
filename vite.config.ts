import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** GitHub Pages serves 404.html for unknown paths — copy index for SPA routes. */
function spaGithubPagesFallback(): Plugin {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaGithubPagesFallback()],
  base: '/ChienKhuD/',
})
