# delta active_operations

## Metadata

version: restored_daily_next_from_97b2334_adjusted_2026_05_05_actual
updated_at: 2026-05-05
branch: feature/atlas-pre-delta-foundation
operation_status: restored_daily_next_operations_through_2026_06_30
last_daily_review: systems/delta/history/daily/2026-05-05.md
latest_in_day_history: systems/delta/history/daily/2026-05-05.md

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.
  - Baseline restored from commit 97b2334b38ca160d17358b73d51beae47817233a.
  - Next operations daily table through 2026-06-30 is preserved.
  - Only 2026-05-05 actual delta is reflected.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  monthly_summary_role: summary_view
  legacy_monthly_role: migration_fallback_only
  todoist_role: projection_only

baseline_restore:
  baseline_commit: 97b2334b38ca160d17358b73d51beae47817233a
  baseline_file_blob_sha: af62696214acfcf8817728ee9f97ae24e39c0011
  baseline_commit_message: Write active D0-D6 and next operations through 2026-06-30
  restore_policy: keep_daily_next_operations_and_adjust_only_delayed_delta
  do_not_use_as_baseline:
    - be3c721e921bf584bab76e4a3c4342fa697bd4d9
  reason_not_use: 2026-05-18以降が期間ブロックへ粗くなっている

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: 40ページ程度
    upper_guard: 50ページ超は原則分割
  L3_selected_questions:
    standard_capacity: 24問程度
  L3_multiple_choice_questions:
    standard_capacity: 16問程度
    upper_guard: 25問
  mixed_day:
    allowed: true
    rule: L3日でも余力がある場合はL1/L2を20〜35ページだけ前倒し可

plan_anchor:
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに健康保険法・国民年金法・厚生年金保険法・労一・社一の1巡目を通過
  special_days:
    - 2026-05-06: GW最終日・祝日扱い。L3可
    - 2026-05-10: L3不可
    - 2026-06-13: L3不可
    - 2026-06-30: 年休。L3可

current_position:
  as_of: 2026-05-05
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
  L2:
    subject: 国民年金法
    current_position: P157完了
    next_start_page: P158
  L3:
    completed_subject: 健康保険法
    completed_scope: 選択式完了済み、択一Q11-21まで完了
    current_subject: 国民年金法
    selected_completion_status: completed
    selected_completion_marker: completed_Q15-1_to_Q15-14
    next_resume_question_id: Q1-1
  gap_status: delayed_but_managed
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: 2026-05-05
  source_review:
    - systems/delta/history/daily/2026-05-04.md
    - systems/delta/history/daily/2026-05-05.md
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P157完了、L3国民年金法選択Q15-14完了、択一Q1-1未着手
  expected_position: 5/6で国民年金法択一Q1-1〜Q7-2、5/7〜5/8でL2 P158〜P219、5/9でQ8-1〜Q11-3
  gap_status: delayed_but_managed
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q7-2（21問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q9-1（24問）
  next_resume_question_id: Q1-1
  recovery_targets:
    - 5/5に未達だった国民年金法択一Q1-1〜Q2-5を5/6へ吸収する
    - 5/6の標準をQ7-2まで圧縮し、5/9のQ8-1開始を維持する
    - 5/13以降の日別Next operationsは97b2334版を維持する
    - 健康保険法×・△は後日回収として保持する
  defer_targets:
    - 健康保険法の×・△回収
    - monthly summary rebuild
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - Q2-5未達
    - Q7-2未達
    - Q11-3未達
    - L2_P219未達
    - L1_P255未達
    - plan_changes
  next_review_checkpoint:
    - 2026-05-06 end-of-day daily review
    - Q2-5到達可否
    - Q7-2到達可否
    - 5/9をQ8-1開始で確定できるか

---

# Active operations: D0〜D6

## Day0（2026-05-06）

