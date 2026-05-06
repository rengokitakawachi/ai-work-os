# operations should be split into now next and snapshot

## title

operations は now / next / snapshot の時間層で分けると運用しやすい

## hook

短期実行管理で壊れやすいのは、
やることそのものより、
「今やるもの」「次にやるもの」「終わったもの」が
同じ場所に混ざることだ。

## core idea

operations を単なる task list ではなく、
時間層で分けると運用が安定する。

- active_operations = now
- next_operations = near future
- archive_operations = this week snapshot buffer
- 99_archive = long-term history

この分け方の利点は、
状態よりも時間軸で役割が見えることにある。

`standby` は「待機」に見えるが、
実際に必要なのは「次に来る候補」であり、
その意味では `next` の方が正確だった。

また archive は整理してから保存するより、
weekly review でそのまま snapshot 保存した方が継続しやすい。

## angle

- 命名は語感ではなく責務で決める
- archive は分析の場ではなく保存の場
- 実行レイヤーは now / next / history を混ぜない方が強い

## source_ref

- notes/02_design/2026-04-05_operations_next_archive_snapshot_model.md
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md
- notes/04_operations/archive_operations.md
- docs/17_operations_system.md
