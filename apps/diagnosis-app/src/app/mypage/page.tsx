'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { HistoryEntry, AuthUser } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/storage';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.scss';

export default function MyPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [results, setResults] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStr = localStorage.getItem(STORAGE_KEYS.auth);
    if (!authStr) {
      router.replace('/login');
      return;
    }
    try {
      setUser(JSON.parse(authStr) as AuthUser);
    } catch {
      router.replace('/login');
      return;
    }

    try {
      const historyStr = localStorage.getItem(STORAGE_KEYS.diagnosisHistory);
      if (historyStr) {
        setResults(JSON.parse(historyStr) as HistoryEntry[]);
      }
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className={styles['mypage']}>
        <div className={styles['mypage__inner']}>
          <div className={styles['mypage__loading']}>読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
    showToast('ログアウトしました');
    router.push('/login');
  };

  return (
    <div className={styles['mypage']}>
      <div className={styles['mypage__inner']}>
        <SectionTitle title="マイページ" subtitle="My Page" tag="h1" />

        <section className={styles['mypage__section']}>
          <Card
            header={
              <h3 className={styles['mypage__card-title']}>ユーザー情報</h3>
            }
          >
            <div className={styles['mypage__user-info']}>
              <p>
                <strong>会社名：</strong>{user.company}
              </p>
              <p>
                <strong>お名前：</strong>{user.name}
              </p>
              <p>
                <strong>メール：</strong>{user.email}
              </p>
            </div>
          </Card>
        </section>

        <section className={styles['mypage__section']}>
          <h3 className={styles['mypage__section-title']}>過去の診断結果</h3>
          <div className={styles['mypage__list']}>
            {results.length === 0 ? (
              <p className={styles['mypage__empty']}>まだ診断結果がありません。新しい診断を始めてみましょう。</p>
            ) : (
              results.map((result) => (
              <Card key={result.id} hoverable>
                <div className={styles['mypage__result-row']}>
                  <div>
                    <p className={styles['mypage__result-date']}>
                      {result.date}
                    </p>
                    <p className={styles['mypage__result-plan']}>
                      推薦プラン：{result.plan}
                    </p>
                  </div>
                  <div className={styles['mypage__result-cost']}>
                    {formatCurrency(result.cost)}
                  </div>
                </div>
              </Card>
            ))
            )}
          </div>
        </section>

        <div className={styles['mypage__actions']}>
          <Button variant="primary" href="/diagnosis">
            新しい診断を始める
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>
      </div>
    </div>
  );
}