- task: 国民年金法 L3 択一 Q1-1〜Q7-2（21問）
  rolling_day: Day0
  due_date: 2026-05-06
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-06 GW最終日。5/5未達の択一Q1〜Q2分を吸収し、元計画のD1終点Q7-2へ追いつく
  expected_position: 国民年金法 L3 択一 Q7-2完了
  current_position: 国民年金法 選択Q15-14完了、択一Q1-1未着手
  gap_status: delayed_but_managed
  start_question_id: Q1-1
  must_end_question_id: Q2-5
  standard_end_question_id: Q7-2
  stretch_end_question_id: Q9-1
  next_resume_question_id: Q1-1
  questions: 21
  question_range: Q1-1〜Q7-2
  must_line:
    - 国民年金法 L3 択一 Q1-1〜Q2-5（7問）
  standard_line:
    - 国民年金法 L3 択一 Q1-1〜Q7-2（21問）
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q9-1（24問）
  recovery_targets:
    - 5/5未達の国民年金法択一Q1-1〜Q2-5を吸収する
    - 元計画D1の終点Q7-2へ追いつき、5/9のQ8-1開始を維持する
    - 国民年金法Q15およびQ1〜Q7の×・△は保持する
    - 健康保険法×・△は後日回収
  defer_targets:
    - 健康保険法×・△回収
    - L2ページ回収はD1以降
  recompute_triggers:
    - Q2-5未達
    - Q7-2未達
    - 国民年金法_択一_Q番号がPDF確認と異なる
    - user_explicitly_requests_recompute

## Day1（2026-05-07）

- task: 国民年金法 L2 P158〜P190（33ページ）
  rolling_day: Day1
  due_date: 2026-05-07
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-07 平日L1/L2 国民年金法 / L2をL1へ追いつかせる
  expected_position: L2 P190まで回収
  current_position: L1 P219完了、L2 P157完了、次回P158
  gap_status: delayed_but_managed
  start_page: P158
  must_end_page: P175
  standard_end_page: P190
  stretch_end_page: P200
  page_range: P158〜P190
  next_start_page: P158
  must_line:
    - 国民年金法 L2 P158〜P175（18ページ）
  standard_line:
    - 国民年金法 L2 P158〜P190（33ページ）
  stretch_line:
    - 国民年金法 L2 P158〜P200（43ページ）
  recovery_targets:
    - 国民年金法 L2 P158〜P190（33ページ）
    - D2でP219まで追いつく
  defer_targets:
    - L3はD3に再開
    - 健康保険法×・△回収
  recompute_triggers:
    - L2_P158開始が実際と異なる
    - D0で国民年金法L3択一がQ2-5未達
    - D1_P190未達

## Day2（2026-05-08）

- task: 国民年金法 L2 P191〜P219（29ページ）
  rolling_day: Day2
  due_date: 2026-05-08
  subject: 国民年金法
  study_type: L2
  material: 基礎講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-08 平日L1/L2 国民年金法 / L2をL1現在地へ追いつかせる
  expected_position: L2 P219まで回収
  current_position: D1 daily reviewでL2 next_start_pageを更新
  gap_status: delayed_but_managed
  start_page: P191
  must_end_page: P205
  standard_end_page: P219
  stretch_end_page: P219
  page_range: P191〜P219
  next_start_page: P191
  must_line:
    - 国民年金法 L2 P191〜P205（15ページ）
  standard_line:
    - 国民年金法 L2 P191〜P219（29ページ）
  stretch_line:
    - 国民年金法 L2 P191〜P219（29ページ）完了
  recovery_targets:
    - L2をL1 P219へ追いつかせる
  defer_targets:
    - L3はD3に再開
    - 健康保険法×・△回収
  recompute_triggers:
    - D1でP190未達
    - L1がP219から大きく前進
    - user_explicitly_requests_recompute

## Day3（2026-05-09）

