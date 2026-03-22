import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '診断結果',
  description: '診断結果に基づいたおすすめのWeb制作プランをご確認いただけます。',
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
