# ベースイメージを指定
FROM node:18.17.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# pnpmをインストール
RUN npm install -g pnpm

# package.jsonをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール
RUN pnpm install

# 開発サーバーを起動
CMD ["pnpm", "dev"]
