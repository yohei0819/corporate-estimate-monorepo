import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  it('renders title text', () => {
    render(<SectionTitle title="テストタイトル" />);
    expect(screen.getByText('テストタイトル')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionTitle title="タイトル" subtitle="サブタイトル" />);
    expect(screen.getByText('サブタイトル')).toBeInTheDocument();
  });

  it('does not render subtitle when omitted', () => {
    const { container } = render(<SectionTitle title="タイトル" />);
    expect(container.querySelector('.section-title__subtitle')).not.toBeInTheDocument();
  });

  it('renders as h2 by default', () => {
    render(<SectionTitle title="見出し" />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders as h1 when tag="h1"', () => {
    render(<SectionTitle title="見出し1" tag="h1" />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders as h3 when tag="h3"', () => {
    render(<SectionTitle title="見出し3" tag="h3" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('applies center alignment by default', () => {
    const { container } = render(<SectionTitle title="中央" />);
    expect(container.firstChild).toHaveClass('section-title--center');
  });

  it('applies left alignment when specified', () => {
    const { container } = render(<SectionTitle title="左" align="left" />);
    expect(container.firstChild).toHaveClass('section-title--left');
  });
});
