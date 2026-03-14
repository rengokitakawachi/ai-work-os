# AI Work OS トラブルシューティング

本ドキュメントは、AI Work OS 開発時に発生した不具合とその原因、再発防止策をまとめたものである。  
今後の開発では、本ドキュメントをトラブル切り分けの基準（SSOT）として扱う。

---

# 1 Vercel 設定の複雑化

## 問題

初期構成で以下の設計を行った。

- src/api を入口にする
- vercel.json で rewrite
- runtime を個別指定

その結果、Vercel ビルドで以下のエラーが発生した。

Function Runtimes must have a valid version

## 原因

Vercel の標準構成から外れた設定を行ったため、  
runtime 設定とルーティング設定が競合した。

## 再発防止

Vercel の構成は原則として以下に統一する。

- API関数は **api/** 配下に配置
- **vercel.json は最小構成**
- Node バージョンは以下で管理

package.json  
または  
Vercel Project Settings

---

# 2 ファイル名と配置のミス

## 問題

以下のミスが発生した。

- api/tasks を作るつもりで  
  `tasks`（拡張子なし）を作成
- `task.js` を誤って上書き

結果として

- 登録API
- 一覧API

が混線した。

## 再発防止

API追加時は必ず次を確認する。

### ファイル名

例

api/task.js  
api/tasks.js  
api/task-update.js  
api/task-close.js  

### 役割

| ファイル | 役割 |
|--------|------|
| task.js | タスク登録 |
| tasks.js | タスク一覧 |
| task-update.js | タスク更新 |
| task-close.js | タスク完了 |

---

# 3 Todoist API バージョン混乱

## 問題

以下のエンドポイントを混在させてしまった。

api/v1  
rest/v2  
rest/v1  

その結果

410 Gone  
This endpoint is deprecated

が発生した。

## 再発防止

Todoist API は **Unified API v1** を正本とする。

使用エンドポイント

api/v1/tasks

使用操作

- タスク登録
- タスク一覧
- タスク更新
- タスク完了

すべて **api/v1** に統一する。

---

# 4 更新APIの送信形式ミス

## 問題

更新 API で Todoist が認識するパラメータが空扱いになった。

エラー

400  
At least one of supported fields should be set and non-empty

## 原因

GPT 側のパラメータ名と  
Todoist API 側のパラメータ名が一致していなかった。

## 再発防止

更新 API は  
**Todoist API のパラメータ名と一致させる**

例

due_string

をそのまま送信する。

---

# 5 エラー分類を行っていなかった

今回のトラブルは複数エラーが混在していた。

| ステータス | 意味 |
|-------------|------|
| 404 | URLまたは関数が存在しない |
| 405 | HTTPメソッドが違う |
| 400 | 送信内容不正 |
| 410 | APIが廃止 |
| 500 | サーバー内部エラー |

## 再発防止

エラーが出たら **最初に分類する**

404 → 配置ミス  
405 → メソッド確認  
400 → payload  
410 → APIバージョン  
500 → サーバー実装  

---

# 6 トップページ404とAPI404の混同

例

https://ai-work-os.vercel.app

が 404 でも

/api/task-update

が正常に動く場合がある。

これは

- トップページ未実装
- APIは正常

という状態である。

## 再発防止

確認対象は

/api/...

の応答で判断する。

---

# 最終教訓

今回の不具合は  
コードの難易度ではなく、

- 構成
- APIバージョン
- 送信形式
- エラー分類

の確認不足が主因だった。

---

# AI Work OS 開発チェックフロー

開発時は必ず以下の順で確認する。

1 ConsoleでAPIテスト  
2 status と body を確認  
3 エラーコードを分類  

これにより

- GPTs問題
- Vercel問題
- Todoist問題

を迅速に切り分けることができる。
