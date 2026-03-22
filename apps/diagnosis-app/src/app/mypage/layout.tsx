import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'マイページ',
  description: '過去の診断結果や見積もり履歴を管理できます。',
};

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
