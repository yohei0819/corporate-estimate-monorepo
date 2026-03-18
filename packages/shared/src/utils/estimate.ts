import type { PlanType, OptionKey, EstimateBreakdown } from '../types/diagnosis';
import { PLAN_NAMES, BASE_PRICES, OPTION_SURCHARGES, OPTION_LABELS, VALUE_LABELS } from '../constants/pricing';

/**
 * プランと選択オプションから見積もり内訳を計算する純粋関数
 */
export function calculateEstimate(
  plan: PlanType,
  options: Record<string, string>,
): EstimateBreakdown {
  const basePrice = BASE_PRICES[plan];
  const breakdownOptions: { label: string; price: number }[] = [];

  for (const [key, value] of Object.entries(options)) {
    const optionKey = key as OptionKey;
    const price = OPTION_SURCHARGES[optionKey]?.[value] ?? 0;
    if (price !== 0) {
      const categoryLabel = OPTION_LABELS[optionKey] ?? key;
      const valueLabel = VALUE_LABELS[optionKey]?.[value] ?? value;
      breakdownOptions.push({
        label: `${categoryLabel}：${valueLabel}`,
        price,
      });
    }
  }

  const totalPrice =
    basePrice + breakdownOptions.reduce((sum, o) => sum + o.price, 0);

  return {
    plan,
    planName: PLAN_NAMES[plan],
    basePrice,
    options: breakdownOptions,
    totalPrice,
  };
}

/**
 * オプション単体の追加料金を取得するヘルパー
 */
export function getOptionSurcharge(key: string, value: string): number {
  return OPTION_SURCHARGES[key as OptionKey]?.[value] ?? 0;
}
