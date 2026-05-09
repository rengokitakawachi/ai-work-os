# delta next_operations

## Metadata

version: delta_v0.6_next_operations_after_2026_05_09_first_pass_priority_patch
updated_at: 2026-05-09
branch: feature/atlas-pre-delta-foundation
operation_status: next_operations_d7_to_target_first_pass_priority_corrected
active_operations_ref: systems/delta/operations/active_operations.md
target_date: 2026-06-30
next_start_date: 2026-05-16
last_daily_review: systems/delta/history/daily/2026-05-08.md
latest_in_day_history: systems/delta/history/daily/2026-05-09.md

## Purpose

`next_operations.md` is the D7-to-medium-target daily plan SSOT for DELTA.

- `active_operations.md` owns D0〜D6 only.
- `next_operations.md` owns D7〜target_date.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- Daily review reads roadmap / plan / daily history / active_operations / next_operations before rolling.
- Actual performance records are written to daily history, not operations.

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
  active_sha: b980de87e0e24afd8ab59c3779cadb4ffcad1b65
  expected_active_range: 2026-05-09〜2026-05-15
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L2 P35完了
  next_start_date: 2026-05-16
  connection_rule: next_operations starts after active Day6
  connection_status: connected_to_active_day6_2026_05_15
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q4-1〜Q4-1（1問・新規通過のみ）

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 35〜40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
    material_sequence_uncertainty: 国民年金法L3択一は教材確認済み問題番号のみ採用

special_days:
  - 2026-05-10: L3不可
  - 2026-06-13: L3不可
  - 2026-06-30: 年休。L3可

material_sequence_notes:
  国民年金法_L3_択一:
    chapter3: 給付の通則
    chapter3_last_question: Q3-3
    Q3-4_exists: false
    next_after_Q3-3: Q4-1
    chapter4: 老齢基礎年金
    mechanical_range_inference: prohibited
    review_deferred_until_after_first_pass:
      - Q1-1
      - Q2-2
      - Q3-2
      - Q2-1
      - Q2-3
      - Q2-4
      - Q2-5

---

# Next operations: 2026-05-16〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-16 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-1（1問・新規通過のみ）。Q1-1・Q2-2・Q3-2の回収は1巡後 |
| 2026-05-17 | L3 | 国民年金法 L3 択一：Q4-1後の実在確認済み次問から16問。問題番号インデックス確定後にquestion_rangeを固定 |
| 2026-05-18 | L1/L2 | 平日仕事日のL3なし。国民年金法L1/L2未完了がなければ厚生年金保険法 L1 P36〜P70（35ページ） |
| 2026-05-19 | L2 | 厚生年金保険法 L2 P1〜P35（35ページ） |
| 2026-05-20 | L1 | 厚生年金保険法 L1 P71〜P110（40ページ） |
| 2026-05-21 | L2 | 厚生年金保険法 L2 P36〜P70（35ページ） |
| 2026-05-22 | L1 | 厚生年金保険法 L1 P111〜P150（40ページ） |
| 2026-05-23 | L3 + L2 | 国民年金法L3択一の未通過16問＋厚生年金保険法 L2 P71〜P95（25ページ） |
| 2026-05-24 | L3 + L2 | 国民年金法L3択一の未通過16問＋厚生年金保険法 L2 P96〜P110（15ページ） |
| 2026-05-25 | L1 | 厚生年金保険法 L1 P151〜P190（40ページ） |
| 2026-05-26 | L2 | 厚生年金保険法 L2 P111〜P150（40ページ） |
| 2026-05-27 | L1 | 厚生年金保険法 L1 P191〜P230（40ページ） |
| 2026-05-28 | L2 | 厚生年金保険法 L2 P151〜P190（40ページ） |
| 2026-05-29 | L1 | 厚生年金保険法 L1 P231〜P260（30ページ） |
| 2026-05-30 | L3 + L2 | 厚生年金保険法 選択 Q16-1〜Q16-12（12問）＋厚生年金保険法 L2 P191〜P220（30ページ） |
| 2026-05-31 | L3 + L1 | 厚生年金保険法 択一 Q1-1〜Q4-1（9問）＋厚生年金保険法 L1 P261〜P284（24ページ） |
| 2026-06-01 | L2 | 厚生年金保険法 L2 P221〜P260（40ページ） |
| 2026-06-02 | L1 | 労一 L1 P1〜P40（40ページ） |
| 2026-06-03 | L2 | 厚生年金保険法 L2 P261〜P284（24ページ）＋労一 L2 P1〜P16（16ページ） |
| 2026-06-04 | L1 | 労一 L1 P41〜P80（40ページ） |
| 2026-06-05 | L2 | 労一 L2 P17〜P56（40ページ） |
| 2026-06-06 | L3 + L1 | 厚生年金保険法 択一 Q5-1〜Q8-1（10問、Q7-0除外）＋労一 L1 P81〜P100（20ページ） |
| 2026-06-07 | L3 + L2 | 厚生年金保険法 択一 Q8-2〜Q11-1（16問）＋労一 L2 P57〜P80（24ページ） |
| 2026-06-08 | L1 | 労一 L1 P101〜P140（40ページ） |
| 2026-06-09 | L2 | 労一 L2 P81〜P120（40ページ） |
| 2026-06-10 | L1 | 労一 L1 P141〜P180（40ページ） |
| 2026-06-11 | L2 | 労一 L2 P121〜P160（40ページ） |
| 2026-06-12 | L1 | 労一 L1 P181〜P220（40ページ） |
| 2026-06-13 | L2 | 労一 L2 P161〜P200（40ページ）。L3不可日 |
| 2026-06-14 | L1 | 労一 L1 P221〜P260（40ページ） |
| 2026-06-15 | L2 | 労一 L2 P201〜P240（40ページ） |
| 2026-06-16 | L1 | 労一 L1 P261〜P300（40ページ） |
| 2026-06-17 | L2 | 労一 L2 P241〜P280（40ページ） |
| 2026-06-18 | L1/L2 | 労一 L1 P301〜P314（14ページ）＋労一 L2 P281〜P300（20ページ） |
| 2026-06-19 | L2 + L1 | 労一 L2 P301〜P314（14ページ）＋社一 L1 P1〜P25（25ページ） |
| 2026-06-20 | L3 + L1 | 労一 選択 Q7-1〜Q7-10（10問）＋労一 択一 Q1-1〜Q2-2（6問）＋社一 L1 P26〜P45（20ページ） |
| 2026-06-21 | L3 + L2 | 労一 択一 Q2-3〜Q5-1（16問）＋社一 L2 P1〜P20（20ページ） |
| 2026-06-22 | L1 | 社一 L1 P46〜P85（40ページ） |
| 2026-06-23 | L2 | 社一 L2 P21〜P60（40ページ） |
| 2026-06-24 | L1 | 社一 L1 P86〜P125（40ページ） |
| 2026-06-25 | L2 | 社一 L2 P61〜P100（40ページ） |
| 2026-06-26 | L1/L2 | 社一 L1 P126〜P165（40ページ）＋社一 L2 P101〜P120（20ページ）。平日のためL3不可 |
| 2026-06-27 | L3 + L2 | 労一 択一 Q5-2〜Q6-9（9問）＋社一 選択 Q7-1〜Q7-16（16問）＋社一 L2 P121〜P140（20ページ） |
| 2026-06-28 | L3 + L1 | 社一 択一 Q1-1〜Q3-2（16問）＋社一 L1 P166〜P190（25ページ） |
| 2026-06-29 | L1/L2 | 社一 L1 P191〜P231（41ページ）＋社一 L2 P141〜P165（25ページ） |
| 2026-06-30 | L3 + L2 | 年休。社一 択一 Q4-1〜Q6-2（17問）＋社一 L2 P166〜P191（26ページ） |

