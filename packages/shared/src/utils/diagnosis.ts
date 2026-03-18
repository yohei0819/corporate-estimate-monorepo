import type { DiagnosisAnswers, DiagnosisAnswerKey, OptionKey, PlanRecommendation, PlanType } from '../types/diagnosis';
import { PLAN_NAMES, BASE_PRICES, OPTION_SURCHARGES, SCORE_THRESHOLDS } from '../constants/pricing';

/** 各回答のスコアマッピング */
const SCORE_MAP: Record<DiagnosisAnswerKey, Record<string, number>> = {
  siteType: { corporate: 1, lp: 0, ec: 2, media: 2, portal: 3 },
  pageCount: { '1-5': 0, '6-10': 1, '11-20': 2, '21+': 3 },
  designCreation: { template: 0, 'bring-own': 1, original: 2 },
  cms: { none: 0, wordpress: 1, headless: 3 },
  contactForm: { none: 0, basic: 1, advanced: 2 },
  multilingual: { none: 0, bilingual: 2, multi: 3 },
  animation: { none: 0, basic: 1, advanced: 3 },
};

/** スコア合計からプランを決定 */
function scoreToPlan(totalScore: number): PlanType {
  if (totalScore <= SCORE_THRESHOLDS.starterMax) return 'starter';
  if (totalScore <= SCORE_THRESHOLDS.standardMax) return 'standard';
  return 'premium';
}

/** 推薦理由の条件マッピング */
interface ReasonRule {
  condition: (answers: DiagnosisAnswers) => boolean;
  reason: string;
}

const REASON_RULES: ReasonRule[] = [
  // サイト種類
  {
    condition: (a) => a.siteType === 'ec' || a.siteType === 'portal',
    reason: 'ECサイト・ポータルサイトには高機能なプランが適しています。',
  },
  {
    condition: (a) => a.siteType === 'lp',
    reason: 'ランディングページはシンプルな構成で十分対応可能です。',
  },
  // ページ数
  {
    condition: (a) => a.pageCount === '21+',
    reason: '21ページ以上の大規模サイトのため、ページ数無制限のプランを推奨します。',
  },
  {
    condition: (a) => a.pageCount === '11-20',
    reason: '11〜20ページの中規模サイトに対応したプランです。',
  },
  {
    condition: (a) => a.pageCount === '1-5',
    reason: '5ページ以内のコンパクトなサイト構成に最適です。',
  },
  // CMS
  {
    condition: (a) => a.cms === 'headless',
    reason: 'ヘッドレスCMSの導入にはプレミアムプランが最適です。',
  },
  {
    condition: (a) => a.cms === 'wordpress',
    reason: 'WordPress CMSの導入が含まれるスタンダード以上のプランを推奨します。',
  },
  // 多言語
  {
    condition: (a) => a.multilingual !== 'none',
    reason: '多言語対応が含まれるプランをご提案します。',
  },
  // アニメーション
  {
    condition: (a) => a.animation === 'advanced',
    reason: '高度なアニメーション実装にはプレミアムプランが適しています。',
  },
  // フォーム
  {
    condition: (a) => a.contactForm === 'advanced',
    reason: '高機能フォーム（確認画面・自動返信）の実装が含まれます。',
  },
];

/** 回答から推薦理由を生成 */
function buildReasons(answers: DiagnosisAnswers, plan: PlanType): string[] {
  const reasons = REASON_RULES
    .filter((rule) => rule.condition(answers))
    .map((rule) => rule.reason);

  if (reasons.length === 0) {
    reasons.push(`${PLAN_NAMES[plan]}プランはお客様のご要件に最もバランスの取れたプランです。`);
  }

  return reasons;
}

/** 見積もりコストを算出 */
function estimateCost(answers: DiagnosisAnswers, plan: PlanType): number {
  let cost = BASE_PRICES[plan];
  for (const [key, value] of Object.entries(answers)) {
    if (key === 'siteType') continue;
    const optionKey = key as OptionKey;
    cost += OPTION_SURCHARGES[optionKey]?.[value] ?? 0;
  }
  return cost;
}

/**
 * 診断回答からプラン推薦を行う純粋関数
 */
export function diagnose(answers: DiagnosisAnswers): PlanRecommendation {
  let totalScore = 0;
  for (const [key, value] of Object.entries(answers)) {
    totalScore += SCORE_MAP[key as DiagnosisAnswerKey]?.[value] ?? 0;
  }

  const plan = scoreToPlan(totalScore);
  const planName = PLAN_NAMES[plan];
  const reasons = buildReasons(answers, plan);
  const estimatedCost = estimateCost(answers, plan);

  return { plan, planName, reasons, estimatedCost };
}
