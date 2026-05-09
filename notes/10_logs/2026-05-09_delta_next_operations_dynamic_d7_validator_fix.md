# DELTA next_operations dynamic D7 validator fix

status: fixed_actual_behavior_confirmed
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

A later runtime fixture also showed that Vercel runtime was not using the feature branch implementation. Runtime returned:

- `validator_version: delta_operations_preflight_2026_05_07_active_next_heading_guard`
- `missing_active_day6_next_connection`
- `missing_next_operations_start_date:2026-05-13`
- `missing_active_next_connection_first_row`

This proved that repo feature branch changes were visible as files but actual runtime validator behavior still came from main.

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

Updated `systems/delta/config/delta_schema.yaml` on `feature/atlas-pre-delta-foundation`.

New sha:

- `3d155bcb0e93b6dbf1e3a46de13a545f8e26f962`

Changes:

- Added `next_operations.md` to `write_resources.delta_operations.allowed_files`.
- Added `update_next_operations` to daily review operations update flow.
- Added `next_operations_start_date_must_follow_active_day6` rule.

Promoted runtime implementation to `main` after DELTA runtime fixture still observed the old validator.

Main read-back:

- file: `src/services/delta-operations.js`
- branch: `main`
- sha: `6cd9134d4e2934c6e46be644eca62952e889f512`
- validator version in code: `delta_operations_preflight_2026_05_08_dynamic_active_next_split`

---

## Runtime fixture results

### First runtime fixture after feature branch fix: failed

Observed:

- `systems/delta/config/delta_schema.yaml` was readable at sha `3d155bcb0e93b6dbf1e3a46de13a545f8e26f962`.
- Actual `delta_operations` preflight still returned old validator version:
  - `delta_operations_preflight_2026_05_07_active_next_heading_guard`
- `active_operations.md` fixture with Active Day6 `2026-05-15` failed.
- `next_operations.md` fixture with `2026-05-16` start failed.

Errors observed:

- active fixture 1:
  - `missing_user_capacity_evidence_in_content`
  - `missing_completed_scope_evidence`
  - `missing_active_day6_next_connection`
- active fixture 2:
  - `missing_active_day6_next_connection`
- next fixture:
  - `missing_next_operations_start_date:2026-05-13`
  - `missing_active_next_connection_first_row`

Judgment:

- configured file reflection: partially confirmed
- repo main implementation: then updated
- actual runtime behavior: not confirmed at that point

### Second runtime fixture after main update: passed

DELTA reran runtime fixture after main update.

Observed successful preflight:

- `validator_version: delta_operations_preflight_2026_05_08_dynamic_active_next_split`
- `ok: true`
- `errors: []`
- `warnings: []`

Old errors disappeared:

- `missing_next_operations_start_date:2026-05-13`: gone
- `missing_active_next_connection_first_row`: gone

`next_operations.md` update succeeded:

- path: `systems/delta/operations/next_operations.md`
- branch: `feature/atlas-pre-delta-foundation`
- new sha: `ab6022c8e2408ee51b63566c998954c26c8aa2dc`

Read-back confirmed D7 alignment:

- metadata:
  - `next_start_date: 2026-05-16`
- active_connection:
  - `expected_active_range: 2026-05-09〜2026-05-15`
  - `active_day6_due_date: 2026-05-15`
  - `next_start_date: 2026-05-16`
- header:
  - `# Next operations: 2026-05-16〜2026-06-30`
- first row:
  - `| 2026-05-16 | L3 | 国民年金法 L3 択一 Q3-4〜Q3-4（1問）＋回収Q1-1・Q2-2・Q3-2（3問）。Q3-5以降は教材インデックス確認後に再計算 |`

Judgment:

- actual behavior confirmed for dynamic D7 next_operations start update.

---

## Remaining risk

The specific defect is closed.

Residual governance risks:

- Similar validator rules may still encode dated fixture values elsewhere.
- Branch-visible file reflection and actual runtime behavior can diverge when runtime uses main deployment code.
- Future fixes that modify service code must be confirmed at the runtime behavior layer, not only config / file read-back.

---

## Recurrence prevention

- Do not encode dated fixture values as validator rules.
- For split active / next operations, validate relation rather than fixed date.
- Validate `next_start_date = active Day6 due_date + 1`.
- Keep tests focused on invariant behavior, not one fixture date.
- Keep internal schema, action schema, runtime-visible behavior, and actual behavior separated.
- Treat repo branch update and runtime actual behavior as separate states.
- If runtime fixture still shows an old validator version, check main implementation before asking for another behavior fixture.
- Service-layer fixes that affect actual Action behavior must be promoted to the runtime branch and validated with a behavior fixture.

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

- Treat this defect as fixed for `next_operations.md` dynamic D7 start update.
- During `ADAM bug fix log の運用方法を notes に固定する`, decide whether this individual log should also be summarized into `notes/10_logs/adam_bug_fix_log.md`.
- Consider a separate sweep for other dated fixture values in validators / tests.
