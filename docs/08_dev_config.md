# 08_dev_config.md

## 概要

本ドキュメントは、AI Work OS の開発基盤構成および環境設定を定義する。

本内容は開発時の正本とし、実装は本ドキュメントと整合している必要がある。

---

## デプロイ環境

本システムは Vercel 上で動作する。

設定ファイル

vercel.json

---

## API 構成

API は Vercel の Serverless Functions として実装する。

配置ディレクトリ

api/

エンドポイント形式

/api/:path

---

## ルーティング設定

vercel.json にてリライトルールを定義する。

{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}

---

## ディレクトリ構成

api/
src/
  services/
  types/

---

## 各ディレクトリの役割

api/
HTTP リクエストの受付とレスポンス返却を行う  
ロジックは持たず、service を呼び出すのみ

src/services/
ビジネスロジックを実装する  
GitHub API や外部連携もここに集約する

src/types/
型定義を管理する

---

## 設計原則

API は薄く保つ

API → service 呼び出し

ロジックはすべて service 層に配置する

---

## 環境変数

以下の環境変数を Vercel に設定する

GITHUB_TOKEN  
GITHUB_OWNER  
GITHUB_REPO  
GITHUB_BRANCH  

INTERNAL_API_KEY（任意）

TODOIST_API_TOKEN

---

## GitHub 連携

GitHub との通信は service 層で行う

対象ファイル

src/services/github-docs.js

主な責務

- GitHub REST API 呼び出し
- 認証処理
- Base64 デコード
- エラーハンドリング

---

## docs API

docs の取得は専用 API を通じて行う

GET /api/docs  
GET /api/docs-read?file=FILENAME

---

## 注意事項

docs は SSOT である

仕様確認時は必ず docs を参照すること

API 実装は docs と整合させること
