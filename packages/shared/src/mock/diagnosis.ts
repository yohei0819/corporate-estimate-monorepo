import type { DiagnosisStep, PlanInfo, PlanRecommendation } from '../types/diagnosis';
import { BASE_PRICES, PLAN_NAMES } from '../constants/pricing';

/** 診断ステップ */
export const DIAGNOSIS_STEPS: DiagnosisStep[] = [
  {
    id: 'siteType',
    question: 'どのようなサイトを制作しますか？',
    options: [
      { value: 'corporate', label: 'コーポレートサイト' },
      { value: 'ec', label: 'ECサイト' },
      { value: 'lp', label: 'ランディングページ' },
      { value: 'media', label: 'メディアサイト' },
      { value: 'portal', label: 'ポータルサイト' },
    ],
  },
  {
    id: 'pageCount',
    question: 'ページ数はどのくらいですか？',
    options: [
      { value: '1-5', label: '1〜5ページ' },
      { value: '6-10', label: '6〜10ページ' },
      { value: '11-20', label: '11〜20ページ' },
      { value: '21+', label: '21ページ以上' },
    ],
  },
  {
    id: 'designCreation',
    question: 'デザインはどうしますか？',
    options: [
      { value: 'template', label: 'テンプレートを使用' },
      { value: 'original', label: 'オリジナルデザイン' },
      { value: 'bring-own', label: 'デザインデータ持ち込み' },
    ],
  },
  {
    id: 'cms',
    question: 'CMSは必要ですか？',
    options: [
      { value: 'none', label: '不要' },
      { value: 'wordpress', label: 'WordPress' },
      { value: 'headless', label: 'ヘッドレスCMS' },
    ],
  },
  {
    id: 'contactForm',
    question: 'お問い合わせフォームは必要ですか？',
    options: [
      { value: 'none', label: '不要' },
      { value: 'basic', label: '基本的なフォーム' },
      { value: 'advanced', label: '高機能フォーム（確認画面・自動返信等）' },
    ],
  },
  {
    id: 'multilingual',
    question: '多言語対応は必要ですか？',
    options: [
      { value: 'none', label: '不要（日本語のみ）' },
      { value: 'bilingual', label: '2言語対応' },
      { value: 'multi', label: '3言語以上' },
    ],
  },
  {
    id: 'animation',
    question: 'アニメーションは必要ですか？',
    options: [
      { value: 'none', label: '不要' },
      { value: 'basic', label: '基本的なアニメーション' },
      { value: 'advanced', label: '高度なアニメーション（動画・パララックス等）' },
    ],
  },
];

/** プラン一覧 */
export const MOCK_PLANS: PlanInfo[] = [
  {
    type: 'starter',
    name: PLAN_NAMES.starter,
    basePrice: BASE_PRICES.starter,
    description: '小規模なサイトに最適なシンプルプラン',
    features: [
      { label: '5ページまで', included: true },
      { label: 'レスポンシブ対応', included: true },
      { label: '基本SEO対策', included: true },
      { label: 'テンプレートデザイン', included: true },
      { label: 'CMS導入', included: false },
      { label: 'お問い合わせフォーム', included: false },
      { label: '多言語対応', included: false },
      { label: 'アニメーション', included: false },
    ],
  },
  {
    type: 'standard',
    name: PLAN_NAMES.standard,
    basePrice: BASE_PRICES.standard,
    description: 'ビジネスに必要な機能を網羅した標準プラン',
    features: [
      { label: '15ページまで', included: true },
      { label: 'レスポンシブ対応', included: true },
      { label: '基本SEO対策', included: true },
      { label: 'オリジナルデザイン', included: true },
      { label: 'WordPress CMS', included: true },
      { label: 'お問い合わせフォーム', included: true },
      { label: '多言語対応', included: false },
      { label: '高度なアニメーション', included: false },
    ],
  },
  {
    type: 'premium',
    name: PLAN_NAMES.premium,
    basePrice: BASE_PRICES.premium,
    description: 'すべての機能を備えたフルカスタムプラン',
    features: [
      { label: 'ページ数無制限', included: true },
      { label: 'レスポンシブ対応', included: true },
      { label: '高度なSEO対策', included: true },
      { label: 'オリジナルデザイン', included: true },
      { label: 'ヘッドレスCMS', included: true },
      { label: '高機能フォーム', included: true },
      { label: '多言語対応', included: true },
      { label: '高度なアニメーション', included: true },
    ],
  },
];

/** モック推薦結果 */
export const MOCK_RECOMMENDATION: PlanRecommendation = {
  plan: 'standard',
  planName: PLAN_NAMES.standard,
  reasons: [
    'CMSの導入をご希望のため、WordPress対応のスタンダードプラン以上が適しています。',
    'お問い合わせフォームの設置が含まれます。',
    'ページ数が10ページ以内のサイト規模に最適です。',
  ],
  estimatedCost: 750000,
};
