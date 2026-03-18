import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  eslint: {
    // ルートの ESLint 設定を使用するため、next build 時の lint をスキップ
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
