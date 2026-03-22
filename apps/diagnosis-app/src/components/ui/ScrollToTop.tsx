'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';

/**
 * ページトップへのスクロールボタン。
 * 300px 以上スクロールすると表示され、クリックでスムーズにトップへ戻る。
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      className={`${styles['scrollToTop']} ${visible ? styles['scrollToTop--visible'] : ''}`}
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 4L3 11l1.4 1.4L10 6.8l5.6 5.6L17 11z" fill="currentColor" />
      </svg>
    </button>
  );
}
