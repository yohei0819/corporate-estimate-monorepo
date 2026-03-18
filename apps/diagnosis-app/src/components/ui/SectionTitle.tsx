import styles from './SectionTitle.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3';
type Alignment = 'left' | 'center';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  tag?: HeadingTag;
  align?: Alignment;
}

export function SectionTitle({
  title,
  subtitle,
  tag: Tag = 'h2',
  align = 'center',
}: SectionTitleProps) {
  return (
    <Tag className={`${styles['section-title']} ${styles[`section-title--${align}`]}`}>
      {subtitle && (
        <span className={styles['section-title__subtitle']}>{subtitle}</span>
      )}
      <span className={styles['section-title__text']}>{title}</span>
    </Tag>
  );
}
