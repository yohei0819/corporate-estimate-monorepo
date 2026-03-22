import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '見積もり明細 | Corporate Estimate',
  description: '選択したプランとオプションの詳細な見積もり金額をご確認いただけます。',
};

export default function EstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
