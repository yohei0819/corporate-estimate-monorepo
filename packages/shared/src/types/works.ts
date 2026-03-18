/** 実績カテゴリ */
export type WorkCategory = 'it' | 'security' | 'cost' | 'consulting';

/** 実績項目 */
export interface WorkItem {
  id: string;
  title: string;
  description: string;
  category: WorkCategory;
  clientName: string;
  industry: string;
  period: string;
  thumbnail?: string;
}
