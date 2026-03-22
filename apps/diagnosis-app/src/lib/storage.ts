/** localStorage に保存される診断履歴のエントリ */
export interface HistoryEntry {
  id: string;
  date: string;
  plan: string;
  cost: number;
}

/** localStorage キー定数 */
export const STORAGE_KEYS = {
  auth: 'auth',
  diagnosisAnswers: 'diagnosisAnswers',
  diagnosisHistory: 'diagnosisHistory',
} as const;

/** ログインユーザー情報の型 */
export interface AuthUser {
  email: string;
  name: string;
  company: string;
}
