# delta next_operations

## Metadata

version: delta_v0.10_next_operations_2026_05_18_after_2026_05_10_daily_review
updated_at: 2026-05-10
branch: feature/atlas-pre-delta-foundation
operation_status: next_operations_d7_to_target_after_active_roll_2026_05_11_2026_05_17
active_operations_ref: systems/delta/operations/active_operations.md
target_date: 2026-06-30
next_start_date: 2026-05-18

## Purpose

`next_operations.md` is the D7-to-medium-target daily plan SSOT for DELTA.

- `active_operations.md` owns D0〜D6 only.
- `next_operations.md` owns D7〜target_date.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- 原則として、土日祝はL3のみとする。
- 通常の土日祝にL1/L2を入れない。
- 2026-06-13は土曜だが仕事日扱い。過去問演習は不可、通勤枠でL1/L2可。

## Source of truth

source_of_truth:
  next_operations_role: d7_to_medium_target_daily_plan_source
  active_operations_role: d0_to_d6_execution_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  canonical_branch: feature/atlas-pre-delta-foundation
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

## Active connection

active_connection:
  active_ref: systems/delta/operations/active_operations.md
  active_sha: 7ffab9de381ec9560451e609022e1c1822b74267
  expected_active_range: 2026-05-11〜2026-05-17
  active_day6_due_date: 2026-05-17
  active_day6_expected_position: 厚生年金保険法 L1 P155完了、L2 P80完了。国民年金法L1/L2 P277完了。国民年金法 択一 Q13-2完了
  next_start_date: 2026-05-18
  connection_rule: next_operations starts after active Day6
  connection_status: connected_to_active_day6_2026_05_17
  next_day_first_line: 2026-05-18 厚生年金保険法 L1 P156〜P200（45ページ）

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 35〜40ページ程度
    compression_capacity: 40〜60ページ程度
    upper_guard: 60ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 12〜18問程度
    real_question_id_required: true
  sekotore:
    daily_target_questions: 40

special_day_overrides:
  - date: 2026-06-13
    day_type: saturday_workday
    l3_allowed: false
    l1_l2_allowed: true
    sekotore_allowed: true
    allowed_context: commute
    standard_line: 社一 L2 P1〜P25（25ページ・通勤枠）

---

# Next operations: 2026-05-18〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-18 | L1 | 厚生年金保険法 L1 P156〜P200（45ページ） |
| 2026-05-19 | L2 | 厚生年金保険法 L2 P81〜P125（45ページ） |
| 2026-05-20 | L1 | 厚生年金保険法 L1 P201〜P245（45ページ） |
| 2026-05-21 | L2 | 厚生年金保険法 L2 P126〜P170（45ページ） |
| 2026-05-22 | L1 | 厚生年金保険法 L1 P246〜P284（39ページ） |
| 2026-05-23 | L3 | 国民年金法 択一 Q14-1〜Q14-17（17問） |
| 2026-05-24 | L3 | 厚生年金保険法 選択 Q16-1〜Q16-12（12問） |
| 2026-05-25 | L2 | 厚生年金保険法 L2 P171〜P220（50ページ） |
| 2026-05-26 | L2 | 厚生年金保険法 L2 P221〜P284（64ページ） |
| 2026-05-27 | L1 | 労一 L1 P1〜P55（55ページ） |
| 2026-05-28 | L2 | 労一 L2 P1〜P55（55ページ） |
| 2026-05-29 | L1 | 労一 L1 P56〜P110（55ページ） |
| 2026-05-30 | L3 | 厚生年金保険法 択一 Q1-1〜Q4-1（9問） |
| 2026-05-31 | L3 | 厚生年金保険法 択一 Q4-2〜Q8-1（10問） |
| 2026-06-01 | L2 | 労一 L2 P56〜P110（55ページ） |
| 2026-06-02 | L1 | 労一 L1 P111〜P165（55ページ） |
| 2026-06-03 | L2 | 労一 L2 P111〜P165（55ページ） |
| 2026-06-04 | L1 | 労一 L1 P166〜P220（55ページ） |
| 2026-06-05 | L2 | 労一 L2 P166〜P220（55ページ） |
| 2026-06-06 | L3 | 厚生年金保険法 択一 Q8-2〜Q11-1（16問） |
| 2026-06-07 | L3 | 厚生年金保険法 択一 Q11-2〜Q15-12（16問） |
| 2026-06-08 | L1 | 労一 L1 P221〜P275（55ページ） |
| 2026-06-09 | L2 | 労一 L2 P221〜P275（55ページ） |
| 2026-06-10 | L1/L2 | 労一 L1 P276〜P314（39ページ）＋労一 L2 P276〜P290（15ページ） |
| 2026-06-11 | L2 | 労一 L2 P291〜P314（24ページ） |
| 2026-06-12 | L1 | 社一 L1 P1〜P50（50ページ） |
| 2026-06-13 | L2 | 社一 L2 P1〜P25（25ページ・通勤枠） |
| 2026-06-14 | L3 | 労一 選択 Q7-1〜Q7-10（10問）＋労一 択一 Q1-1〜Q2-2（6問） |
| 2026-06-15 | L2 | 社一 L2 P26〜P75（50ページ） |
| 2026-06-16 | L1 | 社一 L1 P51〜P100（50ページ） |
| 2026-06-17 | L2 | 社一 L2 P76〜P125（50ページ） |
| 2026-06-18 | L1 | 社一 L1 P101〜P150（50ページ） |
| 2026-06-19 | L2 | 社一 L2 P126〜P175（50ページ） |
| 2026-06-20 | L3 | 労一 択一 Q2-3〜Q5-1（16問） |
| 2026-06-21 | L3 | 労一 択一 Q5-2〜Q6-9（9問）＋社一 選択 Q7-1〜Q7-16（16問） |
| 2026-06-22 | L1 | 社一 L1 P151〜P200（50ページ） |
| 2026-06-23 | L2 | 社一 L2 P176〜P231（56ページ） |
| 2026-06-24 | L1 | 社一 L1 P201〜P231（31ページ） |
| 2026-06-25 | L1 | 一般常識・白書・法改正 L1 P1〜P40（40ページ） |
| 2026-06-26 | L2 | 一般常識・白書・法改正 L2 P1〜P40（40ページ） |
| 2026-06-27 | L3 | 社一 択一 Q1-1〜Q3-2（16問） |
| 2026-06-28 | L3 | 社一 択一 Q4-1〜Q6-2（17問） |
| 2026-06-29 | L1/L2 | 一般常識・白書・法改正 L1 P41〜P80（40ページ）＋L2 P41〜P80（40ページ） |
| 2026-06-30 | L3 | 年休。社一 択一 Q6-3〜Q6-10（8問）＋1巡L3評価台帳の×・△・○整理 |

