# 2026-05-02 DELTA progress granularity rule design

## purpose

DELTA がユーザーの章単位報告を受け取った場合でも、内部では L1 / L2 は page_range、L3 は question_id / questions へ正規化して記録・operations・plan-gap check に使うための設計。

---

## source_ref

- notes/01_issues/2026-05-02_delta_progress_granularity_rule_issue.md
- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- notes/02_design/2026-05-01_delta_daily_operations_plan_gap_check_design.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- user request: DELTA progress granularity rule の改良依頼

---

## design conclusion

DELTA の progress SSOT 粒度は study_type で切り替える。

- L1 / L2 / 基礎講座: page_range が SSOT
- L3 / 過去問講座: question_id / questions が SSOT
- chapter は補助情報であり、plan-gap check / operations / history / review の主比較単位にしない

ユーザー入力が chapter-only でも、内部記録では page_range または question_id へ正規化する。

正規化できない場合は未確定として記録し、推測で確定しない。

---

## progress granularity by study_type

### L1 / L2 / 基礎講座

SSOT: page_range

Required fields:

- study_type
- subject
- material
- chapter
- topic
- page_range
- actual_scope
- next_start_page
- result

Example normalized record:

- study_type: L1
- subject: 国民年金法
- material: 基礎講座
- chapter: 7章
- topic: 遺族基礎年金
- page_range: P166〜P180
- actual_scope: 7章 遺族基礎年金 P166〜P180 完了
- next_start_page: P181
- result: completed

Rules:

- chapter and topic are context fields
- page_range is used for progress calculation
- next_start_page is used for next action
- plan gap check compares expected page range / actual page position, not chapter label only

### L3 / 過去問講座

SSOT: question_id / questions

Required fields:

- study_type
- subject
- material
- chapter
- topic
- questions
- actual_scope
- next_question
- review_marks
- weak_points
- next_review_targets
- result

Example normalized record:

- study_type: L3
- subject: 健康保険法
- material: 過去問講座
- chapter: 3章
- topic: unknown or chapter topic
- questions:
  - Q3-1
  - Q3-2
  - Q3-3
  - Q3-4
- actual_scope: Q3-1〜Q3-4 完了
- next_question: Q4-1
- review_marks: []
- weak_points: []
- next_review_targets: []
- result: completed

Rules:

- chapter is context only
- questions / question_id are used for progress calculation
- next_question is used for next action
- review targets must point to question_id, not chapter label only
- plan gap check compares expected question_id / actual question_id, not chapter label only

---

## chapter-only input normalization

When user reports only chapter-level progress, DELTA must classify the input.

Input examples:

- 7章完了
- 6章まで
- 3章終わり

Required normalization steps:

1. identify study_type if possible
2. identify subject if possible
3. identify material if possible
4. identify chapter
5. map chapter to page_range for L1 / L2 or question range for L3
6. produce normalized actual_scope
7. produce next_start_page or next_question
8. if mapping is unavailable, record uncertainty and create confirmation next_action

---

## uncertainty handling

DELTA must not infer exact page_range or question_id without a source.

If page_range cannot be mapped:

- record: L1 国民年金法 7章完了。ページ範囲未確定
- uncertainty: page_range_unknown
- next_action: 確認: 国民年金法 7章のページ範囲を確認する

If question range cannot be mapped:

- record: L3 健康保険法 3章完了。問題番号未確定
- uncertainty: question_range_unknown
- next_action: 確認: 健康保険法 3章の問題番号範囲を確認する

Uncertainty rule:

- uncertain records may exist as provisional history
- uncertain records must not be used as precise plan-gap evidence
- plan-gap check must mark actual position as uncertain if page_range / question_id is missing

---

## operations rule

Operations must not contain chapter-only tasks.

Bad examples:

- 国民年金法 7章を進める
- 健康保険法 3章を進める

Good examples:

- 国民年金法 L1 7章 遺族基礎年金 P166〜P180
- 国民年金法 L2 P158〜P165
- 健康保険法 L3 Q3-4〜Q4-5

