import styles from './StepIndicator.module.scss';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

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
