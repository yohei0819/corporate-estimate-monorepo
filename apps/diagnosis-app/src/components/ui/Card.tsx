import styles from './Card.module.scss';

interface CardProps {
  /** カード本体のコンテンツ */
  children: React.ReactNode;
  /** カードヘッダーに表示するコンテンツ */
  header?: React.ReactNode;
  /** カードフッターに表示するコンテンツ */
  footer?: React.ReactNode;
  /** ホバー時に影を付けるか @default false */
  hoverable?: boolean;
}

/**
 * 汎用カードコンポーネント。header / body / footer の 3 セクションを持つ。
 *
 * @example
 * ```tsx
 * <Card header={<h3>プラン名</h3>} hoverable>
 *   <p>プランの説明文</p>
 * </Card>
 * ```
 */
export function Card({
  children,
  header,
  footer,
  hoverable = false,
}: CardProps) {
  const className = [
    styles['card'],
    hoverable ? styles['card--hoverable'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className}>
      {header && <div className={styles['card__header']}>{header}</div>}
      <div className={styles['card__body']}>{children}</div>
      {footer && <div className={styles['card__footer']}>{footer}</div>}
    </div>
  );
}
