// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/leaflet'
  ],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  i18n: {
    defaultLocale: 'nl',
    locales: [
      { code: 'nl', name: 'Nederlands', file: 'nl.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' },
    ]
  }
})