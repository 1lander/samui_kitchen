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
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  
  tailwindcss: {
    // Options for @nuxtjs/tailwindcss module
    configPath: '~/tailwind.config.js',
    exposeConfig: false,
    viewer: true,
  }
})