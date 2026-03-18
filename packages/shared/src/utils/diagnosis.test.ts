import { describe, it, expect } from 'vitest';
import { diagnose } from './diagnosis';
import type { DiagnosisAnswers } from '../types/diagnosis';

/** 最小構成の回答（全項目が最低スコア） */
const MINIMAL_ANSWERS: DiagnosisAnswers = {
  siteType: 'lp',
  pageCount: '1-5',
  designCreation: 'template',
  cms: 'none',
  contactForm: 'none',
  multilingual: 'none',
  animation: 'none',
};

/** 中規模の回答 */
const MEDIUM_ANSWERS: DiagnosisAnswers = {
  siteType: 'corporate',
  pageCount: '11-20',
  designCreation: 'original',
  cms: 'wordpress',
  contactForm: 'basic',
  multilingual: 'none',
  animation: 'basic',
};

/** 最大構成の回答（全項目が最高スコア） */
const PREMIUM_ANSWERS: DiagnosisAnswers = {
  siteType: 'portal',
  pageCount: '21+',
  designCreation: 'original',
  cms: 'headless',
  contactForm: 'advanced',
  multilingual: 'multi',
  animation: 'advanced',
};

describe('diagnose()', () => {
  it('最小スコアの回答で starter プランを返す', () => {
    const result = diagnose(MINIMAL_ANSWERS);
    expect(result.plan).toBe('starter');
    expect(result.planName).toBe('スターター');
  });

  it('中規模の回答で standard プランを返す', () => {
    const result = diagnose(MEDIUM_ANSWERS);
    expect(result.plan).toBe('standard');
    expect(result.planName).toBe('スタンダード');
  });

  it('最大スコアの回答で premium プランを返す', () => {
    const result = diagnose(PREMIUM_ANSWERS);
    expect(result.plan).toBe('premium');
    expect(result.planName).toBe('プレミアム');
  });

  it('推薦理由が 1 つ以上含まれる', () => {
    const result = diagnose(MINIMAL_ANSWERS);
    expect(result.reasons.length).toBeGreaterThanOrEqual(1);
  });

  it('見積もりコストが基本価格以上', () => {
    const result = diagnose(MINIMAL_ANSWERS);
    // starter の基本価格は 300,000
    expect(result.estimatedCost).toBeGreaterThanOrEqual(300000);
  });

  it('オプション追加で見積もりコストが増加する', () => {
    const minimal = diagnose(MINIMAL_ANSWERS);
    const medium = diagnose(MEDIUM_ANSWERS);
    expect(medium.estimatedCost).toBeGreaterThan(minimal.estimatedCost);
  });

  it('EC サイトの回答で適切な理由を返す', () => {
    const ecAnswers: DiagnosisAnswers = { ...MINIMAL_ANSWERS, siteType: 'ec' };
    const result = diagnose(ecAnswers);
    expect(result.reasons.some((r) => r.includes('ECサイト'))).toBe(true);
  });

  it('ヘッドレス CMS の回答で適切な理由を返す', () => {
    const answers: DiagnosisAnswers = { ...MINIMAL_ANSWERS, cms: 'headless' };
    const result = diagnose(answers);
    expect(result.reasons.some((r) => r.includes('ヘッドレスCMS'))).toBe(true);
  });

  it('返り値の型が正しい', () => {
    const result = diagnose(MINIMAL_ANSWERS);
    expect(result).toHaveProperty('plan');
    expect(result).toHaveProperty('planName');
    expect(result).toHaveProperty('reasons');
    expect(result).toHaveProperty('estimatedCost');
    expect(Array.isArray(result.reasons)).toBe(true);
    expect(typeof result.estimatedCost).toBe('number');
  });
});
