# Corporate Estimate Monorepo

法人向け Web 制作見積もり・プラン診断サービスのモノレポです。

| | URL |
|---|---|
| **コーポレートサイト** | https://yohei0819.github.io/corporate-estimate-monorepo/ |
| **診断アプリ** | https://yohei0819.github.io/corporate-estimate-monorepo/app/ |

## 構成

| パッケージ | 技術 | 説明 |
|-----------|------|------|
| `apps/public-site` | Nuxt 3 + Vue 3 + TypeScript | コーポレートサイト（会社概要・サービス・実績・FAQ・お問い合わせ / 全9ページ） |
| `apps/diagnosis-app` | Next.js 15 + React 19 + TypeScript | プラン診断・見積もり・比較・ログイン・マイページ（全8ページ） |
| `packages/shared` | TypeScript (ESM) | 共有型定義・定数・ユーティリティ・モックデータ |

## 技術スタック

- **パッケージ管理:** npm workspaces
- **スタイル:** SCSS + BEM + CSS Custom Properties（モバイルファーストレスポンシブ）
- **ダークモード:** `prefers-color-scheme: dark` 対応（CSS Custom Properties 切り替え）
- **Lint / Format:** ESLint 9 (flat config) + Prettier
- **テスト:** Vitest（33 テスト / 4 ファイル）
- **CI:** GitHub Actions（push / PR 時に Lint・テスト・ビルド）
- **静的ホスティング:** GitHub Pages（SSG）
- **SEO:** サイトマップ・robots.txt・JSON-LD 構造化データ・OGP メタタグ
- **アクセシビリティ:** WAI-ARIA 属性・セマンティック HTML・キーボードナビゲーション
- **アナリティクス:** Google Analytics 4（環境変数で ON/OFF）

## 機能一覧

### SEO・メタ情報

| 機能 | 説明 |
|------|------|
| サイトマップ | `@nuxtjs/sitemap` で全9ページの XML サイトマップを自動生成 |
| robots.txt | 全クローラー許可 + サイトマップ参照 |
| JSON-LD 構造化データ | トップページ（WebSite）・サービスページ（Service）に実装 |
| OGP メタタグ | 全ページに `og:title` / `og:description` / `og:image` / `twitter:card` |
| OGP 画像生成 | `scripts/generate-ogp.mjs` で Canvas ベースの動的生成 |
| `useSeoMeta` | 全ページに個別のタイトル・説明文・OG タグを設定 |

### UX 機能

| 機能 | 説明 |
|------|------|
| プラン診断 | 7問のステップ式質問 → スコア算出 → プラン推奨（スターター / スタンダード / プレミアム） |
| 見積もり計算 | プラン選択 + オプション追加のリアルタイム料金計算 |
| プラン比較 | 3プラン横並びの比較テーブル |
| URL 共有 | 診断結果を Base64 エンコードしたクエリパラメータで共有 |
| トースト通知 | 成功 / エラー / 情報の3タイプ、3秒で自動消去 |
| リアルタイムバリデーション | メール・電話番号・パスワードのフィールドレベル検証 |
| 診断履歴 | localStorage に最大20件の診断結果を日付付きで保存 |
| スクロールトップ | 300px 以上スクロールで表示されるボタン |

### ダークモード

- `@media (prefers-color-scheme: dark)` によるシステム設定連動
- CSS Custom Properties で13色 + 3シャドウ変数を切り替え
- 両アプリで統一されたカラーパレット（Google Material Dark 準拠）

### アクセシビリティ

- `aria-live="polite"` によるトースト通知の読み上げ
- フォーム要素の `aria-invalid` / `aria-describedby`
- `role="status"` / `role="alert"` の適切な使用
- `:focus-visible` によるキーボードフォーカスインジケーター
- セマンティック HTML・ARIA ラベル

### CI/CD

- GitHub Actions で `main` ブランチへの push / PR 時に自動実行
- パイプライン: `npm ci` → `build:shared` → `test` → `build:diagnosis-app` → `build:public-site`
- Node.js 20 + npm キャッシュ

## セットアップ

```bash
# 依存関係のインストール
npm install

# shared パッケージのビルド（初回必須）
npm run build:shared

# 環境変数の設定
cp apps/public-site/.env.example apps/public-site/.env
cp apps/diagnosis-app/.env.example apps/diagnosis-app/.env
```

## 開発

```bash
# 両アプリを同時に起動（public-site: 3000 / diagnosis-app: 3001）
npm run dev

# 個別に起動
npm run dev:public-site    # http://localhost:3000
npm run dev:diagnosis-app  # http://localhost:3001
```

## ビルド

```bash
# 全体ビルド
npm run build

# 個別ビルド
npm run build:shared
npm run build:public-site
npm run build:diagnosis-app
```

## テスト・Lint

```bash
npm test             # テスト実行
npm run test:watch   # テスト（ウォッチモード）
npm run lint         # ESLint
npm run lint:fix     # ESLint（自動修正）
npm run format       # Prettier（フォーマット）
npm run format:check # フォーマットチェック
```

## デプロイ

```bash
npm run deploy
```

