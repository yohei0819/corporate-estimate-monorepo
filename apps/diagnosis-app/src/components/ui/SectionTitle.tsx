import styles from './SectionTitle.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3';
type Alignment = 'left' | 'center';

interface SectionTitleProps {
  /** メインタイトルテキスト */
  title: string;
  /** サブタイトル（英字ラベル等） */
  subtitle?: string;
  /** 描画する見出しタグ @default 'h2' */
  tag?: HeadingTag;
  /** テキストの配置 @default 'center' */
  align?: Alignment;
}

/**
 * セクション見出しコンポーネント。subtitle + title の 2 行構成。
 *
 * @example
 * ```tsx
 * <SectionTitle title="サービス一覧" subtitle="Services" tag="h2" align="center" />
 * ```
 */
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
