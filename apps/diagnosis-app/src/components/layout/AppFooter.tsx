import { COPYRIGHT, FOOTER_NAV_ITEMS } from '@corporate-estimate/shared';
import styles from './AppFooter.module.scss';

const PUBLIC_SITE_ORIGIN =
  process.env.NEXT_PUBLIC_PUBLIC_SITE_ORIGIN
  || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');

export function AppFooter() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__inner']}>
        <nav className={styles['footer__nav']}>
          <ul className={styles['footer__nav-list']}>
            {FOOTER_NAV_ITEMS.map((item) => (
              <li key={item.href} className={styles['footer__nav-item']}>
                <a
                  href={`${PUBLIC_SITE_ORIGIN}${item.href}`}
                  className={styles['footer__nav-link']}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles['footer__copyright']}>{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
