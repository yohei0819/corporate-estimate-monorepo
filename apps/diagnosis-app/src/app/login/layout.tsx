import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン | Corporate Estimate',
  description: '見積もり履歴の保存・閲覧にはログインが必要です。',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
