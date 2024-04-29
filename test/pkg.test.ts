import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parsePkg } from '../src/pkg'

const DIR_DIST = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))
const fixturePath = resolve(DIR_DIST, './fixtures/nuxt.config.ts')

describe('pkg', () => {
  it('parse', () => {
    expect(parsePkg(fixturePath)).toMatchInlineSnapshot(`
      [
        {
          "name": "@pinia-plugin-persistedstate/nuxt",
          "version": "v1.2.0",
        },
        {
          "name": "@pinia/nuxt",
          "version": "v0.5.1",
        },
        {
          "name": "@unocss/nuxt",
          "version": "v0.59.0",
        },
        {
          "name": "@vant/nuxt",
          "version": "v1.0.4",
        },
        {
          "name": "@vueuse/nuxt",
          "version": "v10.9.0",
        },
        {
          "name": "dayjs-nuxt",
          "version": "v2.1.9",
        },
      ]
    `)
  })
})
