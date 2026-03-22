import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Web制作プラン診断 | Corporate Estimate',
  description: '簡単な質問に答えるだけで、最適なWeb制作プランを無料で診断。予算・目的に合ったプランをご提案します。',
};

export default function Home() {
  return (
    <div className={styles['page-index']}>
      <section className={styles['page-index__hero']}>
        <div className={styles['page-index__hero-inner']}>
          <SectionTitle
            title="法人向け見積もり診断"
            subtitle="Diagnosis"
            tag="h1"
          />
          <p className={styles['page-index__hero-lead']}>
            簡単な質問に答えるだけで、最適なプランをご提案します。
          </p>
          <Button variant="primary" size="lg" href="/diagnosis">
            診断を始める
          </Button>
        </div>
      </section>

      <section className={styles['page-index__features']}>
        <div className={styles['page-index__features-inner']}>
          <SectionTitle title="特徴" subtitle="Features" />
          <div className={styles['page-index__features-grid']}>
            <Card hoverable>
              <h3 className={styles['page-index__feature-title']}>簡単診断</h3>
              <p className={styles['page-index__feature-desc']}>
                数分で完了する簡単な診断で最適解を導きます。
              </p>
            </Card>
            <Card hoverable>
              <h3 className={styles['page-index__feature-title']}>即時結果</h3>
              <p className={styles['page-index__feature-desc']}>
                診断後すぐに結果と提案を確認できます。
              </p>
            </Card>
            <Card hoverable>
              <h3 className={styles['page-index__feature-title']}>無料</h3>
              <p className={styles['page-index__feature-desc']}>
                すべての診断機能を無料でご利用いただけます。
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
