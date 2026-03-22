/** メールアドレスの最大長（RFC 5321） */
const EMAIL_MAX_LENGTH = 254;

/**
 * メールアドレスのバリデーションパターン
 * HTML5 仕様準拠 + TLD 2文字以上を要求
 */
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/** 携帯電話の市外局番プレフィックス（050/070/080/090） */
const MOBILE_PREFIX_PATTERN = /^0[5789]0/;

/** 電話番号から除去する書式文字（ハイフン・括弧・スペース） */
const PHONE_FORMAT_CHARS = /[\s\-()（）]/g;

/** 固定電話の桁数 */
const LANDLINE_DIGITS = 10;

/** 携帯電話の桁数 */
const MOBILE_DIGITS = 11;

/**
 * メールアドレスのバリデーション
 * HTML5 仕様 + TLD 2文字以上を要求するパターン
 */
export function isValidEmail(email: string): boolean {
  if (email.length > EMAIL_MAX_LENGTH) return false;
  return EMAIL_PATTERN.test(email);
}

/**
 * 電話番号のバリデーション（日本形式）
 * 固定電話（10桁）・携帯電話（11桁）に対応
 * ハイフン・括弧・スペースは除去して判定
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(PHONE_FORMAT_CHARS, '');
  if (!/^0\d{9,10}$/.test(digits)) return false;
  if (MOBILE_PREFIX_PATTERN.test(digits)) return digits.length === MOBILE_DIGITS;
  return digits.length === LANDLINE_DIGITS;
}

/** 必須フィールドチェック */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}
