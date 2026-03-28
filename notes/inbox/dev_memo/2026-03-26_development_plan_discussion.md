# 開発メモ：2026-03-26（全体開発計画の議論）

## 1. 背景

- 実装に入る前に全体の開発計画が必要
- 個別ストリーム（Strategy / Todoist）だけでは不十分
- システム全体を俯瞰したマスタープランが必要

---

## 2. 計画の分離

### 全体開発計画

- システム全体のフェーズ定義
- 各領域（Strategy / Execution / Schedule / Knowledge / Review）を包含

### 個別実装計画

- 特定ストリームの詳細設計
- 例：Strategy Domain ↔ Todoist Sync

---

## 3. 正しい構造

全体計画
  └ ストリーム計画

---

## 4. フェーズ構造

Phase 0 基盤整備
Phase 1 Execution MVP
Phase 2 Strategy 導入
Phase 3 Knowledge / Repo Integration
Phase 4 Schedule / Communication
Phase 5 Review / Optimization
Phase 6 Full AI Work OS

---

## 5. 配置方針

- overall_development_plan → notes/design（後にdocsへ昇格）
- streams → notes/design/streams

---

## 6. docsとの関係

- design = 未確定
- docs = SSOT

---

## 7. backlog / ideaとの関係

idea_log → backlog → design → docs

---

## 8. 重要判断

- 計画は階層化する
- 全体と個別を混ぜない
- designで確定させてからdocsへ

---

## まとめ

開発計画は「全体」と「個別」に分離することで、
スケール可能で整合性のある構造になる。
