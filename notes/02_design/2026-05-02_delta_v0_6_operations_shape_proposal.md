# 2026-05-02 DELTA v0.6 operations shape proposal

## Purpose

DELTA v0.6 config reflection 後、`systems/delta/operations/active_operations.md` を v0.6 schema に合わせるための operations shape proposal を作成する。

This is a proposal artifact. It is not yet a DELTA operations update and not a runtime fixture completion.

---

## Source refs

- notes/08_analysis/2026-05-02_delta_v0_6_task_decomposition.md
- notes/02_design/2026-05-02_delta_v0_6_config_reflection_proposal.md
- systems/delta/config/delta_instruction.md
- systems/delta/config/delta_schema.yaml
- systems/delta/operations/active_operations.md
- systems/delta/history/daily/2026-05-02.md
- systems/delta/history/monthly/2026-05.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/roadmap/delta_roadmap.md

Branch:

- `feature/atlas-pre-delta-foundation`

---

## Read evidence

ADAM read the required DELTA source files through `resource=delta`, branch `feature/atlas-pre-delta-foundation`.

Read files and sha:

- `operations/active_operations.md`: `7ead0b9d2626810869a8b93f96aca1c4ac95c351`
- `history/daily/2026-05-02.md`: `c243605e8dcbe57c18e38d0c096ad21f9b458c94`
- `history/monthly/2026-05.md`: `2de5674e27979f671f2c3d5a861f67dec9ceaae8`
- `plan/2026_sharoushi_exam_plan.md`: `b4b8e077e82b0601e9d44a30712c21454f351c9a`
- `roadmap/delta_roadmap.md`: `70bdfa5e7e31299bc6f0ad027ab939611c654357`

DELTA configured GPT minimum read was also confirmed by user report after Bearer API key setup:

- resource: `delta`
- action: `read`
- branch: `feature/atlas-pre-delta-foundation`
- file: `operations/active_operations.md`
- request_id: `de8dc8c7-200e-4529-a09b-637873a9d0c7`
- returned sha: `7ead0b9d2626810869a8b93f96aca1c4ac95c351`

---

## Current state findings

### active_operations

Current DELTA active_operations is pre-v0.6 shape.

It contains:

- daily tasks by Day0〜Day6
- due_date / due_type
- subject / topic / study_type / material
- notes describing minimum / standard / stretch lines in prose
- source_ref that still often points to legacy monthly history `systems/delta/history/2026-04.md`

Missing or insufficient:

- structured `plan_anchor`
- structured `current_position`
- structured `expected_position`
- structured `gap_status`
- structured `operation_mode`
- structured `recovery_required`
- structured `recommended_lines`
- precise `question_range` / `next_question` for the main 2026-05-02 task
- daily history as source_ref for current_position
- explicit daytime no-recompute rule in operations itself

### daily history 2026-05-02

Daily history is the primary actual record and is more current than monthly summary.

Key actuals:

- L1: 国民年金法 7章 遺族基礎年金 P166〜P180 完了
- L3: 健康保険法 Q3-4〜Q4-5
- next L3 restart point: Q4-6
- L3 weak/review targets:
  - priority_1_cross: Q4-2, Q4-5
  - priority_2_triangle: Q4-3, Q4-4
  - priority_3_circle: Q3-4
  - skip_possible: Q4-1
- judgment: partial_must_line_reached
- reason: 5/2修正後必達ライン Q3-4〜Q4-5 には到達。ただしGW全体計画上は遅れが残る。

### monthly summary 2026-05

Monthly summary correctly states it is a summary view, not primary source.

However, it is stale relative to daily 2026-05-02:

- monthly current_position says L3: Q3-1〜Q4-2, next Q4-3
- daily 2026-05-02 says L3: Q3-4〜Q4-5, next Q4-6

Decision:

- operations shape must use daily history as current_position source.
- monthly summary may be cited only as summary/fallback and should be updated later by daily review/monthly summary rebuild, not during one-question or operations-shape proposal.

### plan expected position

Plan says 2026-05-02 expected L3 task:

- 健康保険法 択一 Q9-1〜Q11の最後まで

Daily 2026-05-02 actual:

- 健康保険法 Q3-4〜Q4-5

Judgment:

- gap_status: `critical_delay` or `delayed`
- recommended stronger value: `critical_delay`, because expected Q9-1〜Q11 vs actual Q4-5 leaves a large gap during GW L3 concentration.
- operation_mode: `recovery_required`
- recovery_required: true

