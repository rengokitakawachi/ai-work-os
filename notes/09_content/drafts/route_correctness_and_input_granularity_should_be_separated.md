# route correctness と input granularity は分けて進める

## 問題

intake routing の改善では、
route 判定の正しさと入力粒度の改善を同時に直そうとすると、
何が効いたのかが見えにくくなる。

## 背景

今回の `pending_tasks` では、
最小 adapter の時点で route 自体は成立していた。
一方で、1ファイル1item のままだと複数論点混在が残り、
1テーマ1メモと後段処理の扱いやすさが不足していた。

## なぜ重要か

route correctness と input granularity を混ぜると、
routing の失敗なのか、
入力分解不足なのか、
writer や review の扱いづらさなのかが切り分けにくい。

## 解決

先に最小 adapter で route correctness を確認し、
その後に `pending_tasks` 限定で `1見出し = 1item` の split を入れた。

## 学び

粒度改善は必要でも、
route correctness の確認とは別 task に分けた方が安全に進められる。

## 意思決定

- `pending_tasks` の split は adapter で限定実装する
- `まとめ` / `summary` は split item にしない
- split 不成立時は既存の `1ファイル = 1item` にフォールバックする

## Before / After

- Before: route は成立したが複数論点混在が残った
- After: `pending_tasks` では見出し単位 item 化の土台が入った

## メモ（ラフ）

- 次は再観測で `route / 1テーマ1メモ / source_ref / inbox 後処理 / role boundary` を確認する
