/** FAQカテゴリ */
export type FaqCategory = 'general' | 'service' | 'pricing' | 'support';

/** FAQ項目 */
export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}
