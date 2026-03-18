/** 診断カテゴリ */
export interface DiagnosisCategory {
  id: string;
  label: string;
  description: string;
}

/** 診断の質問 */
export interface DiagnosisQuestion {
  id: string;
  categoryId: string;
  text: string;
  options: DiagnosisOption[];
}

/** 診断の選択肢 */
export interface DiagnosisOption {
  id: string;
  label: string;
  value: number;
}

/** 診断結果 */
export interface DiagnosisResult {
  categoryId: string;
  score: number;
  recommendation: string;
}

/** 診断セッション */
export interface DiagnosisSession {
  id: string;
  answers: Record<string, string>;
  results: DiagnosisResult[];
  completedAt?: string;
}

/** プラン種別 */
export type PlanType = 'starter' | 'standard' | 'premium';

/** 診断回答 */
export interface DiagnosisAnswers {
  siteType: string;
  pageCount: string;
  designCreation: string;
  cms: string;
  contactForm: string;
  multilingual: string;
  animation: string;
}

/** 診断回答のキー */
export type DiagnosisAnswerKey = keyof DiagnosisAnswers;

/** 価格オプションのキー（siteType 以外） */
export type OptionKey = Exclude<DiagnosisAnswerKey, 'siteType'>;

/** 診断ステップ定義 */
export interface DiagnosisStep {
  id: DiagnosisAnswerKey;
  question: string;
  options: { value: string; label: string }[];
}

/** プラン推薦結果 */
export interface PlanRecommendation {
  plan: PlanType;
  planName: string;
  reasons: string[];
  estimatedCost: number;
}

/** プラン情報（比較用） */
export interface PlanInfo {
  type: PlanType;
  name: string;
  basePrice: number;
  description: string;
  features: { label: string; included: boolean }[];
}

/** 見積もり内訳 */
export interface EstimateBreakdown {
  plan: PlanType;
  planName: string;
  basePrice: number;
  options: { label: string; price: number }[];
  totalPrice: number;
}
