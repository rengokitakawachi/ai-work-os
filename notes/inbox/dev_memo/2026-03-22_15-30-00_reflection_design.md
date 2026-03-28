# Reflection機能設計メモ

## 概要
AI Work OSにおける「reflection（振り返り）」機能の将来的な実装方針を整理する。

---

## 位置付け

reflectionはReview Layerの中核機能とする。

Knowledge → Strategy → Execution → Review → Improve

のサイクルにおける「Review」を担う。

---

## 基本思想

- AIは「思い出す・整理する」を担当
- 人間は「考える・判断する」を担当
- AIは答えを出さず、問いのみ生成する

---

## システム構成（将来）

ユーザー
↓
AI UI（ChatGPT）
↓
Vercel API
├ Todoist（タスク）
├ Outlook（予定）
├ Notes / Obsidian（知識）
↓
Reflection生成
↓
問い出力
↓
ユーザー回答
↓
Obsidian保存

---

## API設計（案）

### generate
POST /api/reviews/reflection/generate

- 当日のタスク
- 完了/未完了
- 予定との差分

→ 問いのみ生成

---

### save
POST /api/reviews/reflection/save

- 回答を保存
- Markdown整形
- GitHub経由でObsidianへ


---

### get
GET /api/reviews/reflection

- 過去の振り返り取得

---

## データ構造（案）

```markdown
---
type: reflection
date: YYYY-MM-DD
---

# Daily Reflection

## Facts

## Questions

## Answers

## Insights
```

---

## 問い生成ルール

- 抽象的な問いは禁止
- 必ず事実データに基づく

例：

NG：
- 今日何を学びましたか？

OK：
- Aタスクを後回しにした理由は？
- 想定より時間がかかった原因は？

---

## 実装フェーズ

### Phase1
- ChatGPT上で手動運用

### Phase2
- generate/save API実装

### Phase3
- Obsidian連携
- 過去データ活用

---

## 重要制約

- AIは回答を生成してはいけない
- 思考・判断・内省は人間が行う

---

## 本質

reflectionは

「人間に考えさせるための仕組み」

である
