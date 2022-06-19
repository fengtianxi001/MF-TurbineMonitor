import { defineConfig, loadEnv } from 'vite'
import { alias } from './vite/alias'
import { plugins } from './vite/plugins'
import { server } from './vite/server'
import { preprocessorOptions } from './vite/preprocessor'
export default defineConfig(({ command, mode }) => {
  return {
    base: './',
    build: {
      outDir: './docs',
    },
    plugins: [...plugins],
    server: { ...server },
    resolve: { alias },
    css: { preprocessorOptions },
  }
})