## Next operation guardrails

- D7以降〜target_date の日別計画はこのファイルをSSOTとする。
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- 原則として土日祝はL3のみ。
- 2026-06-13は土曜だが仕事日扱い。通勤枠でL1/L2可。
- 通常の土日祝にL1/L2を混在させない。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- L1/L2はpage rangeとページ数で管理する。
- L3はquestion rangeと問題数で管理する。
- Qx-0は演習対象なしとして扱い、演習問題数に含めない。
- 2026-06-30は年休のためL3可。
- 平日仕事日はL3なし。
- active Day6 と next first day の接続を daily review で確認する。
- 期間ブロックへ粗く上書きしない。

## Operations completeness guard

required_granularity: daily
required_range:
  start: 2026-05-18
  end: 2026-06-30
required_fields_per_row:
  - Date
  - Layer
  - Standard line
quantitative_management_rules:
  - L1/L2はpage rangeとページ数で管理する
  - L3はquestion rangeと問題数で管理する
  - 日付範囲を1行にまとめる期間ブロックは禁止
  - 「n問相当」「できるところまで」「章だけ」「前半」「後半」は禁止

## Daily review read requirements

required_read_sources:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/history/daily/YYYY-MM-DD.md
  - systems/delta/operations/active_operations.md
  - systems/delta/operations/next_operations.md

## Preflight check result

preflight_check_result:
  roadmap_was_read: true
  plan_was_read: true
  latest_daily_history_was_read: true
  prior_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  active_day6_next_start_connection_target: 2026-05-18
  next_start_date: 2026-05-18
  header_start_date: 2026-05-18
  first_row_date: 2026-05-18
  D7_target_next_operations_exists: true
  daily_granularity_preserved: true
  period_block_absent: true
  weekend_holiday_l3_only_reflected: true
  l1_l2_removed_from_regular_weekends_and_holidays: true
  commute_l1_l2_exception_2026_06_13_reflected: true
  l3_unavailable_day_runtime_behavior_confirmed: true
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  compression_required: true
  validator_version_expected: delta_operations_preflight_2026_05_09_l3_question_index_l3_unavailable_day_guard

## Rules

- Next operations is D7-to-medium-target daily plan SSOT.
- Active operations is D0-D6 execution SSOT.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 原則として土日祝はL3のみ。
- 通常の土日祝にL1/L2を入れない。
- 2026-06-13は土曜だが仕事日扱い。通勤枠でL1/L2可。
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