- task: 国民年金法 L3 択一 Q8-1〜Q11-3（16問、Q10-0除外）
  rolling_day: Day3
  due_date: 2026-05-09
  subject: 国民年金法
  study_type: L3
  material: 過去問講座テキスト
  operation_mode: recovery_forward
  plan_anchor: 2026-05-09 L3国民年金法択一 / 5月17日択一完了から逆算
  expected_position: Q8-1〜Q11-3（16問、Q10-0除外）完了
  current_position: D0標準達成時はQ8-1から開始
  gap_status: delayed_but_managed
  start_question_id: Q8-1
  must_end_question_id: Q9-10
  standard_end_question_id: Q11-3
  stretch_end_question_id: Q13-2
  next_resume_question_id: Q8-1
  questions: 16
  question_range: Q8-1〜Q11-3（Q10-0除外）
  must_line:
    - 国民年金法 L3 択一 Q8-1〜Q9-10（13問）
  standard_line:
    - 国民年金法 L3 択一 Q8-1〜Q11-3（16問、Q10-0除外）
  stretch_line:
    - 国民年金法 L3 択一 Q8-1〜Q13-2（22問、Q10-0除外）
  recovery_targets:
    - 国民年金法Q15およびQ1〜Q7の×・△を保持
    - 健康保険法×・△は後日回収
  defer_targets:
    - 2026-05-10はL3不可
    - 健康保険法×・△回収
  recompute_triggers:
    - D0でQ7-2未達またはQ7-2を超過
    - Q8-1またはQ11-3のPDF確認差異
    - user_explicitly_requests_recompute

## Day4（2026-05-10）

- task: L3不可日。新規L1/L2/L3なし
  rolling_day: Day4
  due_date: 2026-05-10
  subject: 共通
  study_type: rest_or_light_review
  material: none
  operation_mode: normal
  plan_anchor: 2026-05-10 L3不可
  expected_position: 新規L1/L2/L3なし
  current_position: D3 daily reviewで更新
  gap_status: on_track
  must_line:
    - 新規L1/L2/L3なし
  standard_line:
    - 新規L1/L2/L3なし
  stretch_line:
    - 国民年金法 L3 択一 Q1-1〜Q11-3の評価記号整理のみ
  recovery_targets:
    - 新規L3は実施しない
  defer_targets:
    - 国民年金法L3択一の続きは2026-05-16へ回す
    - L1/L2は5/11以降に再開
  recompute_triggers:
    - user_explicitly_requests_recompute
    - 2026-05-10に学習時間が十分確保できると明示された場合

## Day5（2026-05-11）

- task: 国民年金法 L1 P220〜P255（36ページ）
  rolling_day: Day5
  due_date: 2026-05-11
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: 2026-05-11〜2026-05-15 国民年金法L1/L2完了接続と厚生年金保険法接続準備
  expected_position: L1 P255まで前倒しし、5/12以降の国民年金法残ページを減らす
  current_position: L1 P219完了、L2はD2でP219まで回収予定
  gap_status: delayed_but_managed
  start_page: P220
  must_end_page: P235
  standard_end_page: P255
  stretch_end_page: P260
  page_range: P220〜P255
  next_start_page: P220
  must_line:
    - 国民年金法 L1 P220〜P235（16ページ）
  standard_line:
    - 国民年金法 L1 P220〜P255（36ページ）
  stretch_line:
    - 国民年金法 L1 P220〜P260（41ページ）
  recovery_targets:
    - 5/11〜5/15で国民年金法L1/L2残ページをP280まで処理し、厚生年金保険法へ接続する
  defer_targets:
    - 健康保険法×・△回収
    - 厚生年金保険法への本格接続は国民年金法current_position確認後
  recompute_triggers:
    - D2でL2_P219未達
    - D3でL3_Q11-3未達
    - plan_changes
    - user_explicitly_requests_recompute

## Day6（2026-05-12）

