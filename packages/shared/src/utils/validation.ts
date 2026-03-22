/**
 * メールアドレスのバリデーション
 * HTML5 仕様 + TLD 2文字以上を要求するパターン
 */
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * 電話番号のバリデーション（日本形式）
 * 固定電話（10桁）・携帯電話（11桁）に対応
 * ハイフン・括弧・スペースは除去して判定
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[\s\-()（）]/g, '');
  if (!/^0\d{9,10}$/.test(digits)) return false;
  // 携帯は 070/080/090/050 で始まる11桁
  if (/^0[5789]0/.test(digits)) return digits.length === 11;
  // 固定電話は10桁
  return digits.length === 10;
}

/** 必須フィールドチェック */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}
