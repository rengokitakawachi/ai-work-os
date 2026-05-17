# 2026-05-03 routing maturity gap: intake / design routing

## status

close_candidate

## category

routing

## impact

high

## created_at

2026-05-03

## last_touched_at

2026-05-15

## touched_by

active_task_closure

## progress_note

2026-05-15 active execution produced `notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md`.

Scope was corrected to ADAM-only because EVE is not yet operational. The matrix evaluated ADAM routing / review / operations maturity without speculating about EVE maturity.

Result:

- issue routing: partially completed, near operational
- intake routing: not yet operational
- design routing: not yet operational / early partial
- operations rolling: operational with monitoring
- review: partially completed
- runtime / fixture confirmation: operational for validator/runtime-sensitive work
- bug / regression logging: operational method fixed
- handover / restart: partially completed
- test system: partially completed

The original issue can be treated as close_candidate because the maturity gap is now explicitly analyzed and follow-up candidates are dispositioned.

Remaining work is not this issue itself; it is now split into operations candidates:

- current inbox cleanup / intake routing fixture
- design routing minimum fixture
- report template / README hardening
- handover latest index

## routing_hint

close_candidate / follow_up_candidates_in_next_operations

## title

issue routing は運用段階に入ったが、intake routing / design routing は maturity gap が残っている

## observation

2026-05-03 時点で、routing 系の成熟度には差がある。

- issue routing は、実 issue を使った routing / disposition / archive / design 接続まで観測済みで、運用段階に入りつつある
- intake routing は、adapter / split / archive rule の観測はあるが、未整理入力を安定して issue / design / future / archive へ流す運用がまだ薄い
- design routing は、design candidate を 1テーマ1design へ分ける経験は出たが、design review → docs / future / archive / operations candidate への定常 flow がまだ弱い

## resolution

Resolved for ADAM-only maturity matrix scope.

Evidence:

- `notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md`

The issue does not mean all routing domains are complete. It means the maturity gap has been identified, scoped, and split into follow-up candidates.

## completed_condition result

- issue / intake / design routing の成熟度を同じ基準で比較する
  - done in ADAM-only matrix
- intake routing の未充足 completed condition を列挙する
  - done
- design routing の未充足 completed condition を列挙する
  - done
- operations candidate として active / next / future / absorbed の disposition を決める
  - done
- 必要なら Phase 0 plan へ現状評価を反映する
  - not directly updated; analysis note is sufficient for current closure
- 必要なら docs/15 / docs/17 / knowledge への反映候補を分離する
  - docs update candidate identified if plan-driven discovery misses recur

## source_ref

- `notes/08_analysis/2026-05-15_adam_only_phase0_routing_maturity_matrix.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/01_issues/idea_log.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/07_reports/daily/2026-05-14.md`
