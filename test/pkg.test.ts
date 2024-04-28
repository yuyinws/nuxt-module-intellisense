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
        "@pinia-plugin-persistedstate/nuxt",
        "@pinia/nuxt",
        "@unocss/nuxt",
        "@vant/nuxt",
        "@vueuse/nuxt",
        "dayjs-nuxt",
      ]
    `)
  })
})
