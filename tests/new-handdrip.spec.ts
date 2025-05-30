import { test, expect } from '@playwright/test';

test('ハンドドリップ新規記録ができる', async ({ page }) => {
  // 新規作成ページへ
  await page.goto('http://localhost:3000/new?type=handdrip');

  // コーヒー名など必須項目を入力（name属性やlabelに合わせて調整）
  await page.getByLabel('コーヒー名').fill('テストコーヒー');
  await page.getByLabel('産地').fill('テスト産地');
  await page.getByLabel('精製方法').selectOption('ウォッシュド');
  await page.getByLabel('品種').fill('テスト品種');
  await page.getByLabel('焙煎度').selectOption('浅煎り');
  await page.getByLabel('抽出器具').selectOption('V60');
  await page.getByLabel('湯温').fill('92');
  await page.getByLabel('コーヒー豆量').fill('15');
  await page.getByLabel('湯量').fill('240');
  await page.getByLabel('抽出時間').fill('180');

  // 保存ボタンをクリック
  await page.getByRole('button', { name: '記録を保存' }).click();

  // 一覧ページに遷移し、登録した内容が表示されることを確認
  await expect(page).toHaveURL(/\/records/);
  await expect(page.getByText('テストコーヒー')).toBeVisible();
}); 