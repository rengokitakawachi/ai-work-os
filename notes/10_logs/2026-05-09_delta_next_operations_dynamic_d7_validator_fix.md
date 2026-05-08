# DELTA next_operations dynamic D7 validator fix

status: partially_fixed_schema_followup_required
severity: high
category: delta_operations_validator_regression
observed_at: 2026-05-09
reported_by: DELTA via user

---

## Symptom

DELTA daily review after 2026-05-08 updated `systems/delta/operations/active_operations.md` successfully on `feature/atlas-pre-delta-foundation`, but `systems/delta/operations/next_operations.md` update was blocked by preflight / validator.

Observed state:

- branch: `feature/atlas-pre-delta-foundation`
- daily review date: `2026-05-08`
- `active_operations.md` update succeeded
  - new sha: `7a8664e03936aa3bb15d38ba5a1c060cc4c4a9a9`
- `next_operations.md` update failed
  - existing sha: `2f3ff6409ce033e02e7bde0771882d7b417774dd`
- attempted next start date: `2026-05-16`
- validator behaved as if `next_start_date: 2026-05-13` was fixed

---

## Impact

- `active_operations.md` could provide the immediate next-day execution plan.
- `next_operations.md` remained stale with start date `2026-05-13`.
- Active / Next connection could not be fully rolled after daily review.
- DELTA had to keep a temporary Active-side connection to the existing Next file.
- Medium-term plan could contain overlap or stale connection assumptions.

---

## Root cause

`src/services/delta-operations.js` had fixture-specific validation embedded in `validateNextOperationsDailyPlan()`.

The validator required:

- `2026-05-13` as next operations start date
- `2026-05-13` row to exist
- `2026-05-13 ... P246〜P280（35ページ）` as first-row connection

`src/services/delta/operations-split.test.js` also asserted the same fixed start date and treated the original fixture as the stable rule.

This made a past fixture value behave like a specification.

---

## Design judgment

The fixed validator conflicts with active / next split design.

Correct behavior:

- `active_operations.md` owns D0〜D6.
- `next_operations.md` owns D7〜target date.
- After rolling, `next_operations.md` must start from the day after Active Day6.
- Therefore, `next_start_date` must be dynamic and derived from current Active Day6, not fixed to an old date.

---

## Fix applied

Updated `src/services/delta-operations.js` on `feature/atlas-pre-delta-foundation`.

New sha:

- `6cd9134d4e2934c6e46be644eca62952e889f512`

Changes:

- Removed fixed `2026-05-13` start-date requirement.
- Removed fixed `P246〜P280` first-row connection requirement.
- Added dynamic next-start validation:
  - declared `next_start_date`
  - `# Next operations:` header start date
  - first table row date
  - expected start from active Day6 due date + 1 day
- Added read of current `active_operations.md` before validating `next_operations.md` updates.
- Added stale connection error:
  - `next_operations_start_date_must_follow_active_day6:<actual>:expected:<expected>`

Updated `src/services/delta/operations-split.test.js` on `feature/atlas-pre-delta-foundation`.

New sha:

- `7c91bae6d891f4445120d1ae9a0a733c2f759afa`

Changes:

- Removed fixed `2026-05-13` normal-case assertion.
- Added test that accepts D7 as Active Day6 + 1.
- Added test that rejects stale `2026-05-13` when Active Day6 moved to `2026-05-15` and expected D7 is `2026-05-16`.

---

## Remaining risk

`systems/delta/config/delta_schema.yaml` still has an internal schema inconsistency.

Observed content:

```yaml
write_resources:
  delta_operations:
    root: systems/delta/operations/
    allowed_files:
      - active_operations.md
    actions:
      - update
    role: next_action_operations_update
```

Required follow-up:

```yaml
write_resources:
  delta_operations:
    root: systems/delta/operations/
    allowed_files:
      - active_operations.md
      - next_operations.md
    actions:
      - update
    role: next_action_operations_update
```

This was not updated in the same step because `repoResourceWrite(action=update)` is full replacement and the schema file is large. It must be updated through read → full-content synthesis → update → read-back.

---

## Recurrence prevention

- Do not encode dated fixture values as validator rules.
- For split active / next operations, validate relation rather than fixed date.
- Validate `next_start_date = active Day6 due_date + 1`.
- Keep tests focused on invariant behavior, not one fixture date.
- Keep internal schema, action schema, runtime-visible behavior, and actual behavior separated.
- Treat schema cleanup as follow-up until read-back confirms it.

---

## Linked refs

- `src/services/delta-operations.js`
- `src/services/delta/operations-split.test.js`
- `systems/delta/operations/active_operations.md`
- `systems/delta/operations/next_operations.md`
- `systems/delta/config/delta_schema.yaml`
- `systems/delta/config/delta_action_schema.yaml`
- `notes/10_logs/adam_bug_fix_log.md`

---

## Next disposition

- Add `next_operations.md` to `systems/delta/config/delta_schema.yaml` allowed files.
- Decide whether this individual log should be summarized into `notes/10_logs/adam_bug_fix_log.md` during the active task `ADAM bug fix log の運用方法を notes に固定する`.
- Run or request DELTA-side runtime fixture for next update attempt after dynamic validator reflection.
