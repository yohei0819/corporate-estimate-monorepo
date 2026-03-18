'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
        エラーが発生しました
      </h2>
      <p style={{ color: '#5f6368', marginBottom: '2rem' }}>
        申し訳ございません。予期しないエラーが発生しました。
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={() => reset()}>
          再試行する
        </Button>
        <Button variant="outline" href="/">
          ホームに戻る
        </Button>
      </div>
    </div>
  );
}
