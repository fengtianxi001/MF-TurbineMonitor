import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { Plugin } from 'vite'
export const plugins: Array<Plugin> = [
  vue({
    reactivityTransform: true,
  }),
  AutoImport({
    resolvers: [],
    imports: ['vue'],
    dts: 'types/auto-imports.d.ts',
  }),
  Components({
    resolvers: [],
    dirs: ['src/components'],
    directoryAsNamespace: true,
    dts: 'types/components.d.ts',
  }),
]
