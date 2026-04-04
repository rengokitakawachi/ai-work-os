# 2026-04-04 Operations Active / Archive Model Light Draft

## 目的

operations の正本ファイル命名と archive 運用を整理する。

現在の `notes/04_operations/2026-03-26_short_term_plan.md` は、
作成日ベースであり、短期実行順の正本であることが名前から読み取りにくい。

本メモでは、

- active_operations を短期実行順の正本にする
- archive_operations は履歴保存として限定的に使う
- future に operations を置くことは原則としない
- active → archive の移行は weekly review で判定する

という方針を軽量に整理する。

---

## 結論

- `notes/04_operations/active_operations.md` を短期実行順の正本候補とする
- operations は単一継続更新ファイルを基本とする
- future に operations を置くことは原則としない
- 旧 operations の履歴保存が必要なときのみ archive する
- archive 判定は weekly review の中で行う

---

## 理由

### 1. 命名

日付ベースのファイル名より、責務ベースのファイル名の方が正本として読みやすい。

- `2026-03-26_short_term_plan.md`
より
- `active_operations.md`
の方が、役割が明確。

### 2. future に operations を置かない

operations は「今やる順番」であり、保留した時点で operations ではなくなる。

保留すべきものは、
plan / issue / future item に戻す方が自然。

### 3. archive は履歴用途

operations の過去状態には、
優先順位の変遷や詰まり方の履歴として価値がある。

ただし、毎回 archive するのではなく、
大きな再構成や phase / plan 切替時に限定する方が軽い。

---

## 推奨構造

- `notes/04_operations/active_operations.md`
- `notes/99_archive/operations/archive_operations_YYYY-MM-DD.md`

---

## フロー

roadmap
↓
plan
↓
active_operations
↓
daily review
↓
active_operations 更新
↓
weekly review
↓
active_operations 継続 / 再構成 / archive 判定
↓
archive_operations

---

## weekly review での扱い

weekly review では以下を行う。

1. 現 active_operations を確認する
2. 完了 / 継続 / 持越しを整理する
3. active_operations を更新する
4. 大きな再構成や phase / plan 切替がある場合のみ archive を生成する

---

## archive 条件

以下のいずれかを満たす場合に archive 候補とする。

- active_operations の構造が大きく変わる
- phase / plan の切替が起きる
- 旧 active_operations が正本でなくなる
- 履歴として残す価値がある節目である

---

## 当面の扱い

- まず issue と operations に反映する
- その後、review system / operations generation rules / notes system との整合を見て design を昇格する
- 実ファイル rename は方針固定後に行う