- task: 国民年金法 L1 P256〜P280（25ページ）
  rolling_day: Day6
  due_date: 2026-05-12
  subject: 国民年金法
  study_type: L1
  material: 動画講義
  operation_mode: recovery_forward
  plan_anchor: 97b2334版Next operations 2026-05-12をActiveへ接続
  expected_position: 国民年金法 L1 P280完了
  current_position: D5標準達成時はP256開始
  gap_status: delayed_but_managed
  start_page: P256
  must_end_page: P270
  standard_end_page: P280
  stretch_end_page: P280
  page_range: P256〜P280
  next_start_page: P256
  must_line:
    - 国民年金法 L1 P256〜P270（15ページ）
  standard_line:
    - 国民年金法 L1 P256〜P280（25ページ）
  stretch_line:
    - 国民年金法 L1 P256〜P280（25ページ）完了
  recovery_targets:
    - 国民年金法 L1 P220〜P280を完了し、Next operations 2026-05-13 L2 P220〜P245へ接続する
  defer_targets:
    - 健康保険法×・△回収
    - 厚生年金保険法開始は5/15以降
  recompute_triggers:
    - D5でP255未達
    - P270未達
    - P280未達
    - user_explicitly_requests_recompute

---

# Next operations: 2026-05-13〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-13 | L2 | 国民年金法 P220〜P245（26ページ） |
| 2026-05-14 | L2 | 国民年金法 P246〜P280（35ページ） |
| 2026-05-15 | L1 | 厚生年金保険法 P1〜P35（35ページ） |
| 2026-05-16 | L3 | 国民年金法 択一 Q12-1〜Q14-10（16問） |
| 2026-05-17 | L3 + L2 | 国民年金法 択一 Q14-11〜Q14-17（7問） + 厚生年金保険法 L2 P1〜P35（35ページ） |
| 2026-05-18 | L1 | 厚生年金保険法 P36〜P70（35ページ） |
| 2026-05-19 | L2 | 厚生年金保険法 P36〜P70（35ページ） |
| 2026-05-20 | L1 | 厚生年金保険法 P71〜P110（40ページ） |
| 2026-05-21 | L2 | 厚生年金保険法 P71〜P110（40ページ） |
| 2026-05-22 | L1 | 厚生年金保険法 P111〜P150（40ページ） |
| 2026-05-23 | L3 + L2 | 厚生年金保険法 選択 Q16-1〜Q16-12（12問） + 厚生年金保険法 L2 P111〜P135（25ページ） |
| 2026-05-24 | L3 + L2 | 厚生年金保険法 択一 Q1-1〜Q4-1（9問） + 厚生年金保険法 L2 P136〜P150（15ページ） |
| 2026-05-25 | L1 | 厚生年金保険法 P151〜P190（40ページ） |
| 2026-05-26 | L2 | 厚生年金保険法 P151〜P190（40ページ） |
| 2026-05-27 | L1 | 厚生年金保険法 P191〜P230（40ページ） |
| 2026-05-28 | L2 | 厚生年金保険法 P191〜P230（40ページ） |
| 2026-05-29 | L1 | 厚生年金保険法 P231〜P260（30ページ） |
| 2026-05-30 | L3 + L2 | 厚生年金保険法 択一 Q5-1〜Q8-1（10問、Q7-0除外） + 厚生年金保険法 L2 P231〜P260（30ページ） |
| 2026-05-31 | L3 + L1 | 厚生年金保険法 択一 Q8-2〜Q11-1（16問） + 厚生年金保険法 L1 P261〜P284（24ページ） |
| 2026-06-01 | L2 | 厚生年金保険法 P261〜P284（24ページ） |
| 2026-06-02 | L1 | 労一 P1〜P40（40ページ） |
| 2026-06-03 | L2 | 労一 P1〜P40（40ページ） |
| 2026-06-04 | L1 | 労一 P41〜P80（40ページ） |
| 2026-06-05 | L2 | 労一 P41〜P80（40ページ） |
| 2026-06-06 | L3 + L1 | 厚生年金保険法 択一 Q11-2〜Q14-12（16問、Q12-0除外） + 労一 L1 P81〜P100（20ページ） |
| 2026-06-07 | L3 + L2 | 厚生年金保険法 択一 Q15-1〜Q15-12（12問） + 労一 L2 P81〜P100（20ページ） |
| 2026-06-08 | L1 | 労一 P101〜P140（40ページ） |
| 2026-06-09 | L2 | 労一 P101〜P140（40ページ） |
| 2026-06-10 | L1 | 労一 P141〜P180（40ページ） |
| 2026-06-11 | L2 | 労一 P141〜P180（40ページ） |
| 2026-06-12 | L1 | 労一 P181〜P220（40ページ） |
| 2026-06-13 | L2 | 労一 P181〜P220（40ページ）。L3不可日 |
| 2026-06-14 | L1 | 労一 P221〜P260（40ページ） |
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

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 2026-06-26は平日のためL3不可。
- 2026-06-30は年休のためL3可。
- L1/L2は40ページ程度を標準にし、50ページ超はD0〜D6ローリング時に前倒し再検討する。
- L3択一は16問程度を標準にし、25問超は分割する。
- L3選択は24問程度まで許容する。
- future dayのstart_question_id/pageは前日レビューでずれた場合にrecomputeする。
- 97b2334版の日別Next operationsを復旧基準とし、5/13〜6/30は日別計画を維持する。

