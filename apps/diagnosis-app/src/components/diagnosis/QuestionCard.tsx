import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  /** 質問文 */
  question: string;
  /** 選択肢の配列 */
  options: { value: string; label: string }[];
  /** 現在選択中の値 */
  selectedValue: string;
  /** 選択肢クリック時のコールバック */
  onSelect: (value: string) => void;
}

/**
 * 診断フローの 1 ステップ分の質問カード。
 * 質問文と選択肢ボタン群を描画し、選択状態を触覚的にフィードバックする。
 *
 * @example
 * ```tsx
 * <QuestionCard
 *   question="どのようなサイトを制作しますか？"
 *   options={[{ value: 'corporate', label: 'コーポレートサイト' }]}
 *   selectedValue="corporate"
 *   onSelect={(v) => setAnswer(v)}
 * />
 * ```
 */
export function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className={styles['question-card']}>
      <h2 className={styles['question-card__title']}>{question}</h2>
      <div className={styles['question-card__options']}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`${styles['question-card__option']} ${
              selectedValue === option.value
                ? styles['question-card__option--selected']
                : ''
            }`}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
