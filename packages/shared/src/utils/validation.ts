/** メールアドレスの簡易バリデーション */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** 電話番号の簡易バリデーション（日本形式） */
export function isValidPhone(phone: string): boolean {
  return /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/.test(phone);
}

/** 必須フィールドチェック */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}
