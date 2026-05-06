# 開発メモ：2026-03-26（Idea Capture / 課題整理モード設計）

## 1. 背景

- 開発中の会話から多くのアイデア・課題が生まれる
- 現状は手動記録で取りこぼしが発生
- backlog と未整理アイデアの境界が曖昧

---

## 2. Idea Log の再定義

### 誤り
- idea_log を backlog として扱っていた

### 修正
- idea_log = 未整理の一次保存
- backlog = 実行候補

### 構造

ideas → backlog → design → docs/code

---

## 3. 保存構造の決定

### ディレクトリ

notes/
  ideas/
    idea_log.md

### 運用

- 1ファイル追記方式
- 粒度不問
- 思考速度優先

---

## 4. Idea Capture機能

### 目的

会話中のアイデア・課題を即時記録する

### 特徴

- 自然言語トリガー
- 軽量入力
- 未整理状態で保存

---

## 5. 課題整理モード

### フロー

1 モード開始
2 情報収集
3 不足質問
4 構造化
5 案提示
6 承認
7 保存

---

## 6. 関係性

軽い → Idea Capture
重い → 課題整理モード

---

## 7. 本質

Problem Structuring Engine

---

## 8. ADAM / EVE

- ADAM：開発
- EVE：業務

---

## 9. 重要判断

- CaptureとOrganize分離
- idea_logとbacklog分離
- 思考速度優先

---

## まとめ

会話 → 思考 → 記録 → 設計 → 実装 のループ確立