---

## Proposed v0.6 operations principles

1. Operations remains next-action SSOT.
2. Operations must not store actual performance records as history.
3. Operations may store plan-gap summary and recommended_lines generated from daily review.
4. Daily history is the primary source for current_position.
5. Monthly summary is a summary view and can be stale.
6. L1/L2 progress uses page_range / next_start_page.
7. L3 progress uses question_range / next_question.
8. recommended_lines are saved and recalled during the day without recompute.
9. recompute requires explicit trigger.
10. Todoist fields are projection metadata only.

---

## Proposed active_operations shape

Recommended immediate update target:

- `systems/delta/operations/active_operations.md`

Update strategy:

- Replace current pre-v0.6 Day0〜Day6 layout with a smaller v0.6 shape anchored on current actuals and near-term execution.
- Keep historical completed entries out of active day structure, or move them to archive/history later.
- Focus active operations on 2026-05-02〜2026-05-06 GW L3 recovery.

### Proposed top metadata

```yaml
version: delta_v0.6_operations_shape
updated_at: 2026-05-02
branch: feature/atlas-pre-delta-foundation
source_of_truth:
  operations_role: next_action_source
  current_position_primary_source: systems/delta/history/daily/2026-05-02.md
  monthly_summary_role: summary_view
  todoist_role: projection
```

### Proposed plan_gap block

```yaml
plan_gap:
  fixed_at: 2026-05-02
  plan_anchor:
    source_ref: systems/delta/plan/2026_sharoushi_exam_plan.md
    date: 2026-05-02
    expected_position:
      study_type: L3
      subject: 健康保険法
      material: 過去問講座テキスト
      question_range: Q9-1〜Q11-last
  current_position:
    source_ref: systems/delta/history/daily/2026-05-02.md
    as_of: 2026-05-02
    L1:
      subject: 国民年金法
      page_range: P166〜P180
      actual_scope: 7章 遺族基礎年金 P166〜P180 完了
      next_start_page: P181
    L3:
      subject: 健康保険法
      question_range: Q3-4〜Q4-5
      next_question: Q4-6
      weak_points:
        priority_1_cross:
          - Q4-2
          - Q4-5
        priority_2_triangle:
          - Q4-3
          - Q4-4
        priority_3_circle:
          - Q3-4
        skip_possible:
          - Q4-1
    sokutore:
      status: unknown_for_2026-05-02
  gap_status: critical_delay
  operation_mode: recovery_required
  recovery_required: true
  reason:
    - plan expected 健康保険法 Q9-1〜Q11-last by 2026-05-02
    - actual primary daily history shows 健康保険法 Q4-5まで
    - daily judgment says 修正後必達ラインは達成したがGW全体計画上の遅れは残る
```

### Proposed recommended_lines block

```yaml
recommended_lines:
  fixed_at: 2026-05-02
  source_review: systems/delta/history/daily/2026-05-02.md
  plan_anchor: 2026-05-02 GW L3集中期間
  current_position: 健康保険法 L3 Q4-5まで、次 Q4-6
  expected_position: 健康保険法 L3 Q9-1〜Q11-last
  gap_status: critical_delay
  operation_mode: recovery_required
  must_line:
    - 健康保険法 L3 Q4-6〜Q7-last を可能な限り進める
    - 秒トレ40問を未完了なら実施する
  standard_line:
    - 健康保険法 L3 Q4-6〜Q7-last
    - Q4-2 / Q4-5 の×を軽く確認してから進む
    - 秒トレ40問
  stretch_line:
    - 健康保険法 L3 Q9-1手前まで到達する
    - 可能なら Q9-1 へ着手する
  defer:
    - 国民年金法 L1/L2 の追加前進は原則 defer
    - monthly summary rebuild は daily review / summary task に defer
    - Todoist projection は operations shape 固定後に defer
  recompute_triggers:
    - user_explicitly_requests_recompute
    - illness_or_urgent_work_changes_available_time
    - Q7-last_before_end_of_day
    - must_line_becomes_impossible
    - plan_changes
```

### Proposed active tasks

#### Day0 / 2026-05-02 remaining