## Next operation guardrails

- D7以降〜target_date の日別計画はこのファイルをSSOTとする。
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- L1/L2はpage rangeとページ数で管理する。
- L3はquestion rangeまたは教材インデックス不確定時の明示的な再計算条件で管理する。
- 国民年金法L3択一Q3-4は存在しない。3章はQ3-3まで、次は4章Q4-1。
- 2026-05-10はL3不可。
- 2026-06-13はL3不可。
- 平日仕事日はL3なし。
- 土日祝とGW祝日はL3可。
- active Day6 と next first day の接続を daily review で確認する。
- 期間ブロックへ粗く上書きしない。

## Operations completeness guard

required_granularity: daily
required_range:
  start: 2026-05-16
  end: 2026-06-30
required_fields_per_row:
  - Date
  - Layer
  - Standard line
quantitative_management_rules:
  - L1/L2はpage rangeとページ数で管理する
  - L3はquestion rangeと問題数で管理する
  - 国民年金法L3択一だけは教材インデックス不確定のため、次問確認条件を併記する
  - 日付範囲を1行にまとめる期間ブロックは禁止

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
  active_day6_next_start_connection_target: 2026-05-16
  next_start_date: 2026-05-16
  header_start_date: 2026-05-16
  first_row_date: 2026-05-16
  D7_target_next_operations_exists: true
  daily_granularity_preserved: true
  period_block_absent: true
  material_sequence_uncertainty_reflected: true
  sequence_correction_reflected: Q3-4不存在、Q4-1開始へ修正
  first_pass_priority_reflected: true
  review_deferred_until_after_first_pass: true
  canonical_branch_reflected: feature/atlas-pre-delta-foundation
  validator_version_expected: delta_operations_preflight_2026_05_08_dynamic_active_next_split

## Rules

- Next operations is D7-to-medium-target daily plan SSOT.
- Active operations is D0-D6 execution SSOT.
- DELTA canonical branch is feature/atlas-pre-delta-foundation unless explicitly overridden.
- 2026-06-30までに1巡完了を優先する。
- 1巡目は未通過範囲を優先し、振り返り・回収は1巡後に行う。
- △・×・確認対象は記録だけ残し、1巡目中の新規学習には再投入しない。
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
