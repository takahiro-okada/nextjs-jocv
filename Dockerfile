# ベースイメージを指定
FROM node:18.17.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# プロジェクトファイルをコピー
COPY . .

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# Prismaクライアントを生成
RUN pnpm prisma generate

# 開発サーバーを起動
CMD ["pnpm", "dev"]