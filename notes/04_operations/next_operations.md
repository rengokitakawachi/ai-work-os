# next_operations

## 概要

active_operations の次に来る近未来候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` にまだ入れないが、
近い将来やる前提のタスクを置くレイヤーとする。

---

## 位置づけ

- active_operations の次候補
- 近未来の実行候補
- backlog ではない
- future の代替ではない

---

## タスク

- 

---

## ルール

- active に入りきらないタスクを置く
- 必要に応じて日付情報を持てる
- 優先順位の厳密な全順序は持たなくてよい
- Day6 の候補プールとして扱う
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- backlog 化しない
- 80_future の代替として使わない
