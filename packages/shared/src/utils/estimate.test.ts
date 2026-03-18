import { describe, it, expect } from 'vitest';
import { calculateEstimate, getOptionSurcharge } from './estimate';

describe('calculateEstimate()', () => {
  it('オプション無しで基本価格のみを返す', () => {
    const result = calculateEstimate('starter', {});
    expect(result.plan).toBe('starter');
    expect(result.planName).toBe('スターター');
    expect(result.basePrice).toBe(300000);
    expect(result.options).toEqual([]);
    expect(result.totalPrice).toBe(300000);
  });

  it('standard プランの基本価格が正しい', () => {
    const result = calculateEstimate('standard', {});
    expect(result.basePrice).toBe(600000);
    expect(result.totalPrice).toBe(600000);
  });

  it('premium プランの基本価格が正しい', () => {
    const result = calculateEstimate('premium', {});
    expect(result.basePrice).toBe(1200000);
    expect(result.totalPrice).toBe(1200000);
  });

  it('オプション追加で合計金額が増加する', () => {
    const result = calculateEstimate('starter', {
      pageCount: '6-10',
      cms: 'wordpress',
    });
    expect(result.options.length).toBe(2);
    // starter 300,000 + ページ数 50,000 + CMS 100,000 = 450,000
    expect(result.totalPrice).toBe(450000);
  });

  it('追加料金 0 のオプションは内訳に含まれない', () => {
    const result = calculateEstimate('starter', {
      pageCount: '1-5', // 0 円
      cms: 'none', // 0 円
    });
    expect(result.options).toEqual([]);
    expect(result.totalPrice).toBe(300000);
  });

  it('全オプション最大構成の合計が正しい', () => {
    const result = calculateEstimate('premium', {
      pageCount: '21+', // 300,000
      designCreation: 'original', // 100,000
      cms: 'headless', // 200,000
      contactForm: 'advanced', // 80,000
      multilingual: 'multi', // 200,000
      animation: 'advanced', // 150,000
    });
    expect(result.basePrice).toBe(1200000);
    expect(result.totalPrice).toBe(1200000 + 300000 + 100000 + 200000 + 80000 + 200000 + 150000);
  });

  it('オプション内訳にラベルが含まれる', () => {
    const result = calculateEstimate('starter', {
      cms: 'wordpress',
    });
    expect(result.options[0].label).toContain('CMS');
    expect(result.options[0].label).toContain('WordPress');
    expect(result.options[0].price).toBe(100000);
  });
});

describe('getOptionSurcharge()', () => {
  it('正しい追加料金を返す', () => {
    expect(getOptionSurcharge('cms', 'wordpress')).toBe(100000);
    expect(getOptionSurcharge('pageCount', '21+')).toBe(300000);
    expect(getOptionSurcharge('animation', 'advanced')).toBe(150000);
  });

  it('料金 0 のオプションは 0 を返す', () => {
    expect(getOptionSurcharge('cms', 'none')).toBe(0);
    expect(getOptionSurcharge('pageCount', '1-5')).toBe(0);
  });

  it('存在しないキーは 0 を返す', () => {
    expect(getOptionSurcharge('unknown', 'value')).toBe(0);
  });
});
