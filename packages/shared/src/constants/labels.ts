import type { WorkCategory } from '../types/works';
import type { FaqCategory } from '../types/faq';

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
  it: 'IT導入',
  security: 'セキュリティ',
  cost: 'コスト最適化',
  consulting: 'コンサルティング',
};

export const FAQ_CATEGORY_LABELS: Record<FaqCategory, string> = {
  general: '一般的なご質問',
  service: 'サービスについて',
  pricing: '料金・お見積もりについて',
  support: 'サポートについて',
};

export const FAQ_CATEGORY_ORDER: FaqCategory[] = ['general', 'service', 'pricing', 'support'];
