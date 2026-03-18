import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

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
