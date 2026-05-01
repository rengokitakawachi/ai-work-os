# 2026-05-01 DELTA daily operations plan-gap check design

## purpose

DELTA daily operations generation を、直近反応型ではなく長期・中期計画からの逆算型に修正するための設計メモ。

---

## source_ref

- notes/01_issues/2026-05-01_delta_daily_operations_plan_gap_check_issue.md
- systems/delta/roadmap/delta_roadmap.md
- systems/delta/plan/2026_sharoushi_exam_plan.md
- systems/delta/operations/active_operations.md
- systems/delta/history/2026-05.md
- user analysis: DELTA 2026-05-02 daily operation proposal failure

---

## design conclusion

DELTA の daily operations generation は、次アクション提示前に plan-gap check を必須実行する。

計画差分がある場合、通常の「できそうな最低ライン」ではなく、計画崩壊を防ぐための `plan_minimum_line` を必達として提示する。

---

## required input order

Daily operations generation must read or confirm the following before proposing tomorrow's operations.

1. roadmap
2. plan
3. active_operations
4. latest history

Minimum required sources:

```yaml
roadmap: systems/delta/roadmap/delta_roadmap.md
plan: systems/delta/plan/2026_sharoushi_exam_plan.md
operations: systems/delta/operations/active_operations.md
history: systems/delta/history/YYYY-MM.md
```

---

## plan-gap check

Before outputting operations, DELTA must compute:

```yaml
plan_target_by_date:
  date: YYYY-MM-DD
  expected_position: <plan-defined expected position>
actual_as_of_date:
  date: YYYY-MM-DD
  current_position: <history-derived current position>
gap_status: ahead | on_track | delayed | critical_delay
operation_mode: normal | recovery_required | compression_required
recovery_required: boolean
```

### gap_status definitions

```yaml
ahead:
  meaning: actual position is ahead of plan target
on_track:
  meaning: actual position is close enough to plan target that ordinary operation is valid
delayed:
  meaning: actual position is behind plan target and tomorrow must reduce the gap
critical_delay:
  meaning: actual position is far behind plan target and plan itself may require compression or replanning
```

### operation_mode definitions

```yaml
normal:
  condition: gap_status is ahead or on_track
recovery_required:
  condition: gap_status is delayed and tomorrow's operation must reduce the gap
compression_required:
  condition: gap_status is critical_delay and simple daily recovery may be insufficient
```

---

## line definitions

DELTA must separate psychological safety from plan maintenance.

```yaml
survival_line:
  meaning: 体調不良・突発事情でもゼロにしないための最低ライン
  usage: can be shown as fallback, but should not be the default 必達ライン when delayed
plan_minimum_line:
  meaning: 計画崩壊を防ぐために最低限必要なライン
  usage: default 必達ライン when gap_status is delayed or critical_delay
standard_line:
  meaning: 現実的に遅れを縮めるライン
stretch_line:
  meaning: 計画復帰に近づく余力ライン
```

Rule:

- user-facing `必達ライン` is normally `plan_minimum_line`
- `survival_line` may be shown separately only as emergency fallback
- if `plan_minimum_line` is impossible due to explicit constraints, DELTA must say the plan cannot be maintained under current conditions

---

## anti-soft-judgment rule

DELTA must detect and correct soft judgments.

```yaml
soft_judgment_detected_when:
  - proposed_must_line does not reduce the plan gap
  - proposed_must_line only preserves psychological continuity
  - proposed_must_line locks in current delay
required_action:
  - warn that the proposed line does not reduce the gap
  - raise 必達ライン to plan_minimum_line
  - or explicitly declare that plan maintenance is not possible today
```

Example:

```yaml
proposed_must_line: 秒トレ40問 + 健康保険法 Q3-4
plan_gap: Q3-3 actual vs Q9-1〜Q11 plan target
judgment: soft_judgment_detected
corrected_must_line: 秒トレ40問 + 健康保険法 Q3-4〜Q4-5
```

---

## operations schema candidate

Each DELTA daily operation should carry plan anchoring fields.

```yaml
plan_anchor:
  source: systems/delta/plan/2026_sharoushi_exam_plan.md
  expected_position: 健康保険法 L3 Q9-1〜Q11最後
actual_position:
  source: systems/delta/history/2026-05.md
  as_of: 2026-05-01
  current: 健康保険法 L3 Q3-3
gap_status: delayed
operation_mode: recovery_required
recovery_required: true
line_set:
  survival_line: 秒トレ40問 + 健康保険法 Q3-4
  plan_minimum_line: 秒トレ40問 + 健康保険法 Q3-4〜Q4-5
  standard_line: 秒トレ40問 + 健康保険法 Q3-4〜Q4-10
  stretch_line: 秒トレ40問 + 健康保険法 Q3-4〜Q7最後
```

Open design question:

- Whether these fields belong directly in `systems/delta/operations/active_operations.md`
- Or whether they should be generated as a daily proposal artifact and only summarized into active_operations

Initial judgment:

- `plan_anchor`, `actual_position`, `gap_status`, and `recovery_required` should be persisted on operations, because they protect against operations becoming detached from plan.
- Full line_set may be kept in daily proposal / report if too verbose.

---

## required output template

When proposing tomorrow's DELTA operations, use this order.

```markdown
## 現在地
- history 上の現在地

## 計画上の本来位置
- plan 上の期待到達点

## 差分
- ahead / on_track / delayed / critical_delay
- 遅れの内容

## 明日の方針
- 通常運用 / リカバリー運用 / 圧縮運用

## 必達ライン
- 計画維持に必要な最低ライン

## 標準ライン
- 遅れを縮める現実的ライン

## 余力ライン
- 計画復帰に近づくライン

## 後回しにするもの
- 明日やらないもの
```

---

## example expected output for 2026-05-02

```yaml
現在地:
  - 健康保険法 L3 Q3-3
計画上の本来位置:
  - 2026-05-02 は Q9-1〜Q11最後に入る想定
差分:
  status: delayed
  detail: 健康保険法 L3 が大幅遅れ
明日の方針:
  - 健康保険法 L3 リカバリー日
必達:
  - 秒トレ40問
  - 健康保険法 L3 Q3-4〜Q4-5
標準:
  - 秒トレ40問
  - 健康保険法 L3 Q3-4〜Q4-10
余力:
  - 秒トレ40問
  - 健康保険法 L3 Q3-4〜Q7最後
後回し:
  - 国民年金法 L2
```

---

## implementation targets

Potential targets:

1. DELTA instruction
   - always run plan-gap check before daily proposal
   - distinguish survival_line from plan_minimum_line
   - output template requirement

2. DELTA knowledge
   - detailed plan-gap procedure
   - gap_status definitions
   - anti-soft-judgment rule

3. DELTA schema
   - add optional fields for plan_anchor / actual_position / gap_status / operation_mode / recovery_required

4. DELTA operations generator code or prompt
   - enforce roadmap / plan / operations / history read
   - compute expected vs actual before line generation

5. Tests / runtime confirmation
   - fixture: plan target Q9-1〜Q11, actual Q3-3
   - expected: delayed + recovery_required + must line Q3-4〜Q4-5 or stronger

---

## completed_condition for design

This design is complete enough when:

- plan-gap check fields are defined
- line definitions are separated
- anti-soft-judgment rule is defined
- output template is defined
- operations schema candidate is proposed
- implementation targets are listed

Further work:

- decide exact schema placement
- update DELTA instruction / knowledge / schema
- update code or prompt if a generator exists
- run runtime confirmation with 2026-05-02 case
