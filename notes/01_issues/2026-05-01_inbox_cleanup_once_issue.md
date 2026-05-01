# 2026-05-01 inbox cleanup once issue

## title

現在の inbox を一回整理する

## category

operations / routing cleanup

## status

open

## created_at

2026-05-01

## source_ref

- notes/02_design/2026-05-01_routing_type_destination_constraints.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- user clarification: current inbox contains unrelated test clips and temporary structure mistakes

---

## description

現在の `notes/00_inbox` には、開発時のテストで clip した本システムと無関係な file が含まれている。

また、本来は `web` や `dev_memo` に入れるべき file が、開発時の都合で inbox 直下に置かれているものがある。

さらに、inbox 配下に余計な下層 folder がある場合、それは正規構造ではなく構造ミスとして扱う。

これらは恒久 rule として knowledge に常設するより、一回限りの inbox cleanup issue として処理する方が適切である。

---

## cleanup scope

### delete allowed

本システムと無関係な test clip は削除してよい。

条件:

- AI Work OS / ADAM / EVE / DELTA / 開発運用 / 設計 / 実装 / content seed のいずれにも接続しない
- source_ref として残す価値がない
- future / design / issue / operations / content へ送る価値がない
- ユーザーが test clip / 無関係情報として削除可と明示している

### inbox direct child normalization

本来 `web` や `dev_memo` に入れるべき file が inbox 直下にある場合、内容に応じて該当 subtype とみなしてよい。

処理候補:

- web information
- dev memo
- raw memo
- user memo
- imported article

必要に応じて正しい場所へ move するか、routing 後に archive / future / design / issue / operations candidate へ送る。

### nested folder cleanup

inbox 配下にさらに下層 folder がある場合、それは構造ミスとして扱う。

処理方針:

1. 下層 folder 内の file を読む
2. 内容に応じて分類する
3. 必要な file は正しい場所へ移す
4. 不要な file は delete candidate とする
5. 中身処理後、下層 folder が残らないようにする

---

## completed_condition

- `notes/00_inbox` の current tree を確認する
- 本システムと無関係な test clip を列挙する
- delete candidate ごとに削除理由を明示する
- inbox 直下の web / dev_memo 相当 file を分類する
- inbox 配下の余計な下層 folder を列挙する
- 下層 folder 内 file の移動 / routing / delete 方針を決める
- delete 前に対象と影響範囲を確認する
- Write Gate 後に delete / move を実行する
- write 後に read-back / NOT_FOUND / destination 確認を行う
- cleanup 結果を routing session summary または cleanup report に記録する

---

## placement judgment

この issue は一回限りの cleanup issue であり、恒久的な knowledge rule ではない。

`adam_knowledge.md` には常設しない。

必要なら daily / weekly review または dedicated routing session で active / next / future へ rolling する。
