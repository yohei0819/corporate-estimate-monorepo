'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
import type { HistoryEntry } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/storage';
import { decodeAnswers, buildShareURL } from '@/lib/url-sharing';
import { useToast } from '@/components/ui/Toast';
import styles from './page.module.scss';

const MAX_HISTORY = 20;

function loadAnswers(): DiagnosisAnswers | null {
  const stored = localStorage.getItem(STORAGE_KEYS.diagnosisAnswers);
  if (!stored) return null;
  return JSON.parse(stored) as DiagnosisAnswers;
}

function saveToHistory(result: PlanRecommendation): void {
  try {
    const historyStr = localStorage.getItem(STORAGE_KEYS.diagnosisHistory);
    const history: HistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
    const id = typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    history.unshift({
      id,
      date: new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      plan: result.planName,
      cost: result.estimatedCost,
    });
    localStorage.setItem(STORAGE_KEYS.diagnosisHistory, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {
    // 履歴保存に失敗しても診断結果の表示は続行
  }
}

/** ローディング表示（Suspense fallback と初期状態で共用） */
function ResultLoading() {
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

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const [recommendation, setRecommendation] =
    useState<PlanRecommendation | null>(null);
  const [answers, setAnswers] = useState<DiagnosisAnswers | null>(null);

  useEffect(() => {
    try {
      // URLパラメータ優先、なければlocalStorage
      const urlData = searchParams.get('d');
      const decoded = urlData ? decodeAnswers(urlData) : null;
      const loaded = decoded ?? loadAnswers();

      if (loaded) {
        const result = diagnose(loaded);
        setRecommendation(result);
        setAnswers(loaded);
        // URLから読んだ場合は履歴保存スキップ
        if (!decoded) {
          saveToHistory(result);
        }
      } else {
        setRecommendation(MOCK_RECOMMENDATION);
      }
    } catch {
      setRecommendation(MOCK_RECOMMENDATION);
    }
  }, [searchParams]);

  const handleCopyURL = useCallback(async () => {
    if (!answers) return;
    try {
      const url = buildShareURL(answers);
      await navigator.clipboard.writeText(url);
      showToast('URLをクリップボードにコピーしました');
    } catch {
      showToast('URLのコピーに失敗しました', 'error');
    }
  }, [answers, showToast]);

  const handleDownloadPDF = useCallback(async () => {
    if (!contentRef.current) return;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf()
        .set({
          margin: [10, 10],
          filename: '診断結果.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(contentRef.current)
        .save();
    } catch {
      showToast('PDFの生成に失敗しました', 'error');
    }
  }, [showToast]);

  if (!recommendation) {
    return <ResultLoading />;
  }

  const planInfo = MOCK_PLANS.find((p) => p.type === recommendation.plan);

  return (
    <div className={styles['result']}>
      <div className={styles['result__inner']} ref={contentRef}>
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

        <div className={styles['result__sub-actions']}>
          <button
            type="button"
            className={styles['result__sub-actions-btn']}
            onClick={handleDownloadPDF}
          >
            📄 PDFで保存する
          </button>
          {answers && (
            <button
              type="button"
              className={styles['result__sub-actions-btn']}
              onClick={handleCopyURL}
            >
              🔗 結果URLをコピー
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
