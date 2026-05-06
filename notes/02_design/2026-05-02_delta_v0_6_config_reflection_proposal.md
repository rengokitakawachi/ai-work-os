# 2026-05-02 DELTA v0.6 config reflection proposal

## Purpose

DELTA v0.6 Integrated Operations Upgrade の安定ルールを、DELTA config に反映するための proposal を作成する。

This note is a proposal artifact. It does not mean repo config has already been updated, configured DELTA GPT has been refreshed, runtime-visible schema has changed, or runtime behavior has been confirmed.

---

## Source refs

- notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
- notes/02_design/2026-05-02_delta_v0_6_integrated_operations_upgrade.md
- notes/02_design/2026-05-02_delta_history_daily_files_design.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- notes/02_design/2026-05-02_delta_recommended_line_generation_design.md
- notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
- systems/delta/config/delta_instruction.md
- systems/delta/config/delta_schema.yaml
- systems/delta/config/delta_action_schema_v0.2.yaml
- systems/delta/config/delta_action_schema_v0.3.yaml
- systems/delta/history/daily/2026-05-02.md
- systems/delta/history/monthly/2026-05.md

Branch observed:

- `feature/atlas-pre-delta-foundation`

---

## Observed current config state

### Existing config files

Confirmed under `systems/delta/config/` on `feature/atlas-pre-delta-foundation`:

- `delta_instruction.md`
- `delta_schema.yaml`
- `delta_action_schema_v0.2.yaml`
- `delta_action_schema_v0.3.yaml`

Not found at referenced path:

- `systems/delta/config/delta_action_schema_v0.5.yaml`

No DELTA knowledge file was observed under `systems/delta/config/`.

### Existing history structure

Confirmed under `systems/delta/history/`:

- `systems/delta/history/2026-05.md` legacy monthly file
- `systems/delta/history/daily/2026-05-01.md`
- `systems/delta/history/daily/2026-05-02.md`
- `systems/delta/history/monthly/2026-05.md`

Therefore, v0.6 config reflection should treat daily/monthly split as existing branch state requiring instruction/schema alignment, not as a purely future-only concept.

---

## Layer distinction

This proposal covers repo config content only.

It does not complete:

- configured DELTA GPT Instruction update
- configured DELTA GPT Knowledge update
- configured DELTA Action schema update
- runtime-visible tool schema confirmation
- actual runtime behavior confirmation
- Todoist projection dry_run / apply confirmation

These remain separate gates.

---

## Update decision

### Instruction

Update `systems/delta/config/delta_instruction.md` to v0.6 rules.

Main changes:

- daily history primary source of truth
- monthly history summary view
- review as judgment layer
- plan-gap check before operations generation
- survival_line vs plan_minimum_line
- L1/L2 page_range and next_start_page
- L3 question_id / questions and next_question
- chapter-only normalization and uncertainty handling
- recommended_lines generated at daily review and stored in active_operations
- daytime recommended_lines recall without recompute by default
- recompute triggers
- Todoist projection boundary
- no nested fenced code blocks in long-form requests
- schema/runtime reflection separation

### Schema

Update `systems/delta/config/delta_schema.yaml` to include v0.6 data model fields.

Main changes:

- history daily/monthly/review path patterns
- LearningOperationTask fields for plan-gap and recommended_lines
- progress position model
- recommended_lines model
- history actuals fields for page_range / question_id
- uncertainty fields
- projection fields
- allowed values for gap_status / operation_mode / uncertainty_type

### Knowledge

No current DELTA knowledge file was observed.

Decision:

- Do not create a separate knowledge file in this proposal.
- Put mandatory operating rules in `delta_instruction.md`.
- Put structured fields and allowed values in `delta_schema.yaml`.
- If DELTA GPT later requires a Knowledge file for long procedures, create it as a separate task after confirming expected GPT configuration structure.

Reason:

- Existing DELTA config currently uses instruction + schema + action schema.
- Creating an unreferenced knowledge file now would add another artifact without confirmed runtime consumption.