## Operations completeness guard

required_days: [Day0, Day1, Day2, Day3, Day4, Day5, Day6]
required_fields_per_day:
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
quantitative_management_rules:
  - L1/L2はstart_page、must_end_page、standard_end_page、stretch_end_page、next_start_pageとページ数で管理する
  - L3はstart_question_id、must_end_question_id、standard_end_question_id、stretch_end_question_id、next_resume_question_idと問題数で管理する
  - 「着手」「進める」「できるところまで」「Qx-last」「章だけ」「前半」「後半」だけの標準ラインは禁止
  - operations更新時、D0〜D6の欠落があればwriteしない

preflight_check_result:
  active_operations_was_read: true
  existing_next_operations_was_read_when_present: true
  L1_L2_current_position_confirmed: true
  L3_current_position_confirmed: true
  current_subject_not_skipped: true
  completed_subject_not_reintroduced: true
  L3_order_selection_before_takuitsu: true
  D0_D6_all_exist: true
  D7_target_next_operations_exists_when_medium_target_exists: true
  L1_L2_page_range_format_valid: true
  L3_question_range_format_valid: true
  forbidden_vague_terms_absent: true
  special_days_reflected: true
  overload_detected: true
  overload_resolution: 5/5未達の択一Q1-1〜Q2-5を5/6へ吸収し、Q1-1〜Q7-2を21問標準として上限25問内で圧縮
  roadmap_plan_milestone_reachable: conditional_reachable_with_5_6_compression_and_daily_next_restored

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- Monthly history is summary view only.
- Legacy monthly history is migration fallback only.
- Daily review is not complete after history write alone; after daily history confirmation, update active_operations.
- Daily operation must carry plan_anchor, expected_position, current_position, gap_status, operation_mode, must_line, standard_line, stretch_line, recovery_targets, defer_targets, and recompute_triggers.
- on_track requires both daily execution and plan alignment. If daily execution is complete but plan is delayed, use delayed_but_managed / delayed_but_recovering / recovery_on_track.
- recommended_lines are generated at daily review and saved here.
- During the day, questions about 今日の推奨ライン read saved recommended_lines and do not recompute unless a recompute_trigger exists or the user explicitly asks.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 review priority SSOT is understanding-based review_mark: × → △ → ○ → ◎.
- Score, correctness, actual_time, and time_delta are supplemental.
- 1巡目では完璧主義にならず、全範囲を通す。
- 健康保険法の×・△回収は国民年金法L3の前進後へ defer する。
- 国民年金法 Q10-0 は演習対象なし。
- 健康保険法 Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし。
- 健康保険法 Q4-10 の次は Q7。
- 健康保険法 Q7 の次は Q9。
- Todoist is projection only.
