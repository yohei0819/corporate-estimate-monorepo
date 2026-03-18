// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-18',
  devtools: { enabled: false },

  css: ['~/assets/scss/global.scss'],

  runtimeConfig: {
    public: {
      diagnosisAppOrigin: 'http://localhost:3001',
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
