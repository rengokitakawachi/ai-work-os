# delta next_operations

## Metadata

version: delta_v0.6_next_operations_real_question_ids_patch
updated_at: 2026-05-09
branch: main
operation_status: daily_next_plan_real_question_ids_patch
active_operations_ref: systems/delta/operations/active_operations.md
target_date: 2026-06-30

## Purpose

`next_operations.md` is the D7-to-medium-target daily plan SSOT for DELTA.

- `active_operations.md` owns D0〜D6 only.
- `next_operations.md` owns D7〜target_date.
- 国民年金法L3択一は、章別の実在Q番号で管理する。
- 旧operationsの「Q1-17〜Q1-32」方式は、国民年金法過去問講座テキストの実在番号と不整合のため廃止する。
- Daily review reads roadmap / plan / daily history / active_operations / next_operations before rolling.
- Daily review writes D0〜D6 to active_operations and D7以降〜target_date to next_operations.

## Source of truth

source_of_truth:
  next_operations_role: d7_to_medium_target_daily_plan_source
  active_operations_role: d0_to_d6_execution_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  roadmap_source: systems/delta/roadmap/delta_roadmap.md
  plan_source: systems/delta/plan/2026_sharoushi_exam_plan.md
  todoist_role: projection_only

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 8〜16問程度
    real_question_id_guard: Q1章のみでQ1-17のように連番を作らない

special_days:
  - 2026-05-10: L3不可
  - 2026-06-13: L3不可
  - 2026-06-30: 年休。L3可

question_id_evidence:
  国民年金法_過去問講座:
    toc: 択一式問題は1章総則等、2章被保険者等、3章給付の通則、4章老齢基礎年金、5章付加年金、6章障害基礎年金、7章遺族基礎年金、8章寡婦年金・死亡一時金、9章その他の給付・給付制限、10章国民年金事業の円滑な実施を図るための措置、11章費用、12章不服申立て・雑則等、13章国民年金基金・国民年金基金連合会、14章総合問題の章別構成
    confirmed_question_ids:
      - Q1-1
      - Q2-7
      - Q4-4
      - Q7-2
      - Q9-6
      - Q14-12
    invalidated_prior_range:
      - Q1-17〜Q1-32
      - Q1-17〜Q1-36
    rule: 国民年金法L3択一は章番号ごとの実在Q番号で管理する。Q1章だけで連番を増やさない。

## Active connection

active_connection:
  active_ref: systems/delta/operations/active_operations.md
  expected_active_range: 2026-05-09〜2026-05-15
  next_start_date: 2026-05-16
  connection_rule: next_operations starts after active Day6
  connection_status: connected_to_active_day6
  active_day6_expected_position: 国民年金法 L2 P280完了
  next_day_first_line: 国民年金法 L3 択一 Q3-1〜Q4-4（8問）

---

