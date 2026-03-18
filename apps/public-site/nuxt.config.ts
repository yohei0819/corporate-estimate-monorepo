// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-18',
  devtools: { enabled: false },

  // GitHub Pages 用の静的サイト生成
  ssr: true,
  nitro: {
    preset: 'github-pages',
  },
  app: {
    baseURL: '/corporate-estimate-monorepo/',
  },

  css: ['~/assets/scss/global.scss'],

  runtimeConfig: {
    public: {
      diagnosisAppOrigin: '/corporate-estimate-monorepo/app',
      gaId: '',
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *; @use "~/assets/scss/mixins" as *;',
        },
      },
    },
  },
});
