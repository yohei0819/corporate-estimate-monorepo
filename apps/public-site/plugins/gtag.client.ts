export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const gaId = config.public.gaId;

  if (!gaId || typeof window === 'undefined') return;

  // gtag.js を読み込み
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(script);

  // gtag 初期化
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', gaId);

  // ページ遷移トラッキング
  const router = useRouter();
  router.afterEach((to) => {
    gtag('event', 'page_view', {
      page_path: to.fullPath,
    });
  });
});

// グローバル型定義
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
