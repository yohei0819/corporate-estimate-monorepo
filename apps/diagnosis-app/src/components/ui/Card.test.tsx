import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>本文</Card>);
    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(<Card header={<span>ヘッダー</span>}>本文</Card>);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Card footer={<span>フッター</span>}>本文</Card>);
    expect(screen.getByText('フッター')).toBeInTheDocument();
  });

  it('does not render header/footer when omitted', () => {
    const { container } = render(<Card>本文のみ</Card>);
    expect(container.querySelector('.card__header')).not.toBeInTheDocument();
    expect(container.querySelector('.card__footer')).not.toBeInTheDocument();
  });

  it('applies hoverable class when hoverable is true', () => {
    const { container } = render(<Card hoverable>ホバー可能</Card>);
    expect(container.firstChild).toHaveClass('card--hoverable');
  });

  it('does not apply hoverable class by default', () => {
    const { container } = render(<Card>通常</Card>);
    expect(container.firstChild).not.toHaveClass('card--hoverable');
  });
});
