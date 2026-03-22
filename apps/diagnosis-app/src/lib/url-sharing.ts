import type { DiagnosisAnswers } from '@corporate-estimate/shared';

/** 回答データをBase64エンコードしてURLセーフな文字列に変換 */
export function encodeAnswers(answers: DiagnosisAnswers): string {
  return btoa(encodeURIComponent(JSON.stringify(answers)));
}

/** Base64エンコードされた文字列から回答データをデコード */
export function decodeAnswers(encoded: string): DiagnosisAnswers | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as DiagnosisAnswers;
  } catch {
    return null;
  }
}

/** 現在のページURLに回答データを埋め込んだ共有URLを生成 */
export function buildShareURL(answers: DiagnosisAnswers): string {
  const encoded = encodeAnswers(answers);
  return `${window.location.origin}${window.location.pathname}?d=${encoded}`;
}
