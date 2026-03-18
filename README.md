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
- **スタイル:** SCSS + BEM（モバイルファーストレスポンシブ）
- **Lint / Format:** ESLint 9 (flat config) + Prettier
- **テスト:** Vitest（33 テスト / 4 ファイル）
- **静的ホスティング:** GitHub Pages（SSG）
- **アクセシビリティ:** WAI-ARIA 属性・セマンティック HTML

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

## GitHub Pages デプロイ

```bash
# 1. shared ビルド
npm run build:shared

# 2. 公開サイト静的生成
cd apps/public-site && npx nuxt generate

# 3. 診断アプリ静的エクスポート
cd apps/diagnosis-app && npx next build

# 4. 診断アプリを公開サイト出力に結合
cp -r apps/diagnosis-app/out apps/public-site/.output/public/app

# 5. デプロイ
cd apps/public-site && npx gh-pages --dotfiles -d .output/public
```

> Nuxt は `nitro.preset: 'github-pages'` で SSG、Next.js は `output: 'export'` で静的エクスポートし、`/app` サブパスに配置しています。

## ディレクトリ構成

```
corporate-estimate-monorepo/
├── apps/
│   ├── public-site/            # Nuxt 3 コーポレートサイト
│   │   ├── components/         # Vue コンポーネント（UI 8 + レイアウト 2）
│   │   ├── layouts/            # レイアウト
│   │   ├── pages/              # ページ（9ページ）
│   │   ├── plugins/            # Nuxt プラグイン（GA4）
│   │   └── assets/scss/        # SCSS 変数・ミックスイン
│   └── diagnosis-app/          # Next.js 診断アプリ
│       └── src/
│           ├── app/            # App Router ページ（8ページ）
│           ├── components/     # React コンポーネント（UI 4 + 診断 2 + レイアウト 2）
│           └── styles/         # SCSS 変数・ミックスイン
├── packages/
│   └── shared/                 # 共有パッケージ
│       └── src/
│           ├── types/          # 型定義
│           ├── constants/      # 定数（料金・ナビゲーション）
│           ├── utils/          # ユーティリティ（診断・見積もり・バリデーション）
│           └── mock/           # モックデータ
├── eslint.config.mjs           # ESLint 設定
├── vitest.config.ts            # Vitest 設定
└── tsconfig.base.json          # TypeScript ベース設定
```

## ページ一覧

### コーポレートサイト（public-site）

| パス | ページ |
|------|--------|
| `/` | トップページ |
| `/about` | 会社概要 |
| `/services` | サービス一覧 |
| `/works` | 導入実績 |
| `/faq` | よくある質問 |
| `/contact` | お問い合わせ |
| `/legal` | 特定商取引法に基づく表記 |
| `/privacy` | プライバシーポリシー |
| `/terms` | 利用規約 |

### 診断アプリ（diagnosis-app）

| パス | ページ |
|------|--------|
| `/` | 診断スタート |
| `/diagnosis` | 診断質問フロー |
| `/result` | 診断結果 |
| `/estimate` | 見積もり明細 |
| `/compare` | プラン比較 |
| `/login` | ログイン |
| `/mypage` | マイページ |

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
