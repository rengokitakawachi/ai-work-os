# delta next_operations

## Metadata

version: delta_v0.6_next_operations_after_l3_question_index_guard
updated_at: 2026-05-09
branch: feature/atlas-pre-delta-foundation
operation_status: next_operations_d7_to_target_l3_question_index_corrected
active_operations_ref: systems/delta/operations/active_operations.md
target_date: 2026-06-30
next_start_date: 2026-05-16
last_daily_review: systems/delta/history/daily/2026-05-08.md
latest_in_day_history: systems/delta/history/daily/2026-05-09.md

## Purpose

`next_operations.md` is the D7-to-medium-target daily plan SSOT for DELTA.

- `active_operations.md` owns D0〜D6 only.
- `next_operations.md` owns D7〜target_date.
- Daily review reads roadmap / plan / daily history / active_operations / next_operations before rolling.
- Actual performance records are written to daily history, not operations.
- L3 operations must use confirmed question numbers only.

## Source of truth

source_of_truth:
  next_operations_role: d7_to_medium_target_daily_plan_source
  active_operations_role: d0_to_d6_execution_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  question_index_source: src/services/delta/l3-question-index.js
  todoist_role: projection_only

## Active connection

active_connection:
  active_ref: systems/delta/operations/active_operations.md
  active_sha: cb98c7f7c5b488129489d78802f804a253d95464
  expected_active_range: 2026-05-09〜2026-05-15
  active_day6_due_date: 2026-05-15
  active_day6_expected_position: 厚生年金保険法 L2 P35完了
  next_start_date: 2026-05-16
  connection_rule: next_operations starts after active Day6
  connection_status: connected_to_active_day6_2026_05_15
  next_day_first_line: 2026-05-16 国民年金法 L3 択一 Q4-1〜Q4-4（4問）

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 35〜40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
    material_sequence_rule: confirmed_question_index_only

special_days:
  - 2026-05-10: L3不可
  - 2026-06-13: L3不可
  - 2026-06-30: 年休。L3可

chapter_question_index:
  国民年金法:
    L3:
      question_type: 択一
      chapters:
        - chapter: 4
          range: Q4-1〜Q4-4
          count: 4
        - chapter: 5
          range: Q5-0
          count: 0
          no_exercise: true
        - chapter: 6
          range: Q6-1〜Q6-2
          count: 2
        - chapter: 7
          range: Q7-1〜Q7-2
          count: 2
        - chapter: 8
          range: Q8-1〜Q8-3
          count: 3
        - chapter: 9
          range: Q9-1〜Q9-10
          count: 10
        - chapter: 10
          range: Q10-0
          count: 0
          no_exercise: true
        - chapter: 11
          range: Q11-1〜Q11-7
          count: 7
        - chapter: 12
          range: Q12-1〜Q12-1
          count: 1
        - chapter: 13
          range: Q13-1〜Q13-2
          count: 2
        - chapter: 14
          range: Q14-1〜Q14-17
          count: 17

---

