# notes delete API draft

## 目的

notes resource に対してのみ delete を導入する。

誤作成ファイル、一時メモ、不要化した検討メモを repo-resource API 経由で安全に削除できるようにする。

---

## 背景

現行の repo-resource API は notes に対して read / create / update を提供している。

しかし delete が存在しないため、以下の運用上の問題がある。

- 誤作成した notes を API 経由で除去できない
- 一時メモが蓄積しても整理完了できない
- notes は補助レイヤーであるにもかかわらず、運用上は半永久保存になっている

docs は SSOT であり read only を維持する。

code は docs 従属であり、削除は現時点では導入しない。

このため、delete は notes に限定して導入する。

---

## 方針

- delete は notes resource のみ許可する
- docs では delete を許可しない
- code では delete を許可しない
- API 層は薄く保つ
- 削除ロジックは service 層に集約する
- エラーは既存の構造化形式に従う
- 削除時も request_id により追跡可能にする

---

## 追加仕様

### action 追加

### delete

既存ファイルを削除する。

notes resource にのみ使用する。

---

## API 仕様

### notes 削除

エンドポイント

POST /api/repo-resource?action=delete&resource=notes

概要

notes 配下の既存ファイルを削除する。

リクエスト例

{
  "file": "exploration/memo/example.md"
}

レスポンス例

{
  "ok": true,
  "data": {
    "path": "notes/exploration/memo/example.md",
    "sha": "xxx",
    "status": "DELETED"
  },
  "request_id": "REQ_ID"
}

---

## 許可範囲

初期導入では delete 対象を notes 全域ではなく、以下に限定する。

- notes/inbox/
- notes/exploration/
- notes/logs/

以下は初期導入では delete 対象外とする。

- notes/design/
- notes/decisions/
- notes/backlog/
- notes/README.md

理由

- design は docs 直前の草案であり、軽率な削除を避ける
- decisions は意思決定ログであり、履歴価値が高い
- backlog は次アクション管理の中核であり、誤削除の影響が大きい
- ルート README は構造理解の基盤である

---

## バリデーション

delete 実行時は以下を満たす必要がある。

- method は POST
- resource は notes
- action は delete
- file は必須
- file は notes 許可パス内であること
- file は delete 許可ディレクトリ配下であること
- path traversal を禁止する

不正な場合は INVALID_REQUEST または ACTION_NOT_SUPPORTED を返す。

---

## service 層責務

notes delete の責務は service 層に置く。

service は以下を担当する。

- file から GitHub path を解決する
- 対象ファイルの存在確認を行う
- 現在 sha を取得する
- GitHub Contents API により削除する
- 削除結果を整形する
- 構造化エラーを生成する

API 層は validate / dispatch / response / error normalize のみ担当する。

---

## エラー仕様

### 想定エラー

- INVALID_REQUEST
- ACTION_NOT_SUPPORTED
- NOT_FOUND
- CONFLICT
- GITHUB_ERROR
- GITHUB_RATE_LIMIT
- UPSTREAM_TIMEOUT
- UPSTREAM_5XX
- UNKNOWN_ERROR

### delete 固有の step 例

- deleteNote
- githubDelete

### retryable 原則

- validation は false
- routing は false
- not found は false
- conflict は false
- upstream timeout は true
- upstream 5xx は true
- rate limit は true

---

## 実装方針

### handler

api/repo-resource.js に以下を追加する。

- validatePost で notes + delete を許可する
- dispatchPost で deleteNote を呼ぶ
- code + delete は ACTION_NOT_SUPPORTED
- docs + delete は ACTION_NOT_SUPPORTED

### notes service

src/services/repo-resource/notes.js に以下を追加する。

- delete 許可パス判定
- deleteNote(file, message, sha)

### common service

src/services/repo-resource/common.js に以下を追加する。

- GitHub delete request helper
- 必要なら delete 用 path validation helper

---

## レスポンス方針

削除成功時は既存 create / update と同粒度で返す。

- path
- sha
- status = DELETED

必要以上の本文返却は行わない。

---

## 非対象

以下は今回の対象外とする。

- docs delete
- code delete
- ディレクトリ削除
- 複数ファイル一括削除
- 論理削除
- 復元 API

---

## 判断

notes は SSOT ではない。

そのため、delete を最初に導入する resource として妥当である。

ただし notes 全域 delete は運用リスクがあるため、初期導入は低リスク領域に限定する。

この仕様は、安全性を保ちつつ notes 運用の詰まりを解消するための最小導入とする。

---

## 次アクション

1
この草案を前提に repo-resource 実装差分を設計する

2
10_repo_resource_api.md への反映差分を整理する

3
実装後に docs と code の整合を再確認する
