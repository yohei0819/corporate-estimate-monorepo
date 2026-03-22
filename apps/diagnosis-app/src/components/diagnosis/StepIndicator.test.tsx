import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator', () => {
  it('displays current step label', () => {
    render(<StepIndicator currentStep={2} totalSteps={7} />);
    expect(screen.getByText('ステップ 3 / 7')).toBeInTheDocument();
  });

  it('displays step 1 when currentStep is 0', () => {
    render(<StepIndicator currentStep={0} totalSteps={5} />);
    expect(screen.getByText('ステップ 1 / 5')).toBeInTheDocument();
  });

  it('sets progress bar width correctly', () => {
    const { container } = render(<StepIndicator currentStep={3} totalSteps={7} />);
    const progressBar = container.querySelector('.step-indicator__progress') as HTMLElement;
    expect(progressBar.style.width).toBe(`${((3 + 1) / 7) * 100}%`);
  });

  it('shows 100% on last step', () => {
    const { container } = render(<StepIndicator currentStep={6} totalSteps={7} />);
    const progressBar = container.querySelector('.step-indicator__progress') as HTMLElement;
    expect(progressBar.style.width).toBe('100%');
  });
});
