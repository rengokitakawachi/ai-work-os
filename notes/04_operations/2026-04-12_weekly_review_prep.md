# 2026-04-12 weekly_review_prep

## 目的

weekly review に渡すために、
現時点の active / next / archive の材料を 1 枚に整理する。

このメモ自体は weekly review ではなく、
weekly review を実行しやすくするための準備物とする。

---

## 今週ここまでの完了 task

### archive にある完了 task

- `conversation routing を 1 件フルフローで実運用検証する`
- `active-first execution 原則で operations 運用を 1 周試す`
- `classification_and_routing_spec の扱いを決める`
- `web 版 GPT editor で ADAM instruction の最新変更を反映する`
- `Phase 0 plan に対する現行 operations の接続を見直す`

### 会話上で完了が確認できている task

- `web 版 GPT editor で ADAM instruction の最新変更を反映する`
- `web 版 GPT editor に ADAM instruction と schema の今回の更新を反映する`

補足

- 上記 2 件は会話上で完了確認済み
- operations 上は次の daily review まで active に残っていてよい
- weekly review では、archive / snapshot / active からの外し方を整理対象に含める

---

## 現在の active carry-over

### Phase 0 直結

- `docs 反映候補として execution governance 変更点を整理する`
- `conversation routing と execution governance の試験結果を handover / report に返す準備をする`

### 補助

- `next_operations 上位候補を再評価する`
- `Day6 補充候補を reroll 観点で選定する`

### 完了認識済みだが active に残ってよいもの

- `web 版 GPT editor で ADAM instruction の最新変更を反映する`
- `web 版 GPT editor に ADAM instruction と schema の今回の更新を反映する`

---

## next_operations のうち weekly review で優先再評価するもの

### Phase 0 直結

- `review system と operations rolling の接続ルールを design 観点で確認する`
- `Phase 0 完了条件に対する未充足項目を洗い出す`

### 補助だが判断材料として有用

- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`
- `docs / notes / instruction の operations 周辺未反映差分を一覧化する`

---

## weekly review で確認すべき論点

### 1. Phase 0 の現在地

- `Phase 0 直結 / 補助` の整理結果で、Phase 0 の完了条件にどこまで近づいたか
- `intake routing`
- `ADAM 固有 / EVE 共通骨格の分離`
  を true gap として次週へ残すか

### 2. operations の整合

- active に残っている完了認識済み task を weekly review でどう扱うか
- archive_operations を今週 snapshot 候補としてどこまで増やすか
- GPT editor 反映 2 件を archive へ移す前提が妥当か

### 3. 次週の重点

- `docs 反映候補として execution governance 変更点を整理する`
- `conversation routing と execution governance の試験結果を handover / report に返す準備をする`
  を次週前半の中核に置くか
- `Phase 0 完了条件に対する未充足項目を洗い出す`
  を active へ繰り上げるか

### 4. weekly report で返すべきこと

- operations 判断誤りの再発防止を instruction / schema / operations に反映したこと
- Phase 0 と現行 operations の接続を可視化したこと
- 次週の焦点が
  - execution governance の返却
  - Phase 0 未充足整理
  に移ったこと

---

## 推奨進行順

1.
archive / active / next の現状を確認する

2.
Phase 0 の現在地を確認する

3.
active に残る完了認識済み task の扱いを決める

4.
next から active に上げる候補を決める

5.
weekly report に今週の成果と次週重点を書く

---

## 結論

weekly review に渡す材料としては、
すでに以下が揃っている。

- 今週の完了 task
- active / next の Phase 0 位置づけ
- 完了認識済みだが active に残る task
- 次週に向けた直結論点

したがって、
weekly review では新規材料集めよりも、
整合確認と次週方針決定に集中できる状態である。