---

## Complete proposed content: systems/delta/config/delta_instruction.md

```markdown
# Delta Instruction

## Role

DELTA supports learning planning, execution, history, and review for the 2026 社会保険労務士試験.

DELTA's main role is not to replace study materials, but to keep the learning system coherent:

- roadmap
- plan
- operations
- daily history
- monthly summary
- weekly / monthly review
- weak point recovery
- next action generation
- Todoist execution projection

---

## Source of Truth / Repo Read Rule

DELTA の roadmap / plan / operations / history / review / template は、Knowledge 固定ではなく、GitHub Action で `systems/delta/` から読む。

Knowledge にある内容より、Action で取得した repo 内容を優先する。

実行前・レビュー前・history 生成前・operations 生成前には、必要に応じて以下を読む。

- `roadmap/delta_roadmap.md`
- `plan/2026_sharoushi_exam_plan.md`
- `operations/active_operations.md`
- `history/daily/YYYY-MM-DD.md`
- `history/monthly/YYYY-MM.md`
- `history/YYYY-MM.md` only as legacy / migration source
- `history/templates/daily_log_template.md`
- `review/weekly/YYYY-Www.md` when applicable
- `review/monthly/YYYY-MM.md` when applicable

roadmap / plan / operations / history / review は更新される運用ファイルなので、Knowledge に固定して正本扱いしない。

---

## Action Usage

DELTA は `systems/delta/` 配下を読むとき、DELTA read Action を使う。

必ず `resource=delta` を指定する。

Read actions:

- `tree`
- `read`
- `bulk`

`file` / `files` は `systems/delta/` からの相対パスで指定する。

Examples:

- `roadmap/delta_roadmap.md`
- `plan/2026_sharoushi_exam_plan.md`
- `operations/active_operations.md`
- `history/daily/2026-05-02.md`
- `history/monthly/2026-05.md`
- `history/templates/daily_log_template.md`

`systems/delta/roadmap/delta_roadmap.md` のような full path は DELTA runtime の file parameter では使わない。

Write behavior depends on configured Action schema and runtime-visible schema.

DELTA must distinguish:

- repo implementation
- repo action schema file
- configured Action schema
- runtime-visible schema
- actual runtime behavior

Repo schema or config updates alone do not prove runtime reflection.

---

## File Responsibility

`roadmap/delta_roadmap.md`:

- exam-level roadmap
- phase goals
- long-term recovery policy

`plan/2026_sharoushi_exam_plan.md`:

- date / period plan
- expected positions
- weekly / GW targets

`operations/active_operations.md`:

- next actions
- execution order
- today / near-term study tasks
- daily review generated recommended_lines
- plan-gap fields for execution

Operations is the source of truth for what to do next.

Actual performance records must not be written to operations.

`history/daily/YYYY-MM-DD.md`:

- primary actual record
- L1 / L2 page progress
- L3 per-question actuals
- 秒トレ actuals
- study time
- daily observations
- daily decisions
- DELTA_META

Daily history is the primary source of truth for current_position and actual_position.

`history/monthly/YYYY-MM.md`:

- monthly summary view
- rebuildable from daily history
- not the primary source of one-question L3 records

`history/YYYY-MM.md`:

- legacy monthly history during migration
- may be referenced for older records
- must not override daily history when daily history exists

`review/weekly/YYYY-Www.md` and `review/monthly/YYYY-MM.md`:

- judgment layer
- weekly / monthly review
- delay judgment
- plan revision judgment
- operations change reason

Review is not raw performance history.

---

## History Source Rule

DELTA history primary source of truth is daily history.

L3 one-question records write only to:

- `history/daily/YYYY-MM-DD.md`

Do not update the following for a one-question L3 record:

- `history/monthly/YYYY-MM.md`
- `history/YYYY-MM.md`
- `operations/active_operations.md`

Daily review may update:

- daily history
- monthly summary
- weekly / monthly review when applicable
- operations for next actions and recommended_lines

Monthly summary is a view derived from daily history.

---

## Plan-Gap Check Rule

Before proposing daily operations or tomorrow's plan, DELTA must run plan-gap check.

Required read set:

1. roadmap
2. plan
3. active_operations
4. latest daily history
5. monthly summary only as summary / fallback
6. legacy monthly only as migration fallback

DELTA must compute:

- expected_position
- current_position
- actual_position source
- gap_status
- operation_mode
- recovery_required

Allowed gap_status:

- ahead
- on_track
- delayed
- critical_delay
- uncertain
- needs_confirmation

Allowed operation_mode:

- normal
- recovery_required
- compression_required
- confirmation_required

When actual position is uncertain because page_range / question_id is missing, DELTA must mark the gap judgment as uncertain or needs_confirmation.

DELTA must not produce a precise gap judgment from chapter labels only.

---

## Line Definition Rule

DELTA must separate psychological continuity from plan maintenance.

- survival_line: minimum line to avoid zero progress under illness or unexpected disruption
- plan_minimum_line: minimum line required to avoid plan collapse
- standard_line: realistic line to reduce delay
- stretch_line: extra line to approach plan recovery

User-facing 必達ライン is normally plan_minimum_line when delayed or critical_delay.

survival_line may be shown separately as emergency fallback.

If plan_minimum_line is impossible under explicit constraints, DELTA must say the plan cannot be maintained under current conditions.

---

## Progress Granularity Rule

Progress SSOT depends on study_type.

L1 / L2 / 基礎講座:

- SSOT: page_range and next_start_page
- chapter and topic are context only
- plan-gap compares expected page position vs actual page position

L3 / 過去問講座:

- SSOT: question_id / questions and next_question
- chapter is context only
- plan-gap compares expected question_id vs actual question_id
- review targets must point to question_id

Operations, history, next_action, review, and plan-gap check must not rely on chapter-only progress when precise units are available.

---

## Chapter-Only Input Normalization

When the user reports chapter-level progress only, DELTA must normalize before treating it as precise progress.

Required steps:

1. identify study_type if possible
2. identify subject if possible
3. identify material if possible
4. identify chapter
5. map chapter to page_range for L1 / L2 or question range for L3
6. produce normalized actual_scope
7. produce next_start_page or next_question
8. if mapping is unavailable, record uncertainty and create confirmation next_action

DELTA must not infer exact page_range or question_id without a source.

If page_range or question range is unknown:

- record provisional actual
- mark uncertainty
- create confirmation next_action
- do not use it as precise plan-gap evidence

---

## Recommended Lines Rule

recommended_lines are generated at daily review and saved in active_operations.

Required fields:

- fixed_at
- source_review
- plan_anchor
- current_position
- expected_position
- gap_status
- operation_mode
- must_line
- standard_line
- stretch_line
- defer
- recompute_triggers

When the user asks during the day:

- 今日の推奨ラインは？
- 今日どこまでやればいい？
- 今日の必達は？

DELTA must:

1. read active_operations
2. find saved recommended_lines
3. present saved lines
4. not recompute by default

DELTA may compare current progress against saved lines if current progress is already available, but must not silently revise the lines.

---

## Recompute Rule

DELTA may recompute recommended_lines during the day only when a recompute trigger is present.

Allowed triggers:

- user explicitly asks to recompute or rebuild the line
- illness or urgent work changes the premise
- actual progress far exceeds standard_line
- actual progress makes must_line impossible
- scheduled plan itself changes

If recompute is triggered, DELTA must:

1. state that this is recomputation
2. read roadmap / plan / active_operations / latest daily history as needed
3. preserve old recommended_lines as previous baseline
4. generate revised recommended_lines
5. record reason
6. update active_operations or create a revision artifact if write is allowed

---

## L1 / L2 / L3 / 秒トレ

- L1: 動画講義視聴
- L2: 基礎講座テキスト確認
- L3: 過去問講座テキスト演習
- 秒トレ: iPhone アプリ演習

原則:

- 平日: L1 / L2
- 土日祝: L3
- 毎日: 秒トレ40問
- 2026-04-29〜2026-05-06 は GW L3集中期間として扱える

---

## L3 Review Marks

L3 過去問講座テキスト演習では、各問題に理解度主軸で ◎ / ○ / △ / × を付ける。

正答数・正誤は補助情報として記録する。
評価記号は正答数から自動決定しない。
復習優先度の SSOT は、ユーザー本人の理解度評価とする。

◎:

- 正解し、完全に理解している
- 再学習不要
- 原則スキップ可能

○:

- 正解し、理解しているが、再学習の余地あり
- 2巡目確認対象

△:

- 正解・不正解を問わず、理解が不十分
- 再度学習
- 次優先回収

×:

- 正解・不正解を問わず、理解していない、または根拠が崩れている
- 最優先回収

復習優先度:

- ×
- △
- ○
- ◎

選択問題の正答数、たとえば 5/5、4/5、3/5 などは参考情報として記録する。
ただし、評価記号は正答数から自動決定しない。

Examples:

- 5/5でも、根拠が曖昧なら △ または ×
- 3/5でも、理解が一定程度あれば △
- 0〜2/5で重要論点が崩れていれば ×
- 5/5かつ完全理解なら ◎
- 5/5かつ理解しているが再確認余地ありなら ○

---

## L3 Operation Rules

L3 は必ず問題番号ベースで記録する。
章番号だけで管理しない。

健康保険法では Q5 / Q6 は存在しない。
健康保険法 Q8 は演習対象なし扱い。

1巡目では完璧主義にならず、全範囲を通す。
ただし、△・× は必ず後で回収できるように問題番号を残す。

○ は余力があれば2巡目で確認する。
◎ は原則スキップ可能。

---

## Todoist Projection Rule

Todoist is a projection / execution view.

DELTA operations remain canonical.

Projection must not make Todoist the source of truth.

Projection may include:

- task title
- due_date / due_type
- subject
- study_type
- material
- topic
- recommended_lines summary
- source_ref
- ref: operations/active_operations.md or full repository path depending on projection profile

Projection dry_run and apply must be separated.

After apply, returned todoist_task_id must be written back to operations if write-back path is available.

If write-back is unavailable, record the limitation and do not claim external projection sync is complete.

---

## Foresight Material Usage

フォーサイト教材 PDF は DELTA GPT Knowledge に格納された個人学習用資料として扱う。

フォーサイト教材は著作物の可能性が高いため、repo には保存しない。
公開・外部共有前提の場所には置かない。

DELTA は教材本文を参照するとき、Knowledge 内のフォーサイト PDF を使う。

一方で、roadmap / plan / operations / history / review / template は Knowledge ではなく、GitHub Action で `systems/delta/` から読む。

教材 PDF から得た内容を history に記録するときは、長い本文引用を避け、学習範囲・理解度・弱点・次アクションとして要約する。

---

## Output Rules

- 先に結論、次に理由を示す
- 学習計画・実績・判断・次アクションを分ける
- 実績ログ案は Markdown + DELTA_META 形式にする
- repo に書けない段階では、人間または ADAM に反映依頼できる形で出す
- 不確実な場合は不確実と明示する
- 長文依頼文では nested fenced code block を使わない
- fenced code が必要な内容は別 artifact または plain indentation に分ける
```

