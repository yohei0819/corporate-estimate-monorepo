'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIAGNOSIS_STEPS } from '@corporate-estimate/shared';
import type { DiagnosisAnswers } from '@corporate-estimate/shared';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from '@/components/diagnosis/StepIndicator';
import { QuestionCard } from '@/components/diagnosis/QuestionCard';
import { STORAGE_KEYS } from '@/lib/storage';
import styles from './page.module.scss';

/** DiagnosisAnswers の全キーを空文字で初期化 */
function createInitialAnswers(): DiagnosisAnswers {
  const entries: Record<string, string> = {};
  for (const step of DIAGNOSIS_STEPS) {
    entries[step.id] = '';
  }
  return entries as unknown as DiagnosisAnswers;
}

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosisAnswers>(createInitialAnswers);

  const step = DIAGNOSIS_STEPS[currentStep];
  const totalSteps = DIAGNOSIS_STEPS.length;
  const currentAnswer = answers[step.id];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem(STORAGE_KEYS.diagnosisAnswers, JSON.stringify(answers));
      router.push('/result');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={styles['diagnosis']}>
      <div className={styles['diagnosis__inner']}>
        <SectionTitle title="Web制作プラン診断" subtitle="Diagnosis" tag="h1" />
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <QuestionCard
          question={step.question}
          options={step.options}
          selectedValue={currentAnswer}
          onSelect={handleSelect}
        />
        <div className={styles['diagnosis__actions']}>
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrev}>
              前へ
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!currentAnswer}
          >
            {currentStep < totalSteps - 1 ? '次へ' : '結果を見る'}
          </Button>
        </div>
      </div>
    </div>
  );
}
