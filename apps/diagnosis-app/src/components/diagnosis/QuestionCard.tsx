import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

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
