import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  // GitHub Pages 用の静的エクスポート
  output: 'export',
  basePath: '/corporate-estimate-monorepo/app',
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  eslint: {
    // ルートの ESLint 設定を使用するため、next build 時の lint をスキップ
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
