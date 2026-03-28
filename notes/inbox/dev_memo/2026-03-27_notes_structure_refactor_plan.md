# 開発メモ：2026-03-27（notesフォルダ構造リファクタ計画）

## 背景

notesフォルダの構造が視覚的に分かりにくく、
GitHub上で目的のファイルを探す際に迷う問題がある。

READMEに定義された思考フロー（inbox → exploration → design）と
実際のフォルダ構造が一致していない。

---

## 目的

フォルダ構造を「思考順 × 責務」で再設計し、
見ただけで役割と順序が理解できる状態にする。

---

## 採用構造

notes/
  00_inbox/
  01_ideas/
  02_exploration/
  03_design/
  04_decisions/
  05_backlog/
  06_operations/
  07_handover/
  08_reports/
  09_logs/
  99_archive/

---

## 設計ポイント

- 番号は思考順を表す
- フォルダ名は責務を表す
- 主線（inbox → exploration → design）を維持
- backlogは実行接続レイヤーとして後段に配置
- decisions / logs は独立レイヤーとして維持

---

## 移行方針

- いきなり移動しない
- 移行設計を作成してから実行する
- コピー → 検証 → 削除 の順で進める

---

## 今回の判断

- logs は 99 ではなく正式レイヤーとして扱う
- decisions は design に統合せず独立維持
- backlog は design の後段に配置する

---

## 次アクション

- フォルダ移行設計を作成する
- 各ファイルの移動先マッピングを作る
- README更新範囲を特定する
- 安全な移行手順を定義する
