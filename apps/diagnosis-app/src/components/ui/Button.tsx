import Link from 'next/link';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  /** ボタン内に表示するコンテンツ */
  children: React.ReactNode;
  /** ボタンのスタイルバリエーション @default 'primary' */
  variant?: ButtonVariant;
  /** ボタンのサイズ @default 'md' */
  size?: ButtonSize;
  /** 指定時はリンクとして描画（Next.js Link） */
  href?: string;
  /** クリックイベントハンドラ */
  onClick?: () => void;
  /** HTML button の type 属性 @default 'button' */
  type?: 'button' | 'submit';
  /** 無効状態 @default false */
  disabled?: boolean;
}

/**
 * 汎用ボタンコンポーネント。primary / secondary / outline の 3 バリエーションを持つ。
 * href 指定時は Next.js Link として描画される。
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>診断を始める</Button>
 * <Button variant="outline" href="/diagnosis">診断ページへ</Button>
 * ```
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const className = [
    styles['button'],
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled ? styles['button--disabled'] : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
