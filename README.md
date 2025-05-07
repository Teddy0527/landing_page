# Teddy AI チャットボットランディングページ

V0 デザイナーで作成したAIチャットボットサービスのランディングページです。フォーム送信機能、データベース連携、メール通知機能を実装しています。

## 技術スタック

- フロントエンド: Next.js 14 (App Router)
- スタイリング: Tailwind CSS
- コンポーネント: Radix UI + shadcn/ui
- アニメーション: Framer Motion
- データベース: PostgreSQL (Prisma ORM)
- メール: Nodemailer

## 機能

- レスポンシブデザイン
- コンタクトフォーム
- フォーム送信データのデータベース保存
- 管理者へのメール通知

## ローカル開発環境のセットアップ

### 前提条件

- Node.js 18.0.0以上
- PostgreSQLデータベース

### インストール手順

1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd teddy-landing
```

2. 依存パッケージのインストール

```bash
npm install --legacy-peer-deps
```

3. 環境変数の設定

`.env`ファイルをルートディレクトリに作成し、以下の変数を設定：

```
# データベース接続情報
DATABASE_URL="postgresql://ユーザー名:パスワード@ホスト:ポート/データベース名"

# メール送信設定
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASSWORD=パスワード
SMTP_FROM=noreply@example.com

# 管理者メールアドレス
ADMIN_EMAIL=admin@example.com
```

4. データベースのセットアップ

```bash
# Prismaクライアントの生成
npm run prisma:generate

# データベースマイグレーションの実行
npm run prisma:migrate

# （オプション）Prisma Studioでデータベースを閲覧
npm run prisma:studio
```

5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセスして確認できます。

## デプロイ方法

### Vercelへのデプロイ

1. [Vercel](https://vercel.com) アカウントを作成
2. GitHubリポジトリと連携
3. 新しいプロジェクトとしてインポート
4. 環境変数を設定
   - `DATABASE_URL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `SMTP_FROM`
   - `ADMIN_EMAIL`
5. デプロイ

### データベース（Supabase）

1. [Supabase](https://supabase.com) でアカウント作成
2. 新しいプロジェクト作成
3. 接続情報を`DATABASE_URL`環境変数に設定
4. Prismaマイグレーションを実行

```bash
npm run prisma:migrate
```

## 本番環境の注意点

- SMTPサーバーの設定を行い、メール送信機能を有効化してください
- 環境変数`DATABASE_URL`にはセキュアな接続情報を設定してください
- Prismaマイグレーションは慎重に行ってください

## 開発者向け情報

### ディレクトリ構造

- `app/`: Next.jsのメインディレクトリ (App Router)
- `app/api/`: APIエンドポイント
- `components/`: UIコンポーネント
- `lib/`: ユーティリティ関数
- `prisma/`: Prismaスキーマとマイグレーション
- `public/`: 静的ファイル
- `styles/`: グローバルスタイル

### コンタクトフォームのカスタマイズ

`components/contact-section.tsx`ファイルを編集して、フォームのフィールドやバリデーションをカスタマイズできます。

### バックエンドAPI

問い合わせフォームのデータ処理は`app/api/contact/route.ts`で行っています。
バリデーションロジックやレスポンス形式をカスタマイズする場合はこのファイルを編集してください。

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。 