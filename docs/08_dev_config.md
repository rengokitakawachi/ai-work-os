# 08_dev_config

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

## ディレクトリ構成

api/  
→ HTTP リクエストの受付とレスポンス返却  

src/services/  
→ ビジネスロジック  

src/types/  
→ 型定義  

docs/  
→ 仕様書（SSOT）  

---

## 各ディレクトリの役割

api/  

・HTTP リクエストの受付  
・レスポンス返却  
・ロジックは持たず service を呼び出すのみ  

src/services/  

・ビジネスロジックの実装  
・外部API連携（GitHub / Todoist など）  

src/types/  

・型定義の管理  

---

## 設計原則

・API は薄く保つ  
・API は service を呼び出すのみとする  
・ロジックはすべて service 層に配置する  

---

## 環境変数

以下の環境変数を Vercel に設定する

・GITHUB_TOKEN  
・GITHUB_OWNER  
・GITHUB_REPO  
・GITHUB_BRANCH  
・INTERNAL_API_KEY（任意）  
・TODOIST_API_TOKEN  

---

## 認証

一部 API は INTERNAL_API_KEY による認証を行う。

認証方法

・Authorization ヘッダー（Bearer）  
・または query パラメータ（key）

一致した場合のみアクセスを許可する。

---

## GitHub 連携

GitHub との通信は service 層で行う。

対象ファイル

src/services/github-docs.js

主な責務

・GitHub REST API 呼び出し  
・認証処理  
・Base64 デコード  
・エラーハンドリング  

---

## docs API

docs の取得は専用 API を通じて行う。

・GET /api/docs  
・GET /api/docs-read?file=FILENAME  
・GET /api/docs-bulk  

docs は GitHub 上で管理される SSOT である。

AI は GitHub を直接参照せず、必ず docs API を経由して取得する。

---

## 注意事項

・docs は SSOT である  
・仕様確認時は必ず docs を参照すること  
・API 実装は docs と整合させること  
