import { defineConfig } from 'tsup'
import { dependencies } from './package.json'

const deps = Object.keys(dependencies)

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: ['cjs'],
  noExternal: deps,
  shims: false,
  dts: false,
  external: [
    'vscode',
  ],
})
