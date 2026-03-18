'use client';

import { useEffect, useState } from 'react';
import {
  MOCK_RECOMMENDATION,
  MOCK_PLANS,
  formatCurrency,
  diagnose,
} from '@corporate-estimate/shared';
import type { PlanRecommendation, DiagnosisAnswers } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './page.module.scss';

export default function ResultPage() {
  const [recommendation, setRecommendation] =
    useState<PlanRecommendation | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('diagnosisAnswers')
      || localStorage.getItem('diagnosisAnswers');
    if (stored) {
      try {
        const answers = JSON.parse(stored) as DiagnosisAnswers;
        const result = diagnose(answers);
        setRecommendation(result);
        // 診断結果を履歴として保存
        try {
          const historyStr = localStorage.getItem('diagnosisHistory');
          const history = historyStr ? JSON.parse(historyStr) as Array<{
            id: string; date: string; plan: string; cost: number;
          }> : [];
          const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
          history.unshift({
            id,
            date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
            plan: result.planName,
            cost: result.estimatedCost,
          });
          localStorage.setItem('diagnosisHistory', JSON.stringify(history.slice(0, 20)));
        } catch {
          // 履歴保存に失敗しても診断結果の表示は続行
        }
      } catch {
        setRecommendation(MOCK_RECOMMENDATION);
      }
    } else {
      setRecommendation(MOCK_RECOMMENDATION);
    }
  }, []);

  if (!recommendation) {
    return (
      <div className={styles['result']}>
        <div className={styles['result__inner']}>
          <div className={styles['result__loading']} role="status">
            <span className={styles['result__spinner']} />
            <p>診断結果を読み込んでいます…</p>
          </div>
        </div>
      </div>
    );
  }

  const planInfo = MOCK_PLANS.find((p) => p.type === recommendation.plan);

  return (
    <div className={styles['result']}>
      <div className={styles['result__inner']}>
        <SectionTitle title="診断結果" subtitle="Result" tag="h1" />

        <Card>
          <div className={styles['result__plan']}>
            <p className={styles['result__plan-label']}>
              あなたにおすすめのプラン
            </p>
            <h2 className={styles['result__plan-name']}>
              {recommendation.planName}
            </h2>
            {planInfo && (
              <p className={styles['result__plan-desc']}>
                {planInfo.description}
              </p>
            )}
            <p className={styles['result__plan-cost']}>
              参考価格：
              <span className={styles['result__plan-cost-value']}>
                {formatCurrency(recommendation.estimatedCost)}
              </span>
            </p>
          </div>
        </Card>

        <section className={styles['result__reasons']}>
          <h3 className={styles['result__reasons-title']}>おすすめの理由</h3>
          <ul className={styles['result__reasons-list']}>
            {recommendation.reasons.map((reason, i) => (
              <li key={i} className={styles['result__reasons-item']}>
                {reason}
              </li>
            ))}
          </ul>
        </section>

        {planInfo && (
          <section className={styles['result__features']}>
            <h3 className={styles['result__features-title']}>
              プランに含まれる機能
            </h3>
            <div className={styles['result__features-grid']}>
              {planInfo.features.map((feature, i) => (
                <div
                  key={i}
                  className={`${styles['result__feature']} ${
                    feature.included
                      ? styles['result__feature--included']
                      : styles['result__feature--excluded']
                  }`}
                >
                  <span className={styles['result__feature-icon']}>
                    {feature.included ? '✓' : '−'}
                  </span>
                  {feature.label}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={styles['result__actions']}>
          <Button variant="primary" href="/estimate">
            詳細な見積もりを見る
          </Button>
          <Button variant="outline" href="/compare">
            他のプランと比較する
          </Button>
          <Button variant="secondary" href="/diagnosis">
            もう一度診断する
          </Button>
        </div>

        <div className={styles['result__print']}>
          <button
            type="button"
            className={styles['result__print-btn']}
            onClick={() => window.print()}
          >
            📄 PDFで保存する
          </button>
        </div>
      </div>
    </div>
  );
}