# Next operations: 2026-05-16〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-16 | L3 | 国民年金法 L3 択一 Q4-1〜Q4-4（4問） |
| 2026-05-17 | L3 | 国民年金法 L3 択一 Q5-0（演習対象なし）＋Q6-1〜Q6-2（2問）＋Q7-1〜Q7-2（2問）＋Q8-1〜Q8-3（3問）＋Q9-1〜Q9-10（10問） |
| 2026-05-18 | L1 | 厚生年金保険法 L1 P36〜P70（35ページ） |
| 2026-05-19 | L2 | 厚生年金保険法 L2 P36〜P70（35ページ） |
| 2026-05-20 | L1 | 厚生年金保険法 L1 P71〜P110（40ページ） |
| 2026-05-21 | L2 | 厚生年金保険法 L2 P71〜P110（40ページ） |
| 2026-05-22 | L1 | 厚生年金保険法 L1 P111〜P150（40ページ） |
| 2026-05-23 | L3 | 国民年金法 L3 択一 Q10-0（演習対象なし）＋Q11-1〜Q11-7（7問）＋Q12-1〜Q12-1（1問）＋Q13-1〜Q13-2（2問） |
| 2026-05-24 | L3 | 国民年金法 L3 択一 Q14-1〜Q14-17（17問） |
| 2026-05-25 | L1 | 厚生年金保険法 L1 P151〜P190（40ページ） |
| 2026-05-26 | L2 | 厚生年金保険法 L2 P111〜P150（40ページ） |
| 2026-05-27 | L1 | 厚生年金保険法 L1 P191〜P230（40ページ） |
| 2026-05-28 | L2 | 厚生年金保険法 L2 P151〜P190（40ページ） |
| 2026-05-29 | L1 | 厚生年金保険法 L1 P231〜P260（30ページ） |
| 2026-05-30 | L3 + L2 | 厚生年金保険法 L3 選択 Q16-1〜Q16-12（12問）＋厚生年金保険法 L2 P191〜P220（30ページ） |
| 2026-05-31 | L1 | 厚生年金保険法 L1 P261〜P284（24ページ） |
| 2026-06-01 | L2 | 厚生年金保険法 L2 P221〜P260（40ページ） |
| 2026-06-02 | L1 | 労一 L1 P1〜P40（40ページ） |
| 2026-06-03 | L2 | 厚生年金保険法 L2 P261〜P284（24ページ）＋労一 L2 P1〜P16（16ページ） |
| 2026-06-04 | L1 | 労一 L1 P41〜P80（40ページ） |
| 2026-06-05 | L2 | 労一 L2 P17〜P56（40ページ） |
| 2026-06-06 | L3 + L1 | 厚生年金保険法 L3 択一 Q1-1〜Q4-1（9問）＋労一 L1 P81〜P100（20ページ） |
| 2026-06-07 | L3 + L2 | 厚生年金保険法 L3 択一 Q5-1〜Q8-1（10問）＋労一 L2 P57〜P80（24ページ） |
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
| 2026-06-20 | L3 + L1 | 労一 L3 選択 Q7-1〜Q7-10（10問）＋労一 L3 択一 Q1-1〜Q2-2（6問）＋社一 L1 P26〜P45（20ページ） |
| 2026-06-21 | L3 + L2 | 労一 L3 択一 Q2-3〜Q5-1（16問）＋社一 L2 P1〜P20（20ページ） |
| 2026-06-22 | L1 | 社一 L1 P46〜P85（40ページ） |
| 2026-06-23 | L2 | 社一 L2 P21〜P60（40ページ） |
| 2026-06-24 | L1 | 社一 L1 P86〜P125（40ページ） |
| 2026-06-25 | L2 | 社一 L2 P61〜P100（40ページ） |
| 2026-06-26 | L1/L2 | 社一 L1 P126〜P165（40ページ）＋社一 L2 P101〜P120（20ページ） |
| 2026-06-27 | L3 + L2 | 労一 L3 択一 Q5-2〜Q6-9（9問）＋社一 L3 選択 Q7-1〜Q7-16（16問）＋社一 L2 P121〜P140（20ページ） |
| 2026-06-28 | L3 + L1 | 社一 L3 択一 Q1-1〜Q3-2（16問）＋社一 L1 P166〜P190（25ページ） |
| 2026-06-29 | L1/L2 | 社一 L1 P191〜P231（41ページ）＋社一 L2 P141〜P165（25ページ） |
| 2026-06-30 | L3 + L2 | 社一 L3 択一 Q4-1〜Q6-2（17問）＋社一 L2 P166〜P191（26ページ） |

## Next operation guardrails

- D7以降〜target_date の日別計画はこのファイルをSSOTとする。
- L1/L2はpage rangeとページ数で管理する。
- L3はquestion rangeまたはQx-0で管理する。
- 国民年金法L3択一は chapter_question_index に存在するQ番号のみ使う。
- Qx-0は演習対象なしとして扱い、問題数に含めない。
- 2026-05-10はL3不可。
- 2026-06-13はL3不可。
- 平日仕事日はL3なし。
- 土日祝とGW祝日はL3可。
- active Day6 と next first day の関係を daily review で確認する。
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
  - 国民年金法L3択一はchapter_question_indexに存在する範囲のみ使用する
  - 日付範囲を1行にまとめる期間ブロックは禁止

## Daily review read requirements

required_read_sources:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/history/daily/YYYY-MM-DD.md
  - systems/delta/operations/active_operations.md
  - systems/delta/operations/next_operations.md
  - src/services/delta/l3-question-index.js

## Preflight check result

preflight_check_result:
  roadmap_was_read: true
  plan_was_read: true
  latest_daily_history_was_read: true
  recent_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  l3_question_index_was_applied: true
  active_day6_next_start_connection_target: 2026-05-16
  next_start_date: 2026-05-16
  header_start_date: 2026-05-16
  first_row_date: 2026-05-16
  D7_target_next_operations_exists: true
  daily_granularity_preserved: true
  period_block_absent: true
  validator_version_expected: delta_operations_preflight_2026_05_09_l3_question_index_guard

## Rules

- Next operations is D7-to-medium-target daily plan SSOT.
- Active operations is D0-D6 execution SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
