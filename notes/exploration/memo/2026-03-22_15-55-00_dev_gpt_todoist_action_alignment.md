# Dev GPT Todoist Action Alignment

## 背景
開発用GPTに、既存の「AI Work OS」GPTで利用しているTodoist Actionスキーマを追加したい要求がある。

## 現在確認できた事実
- docs/03_api_spec.md では以下を正式仕様としている
  - POST /api/tasks
  - PATCH /api/tasks/:id
  - GET /api/tasks
- 一方、既存GPTで実運用中のOpenAPIスキーマでは以下を使用している
  - POST /api/task
  - GET /api/tasks
  - POST /api/task-update
  - POST /api/task-close

## 解釈
- 実運用APIとdocsの間に命名・責務の不整合がある
- ただし、ユーザー要求は「開発用GPTにも同じ機能を追加したい」であり、短期的には既存OpenAPIスキーマをそのまま開発用GPTへ設定するのが最短
- 中長期的には docs を実装実態に合わせるか、API を docs に寄せるかの整合判断が必要

## 推奨方針
### 短期
- 開発用GPTに既存OpenAPIスキーマをそのまま追加する
- operationId は以下を維持
  - createTask
  - listTasks
  - updateTask
  - closeTask

### 中期
- docs/03_api_spec.md を再確認し、正式仕様を以下のどちらかへ統一する
  1. 実装に合わせる
  2. 実装を docs に合わせて /api/tasks 系へ寄せる

## 注意点
- 開発用GPTへのAction追加はリポジトリ操作ではなくGPT設定作業
- 本セッションではGPT設定UIそのものは直接更新できないため、投入用スキーマを提示するのが実行可能範囲
