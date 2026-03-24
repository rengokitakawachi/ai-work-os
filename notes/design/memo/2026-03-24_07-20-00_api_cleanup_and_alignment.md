# API整理と正式API整合メモ

## 目的

正式API (/api/tasks 系) の仕様と実装のズレを解消し、旧APIを削除可能な状態にする。

---

## 背景

- Vercel無料版の制約によりAPI数は最大12
- 現在ちょうど12本存在している
- 旧APIが残っており、重複構造になっている

---

## 現状整理

### 正式API

- /api/tasks
- /api/tasks/:id

### 旧API

- /api/task
- /api/task-update
- /api/task-close
- /api/task/create
- /api/task/list
- /api/todo

---

## 問題

### 1. API数制約

- 新規API追加不可
- 旧API維持コストが高い

### 2. 仕様ズレ

- list API の status は Todoist APIに存在しない
- validate では open/closed を許可しているが実態は open のみ

### 3. 二重構造

- task系APIが2系統存在
- service層の利用が不統一

---

## 方針

### 1. 正式API優先

- /api/tasks 系を唯一の正とする

### 2. 仕様の最小修正

- list の status は open のみ許可
- validate を修正

### 3. 旧API削除

削除対象

- api/task.js
- api/task-update.js
- api/task-close.js
- api/task/create.js
- api/task/list.js
- api/todo.js

---

## 判断理由

- EVEは正式APIのみ使用
- handoverでも新API移行済み
- 互換レイヤーを維持するメリットがない

---

## 次アクション

1. validate修正
2. docs整合
3. 旧API削除