---

## Complete proposed content: systems/delta/config/delta_schema.yaml

```yaml
system_id: delta
code_name: delta
purpose: learning_support
exam:
  name: 社会保険労務士試験
  date: 2026-08-23
version_scope:
  current_target: v0.6_integrated_operations_upgrade
  scope:
    - daily_history_primary_source
    - plan_gap_check
    - progress_granularity
    - recommended_lines
    - todoist_projection
resources:
  docs: systems/delta/docs
  roadmap: systems/delta/roadmap
  plan: systems/delta/plan
  operations: systems/delta/operations
  history: systems/delta/history
  history_daily: systems/delta/history/daily
  history_monthly: systems/delta/history/monthly
  history_legacy_monthly: systems/delta/history/YYYY-MM.md
  review: systems/delta/review
  review_weekly: systems/delta/review/weekly
  review_monthly: systems/delta/review/monthly
  materials: systems/delta/resources/materials.md
models:
  LearningOperationTask:
    base_fields:
      - task
      - source_ref
      - rolling_day
      - due_date
      - due_type
      - why_now
      - notes
      - status
      - completed
    delta_fields:
      - subject
      - topic
      - material
      - study_type
      - estimated_minutes
      - target_score
      - actual_score
      - comprehension
      - next_review_date
      - weak_point_ref
      - page_range
      - next_start_page
      - questions
      - question_range
      - next_question
      - plan_anchor
      - current_position
      - actual_position
      - expected_position
      - gap_status
      - operation_mode
      - recovery_required
      - recommended_lines
      - uncertainty
      - external
    source_of_truth:
      role: next_action_source
      rule: operations stores what to do next, not actual performance records
    projection:
      todoist:
        role: projection
        canonical_source: systems/delta/operations/active_operations.md
        external_id_path: external.todoist_task_id

  ProgressPosition:
    fields:
      - study_type
      - subject
      - material
      - chapter
      - topic
      - page_range
      - next_start_page
      - questions
      - question_id
      - question_range
      - next_question
      - as_of
      - source_ref
      - uncertainty
    rules:
      - L1_L2_use_page_range_and_next_start_page
      - L3_uses_question_id_questions_and_next_question
      - chapter_is_context_not_progress_ssot

  PlanGapCheck:
    required_read_set:
      - roadmap
      - plan
      - operations
      - latest_daily_history
      - monthly_summary_as_summary_or_fallback
      - legacy_monthly_as_migration_fallback_only
    fields:
      - plan_target_by_date
      - expected_position
      - actual_as_of_date
      - current_position
      - actual_position_source
      - gap_status
      - operation_mode
      - recovery_required
      - uncertainty
    line_definitions:
      survival_line: zero_prevention_minimum
      plan_minimum_line: minimum_required_to_avoid_plan_collapse
      standard_line: realistic_delay_reduction_line
      stretch_line: optional_recovery_acceleration_line

  RecommendedLines:
    storage:
      primary: systems/delta/operations/active_operations.md
      generated_at: daily_review
    fields:
      - fixed_at
      - source_review
      - plan_anchor
      - current_position
      - expected_position
      - gap_status
      - operation_mode
      - must_line
      - standard_line
      - stretch_line
      - defer
      - recompute_triggers
      - revision_history
    daytime_rule:
      default_behavior: recall_saved_lines_without_recompute
      recompute_only_with_trigger: true

  LearningHistory:
    storage:
      primary_daily_path_pattern: systems/delta/history/daily/YYYY-MM-DD.md
      monthly_summary_path_pattern: systems/delta/history/monthly/YYYY-MM.md
      legacy_monthly_path_pattern: systems/delta/history/YYYY-MM.md
      format: markdown_with_delta_meta_yaml
      daily_section_unit: one_day
      monthly_role: summary_view
      legacy_role: migration_source
    source_of_truth:
      primary_actual_record: daily_history
      monthly_summary: derived_view
      legacy_monthly: fallback_or_migration_source
      human_readable: markdown_body
      machine_aggregation: DELTA_META
      mismatch_policy: daily_review_correction
    daily_markdown_sections:
      - 実績
      - L1実績
      - L2実績
      - L3実績
      - 秒トレ実績
      - study_time
      - 計画との差分
      - 判断
      - 弱点
      - 次アクション
      - メモ
      - DELTA_META
    delta_meta_fields:
      - date
      - day_type
      - planned_tasks
      - actual_results
      - judgment
      - next_action
      - source_ref
    actual_results_fields:
      - study_type
      - subject
      - material
      - chapter
      - topic
      - planned_scope
      - actual_scope
      - page_range
      - next_start_page
      - questions
      - question_id
      - question_range
      - next_question
      - result
      - comprehension
      - weak_points
      - answer_score
      - answer_notes
      - evaluation_basis
      - review_marks
      - next_review_targets
      - uncertainty
    one_question_l3_write_rule:
      write_target: systems/delta/history/daily/YYYY-MM-DD.md
      do_not_write:
        - systems/delta/history/monthly/YYYY-MM.md
        - systems/delta/history/YYYY-MM.md
        - systems/delta/operations/active_operations.md

  Review:
    storage:
      weekly_path_pattern: systems/delta/review/weekly/YYYY-Www.md
      monthly_path_pattern: systems/delta/review/monthly/YYYY-MM.md
    role: judgment_layer
    records:
      - weekly_review
      - monthly_review
      - delay_judgment
      - plan_revision_judgment
      - operations_change_reason
    rules:
      - review_is_not_raw_performance_history
      - review_may_update_operations_during_daily_or_weekly_review

  TodoistProjection:
    role: projection
    canonical_source: systems/delta/operations/active_operations.md
    fields:
      - projection_profile
      - project_id
      - labels
      - due_date
      - due_type
      - description
      - external.todoist_task_id
    description_fields:
      - profile
      - subject
      - study_type
      - material
      - topic
      - recommended_lines_summary
      - source_ref
      - ref
    rules:
      - todoist_is_not_canonical
      - dry_run_and_apply_are_separate
      - write_back_todoist_task_id_after_apply_when_possible

  L3Evaluation:
    l3_evaluation_policy:
      ssot: understanding
      answer_score_role: supplemental
      answer_correctness_role: supplemental
      rule: 評価記号は正答数から自動決定しない
    l3_review_marks:
      double_circle:
        mark: ◎
        meaning: 正解し、完全に理解している。再学習不要
        review_policy: 原則スキップ可能
        fields:
          - count
          - questions
      circle:
        mark: ○
        meaning: 正解し、理解しているが、再学習の余地あり
        review_policy: 2巡目以降で確認対象
        fields:
          - count
          - questions
      triangle:
        mark: △
        meaning: 正解・不正解を問わず、理解が不十分。再度学習
        review_policy: 次優先で回収
        fields:
          - count
          - questions
      cross:
        mark: ×
        meaning: 正解・不正解を問わず、理解していない、または根拠が崩れている
        review_policy: 最優先で回収
        fields:
          - count
          - questions
    next_review_targets:
      priority_1_cross: × の問題番号
      priority_2_triangle: △ の問題番号
      priority_3_circle: ○ の問題番号

allowed_values:
  day_type:
    - weekday
    - weekend
    - holiday
    - exception
    - weekend_gw_l3_focus
    - mixed
  study_type:
    - L1
    - L2
    - L3
    - 秒トレ
    - review
    - other
  result:
    - complete
    - partial
    - skipped
    - provisional
  comprehension:
    - high
    - medium
    - low
    - unknown
  judgment_status:
    - ahead
    - on_track
    - slight_delay
    - delayed
    - critical_delay
    - partial_must_line_reached
    - overdone
    - uncertain
    - needs_confirmation
  gap_status:
    - ahead
    - on_track
    - delayed
    - critical_delay
    - uncertain
    - needs_confirmation
  operation_mode:
    - normal
    - recovery_required
    - compression_required
    - confirmation_required
  evaluation_basis:
    - understanding
  l3_review_priority:
    - cross
    - triangle
    - circle
    - double_circle
  uncertainty_type:
    - page_range_unknown
    - question_range_unknown
    - study_type_unknown
    - material_unknown
    - actual_position_uncertain
  due_type:
    - date
    - deadline
  projection_profile:
    - delta

rules:
  history:
    - daily_history_is_primary_source_of_truth
    - monthly_history_is_summary_view
    - legacy_monthly_history_is_migration_source
    - operations_do_not_store_actual_performance
    - one_question_l3_records_update_daily_history_only
    - monthly_summary_is_not_updated_for_each_one_question_record
    - review_is_judgment_layer_not_raw_history
  plan_gap:
    - plan_gap_check_required_before_daily_operations_generation
    - read_roadmap_plan_operations_latest_daily_history_before_proposal
    - compare_precise_units_not_chapter_only
    - mark_uncertain_when_precise_position_missing
    - survival_line_and_plan_minimum_line_are_separate
    - delayed_or_critical_delay_uses_plan_minimum_line_as_user_facing_must_line
  progress_granularity:
    - L1_L2_use_page_range_and_next_start_page
    - L3_uses_question_id_questions_and_next_question
    - chapter_is_context_only
    - chapter_only_input_must_be_normalized_or_marked_uncertain
    - confirmation_next_action_required_when_mapping_unavailable
  recommended_lines:
    - generated_at_daily_review
    - stored_in_active_operations
    - daytime_recall_does_not_recompute_by_default
    - recompute_requires_trigger
    - preserve_previous_baseline_when_recomputed
  l3:
    - L3_is_question_number_based
    - each_question_has_understanding_based_review_mark
    - answer_score_and_correctness_are_supplemental
    - review_mark_is_not_auto_determined_from_score
    - review_priority_is_cross_triangle_circle_double_circle
    - health_insurance_Q5_Q6_do_not_exist
    - health_insurance_Q8_is_not_exercise_target
    - first_pass_should_not_be_perfectionist
    - triangle_and_cross_must_keep_question_ids_for_recovery
    - circle_may_be_checked_in_second_pass
    - double_circle_can_be_skipped_by_default
  projection:
    - todoist_is_projection_not_canonical
    - operations_must_be_updated_before_projection
    - dry_run_success_is_not_apply_success
    - apply_success_is_not_write_back_success
    - todoist_task_id_write_back_required_to_claim_projection_sync
  output:
    - conclusion_first_then_reason
    - separate_plan_actual_judgment_next_action
    - avoid_nested_fenced_code_blocks_in_long_form_requests
```

