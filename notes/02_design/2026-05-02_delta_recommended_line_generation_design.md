# 2026-05-02 DELTA recommended line generation design

## purpose

DELTA の recommended_lines を、日中の都度再見積もりではなく daily review で固定し、active_operations から参照する運用に修正するための設計。

---

## source_ref

- notes/01_issues/2026-05-02_delta_recommended_line_generation_issue.md
- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
- notes/02_design/2026-05-02_delta_progress_granularity_rule_design.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- user request: DELTA recommended line generation の設計修正依頼

---

## design conclusion

recommended_lines は daily review で生成し、翌日の active_operations に保存する。

日中にユーザーが「今日の推奨ラインは？」と聞いた場合、DELTA は保存済み recommended_lines を提示し、原則としてその場で再見積もりしない。

再計算は recompute_triggers に該当する場合だけ許可する。

---

## generation timing

Recommended lines are generated at daily review.

Daily review sequence:

1. roadmap を読む
2. plan を読む
3. active_operations を読む
4. latest history を読む
5. plan 上の本来位置を抽出する
6. history 上の現在地を抽出する
7. progress granularity を page_range / question_id に正規化する
8. gap_status を判定する
9. operation_mode を決める
10. 翌日の must_line / standard_line / stretch_line / defer を決める
11. recommended_lines として active_operations に保存する

---

## storage location

Primary storage:

- systems/delta/operations/active_operations.md

Each relevant daily task should carry recommended_lines or reference a daily proposal artifact.

Initial decision:

- recommended_lines の要約は active_operations に保存する
- 詳細な検討ログは daily review report または daily proposal artifact に残してよい
- 日中の回答は active_operations の recommended_lines を SSOT とする

---

## recommended_lines fields

Required fields:

- fixed_at
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

Example:

- fixed_at: 2026-05-01 daily review
- plan_anchor: GW L3集中期間
- current_position: 健康保険法 L3 Q3-4
- expected_position: 健康保険法 L3 Q9-1〜Q11最後
- gap_status: delayed
- operation_mode: recovery
- must_line:
  - 秒トレ40問
  - 健康保険法 L3 Q4-1〜Q4-5
- standard_line:
  - 秒トレ40問
  - 健康保険法 L3 Q4-1〜Q4-10
- stretch_line:
  - 健康保険法 L3 Q7の最後まで
- defer:
  - 国民年金法 L2
- recompute_triggers:
  - 体調不良
  - 急な仕事
  - 予定変更
  - ユーザーが再見積もりを依頼
  - 実績が推奨ラインを大きく超過
  - 実績が必達ラインに大きく届かない

---

## daytime answer rule

When user asks during the day:

- 今日の推奨ラインは？
- 今日どこまでやればいい？
- 今日の必達は？

DELTA must:

1. read active_operations
2. find today's recommended_lines
3. present saved recommended_lines
4. optionally mention current progress difference if history/progress is provided in the current conversation
5. not recompute by default

Expected wording:

- 今日の推奨ラインは、前回の daily review で確定した以下です。
- 必達: ...
- 標準: ...
- 余力: ...
- 後回し: ...

---

## recompute rule

DELTA may recompute recommended_lines during the day only when a recompute trigger is present.

Allowed triggers:

- ユーザーが「今日のラインを組み直して」と明示した
- 急な仕事や体調不良など、前提条件が変わった
- 実績が標準ラインを大きく超え、次のライン設定が必要になった
- 必達ライン未達が確実になり、survival_line への切替が必要になった
- scheduled plan itself changed

If recompute is triggered:

1. state that this is a recomputation, not ordinary recall
2. read roadmap / plan / active_operations / latest history as needed
3. preserve old recommended_lines as previous baseline
4. generate revised recommended_lines
5. record reason for recomputation
6. update active_operations or create a revision artifact if write is allowed

---

## non-recompute response

If no trigger is present, DELTA should not say:

- いま再計算すると...
- 今日の進捗から考えると新しい必達は...
- plan / history を読み直して改めて見積もると...

Instead:

- recall saved recommended_lines
- explain they were fixed at daily review
- offer current progress comparison only if data is already available or user asks for comparison

---

## relation to plan-gap check

Plan-gap check determines recommended_lines at daily review time.

Plan-gap check should not be re-run casually during the day.

Correct relationship:

- daily review: compute plan gap and recommended_lines
- daytime execution: follow saved recommended_lines
- daytime progress update: record progress and compare against saved lines
- recompute: only under explicit trigger

---

## relation to progress granularity

Recommended lines must use precise progress units.

- L1 / L2: page_range / next_start_page
- L3: questions / question_id / next_question

Recommended lines must not be chapter-only.

Bad:

- 健康保険法 3章を進める

Good:

- 健康保険法 L3 Q4-1〜Q4-5

---

## schema candidate

Each daily operation may include:

- recommended_lines:
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
  - revision_history optional

Open question:

- Whether recommended_lines belongs directly under each day task
- Or whether a separate daily_proposal artifact should be referenced from active_operations

Initial judgment:

- Store concise recommended_lines directly in active_operations
- Store detailed reasoning in daily review report / proposal artifact

---

## runtime confirmation fixtures

Fixture 1: normal recall

- Setup: active_operations has recommended_lines fixed_at daily review
- User asks: 今日の推奨ラインは？
- Expected: DELTA reads active_operations and presents saved lines without recomputation

Fixture 2: explicit recompute

- Setup: active_operations has recommended_lines
- User says: 急な仕事が入った。今日のラインを組み直して
- Expected: DELTA identifies recompute trigger, states recomputation, recalculates and records reason

Fixture 3: progress comparison without recompute

- Setup: active_operations has recommended_lines
- User says: いま Q4-3 まで終わった。今日の推奨ラインは？
- Expected: DELTA presents saved lines and optionally says current progress is below/near/above must_line, without changing lines

---

## implementation targets

1. DELTA instruction
   - recommended_lines are daily-review generated and active_operations stored
   - daytime recall does not recompute by default
   - recompute triggers are explicit

2. DELTA knowledge
   - daily review generation procedure
   - daytime response procedure
   - recompute procedure

3. DELTA schema
   - recommended_lines fields
   - recompute_triggers
   - optional revision history

4. DELTA operations generation
   - write recommended_lines into active_operations

5. DELTA runtime confirmation
   - normal recall fixture
   - explicit recompute fixture
   - progress comparison fixture

---

## completed_condition for design

This design is complete enough when:

- generation timing is fixed to daily review
- active_operations storage is specified
- recommended_lines fields are defined
- daytime non-recompute behavior is defined
- recompute triggers are defined
- relation to plan-gap check and progress granularity is defined
- implementation targets and runtime fixtures are listed

Further work:

- decide exact schema placement
- update DELTA instruction / knowledge / schema
- update daily review generation if generator exists
- add runtime confirmation fixtures
- integrate this into the active Day0 decomposition task
