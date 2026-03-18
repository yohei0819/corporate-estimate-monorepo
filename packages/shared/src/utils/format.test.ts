import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatPercent } from './format';

describe('formatCurrency()', () => {
  it('金額をカンマ区切りで ¥ 付きフォーマットする', () => {
    expect(formatCurrency(300000)).toBe('¥300,000');
    expect(formatCurrency(1200000)).toBe('¥1,200,000');
  });

  it('0 円をフォーマットする', () => {
    expect(formatCurrency(0)).toBe('¥0');
  });

  it('小さい金額をフォーマットする', () => {
    expect(formatCurrency(999)).toBe('¥999');
  });
});

describe('formatDate()', () => {
  it('ISO 8601 文字列を日本語フォーマットに変換する', () => {
    const result = formatDate('2026-03-18');
    expect(result).toContain('2026');
    expect(result).toContain('3');
    expect(result).toContain('18');
  });

  it('無効な日付文字列はそのまま返す', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('formatPercent()', () => {
  it('パーセンテージをフォーマットする', () => {
    expect(formatPercent(50)).toBe('50%');
    expect(formatPercent(99.5, 1)).toBe('99.5%');
  });

  it('0% をフォーマットする', () => {
    expect(formatPercent(0)).toBe('0%');
  });

  it('小数点以下の桁数を指定できる', () => {
    expect(formatPercent(33.333, 2)).toBe('33.33%');
  });
});
