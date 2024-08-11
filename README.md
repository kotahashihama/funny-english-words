# 概要

Open API マッシュアップアプリケーション「Funny English Words」

# 環境構築

- node@v22.3.0
- bun@1.1.13

## 依存ライブラリの導入

```sh
bun i
```

## 環境変数

```sh
cp .env.template .env # env ファイルを作成
```

`.env` を編集して各環境変数に値をセットしてください。

- `VITE_X_RAPIDAPI_HOST`
- `VITE_X_RAPIDAPI_KEY`

RapidAPI の API キーです。以下を参考に取得してください。

https://docs.rapidapi.com/docs/configuring-api-security

- `VITE_OPENAI_API_KEY`

OpenAI の API キーです。以下を参考に取得してください。

https://platform.openai.com/docs/quickstart

## アプリケーションサーバーの起動

```sh
bun dev
```

http://localhost:5173 で閲覧できます。
