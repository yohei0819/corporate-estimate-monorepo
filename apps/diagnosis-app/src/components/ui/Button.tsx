import Link from 'next/link';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

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