# Next operations: 2026-05-16〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-16 | L3 | 国民年金法 L3 択一 Q3-1〜Q4-4（8問） |
| 2026-05-17 | L3 | 国民年金法 L3 択一 Q4-5〜Q7-2（8問） |
| 2026-05-18 | L1/L2 | 厚生年金保険法 L1/L2 P1〜P35（35ページ）。国民年金法L1/L2未完了ページがある場合は国民年金法未完了ページを優先 |
| 2026-05-19 | L1/L2 | 厚生年金保険法 L1/L2 P36〜P70（35ページ）。国民年金法未完なら国民年金法未完了ページを優先 |
| 2026-05-20 | L1/L2 | 厚生年金保険法 L1/L2 P71〜P110（40ページ） |
| 2026-05-21 | L1/L2 | 厚生年金保険法 L1/L2 P111〜P150（40ページ） |
| 2026-05-22 | L1/L2 | 厚生年金保険法 L1/L2 P151〜P190（40ページ） |
| 2026-05-23 | L3 + L2 | 国民年金法 L3 択一 Q7-3〜Q9-6（8問） + 厚生年金保険法 L2 P111〜P135（25ページ） |
| 2026-05-24 | L3 + L2 | 国民年金法 L3 択一 Q10-1〜Q14-12（12問） + 厚生年金保険法 L2 P136〜P150（15ページ） |
| 2026-05-25 | L1/L2 | 厚生年金保険法 L1/L2 P191〜P230（40ページ） |
| 2026-05-26 | L1/L2 | 厚生年金保険法 L1/L2 P231〜P260（30ページ） |
| 2026-05-27 | L1/L2 | 厚生年金保険法 L1/L2 P261〜P284（24ページ） |
| 2026-05-28 | L1/L2 | 国民年金法・厚生年金保険法 L1/L2 未完了ページ回収日。未完了なしなら労一 L1 P1〜P40（40ページ） |
| 2026-05-29 | L1/L2 | 労一 L1/L2 P1〜P40（40ページ）または前日未完了分を回収。平日仕事日のL3なし |
| 2026-05-30 | L3 + L2 | 厚生年金保険法 選択 Q16-1〜Q16-12（12問） + 厚生年金保険法 L2 P231〜P260（30ページ） |
| 2026-05-31 | L3 + L1 | 厚生年金保険法 択一 Q1-1〜Q4-1（9問） + 厚生年金保険法 L1 P261〜P284（24ページ） |
| 2026-06-01 | L2 | 厚生年金保険法 P261〜P284（24ページ） |
| 2026-06-02 | L1 | 労一 P1〜P40（40ページ） |
| 2026-06-03 | L2 | 労一 P1〜P40（40ページ） |
| 2026-06-04 | L1 | 労一 P41〜P80（40ページ） |
| 2026-06-05 | L2 | 労一 P41〜P80（40ページ） |
| 2026-06-06 | L3 + L1 | 厚生年金保険法 択一 Q4-2〜Q8-1（10問） + 労一 L1 P81〜P100（20ページ） |
| 2026-06-07 | L3 + L2 | 厚生年金保険法 択一 Q8-2〜Q11-1（16問） + 労一 L2 P81〜P100（20ページ） |
| 2026-06-08 | L1 | 労一 P101〜P140（40ページ） |
| 2026-06-09 | L2 | 労一 P101〜P140（40ページ） |
| 2026-06-10 | L1 | 労一 P141〜P180（40ページ） |
| 2026-06-11 | L2 | 労一 P141〜P180（40ページ） |
| 2026-06-12 | L1 | 労一 P181〜P220（40ページ） |
| 2026-06-13 | L2 | 労一 P181〜P220（40ページ）。L3不可日 |
| 2026-06-14 | L3 + L1 | 厚生年金保険法 択一 Q11-2〜Q15-12（16問） + 労一 L1 P221〜P240（20ページ） |
| 2026-06-15 | L2 | 労一 P221〜P260（40ページ） |
| 2026-06-16 | L1 | 労一 P261〜P314（54ページ）。高負荷注意。D6以降のローリングで前倒し再検討 |
| 2026-06-17 | L2 | 労一 P261〜P300（40ページ） |
| 2026-06-18 | L2 + L1 | 労一 L2 P301〜P314（14ページ） + 社一 L1 P1〜P25（25ページ） |
| 2026-06-19 | L2 | 社一 P1〜P40（40ページ） |
| 2026-06-20 | L3 + L1 | 労一 選択 Q7-1〜Q7-10（10問） + 労一 択一 Q1-1〜Q2-2（6問） + 社一 L1 P26〜P45（20ページ） |
| 2026-06-21 | L3 + L2 | 労一 択一 Q2-3〜Q5-1（16問） + 社一 L2 P41〜P60（20ページ） |
| 2026-06-22 | L1 | 社一 P46〜P85（40ページ） |
| 2026-06-23 | L2 | 社一 P61〜P100（40ページ） |
| 2026-06-24 | L1 | 社一 P86〜P125（40ページ） |
| 2026-06-25 | L2 | 社一 P101〜P140（40ページ） |
| 2026-06-26 | L1/L2 | 社一 L1 P126〜P165（40ページ） + 社一 L2 P141〜P160（20ページ）。平日のためL3不可 |
| 2026-06-27 | L3 + L2 | 労一 択一 Q5-2〜Q6-9（9問） + 社一 選択 Q7-1〜Q7-16（16問） + 社一 L2 P161〜P180（20ページ） |
| 2026-06-28 | L3 + L1 | 社一 択一 Q1-1〜Q3-2（16問） + 社一 L1 P166〜P190（25ページ） |
| 2026-06-29 | L1/L2 | 社一 L1 P191〜P231（41ページ） + 社一 L2 P181〜P205（25ページ） |
| 2026-06-30 | L3 + L2 | 年休。社一 択一 Q4-1〜Q6-2（17問） + 社一 L2 P206〜P231（26ページ） |

## Next operation guardrails

- D7以降〜target_date の日別計画はこのファイルをSSOTとする。
- L1/L2はページ範囲とページ数で管理する。
- L3は実在する question range と問題数で管理する。
- 国民年金法L3択一では、Q1-17のように章1だけで連番を作らない。
- 国民年金法L3択一では、章別Q番号を使い、実在確認済み番号を優先する。
- 国民年金法L3択一の未確認中間番号は、演習時にテキストで実在を確認し、存在しない番号は飛ばす。
- 2026-05-10はL3不可。
- 2026-06-13はL3不可。
- 2026-06-26は平日のためL3不可。
- 2026-06-30は年休のためL3可。
- 平日仕事日はL3なし。
- 土日祝とGW祝日はL3可。
- L1/L2は40ページ程度を標準にし、50ページ超はD0〜D6ローリング時に前倒し再検討する。
- L3択一は8〜16問程度を標準にし、実在番号の確認を優先する。
- L3選択は24問程度まで許容する。
- future dayのstart_question_id/pageは前日レビューでずれた場合にrecomputeする。
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
  - 日付範囲を1行にまとめる期間ブロックは禁止
  - 「着手」「進める」「できるところまで」「Qx-last」「章だけ」「前半」「後半」だけの標準ラインは禁止
  - 非実在Q番号を作らない
  - operations更新時、D7〜target_date の日別粒度が欠落すればwriteしない

preflight_check_result:
  roadmap_was_read: true
  plan_was_read: true
  latest_daily_history_was_read: true
  active_operations_was_read: true
  next_operations_was_read: true
  D7_to_target_daily_plan_exists: true
  period_block_absent: true
  active_day6_to_next_day_connection_valid: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  weekday_workday_L3_constraint_reflected: true
  L3_unavailable_days_reflected: true
  completed_scope_not_reintroduced_as_new: true
  overload_detected: true
  overload_resolution: compression_required_because_real_question_id_patch_reduces_5_9_L3_volume

## Daily review read requirements

required_read_sources:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/history/daily/YYYY-MM-DD.md
  - systems/delta/operations/active_operations.md
  - systems/delta/operations/next_operations.md

## Rules

- Next operations is D7-to-medium-target daily plan SSOT.
- Active operations is D0-D6 execution SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates active_operations and next_operations together after reading both.
