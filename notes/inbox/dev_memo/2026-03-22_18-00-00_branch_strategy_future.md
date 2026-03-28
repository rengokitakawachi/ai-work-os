# Branch Strategy (Future Plan)

## 概要
現在は GitHub main ブランチ上で直接開発を行っているが、将来的に branch ベース開発へ移行する方針を決定。

---

## 背景
- Todoist API 開発や GPT スキーマ更新など、変更範囲が拡大している
- docs / code / GPT スキーマの整合を安全に保つ必要がある
- main 直開発ではリスクが増大する

---

## 方針
当面は main 直開発を継続しつつ、以下のタイミングで branch 運用へ移行する

### 移行タイミング
- Todoist API 正式化完了後
- API / docs / GPT スキーマの基本構造が安定した段階

---

## 将来運用（案）

### ブランチ種別
- feature/...（新機能）
- fix/...（バグ修正）
- docs/...（仕様修正）

### 原則
- 1目的1ブランチ
- docs と code は同一目的なら同一ブランチで扱う
- main へは検証後に反映

---

## 目的
- 開発の安全性向上
- docs と code の整合維持
- GPT スキーマ変更のリスク低減

---

## 現在の運用
- main 直開発を継続
- branch 運用は未導入

---

## 次のアクション
- Todoist API 正式化
- GPT スキーマ更新
- その後 branch 運用へ移行
