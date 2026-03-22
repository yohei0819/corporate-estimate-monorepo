'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isValidEmail } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { STORAGE_KEYS } from '@/lib/storage';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.scss';

/** モックユーザー情報 */
const MOCK_USER = {
  email: 'demo@example.com',
  password: 'password123',
  name: '山田 太郎',
  company: 'サンプル株式会社',
};

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('有効なメールアドレスを入力してください。');
      return;
    }
    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください。');
      return;
    }

    setIsLoading(true);
    try {
      // モックAPI応答（実際のAPI接続時に差し替え）
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        localStorage.setItem(
          STORAGE_KEYS.auth,
          JSON.stringify({ email: MOCK_USER.email, name: MOCK_USER.name, company: MOCK_USER.company }),
        );
        showToast('ログインしました');
        router.push('/mypage');
      } else {
        setError('メールアドレスまたはパスワードが正しくありません。');
      }
    } catch {
      setError('ログインに失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles['login']}>
      <div className={styles['login__inner']}>
        <SectionTitle title="ログイン" subtitle="Login" tag="h1" />

        <form className={styles['login__form']} onSubmit={handleSubmit}>
          {error && (
            <p id="login-error" className={styles['login__error']} role="alert">{error}</p>
          )}
          <div className={styles['login__field']}>
            <label htmlFor="login-email" className={styles['login__label']}>
              メールアドレス
            </label>
            <input
              id="login-email"
              type="email"
              className={styles['login__input']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'login-error' : undefined}
            />
          </div>

          <div className={styles['login__field']}>
            <label htmlFor="login-password" className={styles['login__label']}>
              パスワード
            </label>
            <input
              id="login-password"
              type="password"
              className={styles['login__input']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              autoComplete="current-password"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'login-error' : undefined}
            />
          </div>

          <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </Button>
        </form>

        <div className={styles['login__footer']}>
          {process.env.NODE_ENV === 'development' && (
            <p className={styles['login__footer-text']}>
              デモアカウント：demo@example.com / password123
            </p>
          )}
          <p className={styles['login__footer-text']}>
            アカウントをお持ちでない方は
            <Link href="/diagnosis" className={styles['login__footer-link']}>
              ゲストとして診断
            </Link>
            できます。
          </p>
        </div>
      </div>
    </div>
  );
}