```yaml
- task: 健康保険法 L3 Q4-6以降を進める
  source_ref:
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/operations/active_operations.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  subject: 健康保険法
  topic: L3 択一 Q4-6以降
  study_type: L3
  material: 過去問講座テキスト
  question_range: Q4-6以降
  next_question: Q4-6
  plan_anchor:
    expected_position: Q9-1〜Q11-last
    current_position: Q4-5まで
    gap_status: critical_delay
  operation_mode: recovery_required
  recovery_required: true
  why_now:
    - daily history 2026-05-02 では Q4-5まで到達、次は Q4-6
    - plan expected は Q9-1〜Q11-last のため遅れが大きい
    - 5/2の残り時間は健康保険法L3のリカバリーに使うのが最も整合的
  completed_condition:
    - 実施した question_id を daily history 2026-05-02 に記録する
    - 各 question に理解度主軸で ◎ / ○ / △ / × を付ける
    - × / △ / ○ / ◎ の review targets を daily history に残す
  notes:
    - operations には実績を書かない。実績は daily history に書く
    - recommended_lines は上記 saved block を参照し、日中は原則再計算しない
```

#### Day0 / 秒トレ

```yaml
- task: 秒トレ40問
  source_ref:
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day0
  due_date: 2026-05-02
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ
  current_position:
    source_ref: systems/delta/history/daily/2026-05-02.md
    status: unknown_for_2026-05-02
  why_now:
    - 秒トレは毎日40問の固定運用
    - daily history 2026-05-02 では未完了なら実施と記録されている
  completed_condition:
    - 40問実施または未実施理由を daily history に記録する
```

#### Day1 / 2026-05-03 recovery

```yaml
- task: 健康保険法 L3 遅れ回収と×・△優先復習
  source_ref:
    - systems/delta/history/daily/2026-05-02.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
  rolling_day: Day1
  due_date: 2026-05-03
  due_type: date
  subject: 健康保険法
  study_type: L3
  material: 過去問講座テキスト
  next_question: Q4-6
  review_targets:
    priority_1_cross:
      - Q4-2
      - Q4-5
    priority_2_triangle:
      - Q4-3
      - Q4-4
    priority_3_circle:
      - Q3-4
  operation_mode: recovery_required
  recovery_required: true
  completed_condition:
    - Q4-6以降の実施範囲を daily history に記録する
    - ×・△の回収有無を daily history に記録する
  notes:
    - Plan originally expected 5/3 to start recovery and 国民年金法 選択問題, but current delay means 健康保険法L3 recovery remains priority
```

### Proposed Rules section

Operations should include or preserve concise rules:

```markdown
## Rules

- Operations is next-action SSOT.
- Actual results are recorded in daily history, not operations.
- Daily history is primary actual source.
- Monthly history is summary view.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / question_range / next_question.
- recommended_lines are generated by daily review and saved here.
- Daytime recommended line questions recall saved recommended_lines; do not recompute unless trigger exists.
- Todoist is projection only.
```

---

## Should we update operations in the same task?

Recommendation: yes, but as the next step after this proposal note is saved and read back.

Reason:

- Source data is already read.
- The current operations file is clearly inconsistent with v0.6 schema.
- The update is small and directly follows the proposal.
- Waiting would leave DELTA configured runtime readable but still operating from stale shape.

Required update gate:

- Read `systems/delta/operations/active_operations.md` latest sha.
- Write Gate before update.
- Use `resource=code` on branch `feature/atlas-pre-delta-foundation` if ADAM performs repo-side update.
- Do not claim DELTA runtime write behavior unless DELTA action write is tested separately.

---

## Follow-up tasks after operations update

1. `DELTA v0.6 operations shape を feature branch に反映する`
2. `DELTA configured GPT で bulk / tree runtime read を確認する`
3. `DELTA recommended_lines recall fixture を実行する`
4. `DELTA chapter-only normalization fixture を実行する`
5. `DELTA one-question daily-history write fixture を dry-run/design から実行へ進める`
6. `DELTA Todoist projection profile を設計・実装する`
7. `DELTA write resource schema reflection gate を整理する`

---

## Completion judgment for proposal task

The active task `DELTA v0.6 operations shape proposal を作成する` can be closed when:

- this note is saved and read back
- `active_operations.md` references this proposal note or notes mention it
- the follow-up operations update task is routed

This proposal task is not complete for:

- DELTA operations repo update
- DELTA runtime behavior confirmation beyond minimum read
- DELTA write behavior
- Todoist projection
