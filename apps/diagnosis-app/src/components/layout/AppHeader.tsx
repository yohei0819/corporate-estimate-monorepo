'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_NAME, DIAGNOSIS_HEADER_NAV_ITEMS } from '@corporate-estimate/shared';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import styles from './AppHeader.module.scss';

const PUBLIC_SITE_ORIGIN =
  process.env.NEXT_PUBLIC_PUBLIC_SITE_ORIGIN
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/corporate-estimate-monorepo');

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles['header']}>
      <div className={styles['header__inner']}>
        <a href={PUBLIC_SITE_ORIGIN} className={styles['header__logo']}>
          {SITE_NAME}
        </a>
        <button
          type="button"
          className={styles['header__toggle']}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="メニュー"
        >
          <span className={styles['header__toggle-bar']} />
          <span className={styles['header__toggle-bar']} />
          <span className={styles['header__toggle-bar']} />
        </button>
        <nav className={`${styles['header__nav']} ${menuOpen ? styles['header__nav--open'] : ''}`}>
          <ul className={styles['header__nav-list']}>
            {DIAGNOSIS_HEADER_NAV_ITEMS.map((item) => (
              <li key={item.href} className={styles['header__nav-item']}>
                <Link
                  href={item.href}
                  className={styles['header__nav-link']}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
