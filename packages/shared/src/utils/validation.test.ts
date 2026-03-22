import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone, isNotEmpty } from './validation';

describe('isValidEmail()', () => {
  it('正しいメールアドレスを受け入れる', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('test.user@domain.co.jp')).toBe(true);
    expect(isValidEmail('name+tag@sub.domain.com')).toBe(true);
    expect(isValidEmail('user123@test-domain.org')).toBe(true);
  });

  it('不正なメールアドレスを拒否する', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
    expect(isValidEmail('user @domain.com')).toBe(false);
    expect(isValidEmail('user@.com')).toBe(false);
    expect(isValidEmail('user@domain.c')).toBe(false);
    expect(isValidEmail('a'.repeat(255) + '@example.com')).toBe(false);
  });
});

describe('isValidPhone()', () => {
  it('日本の電話番号を受け入れる', () => {
    expect(isValidPhone('03-1234-5678')).toBe(true);
    expect(isValidPhone('0312345678')).toBe(true);
    expect(isValidPhone('090-1234-5678')).toBe(true);
    expect(isValidPhone('080-1234-5678')).toBe(true);
    expect(isValidPhone('(03)1234-5678')).toBe(true);
    expect(isValidPhone('050-1234-5678')).toBe(true);
  });

  it('不正な電話番号を拒否する', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('1234567890')).toBe(false);
    expect(isValidPhone('abc')).toBe(false);
    expect(isValidPhone('090-1234-567')).toBe(false);  // 携帯10桁=不正
    expect(isValidPhone('03-1234-56789')).toBe(false);  // 固定11桁=不正
  });
});

describe('isNotEmpty()', () => {
  it('空でない文字列を受け入れる', () => {
    expect(isNotEmpty('hello')).toBe(true);
    expect(isNotEmpty(' a ')).toBe(true);
  });

  it('空文字列やスペースのみを拒否する', () => {
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty('   ')).toBe(false);
  });
});
