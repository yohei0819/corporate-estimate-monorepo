'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/** GA_ID に不正な文字が含まれていないかチェック */
const GA_ID_SAFE = /^[A-Za-z0-9-]+$/.test(GA_ID) ? GA_ID : '';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID_SAFE) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.gtag?.('event', 'page_view', { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID_SAFE) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID_SAFE)}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_ID_SAFE)});
        `}
      </Script>
      <Suspense>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
