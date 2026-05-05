# 2026-05-05 DELTA active / next operations split

## status

implemented_test_pending

## purpose

DELTA operations were split to match the ADAM / EVE operations philosophy:

- `systems/delta/operations/active_operations.md` is D0〜D6 execution SSOT.
- `systems/delta/operations/next_operations.md` is D7〜medium target daily plan SSOT.
- Current medium target is 2026-06-30.
- Daily review must read roadmap / plan / latest daily history / active_operations / next_operations before rolling.

## background

Commit `97b2334b38ca160d17358b73d51beae47817233a` contained detailed daily `Next operations` through 2026-06-30 inside `active_operations.md`.

Later active updates coarsened Next operations into period blocks.

Root cause:

```text
Active and Next operations were stored in the same file, so active rolling writes could overwrite medium-term daily plan detail.
```

## implemented files

```yaml
branch: feature/atlas-pre-delta-foundation

systems/delta/operations/next_operations.md:
  sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
  role: D7-to-2026-06-30 daily plan SSOT

systems/delta/operations/active_operations.md:
  sha: 5747741a3c7e3eb0dfe95a4896249ac75201b3aa
  role: D0-D6 execution SSOT only

src/services/delta-operations.js:
  sha: 230185067c4118c029484289dc402ececa97478a
  change: allow and validate active_operations.md / next_operations.md separately

src/services/delta/operations-split.test.js:
  sha: 843e5af33f62a3e7ebe3214551d34b4ab733cfcd
  role: split preflight regression tests

systems/delta/config/delta_action_schema.yaml:
  sha: 67fe62e5ce945c7f0ff4cf7a1ca1b3e7ba3dc286
  version: 0.6.4
```

## next_operations restoration

Restoration baseline:

```yaml
commit: 97b2334b38ca160d17358b73d51beae47817233a
blob_sha: af62696214acfcf8817728ee9f97ae24e39c0011
message: Write active D0-D6 and next operations through 2026-06-30
```

`next_operations.md` now stores daily rows from:

```yaml
start: 2026-05-13
end: 2026-06-30
granularity: daily
```

## active_operations split

`active_operations.md` no longer embeds `# Next operations`.

It now has:

```yaml
next_operations_ref:
  path: systems/delta/operations/next_operations.md
  role: d7_to_2026_06_30_daily_plan_ssot
  next_start_date: 2026-05-13
  target_date: 2026-06-30
  baseline_commit: 97b2334b38ca160d17358b73d51beae47817233a
  current_split_sha: 2f3ff6409ce033e02e7bde0771882d7b417774dd
```

## preflight behavior

`delta_operations` write now allows:

- `active_operations.md`
- `next_operations.md`

Active preflight checks:

- D0〜D6 exist
- required fields exist per day
- page / question ranges exist
- `next_operations_ref` exists
- active does not embed `# Next operations`
- active Day6 connects to next first day
- read_evidence includes `next_operations`

Next preflight checks:

- `# delta next_operations` title exists
- `active_operations_ref` exists
- target date is 2026-06-30
- `# Next operations` section exists
- 2026-05-13 and 2026-06-30 rows exist
- period block rows like `2026-06-01〜2026-06-30` are rejected
- each row is daily-grained
- page / question ranges are required unless the row is an explicit check / rest / judgment day
- 2026-05-10 and 2026-06-13 cannot have L3 rows

## tests added

`src/services/delta/operations-split.test.js` checks:

- current split `active_operations.md` is preflight-valid
- current split `next_operations.md` is preflight-valid
- active preflight rejects embedded Next operations table
- next preflight rejects period block rows

## schema update

`systems/delta/config/delta_action_schema.yaml` was updated to v0.6.4.

Repo schema now describes:

- split active / next operations
- `active_operations.md` owns D0-D6
- `next_operations.md` owns D7-to-target daily plan
- `read_evidence` should include `next_operations`

Runtime / configured GPT reflection is not confirmed by repo update alone.

## not yet confirmed

- ATLAS / local tests have not been run after this split.
- Configured GPT Action schema has not been re-imported with v0.6.4.
- Runtime-visible schema has not been confirmed.
- Actual `delta_operations` update behavior for `next_operations.md` has not been fixture-confirmed.

## next action

Ask ATLAS to run:

```text
npm test -- src/services/delta/operations-split.test.js
npm test -- src/services/delta/reverse-planning-generator.test.js
npm test
```

If tests pass, next runtime fixture should confirm:

- `deltaResourceWrite(resource=delta_operations, action=update, file=active_operations.md)` rejects embedded Next table.
- `deltaResourceWrite(resource=delta_operations, action=update, file=next_operations.md)` rejects period block rows.
- valid split active / next files can be updated with read_evidence.

## linked refs

- `systems/delta/operations/active_operations.md`
- `systems/delta/operations/next_operations.md`
- `src/services/delta-operations.js`
- `src/services/delta/operations-split.test.js`
- `systems/delta/config/delta_action_schema.yaml`
- `notes/10_logs/2026-05-05_delta_reverse_planning_generator_scaffold.md`
