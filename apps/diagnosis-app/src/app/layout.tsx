import type { Metadata } from 'next';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import styles from './layout.module.scss';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Corporate Estimate - Diagnosis',
  description: '法人見積もり診断アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <GoogleAnalytics />
        <AppHeader />
        <main className={styles['main']}>
          {children}
        </main>
        <AppFooter />
        <ScrollToTop />
      </body>
    </html>
  );
}
