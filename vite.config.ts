import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/index.ts',
      name: 'dark-toggle',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      plugins: [
        typescript({
          include: 'lib/**/*.ts',
        }),
      ],
    },
  },
})
