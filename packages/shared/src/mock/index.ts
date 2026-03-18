import type { CompanyInfo, ServiceItem, CtaInfo } from '../types/company';
import type { EstimateItem } from '../types';
import type { DiagnosisCategory, DiagnosisQuestion } from '../types/diagnosis';

export * from './works';
export * from './faq';
export * from './about';
export * from './services';
export * from './diagnosis';

/** 会社情報モック */
export const MOCK_COMPANY_INFO: CompanyInfo = {
  name: 'Corporate Estimate Inc.',
  description: '法人向け見積もりサービスを提供する企業です。',
  address: '〒100-0001 東京都千代田区千代田1-1-1',
  phone: '03-1234-5678',
  email: 'info@corporate-estimate.example.com',
};

/** サービスモック */
export const MOCK_SERVICES: ServiceItem[] = [
  { id: 'svc-1', title: 'IT導入診断', description: 'IT導入の最適プランを診断します。' },
  { id: 'svc-2', title: 'コスト最適化', description: 'コスト削減の提案を行います。' },
  { id: 'svc-3', title: 'セキュリティ監査', description: 'セキュリティの現状を監査します。' },
];

/** CTA モック */
export const MOCK_CTA: CtaInfo = {
  title: '無料診断を始めましょう',
  description: '簡単な質問に答えるだけで、最適なプランをご提案します。',
  buttonLabel: '無料で診断する',
  href: '/diagnosis',
};

/** 見積もりアイテムモック */
export const MOCK_ESTIMATE_ITEMS: EstimateItem[] = [
  { id: 'item-1', name: '基本プラン', unitPrice: 50000, quantity: 1 },
  { id: 'item-2', name: 'オプションA', unitPrice: 10000, quantity: 2 },
  { id: 'item-3', name: 'オプションB', unitPrice: 8000, quantity: 3 },
];

/** 診断カテゴリモック */
export const MOCK_DIAGNOSIS_CATEGORIES: DiagnosisCategory[] = [
  { id: 'cat-1', label: 'IT環境', description: '現在のIT環境について' },
  { id: 'cat-2', label: '予算', description: '予算の規模について' },
  { id: 'cat-3', label: '規模', description: '企業規模について' },
];

/** 診断質問モック */
export const MOCK_DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: 'q-1',
    categoryId: 'cat-1',
    text: '現在のIT環境の満足度は？',
    options: [
      { id: 'q1-a', label: '満足', value: 3 },
      { id: 'q1-b', label: '普通', value: 2 },
      { id: 'q1-c', label: '不満', value: 1 },
    ],
  },
];
