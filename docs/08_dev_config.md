# 08_Dev_Config: 開発環境と構成定義

1. Vercel 構成 (vercel.json)
{
  "functions": {
    "src/api/*.ts": {
      "runtime": "nodejs20.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/src/api/:path*"
    }
  ]
}

2. 環境変数 (.env)
リポジトリ直下の .env に以下の項目を設定し、Vercel にも登録する。
- TODOIST_API_TOKEN: Todoist の API トークン
- GITHUB_TOKEN: GitHub のパーソナルアクセストークン（repo 権限）
- GITHUB_OWNER: リポジトリ所有者名
- GITHUB_REPO: リポジトリ名
- GITHUB_BRANCH: main
- INTERNAL_API_KEY: 簡易認証用キー（任意）

3. GitHub リポジトリ構造
- docs/: 仕様書群
- src/api/: API エンドポイント
- src/services/: 外部クライアントクラス（Todoist, GitHub等）
- src/types/: 型定義
- vercel.json: 構成ファイル
- README.md: 全体概要
