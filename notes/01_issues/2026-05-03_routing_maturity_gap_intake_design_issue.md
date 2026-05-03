# 2026-05-03 routing maturity gap: intake / design routing

## status

open

## category

routing

## impact

high

## created_at

2026-05-03

## title

issue routing は運用段階に入ったが、intake routing / design routing は maturity gap が残っている

## observation

2026-05-03 時点で、routing 系の成熟度には差がある。

- issue routing は、実 issue を使った routing / disposition / archive / design 接続まで観測済みで、運用段階に入りつつある
- intake routing は、adapter / split / archive rule の観測はあるが、未整理入力を安定して issue / design / future / archive へ流す運用がまだ薄い
- design routing は、design candidate を 1テーマ1design へ分ける経験は出たが、design review → docs / future / archive / operations candidate への定常 flow がまだ弱い

## why it matters

Phase 0: Common Operating Model Foundation では、以下4テーマを1つずつ運用可能にする必要がある。

- intake routing
- issue routing
- design routing
- テストシステム

issue routing だけが先に運用段階へ進むと、未整理入力と design layer の滞留が残り、routing / review / operations の流れが片側だけ強くなる。

## route_hint

- route_to: operations_candidate

## operations_candidate

候補 task:

1. intake routing の第二バッチ運用観測を行う
2. design routing の最小 fixture を実行し、docs / future / archive / operations candidate への流れを観測する
3. Phase 0 routing maturity matrix を作り、issue / intake / design の完成条件差分を整理する

## completed_condition

- issue / intake / design routing の成熟度を同じ基準で比較する
- intake routing の未充足 completed condition を列挙する
- design routing の未充足 completed condition を列挙する
- operations candidate として active / next / future / absorbed の disposition を決める
- 必要なら Phase 0 plan へ現状評価を反映する
- 必要なら docs/15 / docs/17 / knowledge への反映候補を分離する

## source_ref

- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/01_issues/idea_log.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
