import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ToastProvider } from '@/components/ui/Toast';
import styles from './layout.module.scss';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Corporate Estimate - Diagnosis',
  description: '法人見積もり診断アプリ',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Web制作プラン診断 | Corporate Estimate',
    description: '簡単な質問に答えるだけで、最適なWeb制作プランを無料で診断します。',
    images: [
      {
        url: 'https://yohei0819.github.io/corporate-estimate-monorepo/app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web制作プラン診断 | Corporate Estimate',
    description: '簡単な質問に答えるだけで、最適なWeb制作プランを無料で診断します。',
    images: ['https://yohei0819.github.io/corporate-estimate-monorepo/app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ToastProvider>
          <GoogleAnalytics />
          <AppHeader />
          <main className={styles['main']}>
            {children}
          </main>
          <AppFooter />
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
