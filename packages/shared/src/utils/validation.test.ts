import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone, isNotEmpty } from './validation';

describe('isValidEmail()', () => {
  it.each([
    ['user@example.com'],
    ['test.user@domain.co.jp'],
    ['name+tag@sub.domain.com'],
    ['user123@test-domain.org'],
  ])('"%s" → 有効', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    ['', '空文字'],
    ['not-an-email', '@なし'],
    ['@domain.com', 'ローカル部なし'],
    ['user@', 'ドメインなし'],
    ['user@domain', 'TLDなし'],
    ['user @domain.com', 'スペース含む'],
    ['user@.com', 'ドメインがドットから開始'],
    ['user@domain.c', 'TLD 1文字'],
    ['a'.repeat(255) + '@example.com', '255文字超'],
  ])('"%s" → 無効（%s）', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});

describe('isValidPhone()', () => {
  it.each([
    ['03-1234-5678', '固定（ハイフン付き）'],
    ['0312345678', '固定（ハイフンなし）'],
    ['090-1234-5678', '携帯090'],
    ['080-1234-5678', '携帯080'],
    ['(03)1234-5678', '固定（括弧付き）'],
    ['050-1234-5678', 'IP電話050'],
  ])('"%s" → 有効（%s）', (phone) => {
    expect(isValidPhone(phone)).toBe(true);
  });

  it.each([
    ['', '空文字'],
    ['1234567890', '0で始まらない'],
    ['abc', '数字でない'],
    ['090-1234-567', '携帯10桁（不足）'],
    ['03-1234-56789', '固定11桁（超過）'],
  ])('"%s" → 無効（%s）', (phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });
});

describe('isNotEmpty()', () => {
  it.each([
    ['hello'],
    [' a '],
  ])('"%s" → 空でない', (value) => {
    expect(isNotEmpty(value)).toBe(true);
  });

  it.each([
    ['', '空文字'],
    ['   ', 'スペースのみ'],
  ])('"%s" → 空（%s）', (value) => {
    expect(isNotEmpty(value)).toBe(false);
  });
});
