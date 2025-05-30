# Test info

- Name: ハンドドリップ新規記録ができる
- Location: /Users/mizoguchiyuusuke/Downloads/taste_my/tests/new-handdrip.spec.ts:3:5

# Error details

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('コーヒー名')

    at /Users/mizoguchiyuusuke/Downloads/taste_my/tests/new-handdrip.spec.ts:8:34
```

# Page snapshot

```yaml
- main:
  - heading "新しいテイスティング記録" [level=1]
  - button "ハンドドリップ"
  - button "エスプレッソ"
  - button "焙煎記録"
  - button "店舗来店"
  - heading "環境情報" [level=2]
  - textbox: 2025-05-26
  - textbox: 21:18
  - text: "|"
  - combobox:
    - option "選択してください" [selected]
    - option "晴れ"
    - option "曇り"
    - option "雨"
    - option "雪"
    - option "霧"
    - option "強風"
  - text: "|"
  - spinbutton
  - text: ℃ |
  - spinbutton
  - text: ％
  - heading "コーヒー情報" [level=2]
  - text: コーヒー名
  - textbox "コーヒー名を入力"
  - button "履歴"
  - text: 産地
  - 'textbox "例: エチオピア"'
  - text: 標高（m）
  - spinbutton
  - text: 精製方式
  - radio "ウォッシュド"
  - text: ウォッシュド
  - radio "ナチュラル"
  - text: ナチュラル
  - radio "ハニー"
  - text: ハニー
  - radio "その他"
  - text: その他 品種
  - textbox "品種を入力"
  - text: 焙煎日
  - textbox
  - text: その他の情報
  - textbox
  - heading "抽出レシピ" [level=2]
  - text: ドリッパー
  - combobox:
    - option "選択してください" [selected]
    - option "SilkDripper"
    - option "FlowerDripper"
    - option "その他"
  - text: グラインダー
  - combobox:
    - option "選択してください" [selected]
    - option "Timemore"
    - option "その他"
  - text: 挽き目
  - textbox
  - text: 温度
  - textbox
  - text: コーヒー豆 (g)
  - spinbutton
  - text: 湯量 (ml)
  - spinbutton
  - text: 蒸らし量 (ml)
  - spinbutton
  - text: 蒸らし時間 (分:秒)
  - spinbutton: "0"
  - spinbutton: "0"
  - text: 抽出時間 (分:秒)
  - spinbutton: "0"
  - spinbutton: "0"
  - text: メモ
  - textbox
  - heading "テイスティング評価" [level=2]
  - text: 酸味
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: 甘味
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: 濃厚さ
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: ボディ
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: バランス
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: クリーン度
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - text: 余韻
  - button "1"
  - button "2"
  - button "3"
  - button "4"
  - button "5"
  - heading "LE NEZ（香り）" [level=2]
  - text: ポジティブ
  - checkbox "ナッツ"
  - text: ナッツ
  - checkbox "赤い果実"
  - text: 赤い果実
  - checkbox "核果"
  - text: 核果
  - checkbox "草葉"
  - text: 草葉
  - checkbox "トロピカルフルーツ"
  - text: トロピカルフルーツ
  - checkbox "柑橘類"
  - text: 柑橘類
  - checkbox "花"
  - text: 花
  - checkbox "スパイス"
  - text: スパイス
  - textbox "その他"
  - text: ネガティブ
  - checkbox "タバコ"
  - text: タバコ
  - checkbox "焦げ臭"
  - text: 焦げ臭
  - checkbox "草葉"
  - text: 草葉
  - checkbox "樹木"
  - text: 樹木
  - textbox "その他"
  - text: ノート
  - textbox "ノートを入力してください"
  - heading "LES ARÔMES（アロマ）" [level=2]
  - text: ポジティブ
  - checkbox "ナッツ"
  - text: ナッツ
  - checkbox "赤い果実"
  - text: 赤い果実
  - checkbox "核果"
  - text: 核果
  - checkbox "草葉"
  - text: 草葉
  - checkbox "トロピカルフルーツ"
  - text: トロピカルフルーツ
  - checkbox "柑橘類"
  - text: 柑橘類
  - checkbox "花"
  - text: 花
  - checkbox "スパイス"
  - text: スパイス
  - textbox "その他"
  - text: ネガティブ
  - checkbox "タバコ"
  - text: タバコ
  - checkbox "焦げ臭"
  - text: 焦げ臭
  - checkbox "草葉"
  - text: 草葉
  - checkbox "樹木"
  - text: 樹木
  - textbox "その他"
  - text: ノート
  - textbox "ノートを入力してください"
  - heading "総合評価" [level=2]
  - text: 個人スコア (0-100)
  - slider: "0"
  - spinbutton: "0"
  - text: 0 評価・気づき
  - textbox "コメントや気づき、改善点などを記入してください"
  - button "記録を保存"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('ハンドドリップ新規記録ができる', async ({ page }) => {
   4 |   // 新規作成ページへ
   5 |   await page.goto('http://localhost:3000/new?type=handdrip');
   6 |
   7 |   // コーヒー名など必須項目を入力（name属性やlabelに合わせて調整）
>  8 |   await page.getByLabel('コーヒー名').fill('テストコーヒー');
     |                                  ^ Error: locator.fill: Test timeout of 30000ms exceeded.
   9 |   await page.getByLabel('産地').fill('テスト産地');
  10 |   await page.getByLabel('精製方法').selectOption('ウォッシュド');
  11 |   await page.getByLabel('品種').fill('テスト品種');
  12 |   await page.getByLabel('焙煎度').selectOption('浅煎り');
  13 |   await page.getByLabel('抽出器具').selectOption('V60');
  14 |   await page.getByLabel('湯温').fill('92');
  15 |   await page.getByLabel('コーヒー豆量').fill('15');
  16 |   await page.getByLabel('湯量').fill('240');
  17 |   await page.getByLabel('抽出時間').fill('180');
  18 |
  19 |   // 保存ボタンをクリック
  20 |   await page.getByRole('button', { name: '記録を保存' }).click();
  21 |
  22 |   // 一覧ページに遷移し、登録した内容が表示されることを確認
  23 |   await expect(page).toHaveURL(/\/records/);
  24 |   await expect(page.getByText('テストコーヒー')).toBeVisible();
  25 | }); 
```