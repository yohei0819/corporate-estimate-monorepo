import { test, expect } from '@playwright/test';
import { DIAGNOSIS_STEPS } from '@corporate-estimate/shared';

const TOTAL_STEPS = DIAGNOSIS_STEPS.length;

/**
 * 診断フロー E2E テスト
 * Q1〜Q7 の全ステップで選択肢を選び「次へ」で進み、
 * 最終ステップで「結果を見る」を押して結果ページが表示されることを検証する。
 */
test('診断フロー: 全ステップ完了→結果ページ表示', async ({ page }) => {
  await page.goto('/diagnosis');

  // タイトルが表示されることを確認
  await expect(page.getByRole('heading', { name: 'Web制作プラン診断' })).toBeVisible();

  for (let step = 0; step < TOTAL_STEPS; step++) {
    // ステップ表示を確認
    await expect(page.getByText(`ステップ ${step + 1} / ${TOTAL_STEPS}`)).toBeVisible();

    // 最初の選択肢ボタンをクリック（role ベースで取得）
    const questionTitle = page.getByRole('heading', { level: 2 });
    await expect(questionTitle).toBeVisible();

    // 質問カード内の選択肢ボタン群から最初のものを選択
    const firstOption = page.getByRole('button', { name: DIAGNOSIS_STEPS[step].options[0].label });
    await firstOption.click();

    // 「次へ」or「結果を見る」ボタンをクリック
    const isLastStep = step === TOTAL_STEPS - 1;
    await page.getByRole('button', { name: isLastStep ? '結果を見る' : '次へ' }).click();
  }

  // 結果ページに遷移したことを確認
  await expect(page).toHaveURL(/\/result/);
  await expect(page.getByText('あなたにおすすめのプラン')).toBeVisible({ timeout: 10_000 });
});
