export * from './diagnosis';
export * from './company';
export * from './works';
export * from './faq';

/** 見積もりアイテムの型定義 */
export interface EstimateItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

/** 見積もり全体の型定義 */
export interface Estimate {
  id: string;
  items: EstimateItem[];
  createdAt: string;
}
