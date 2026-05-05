# 2026-05-05 DELTA operations generation engine

## status

implementation_required

## trigger

User reported that DELTA operations generation still required manual correction and did not autonomously derive D0-D6 active operations and D7-target next operations from roadmap / plan / current_position.

This is not a single prompt issue. It is a missing generation and validation layer.

## purpose

Enable DELTA, after daily review, to read roadmap, plan, current_position, daily history, user_capacity, special_days, and material_scope, then autonomously generate, validate, and write:

- Active operations: D0-D6
- Next operations: D7 through medium target date

The generated operations must be quantitative, realistic, special-day-aware, and plan-fit checked.

## source files

- `systems/delta/roadmap/delta_roadmap.md`
- `systems/delta/plan/2026_sharoushi_exam_plan.md`
- `systems/delta/operations/active_operations.md`
- `systems/delta/history/daily/YYYY-MM-DD.md`
- `systems/delta/config/delta_instruction.md`
- `systems/delta/config/delta_schema.yaml`
- `src/services/delta-operations.js`

## gap observed

- D0-D6 rolling window was not always preserved.
- L1/L2 targets could be vague, such as 前半 / 完了方向 / 進める.
- L3 targets could be vague, such as Qx以降 / Qx-last / 着手.
- 2026-06-30 target was not reverse planned into realistic daily load.
- D0-D6 was not connected to D7-target next operations.
- user_capacity, special_days, annual leave, and L3 unavailable days were not automatically reflected.

## target components

### operation_rolling_window_generator

Generates and preserves D0-D6 after daily review.

Required per day:

- plan_anchor
- expected_position
- current_position
- gap_status
- operation_mode
- must_line
- standard_line
- stretch_line
- recovery_targets
- defer_targets
- recompute_triggers

If any day or required field is missing, operations are incomplete and must not be written.

### next_operations_projection_generator

Generates D7-target_date plan when a medium target exists.

For example, if 2026-06-30 is the required 1st-pass completion date, active_operations must include Next operations from D7 through 2026-06-30.

### quantitative_target_validator

Requires quantitative targets.

L1/L2 required format:

- `科目 L1/L2 P開始〜P終了（nページ）`

L3 required format:

- `科目 L3 選択/択一 Q開始〜Q終了（n問）`

Forbidden vague terms include:

- 前半
- 後半
- 終盤
- 完了方向
- 進める
- 接続判断
- 未消化ページ回収のみ
- できるところまで
- Qx以降
- Qx-last
- 章の最後まで
- 択一入口
- 着手
- 未達分回収のみ

Known exceptions must be explicit:

- 国民年金法 Q10-0 は演習対象なし
- 健康保険法 Q5/Q6 は存在しない
- 健康保険法 Q8 は演習対象なし

### load_realism_guard

Checks load realism before write.

Standard / guard values:

- L1/L2: standard 40 pages, warn above 50 pages
- L3 selected: standard 24 questions
- L3 multiple choice: standard 16 questions, warn above 25 questions
- second-pass sorting: split above 30 questions

If overload appears, DELTA must try:

1. pull work forward into D0-D6
2. mix L1/L2 20-35 pages after L3 day if feasible
3. move L3 to weekend / annual leave
4. respect weekday L3-unavailable constraints
5. if still impossible, mark compression_required or critical_delay

### reverse_planning_engine

Generation order:

1. read roadmap milestone
2. read plan intermediate target
3. read current_position
4. expand medium plan by day
5. detect overload
6. redistribute overload into D0-D6 or spare days
7. write D0-D6 as Active operations and D7-target as Next operations

### special_day_constraint_handler

Required example constraints:

- 2026-05-10: L3 unavailable
- 2026-06-13: L3 unavailable
- 2026-06-26: L3 unavailable because weekday
- 2026-06-30: L3 available because annual leave

### user_capacity_profile

Required defaults:

- L3_selected_questions.standard: 24
- L3_multiple_choice_questions.standard: 16
- L1_L2_pages.standard: 40
- L1_L2_pages.upper_guard: 50
- mixed_day.allowed: true
- L3 selected day may add L1/L2 20-35 pages
- light L3 multiple-choice day may add L1/L2 15-30 pages

### operations_write_preflight_check

Before writing active_operations.md, validate:

Structure:

- D0-D6 exist
- D7-target Next operations exist when needed
- required fields exist per day

Quantitative:

- L1/L2 has page range and page count
- L3 has question range and question count
- no forbidden vague terms

Load:

- L1/L2 above 50 pages is flagged / redistributed
- L3 multiple-choice above 25 questions is flagged / redistributed
- second-pass sorting above 30 questions is flagged / split

Plan fit:

- roadmap / plan milestones are reachable
- if not reachable, use compression_required / critical_delay instead of delayed_but_managed
- recovery_forward standard_line matches plan expected_position

## expected active_operations structure

- Metadata
- Planning assumptions
  - user_capacity
  - special_days
  - load_realism_guard
- Current plan gap
  - roadmap_anchor
  - plan_anchor
  - current_position
  - expected_position
  - gap_status
  - operation_mode
- Recommended lines
- Active operations: D0-D6
- Next operations: D7-target_date
- Operations completeness guard
- Rules

## implementation layers

### repo config layer

- update `systems/delta/config/delta_instruction.md`
- update `systems/delta/config/delta_schema.yaml`
- update active_operations gate and completed conditions

### runtime reflection layer

- configured DELTA GPT must receive updated instruction/schema
- runtime fixture must prove D0-D6 + D7-target generation behavior

### service implementation layer

Current `src/services/delta-operations.js` is only a thin write service.

A real deterministic service implementation would require new code, likely:

- parser for roadmap / plan / current_position
- operation generation service
- target range validator
- load realism validator
- preflight write validator
- tests / fixtures

Proposed code files:

- `src/services/delta/operations-generator.js`
- `src/services/delta/operations-validator.js`
- `src/services/delta/operations-fixtures.js` or test fixtures

Whether to expose these through an API/action must be decided separately.

## acceptance criteria

- D0-D6 never missing after daily review
- D7-target next operations generated when medium target exists
- L1/L2 always has page range + page count
- L3 always has question range + question count
- vague targets are rejected
- load guards detect 50 pages, L3択一25 questions, second-pass30 questions
- overload is redistributed or marked compression_required / critical_delay
- special days are reflected
- user_capacity is reflected
- roadmap / plan milestone fit is judged

## active disposition

This should be treated as a DELTA blocker / Immediate Gate extension because later DELTA runtime fixtures are not meaningful until the generation engine rules are reflected.

Existing DELTA recovery line calibration gate should be broadened to DELTA operations generation engine reflection / runtime fixture.