内部処理:
1. `packages/shared` → `apps/diagnosis-app` → `apps/public-site` の順でビルド
2. public-site の出力（ルート）と diagnosis-app の出力（`/app/`）を `.deploy/` に結合
3. `gh-pages` で GitHub Pages にデプロイ

> Nuxt は `nitro.preset: 'github-pages'` で SSG、Next.js は `output: 'export'` で静的エクスポートし、`/app` サブパスに配置しています。

## ディレクトリ構成

```
corporate-estimate-monorepo/
├── .github/
│   └── workflows/ci.yml       # GitHub Actions CI
├── apps/
│   ├── public-site/            # Nuxt 3 コーポレートサイト
│   │   ├── components/         # Vue コンポーネント（UI 8 + レイアウト 2）
│   │   ├── layouts/            # レイアウト
│   │   ├── pages/              # ページ（9ページ）
│   │   ├── plugins/            # Nuxt プラグイン（GA4）
│   │   └── assets/scss/        # SCSS 変数・ミックスイン・ダークモード
│   └── diagnosis-app/          # Next.js 診断アプリ
│       └── src/
│           ├── app/            # App Router ページ（8ページ）
│           ├── components/     # React コンポーネント（UI 5 + 診断 2 + レイアウト 2）
│           ├── lib/            # URL 共有・ストレージユーティリティ
│           └── styles/         # SCSS 変数・ミックスイン・ダークモード
├── packages/
│   └── shared/                 # 共有パッケージ
│       └── src/
│           ├── types/          # 型定義（diagnosis・company・works・faq）
│           ├── constants/      # 定数（料金・ナビゲーション）
│           ├── utils/          # ユーティリティ（診断・見積もり・バリデーション・フォーマット）
│           └── mock/           # モックデータ（5種）
├── scripts/
│   └── generate-ogp.mjs       # OGP 画像生成スクリプト
├── eslint.config.mjs           # ESLint 設定
├── vitest.config.ts            # Vitest 設定
└── tsconfig.base.json          # TypeScript ベース設定
```

## ページ一覧

### コーポレートサイト（public-site）

| パス | ページ | 主な機能 |
|------|--------|----------|
| `/` | トップページ | ヒーロー・サービス紹介・実績・CTA・JSON-LD |
| `/about` | 会社概要 | 会社情報・強み・沿革・概要テーブル |
| `/services` | サービス一覧 | サービスカード・JSON-LD |
| `/works` | 導入実績 | 導入事例カード |
| `/faq` | よくある質問 | アコーディオン式 FAQ |
| `/contact` | お問い合わせ | リアルタイムバリデーション付きフォーム |
| `/legal` | 特定商取引法に基づく表記 | 法定表示 |
| `/privacy` | プライバシーポリシー | 個人情報保護方針 |
| `/terms` | 利用規約 | 利用条件 |

### 診断アプリ（diagnosis-app）

| パス | ページ | 主な機能 |
|------|--------|----------|
| `/` | 診断スタート | 特徴カード・診断開始ボタン |
| `/diagnosis` | 診断質問フロー | ステップインジケーター・7問の質問カード |
| `/result` | 診断結果 | 推奨プラン・URL 共有・履歴保存・トースト通知 |
| `/estimate` | 見積もり明細 | プラン選択・オプション追加・リアルタイム計算 |
| `/compare` | プラン比較 | 3プラン比較テーブル |
| `/login` | ログイン | メール・パスワード認証 |
| `/mypage` | マイページ | 診断履歴テーブル・ユーザー情報 |

## 共有パッケージ（packages/shared）

| モジュール | 内容 |
|-----------|------|
| `types/` | `DiagnosisQuestion`・`DiagnosisResult`・`Company`・`WorkItem`・`FaqItem` |
| `constants/pricing` | 3プランの基本料金（30万 / 60万 / 120万）+ 6オプション |
| `constants/navigation` | 両サイトのナビゲーション定義 |
| `utils/diagnosis` | 回答からスコア算出 → プラン推奨ロジック |
| `utils/estimate` | 基本料金 + 選択オプションの合計計算 |
| `utils/validation` | メール・電話番号バリデーション |
| `utils/format` | 通貨フォーマット（`ja-JP`）・日付フォーマット |
| `mock/` | 会社情報・サービス・実績・FAQ・診断質問のモックデータ |

## 環境変数

### apps/public-site/.env

| 変数 | 説明 | .env.example デフォルト |
|------|------|----------------------|
| `NUXT_PUBLIC_DIAGNOSIS_APP_ORIGIN` | 診断アプリのパス | `http://localhost:3001`（本番: `/app`） |
| `NUXT_PUBLIC_GA_ID` | GA4 測定 ID | （空 = 無効） |

### apps/diagnosis-app/.env

| 変数 | 説明 | .env.example デフォルト |
|------|------|----------------------|
| `NEXT_PUBLIC_PUBLIC_SITE_ORIGIN` | 公開サイトの URL | `http://localhost:3000` |
| `NEXT_PUBLIC_GA_ID` | GA4 測定 ID | （空 = 無効） |

## ライセンス

ISC
