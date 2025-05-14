# コーヒーテイスティング記録アプリ

このリポジトリは、Next.js + TypeScript + Supabase を使ったコーヒーテイスティング記録アプリです。

---

## 📦 セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone https://github.com/2032emegre/coffeetaste.git
   cd coffeetaste
   ```

2. **依存パッケージをインストール**
   ```bash
   npm install
   ```

3. **環境変数ファイルを作成**
   プロジェクト直下に `.env.local` を作成し、以下を記入（SupabaseやAPIキーは自分の値に書き換えてください）
   ```env
   NEXT_PUBLIC_SUPABASE_URL=あなたのSupabaseプロジェクトURL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのSupabaseのAnon Key
   OPENWEATHER_API_KEY=あなたのOpenWeatherMap APIキー
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:3000` を開くとアプリが表示されます。

---

## ☁️ デプロイ（Vercel推奨）

1. GitHubにpush
2. [Vercel](https://vercel.com/)で新規プロジェクト作成
3. 環境変数（.env.localと同じ内容）をVercelの「Environment Variables」に設定
4. Deployボタンを押すだけ！

---

## 🛠️ 主な機能
- コーヒーテイスティング記録の新規作成・編集・削除・詳細表示
- 並べ替え・検索・フィルタリング
- レーダーチャート表示（ECharts）
- 天気・気温の自動取得
- シンプル＆白黒基調のUI

---

## 💡 トラブルシュート
- **記録が保存できない/反映されない**
  - Supabaseのテーブル構造やRLS（Row Level Security）設定を確認
  - .env.localのURLやキーが正しいか確認
- **天気が取得できない**
  - OPENWEATHER_API_KEYが有効か、APIの無料枠上限に達していないか確認
- **編集・削除が反映されない**
  - SupabaseのRLSでupdate/deleteも許可しているか確認

---

## ❓ よくある質問

### Q. SupabaseのテーブルやRLS設定はどうやるの？
A. Supabase管理画面の「Table Editor」や「SQL Editor」で作成・設定できます。

### Q. 環境変数はどこで設定する？
A. ローカルは `.env.local`、Vercelは「Settings > Environment Variables」で設定します。

### Q. デザインをカスタマイズしたい
A. `src/app/`配下の各ページや`src/components/`のコンポーネントを編集してください。

---

## 📝 その他メモ
- コードやUIで分からないことがあれば、[GitHub Discussions](https://github.com/2032emegre/coffeetaste/discussions)や[Issues](https://github.com/2032emegre/coffeetaste/issues)で質問OK！
- どんな小さなことでも「コメント」や「README追記」大歓迎です。

---

開発・運用を楽しんでください☕️ 