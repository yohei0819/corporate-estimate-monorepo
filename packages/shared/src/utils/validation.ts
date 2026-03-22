/** メールアドレスの簡易バリデーション */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** 電話番号の簡易バリデーション（日本形式：10〜11桁） */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/-/g, '');
  return /^0\d{9,10}$/.test(digits);
}

/** 必須フィールドチェック */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}
