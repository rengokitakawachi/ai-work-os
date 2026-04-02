# Conversation Idea / Issue Capture Feature Draft

## 目的

ADAM との会話中に生まれたアイデア・課題・違和感を、その場で記録し、後から整理・昇格できるようにする。

本機能は、会話ログそのものを保存することではなく、会話から抽出された開発ネタを構造化して残すことを目的とする。

---

## 背景

現状でも notes に手動でメモは残せるが、以下の課題がある。

- 会話中の気づきを取りこぼしやすい
- backlog に入れる前の未整理ネタの保存先が曖昧になりやすい
- 開発ネタ化できる論点と一時的な雑談が混在する
- 記録後の整理ルールが未固定

---

## 結論

以下の二段階構造とする。

### 1. Capture

会話中に発生したアイデア・課題を即時保存する。

保存先

- notes/ideas/idea_log.md

役割

- 粒度を問わず記録する
- 未整理状態のまま残せる
- 1ファイル追記方式で運用する

### 2. Organize

記録済みの項目を後から整理し、必要なものを backlog / design / roadmap へ昇格する。

昇格先

- notes/backlog/dev-backlog.md
- notes/design/
- notes/design/roadmap/
- notes/design/streams/

---

## 機能要件

### A. 会話中キャプチャ

ユーザーの発話または ADAM との会話内容から、以下を記録できるようにする。

- アイデア
- 課題
- 違和感
- 改善案
- 将来やりたいこと

### B. 軽量入力

以下のような自然文トリガーで記録できるようにする。

- これメモして
- これアイデアとして残して
- これ課題として残して
- これ後で検討したい
- さっきの論点を記録して

### C. 最小構造化

idea_log には最低限以下を残す。

- id
- title
- category
- description
- context
- impact
- status
- created_at

### D. 昇格導線

記録済み項目に対して、後から以下を実行できるようにする。

- backlog 候補化
- design 化
- roadmap 反映候補化
- done 化

---

## 保存形式

### 初期方針

- notes/ideas/idea_log.md に 1ファイル追記方式で保存する

理由

- 会話中の入力摩擦を最小化できる
- 未整理ネタの一次保存に向く
- 後から個別ファイル化しやすい

---

## idea_log フォーマット案

```text
## YYYY-MM-DD

### YYYYMMDD-001
- title:
- category: bug | ux | api | sync | architecture | ops | idea
- description:
- context:
- impact: low | medium | high
- status: open | in_review | planned | done
- created_at:
```

---

## 操作案

### 1. captureIdea

目的

- 会話中の論点を即時記録する

入力

- title
- category
- description
- context
- impact

保存先

- notes/ideas/idea_log.md

操作

- append を使用する

### 2. organizeIdeas

目的

- idea_log の未整理項目を見直す
- 昇格先を判断する

出力候補

- backlog へ移す
- design 草案化する
- roadmap 候補に入れる
- 状態更新する

---

## 期待効果

- 会話から生まれる開発ネタを捨てない
- backlog と design の前段を明確にできる
- 実装前の思考を蓄積できる
- ADAM との対話を機能開発に接続しやすくなる

---

## 非対象

- 会話全文の保存
- 自動要約によるすべての発話保存
- 即時の優先順位付け

---

## リスク

- 記録が増えすぎる
- 未整理のまま溜まる
- backlog と idea_log の境界が曖昧になる

対策

- 週次 review を行う
- planned に昇格したものだけ backlog / roadmap へ反映する
- idea_log は一次保存、backlog は実行候補と定義分離する

---

## 次アクション

- notes/ideas/ ディレクトリ運用を正式化する
- idea_log の保存先を backlog から ideas に変更する
- capture トリガー文を ADAM Instructions に追加する
- organize flow を design 化する
