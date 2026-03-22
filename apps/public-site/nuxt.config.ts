// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-03-18',
  devtools: { enabled: false },

  modules: ['@nuxtjs/sitemap'],

  // サイトマップ設定
  site: {
    url: 'https://yohei0819.github.io',
  },
  sitemap: {
    urls: [
      '/',
      '/about',
      '/services',
      '/works',
      '/faq',
      '/contact',
      '/privacy',
      '/terms',
      '/legal',
    ],
    discoverImages: false,
    excludeAppSources: true,
  },

  // GitHub Pages 用の静的サイト生成
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      // 診断アプリへのリンクはプリレンダ対象外
      ignore: ['/corporate-estimate-monorepo/app'],
      failOnError: false,
    },
  },
  app: {
    baseURL: '/corporate-estimate-monorepo/',
    head: {
      meta: [
        { property: 'og:image', content: 'https://yohei0819.github.io/corporate-estimate-monorepo/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://yohei0819.github.io/corporate-estimate-monorepo/og-image.png' },
      ],
    },
  },

  css: ['~/assets/scss/global.scss'],

  runtimeConfig: {
    public: {
      diagnosisAppOrigin: '/app',
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
