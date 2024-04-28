// eslint-disable-next-line ts/ban-ts-comment, ts/prefer-ts-expect-error
// @ts-ignore
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'unplugin-turbo-console/nuxt',
    ['@nuxt/devtools', { enabled: '' }],
  ],
})
