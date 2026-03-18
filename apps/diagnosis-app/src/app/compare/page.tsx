import { MOCK_PLANS, formatCurrency } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import styles from './page.module.scss';

export default function ComparePage() {
  return (
    <div className={styles['compare']}>
      <div className={styles['compare__inner']}>
        <SectionTitle title="プラン比較" subtitle="Compare" tag="h1" />

        <div className={styles['compare__table-wrapper']}>
          <table className={styles['compare__table']}>
            <thead>
              <tr>
                <th className={styles['compare__th']}>機能</th>
                {MOCK_PLANS.map((plan) => (
                  <th key={plan.type} className={styles['compare__th']}>
                    <span className={styles['compare__plan-name']}>
                      {plan.name}
                    </span>
                    <span className={styles['compare__plan-price']}>
                      {formatCurrency(plan.basePrice)}〜
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles['compare__td']}>概要</td>
                {MOCK_PLANS.map((plan) => (
                  <td key={plan.type} className={styles['compare__td']}>
                    {plan.description}
                  </td>
                ))}
              </tr>
              {MOCK_PLANS[0].features.map((feature, featureIdx) => (
                <tr key={featureIdx}>
                  <td className={styles['compare__td']}>
                    {feature.label}
                  </td>
                  {MOCK_PLANS.map((plan) => {
                    const included = plan.features[featureIdx]?.included ?? false;
                    return (
                      <td
                        key={plan.type}
                        className={`${styles['compare__td']} ${
                          included
                            ? styles['compare__td--included']
                            : styles['compare__td--excluded']
                        }`}
                      >
                        {included ? '○' : '×'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles['compare__actions']}>
          <Button variant="primary" href="/diagnosis">
            診断を始める
          </Button>
          <Button variant="outline" href="/estimate">
            見積もりを作成
          </Button>
        </div>
      </div>
    </div>
  );
}
