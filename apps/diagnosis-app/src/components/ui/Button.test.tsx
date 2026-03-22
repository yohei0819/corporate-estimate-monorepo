import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>クリック</Button>);
    expect(screen.getByRole('button', { name: 'クリック' })).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/test">リンク</Button>);
    const link = screen.getByRole('link', { name: 'リンク' });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders as disabled span when href and disabled', () => {
    render(<Button href="/test" disabled>無効リンク</Button>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('無効リンク')).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>押す</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>無効</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    render(<Button variant="outline" size="lg">スタイル</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('button--outline');
    expect(button.className).toContain('button--lg');
  });

  it('sets type attribute', () => {
    render(<Button type="submit">送信</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
