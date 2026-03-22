'use client';

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import styles from './Toast.module.scss';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const TOAST_DURATION_MS = 3000;

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * トースト通知を表示するためのフック。ToastProvider 配下で使用する。
 *
 * @example
 * ```tsx
 * const { showToast } = useToast();
 * showToast('保存しました', 'success');
 * ```
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const ICON_MAP: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

/**
 * トースト通知のコンテキストプロバイダ。
 * アプリケーションのルート近くに配置し、子コンポーネントから `useToast()` で利用する。
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(0);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextIdRef.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles['toast-container']} aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles['toast']} ${styles[`toast--${toast.type}`]}`}
            role="status"
          >
            <span className={styles['toast__icon']}>
              {ICON_MAP[toast.type]}
            </span>
            <span className={styles['toast__message']}>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
