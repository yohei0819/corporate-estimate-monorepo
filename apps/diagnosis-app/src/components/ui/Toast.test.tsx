import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { ToastProvider, useToast } from './Toast';

/** showToast を呼ぶためのヘルパーコンポーネント */
function TriggerToast({ message, type }: { message: string; type?: 'success' | 'error' | 'info' }) {
  const { showToast } = useToast();
  return <button onClick={() => showToast(message, type)}>表示</button>;
}

function renderWithProvider(ui: React.ReactElement) {
  return render(<ToastProvider>{ui}</ToastProvider>);
}

describe('Toast', () => {
  it('shows toast message on trigger', async () => {
    renderWithProvider(<TriggerToast message="保存しました" type="success" />);
    await act(async () => {
      screen.getByRole('button', { name: '表示' }).click();
    });
    expect(screen.getByText('保存しました')).toBeInTheDocument();
  });

  it('shows success icon', async () => {
    renderWithProvider(<TriggerToast message="成功" type="success" />);
    await act(async () => {
      screen.getByRole('button', { name: '表示' }).click();
    });
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('shows error icon', async () => {
    renderWithProvider(<TriggerToast message="失敗" type="error" />);
    await act(async () => {
      screen.getByRole('button', { name: '表示' }).click();
    });
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('shows info icon', async () => {
    renderWithProvider(<TriggerToast message="情報" type="info" />);
    await act(async () => {
      screen.getByRole('button', { name: '表示' }).click();
    });
    expect(screen.getByText('ℹ')).toBeInTheDocument();
  });

  it('has aria-live polite on container', () => {
    const { container } = renderWithProvider(<div />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('throws when useToast is used outside ToastProvider', () => {
    expect(() => {
      render(<TriggerToast message="エラー" />);
    }).toThrow('useToast must be used within ToastProvider');
  });
});
