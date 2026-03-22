import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionCard } from './QuestionCard';

const DEFAULT_OPTIONS = [
  { value: 'a', label: '選択肢A' },
  { value: 'b', label: '選択肢B' },
  { value: 'c', label: '選択肢C' },
];

describe('QuestionCard', () => {
  it('renders question text as heading', () => {
    render(
      <QuestionCard question="テスト質問" options={DEFAULT_OPTIONS} selectedValue="" onSelect={vi.fn()} />
    );
    expect(screen.getByRole('heading', { name: 'テスト質問' })).toBeInTheDocument();
  });

  it('renders all options as buttons', () => {
    render(
      <QuestionCard question="質問" options={DEFAULT_OPTIONS} selectedValue="" onSelect={vi.fn()} />
    );
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('選択肢A')).toBeInTheDocument();
    expect(screen.getByText('選択肢B')).toBeInTheDocument();
    expect(screen.getByText('選択肢C')).toBeInTheDocument();
  });

  it('calls onSelect with value when option clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    render(
      <QuestionCard question="質問" options={DEFAULT_OPTIONS} selectedValue="" onSelect={handleSelect} />
    );
    await user.click(screen.getByText('選択肢B'));
    expect(handleSelect).toHaveBeenCalledWith('b');
  });

  it('applies selected class to the selected option', () => {
    render(
      <QuestionCard question="質問" options={DEFAULT_OPTIONS} selectedValue="b" onSelect={vi.fn()} />
    );
    const selectedButton = screen.getByText('選択肢B');
    expect(selectedButton.className).toContain('question-card__option--selected');
  });

  it('does not apply selected class to unselected options', () => {
    render(
      <QuestionCard question="質問" options={DEFAULT_OPTIONS} selectedValue="a" onSelect={vi.fn()} />
    );
    const unselected = screen.getByText('選択肢B');
    expect(unselected.className).not.toContain('question-card__option--selected');
  });
});
