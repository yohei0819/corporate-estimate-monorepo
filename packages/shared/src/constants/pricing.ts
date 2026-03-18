import type { PlanType, OptionKey } from '../types/diagnosis';

/** プラン名称 */
export const PLAN_NAMES: Record<PlanType, string> = {
  starter: 'スターター',
  standard: 'スタンダード',
  premium: 'プレミアム',
};

/** プラン基本価格 */
export const BASE_PRICES: Record<PlanType, number> = {
  starter: 300000,
  standard: 600000,
  premium: 1200000,
};

/** プラン判定スコアしきい値 */
export const SCORE_THRESHOLDS = {
  /** このスコア以下なら starter */
  starterMax: 4,
  /** このスコア以下なら standard（超えたら premium） */
  standardMax: 10,
} as const;

/** オプション追加料金 */
export const OPTION_SURCHARGES: Record<OptionKey, Record<string, number>> = {
  pageCount: { '1-5': 0, '6-10': 50000, '11-20': 150000, '21+': 300000 },
  designCreation: { template: 0, original: 100000, 'bring-own': 0 },
  cms: { none: 0, wordpress: 100000, headless: 200000 },
  contactForm: { none: 0, basic: 30000, advanced: 80000 },
  multilingual: { none: 0, bilingual: 100000, multi: 200000 },
  animation: { none: 0, basic: 50000, advanced: 150000 },
};

/** オプションカテゴリ表示ラベル */
export const OPTION_LABELS: Record<OptionKey, string> = {
  pageCount: 'ページ数',
  designCreation: 'デザイン',
  cms: 'CMS',
  contactForm: 'お問い合わせフォーム',
  multilingual: '多言語対応',
  animation: 'アニメーション',
};

/** オプション選択肢の表示ラベル */
export const VALUE_LABELS: Record<OptionKey, Record<string, string>> = {
  pageCount: { '1-5': '1〜5ページ', '6-10': '6〜10ページ', '11-20': '11〜20ページ', '21+': '21ページ以上' },
  designCreation: { template: 'テンプレート', original: 'オリジナル', 'bring-own': '持ち込み' },
  cms: { none: '不要', wordpress: 'WordPress', headless: 'ヘッドレスCMS' },
  contactForm: { none: '不要', basic: '基本フォーム', advanced: '高機能フォーム' },
  multilingual: { none: '不要', bilingual: '2言語', multi: '3言語以上' },
  animation: { none: '不要', basic: '基本', advanced: '高度' },
};
