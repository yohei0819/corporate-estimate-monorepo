import styles from './StepIndicator.module.scss';

interface StepIndicatorProps {
  /** 現在のステップ (0-indexed) */
  currentStep: number;
  /** ステップの総数 */
  totalSteps: number;
}

/**
 * 診断フローの進捗バー。現在のステップをプログレスバーとラベルで表示する。
 *
 * @example
 * ```tsx
 * <StepIndicator currentStep={2} totalSteps={7} />
 * ```
 */
export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className={styles['step-indicator']}>
      <div className={styles['step-indicator__bar']}>
        <div
          className={styles['step-indicator__progress']}
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      <p className={styles['step-indicator__label']}>
        ステップ {currentStep + 1} / {totalSteps}
      </p>
    </div>
  );
}