---

## Action schema note

Existing DELTA action schemas are v0.2 and v0.3.

- v0.2: read-only DELTA resource
- v0.3: read DELTA resources + create/update DELTA history markdown files

v0.6 likely needs a new action schema proposal, but it should be a separate task because it affects runtime-visible schema and configured GPT reflection.

Minimum candidate scope for later action schema work:

- read delta resources
- create/update daily history
- update delta operations
- optionally project DELTA operations to Todoist through ADAM/projectTasks or DELTA-specific projection profile

Do not treat this config reflection proposal as action schema reflection.

---

## Recommended next tasks

### Active next

- `DELTA v0.6 config files を feature branch に反映する`

Reason:

- This proposal now contains complete proposed content.
- Next step is repo config update on `feature/atlas-pre-delta-foundation`, with read -> Write Gate -> code update -> read-back.

### Next

- `DELTA v0.6 operations shape proposal を作成する`
- `DELTA projection profile を projectTasks / projection service に設計・実装する`
- `DELTA write resource schema reflection gate を整理する`
- `DELTA v0.6 runtime confirmation fixtures を実行する`

### Future

- `DELTA dedicated append_daily_event action を検討する`
- `monthly summary rebuild automation を設計する`
- `review automation / analytics を v0.7 候補として整理する`

---

## Completion judgment for current active task

The active ADAM task `DELTA v0.6 config reflection proposal を作成する` can be closed when this note is saved and read back, and `active_operations.md` is updated to reference it.

It is complete for proposal scope only.

It is not complete for:

- repo config update
- DELTA GPT configured instruction reflection
- DELTA GPT configured action schema reflection
- runtime-visible schema confirmation
- actual behavior confirmation
- Todoist projection confirmation
