# Phase1 Todoist API Rearchitecture Plan

## 背景
Phase1 の実運用思想、docs 上の API 責務、既存 Todoist API 実装、2つの GPT の Action スキーマの間にズレがある。

既存コードでは旧 API と新アーキテクチャが混在している。

- 旧系
  - api/task.js
  - api/task-update.js
  - api/task-close.js
  - api/tasks.js
  - api/todo.js
- 新系
  - api/task/create.js
  - api/task/list.js
  - src/services/todoist.js
- 参照アーキテクチャ
  - api/repo-resource.js
  - src/services/repo-resource/common.js
  - src/services/repo-resource/docs.js
  - src/services/repo-resource/notes.js
  - src/services/repo-resource/code.js

## 目的
Phase1 の正式仕様を固定し、Todoist API を新アーキテクチャへ切り替え、最終的に 2つの GPT の Action スキーマを同一化する。

## 合意済みの進行順
1. 03_api_spec.md の改訂方針を固める
2. create / list / update の Phase1 正式 payload を決める
3. 旧 API と新 API の移行方針を決める
4. 2つの GPT のスキーマを同一化する

## Phase1 の実運用思想
- Phase1 のゴールは Todoist を実用レベルで使いこなすこと
- 現フェーズでは知能的処理は GPT 側が担う
- GPT は依頼内容の解釈、タスク名整形、説明生成、ラベル付与、サブタスク分解を行う
- service は入力検証、Todoist 形式への変換、外部連携を行う
- Phase3 では Obsidian 基盤を用いた service 側の知能化を視野に入れる

## 改訂方針の骨子
### 03_api_spec.md
- create の責務を Phase1 実態に合わせて再定義する
- 現フェーズでは GPT 前処理を前提とする
- API は薄く保つ
- service は検証と外部連携を担う
- 正式エンドポイントは /api/tasks 系に統一する
- 旧 API は互換層として扱う

### payload 方針
- create は GPT 整形済み構造化入力を受ける
- list は Phase1 の実運用に必要な取得条件を定義する
- update は更新と完了を一元化する

### 実装方針
- repo-resource の handler / validate / dispatch / service 分離を参考にする
- Todoist API でも request validation と service 集約を明確にする
- 旧 API は新 service を呼ぶ互換層へ段階移行する

## 次に固めるべき論点
- create payload の正式項目
- subtasks の登録方式
- list query の正式項目と拡張項目
- update で扱う完了表現
- 旧 API 廃止までの移行段階
- 2 GPT に配布する OpenAPI スキーマの最終形