Required operation fields or content:

- L1 / L2: page_range or next_start_page / target_page
- L3: question range or next_question / target_question
- chapter may be included, but not alone

---

## history rule

History must normalize chapter-only user input.

Example:

- user input: 7章完了
- history record: L1 国民年金法 7章 遺族基礎年金 P166〜P180 完了

Example:

- user input: 3章終わり
- history record: L3 健康保険法 Q3-1〜Q3-4 完了

If unknown:

- history record: L1 国民年金法 7章完了。ページ範囲未確定
- next_action: 国民年金法 7章のページ範囲を確認する

---

## next_action rule

Next action must specify restart point.

L1 / L2:

- next_start_page is required when known
- example: 次回 L1: 8章 P181以降

L3:

- next_question is required when known
- example: 次回 L3: Q4-1以降

If unknown:

- next_action must be a confirmation task, not a study continuation task

---

## plan-gap check integration

Plan-gap check must use precise units.

L1 / L2:

- compare expected page position with actual page position
- if actual page position is unknown, gap_status is uncertain or needs_confirmation

L3:

- compare expected question_id with actual question_id
- if actual question_id is unknown, gap_status is uncertain or needs_confirmation

Chapter-only comparison is forbidden for precise gap judgments.

---

## review integration

Weekly / monthly review must aggregate progress by:

- page range for L1 / L2
- question_id / question range for L3
- review_marks and weak_points by question_id

Chapter completion can be displayed as summary, but not used as the primary calculation unit.

---

## long-form request markdown rule

DELTA long-form requests to ADAM must avoid nested fenced code blocks.

Problem:

- Outer fenced code block plus inner yaml / text / md fenced block can prematurely close the outer block and break Markdown display.

Rule:

- Do not include triple-backtick fenced blocks inside a long request that may itself be wrapped in a fenced block.
- Use headings, bullet lists, and indentation instead.
- YAML-like examples should be expressed as indented lists, not fenced YAML blocks.
- Code examples that require triple backticks should be moved to a separate artifact or omitted from long handoff-style requests.

This is a DELTA output-format rule, not a study progress rule, but it should be placed with DELTA long-form request generation behavior.

---

## implementation targets

Potential reflection targets:

1. DELTA instruction
   - enforce study_type-specific progress SSOT
   - forbid chapter-only operations / history / next_action when exact mapping is available
   - require uncertainty marking when mapping is unavailable
   - forbid nested fenced code block in long-form requests

2. DELTA knowledge
   - detailed normalization procedure
   - field definitions by study_type
   - examples and uncertainty handling

3. DELTA schema
   - L1 / L2 fields: page_range, next_start_page
   - L3 fields: questions, next_question, review_marks, weak_points, next_review_targets
   - uncertainty fields: page_range_unknown, question_range_unknown, needs_confirmation

4. DELTA operations generator
   - prevent chapter-only task generation
   - require page_range / question range in task content or structured fields

5. DELTA history writer
   - normalize chapter-only input
   - add confirmation next_action if mapping is unavailable

6. Plan-gap check
   - compare page_range / question_id, not chapter label
   - mark uncertainty when precise position is missing

7. Runtime confirmation
   - fixture: user says 7章完了
   - expected: L1 page_range normalized or uncertainty recorded
   - fixture: user says 3章終わり
   - expected: L3 questions normalized or uncertainty recorded

---

## completed_condition for design

This design is complete enough when:

- study_type-specific SSOT is defined
- chapter-only normalization flow is defined
- uncertainty handling is defined
- operations / history / next_action / review / plan-gap integration rules are defined
- long-form Markdown nested fenced block rule is defined
- implementation targets are listed

Further work:

- decide exact DELTA instruction / knowledge / schema changes
- update DELTA config files
- update generator code or prompt if present
- create runtime confirmation fixtures
- integrate this into the active Day0 plan-gap decomposition task
