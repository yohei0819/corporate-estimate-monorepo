# Contributing Guide

Corporate Estimate Monorepo への貢献ガイドです。

## 開発環境セットアップ

### 前提条件

- **Node.js** v18 以上
- **npm** v9 以上

### 初回セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yohei0819/corporate-estimate-monorepo.git
cd corporate-estimate-monorepo

# 依存関係インストール（ワークスペース全体）
npm install

# 共有パッケージのビルド
npm run build:shared
```

### 開発サーバー起動

```bash
# 両アプリ同時起動
npm run dev

# 個別起動
npm run dev:public-site      # Nuxt 3 (http://localhost:3000)
npm run dev:diagnosis-app    # Next.js (http://localhost:3001)
```

## プロジェクト構成

```
├── apps/
│   ├── public-site/      # Nuxt 3 + Vue 3（コーポレートサイト）
│   └── diagnosis-app/    # Next.js 15 + React 19（診断アプリ）
├── packages/
│   └── shared/           # 共有型定義・ユーティリティ・定数・モックデータ
├── e2e/                  # Playwright E2E テスト
└── scripts/              # ビルド補助スクリプト
```

## ブランチ戦略

| ブランチ | 用途 |
| --- | --- |
| `main` | 本番ブランチ（GitHub Pages デプロイ元） |
| `feature/*` | 新機能開発 |
| `fix/*` | バグ修正 |
| `refactor/*` | リファクタリング |

```bash
# ブランチ作成例
git checkout -b feature/add-new-component
```

## コミット規約

[Conventional Commits](https://www.conventionalcommits.org/) に準拠します。

```
<type>(<scope>): <description>

# 例
feat(diagnosis): 新しい診断質問を追加
fix(shared): バリデーション正規表現を修正
style(public-site): ヘッダーのレスポンシブ対応を改善
refactor(diagnosis-app): ThemeToggle のロジックを整理
test: StepIndicator のユニットテストを追加
docs: README を更新
chore: ESLint 設定を更新
```

### type 一覧

| type | 説明 |
| --- | --- |
| `feat` | 新機能 |
| `fix` | バグ修正 |
| `style` | スタイル変更（コードの意味に影響しないもの） |
| `refactor` | リファクタリング（機能追加・バグ修正でないもの）|
| `test` | テスト追加・修正 |
| `docs` | ドキュメント |
| `chore` | ビルド・設定等の雑務 |

## コードスタイル

### 全般

- **TypeScript** 必須（型注釈を適切に使用）
- **SCSS** + **BEM** 命名規則
- CSS カスタムプロパティ（ダークモード対応）

### Lint & Format

```bash
# Lint チェック
npm run lint

# Lint 自動修正
npm run lint:fix

# フォーマットチェック
npm run format:check

# 自動フォーマット
npm run format

# 型チェック
npm run typecheck
```

### コンポーネント規約

- **diagnosis-app (React)**: 関数コンポーネント + JSDoc コメント
- **public-site (Vue)**: `<script setup lang="ts">` + Composition API
- BEM クラス名は SCSS Modules で管理
- 共通の型・定数は `packages/shared` に配置

## テスト

### ユニットテスト（Vitest）

```bash
# 全テスト実行
npm test

# ウォッチモード
npm run test:watch
```

- テストファイルは対象ファイルと同じディレクトリに `*.test.ts(x)` として配置
- React コンポーネントは `@testing-library/react` を使用
- `it.each` でデータ駆動テストを推奨

### E2E テスト（Playwright）

```bash
# E2E テスト実行
npm run test:e2e
```

- テストファイルは `e2e/` ディレクトリに配置
- 診断フロー等の重要なユーザーフローをカバー

## PR プロセス

1. `main` から feature ブランチを作成
2. 変更を実装
3. 以下のチェックをすべて通過させる：
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
4. PR を作成し、変更内容を説明
5. CI（GitHub Actions）が自動でチェックを実行
6. レビュー後にマージ

## アクセシビリティ

- WCAG AAA コントラスト比（7:1）を維持
- セマンティック HTML を使用
- `aria-label` を適切に設定
- キーボードナビゲーション対応（`focus-visible`）

## デプロイ

```bash
# ビルド＆デプロイ（GitHub Pages）
npm run deploy
```

> デプロイは `main` ブランチからのみ実施してください。
