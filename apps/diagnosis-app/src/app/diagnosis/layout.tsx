import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '診断質問 | Corporate Estimate',
  description: 'Web制作に関する簡単な質問に回答して、最適なプランを診断します。',
};

export default function DiagnosisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
