'use client';

import { useState, useMemo } from 'react';
import {
  DIAGNOSIS_STEPS,
  MOCK_PLANS,
  formatCurrency,
  calculateEstimate,
  getOptionSurcharge,
  OPTION_LABELS,
} from '@corporate-estimate/shared';
import type { PlanType, OptionKey } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import styles from './page.module.scss';

export default function EstimatePage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');

  /** DIAGNOSIS_STEPS から各オプションの初期値（先頭の選択肢）を自動生成 */
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      DIAGNOSIS_STEPS.filter((s) => s.id !== 'siteType').map((step) => [
        step.id,
        step.options[0].value,
      ]),
    ),
  );

  const estimate = useMemo(
    () => calculateEstimate(selectedPlan, options),
    [selectedPlan, options],
  );

  const handleOptionChange = (key: string, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const optionSteps = DIAGNOSIS_STEPS.filter(
    (s): s is typeof s & { id: OptionKey } => s.id !== 'siteType',
  );

  return (
    <div className={styles['estimate']}>
      <div className={styles['estimate__inner']}>
        <SectionTitle title="お見積もり" subtitle="Estimate" tag="h1" />

        <div className={styles['estimate__layout']}>
          <div className={styles['estimate__options']}>
            <div className={styles['estimate__section']}>
              <h3 className={styles['estimate__section-title']}>プラン選択</h3>
              <div className={styles['estimate__plan-list']}>
                {MOCK_PLANS.map((plan) => (
                  <button
                    key={plan.type}
                    type="button"
                    className={`${styles['estimate__plan-card']} ${
                      selectedPlan === plan.type
                        ? styles['estimate__plan-card--selected']
                        : ''
                    }`}
                    onClick={() => setSelectedPlan(plan.type)}
                  >
                    <span className={styles['estimate__plan-name']}>
                      {plan.name}
                    </span>
                    <span className={styles['estimate__plan-price']}>
                      {formatCurrency(plan.basePrice)}〜
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {optionSteps.map((step) => (
              <div key={step.id} className={styles['estimate__section']}>
                <h3 className={styles['estimate__section-title']}>
                  {OPTION_LABELS[step.id]}
                </h3>
                <div className={styles['estimate__option-list']}>
                  {step.options.map((option) => (
                    <label
                      key={option.value}
                      className={styles['estimate__option-label']}
                    >
                      <input
                        type="radio"
                        name={step.id}
                        value={option.value}
                        checked={options[step.id] === option.value}
                        onChange={() =>
                          handleOptionChange(step.id, option.value)
                        }
                        className={styles['estimate__option-radio']}
                      />
                      <span className={styles['estimate__option-text']}>
                        {option.label}
                        {getOptionSurcharge(step.id, option.value) ? (
                          <span className={styles['estimate__option-surcharge']}>
                            +{formatCurrency(getOptionSurcharge(step.id, option.value))}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className={styles['estimate__sidebar']}>
            <div className={styles['estimate__summary']}>
              <h3 className={styles['estimate__summary-title']}>
                お見積もり金額
              </h3>
              <div className={styles['estimate__summary-plan']}>
                <span>基本料金（{estimate.planName}）</span>
                <span>{formatCurrency(estimate.basePrice)}</span>
              </div>
              {estimate.options.map((item) => (
                <div key={item.label} className={styles['estimate__summary-item']}>
                  <span>{item.label}</span>
                  <span>+{formatCurrency(item.price)}</span>
                </div>
              ))}
              <div className={styles['estimate__summary-total']}>
                <span>合計（税抜）</span>
                <span className={styles['estimate__summary-total-price']}>
                  {formatCurrency(estimate.totalPrice)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
