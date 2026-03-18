import type { EstimateItem } from '../types';

export * from './format';
export * from './validation';
export * from './diagnosis';
export * from './estimate';

/** 見積もりアイテムの小計を計算 */
export function calcSubtotal(item: EstimateItem): number {
  return item.unitPrice * item.quantity;
}

/** 見積もりアイテム配列の合計を計算 */
export function calcTotal(items: EstimateItem[]): number {
  return items.reduce((sum, item) => sum + calcSubtotal(item), 0);
}
