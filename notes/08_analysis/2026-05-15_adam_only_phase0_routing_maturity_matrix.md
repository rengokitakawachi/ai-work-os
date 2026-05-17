# ADAM-only Phase 0 routing maturity matrix

status: completed_analysis
created_at: 2026-05-15
scope: ADAM only
source_ref:
  - docs/05_roadmap.md
  - docs/15_notes_system.md
  - docs/17_operations_system.md
  - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
  - notes/04_operations/active_operations.md
  - notes/04_operations/next_operations.md
  - notes/07_reports/weekly/2026-05-10.md
  - notes/07_reports/daily/2026-05-14.md

---

## Conclusion

ADAM-only maturity should be evaluated before EVE maturity.

EVE is not yet in an operational stage. Therefore this matrix does not score EVE execution maturity. EVE is treated only as a future deployment target for patterns that are proven in ADAM.

Current ADAM maturity summary:

| Domain | ADAM maturity | Judgment |
|---|---|---|
| issue routing | partially completed, near operational | core flow exists, but recurring weekly routing discipline still needs observation |
| operations rolling | operational with known regression risks | daily rolling, Todoist projection, and archive movement work; repeated carryover and date judgment require guardrails |
| review | partially completed | daily / weekly mechanisms exist, but report template hardening and issue routing check quality still need closure |
| runtime / fixture confirmation | operational for recent validator work | actual behavior confirmation discipline is strong when explicitly required |
| bug / regression logging | operational method fixed | operating method exists; continued review discipline needed |
| intake routing | not yet operational | inbox / intake routing has examples, but no stable second-batch operating evidence |
| design routing | not yet operational / early partial | design routing is specified, but minimal current fixture is still missing |
| handover / restart | partially completed | procedure exists; latest pointer/index remains unresolved |
| roadmap / plan / operations connection | partially completed | hierarchy exists; plan-driven discovery gap caused this task and needs recurring gate |
| test system | partially completed | tests / fixtures are used effectively, but Phase 0-wide maturity criteria are not consolidated |

---

## Scope correction

Original task wording referenced ADAM / EVE common operating model.

Corrected execution scope:

- evaluate only ADAM current operational evidence
- do not score EVE general-work maturity
- record EVE only as a future deployment candidate
- classify common patterns only when they are observed in ADAM

Rationale:

- EVE is not yet in operational stage
- scoring EVE maturity would require speculation
- Phase 0 should first prove the operating model in ADAM before generalizing

---

## Maturity criteria

Use the following scale.

### operational

A domain is operational when:

- the procedure exists
- it has been used on real work
- result and aftercare were saved
- closure conditions are observable
- it survives review / rolling without relying on memory

### partially completed

A domain is partially completed when:

- the concept and some use cases exist
- real examples exist
- but recurrence, cleanup, disposition, or review integration is still incomplete

### not yet operational

A domain is not yet operational when:

- the concept exists mainly in plan / docs / design
- no stable real-work fixture has completed
- or ADAM still relies on ad hoc judgment rather than a repeatable flow

---

## ADAM maturity matrix

### 1. Issue routing

Maturity:

```text
partially completed, near operational
```

Observed strengths:

- docs/15 defines issue routing responsibility and completed conditions
- issue routing is understood as more than `route_to` labeling
- issue may be routed to operations / design / future / archive / issue
- daily issue status touch is now practiced during review
- known issue files are connected to active operations
- `idea_log.md` is confirmed to contain keep issues only in the recent weekly review

Evidence:

- `docs/15_notes_system.md`
- `docs/17_operations_system.md`
- `notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md`
- `notes/07_reports/weekly/2026-05-10.md`
- `notes/07_reports/daily/2026-05-14.md`

Remaining gaps:

- not enough recent full issue routing sessions under the current completed-condition standard
- weekly issue routing check was state confirmation, not a full routing session
- design-candidate follow-through remains the weakest part
- need to confirm repeated weekly behavior without reintroducing holding-file shortcuts

Disposition:

- keep as partially completed
- next operation should not be generic issue routing; it should target design routing / intake routing gaps separately

---

### 2. Intake routing

Maturity:

```text
not yet operational
```

Observed strengths:

- docs/15 and roadmap define intake routing as the entry process for unstructured inputs
- `next_operations` includes an explicit inbox cleanup / classification task
- prior notes mention intake routing and archive pending observations

Evidence:

- `docs/15_notes_system.md`
- `docs/05_roadmap.md`
- `notes/04_operations/next_operations.md`

Remaining gaps:

- no stable current second-batch intake routing fixture is complete
- inbox state has not been recently classified end-to-end
- unclear whether web / dev_memo / test clips consistently route to issue / design / future / archive
- no current artifact proves source cleanup and destination follow-through under the latest rules

Disposition:

```yaml
operations_candidate:
  task: 現在の inbox を一回整理する
  current_location: notes/04_operations/next_operations.md
  action: keep in next; promote after current Day0 blockers close
```

---

### 3. Design routing

Maturity:

```text
not yet operational / early partial
```

Observed strengths:

- docs/15 defines design routing and forbids holding-file-only completion
- roadmap recognizes design routing as a distinct review/routing layer
- active / next contain tasks that may lead to docs / design reflection

Evidence:

- `docs/15_notes_system.md`
- `docs/05_roadmap.md`
- `notes/04_operations/active_operations.md`

Remaining gaps:

- no recent minimal design routing fixture is complete
- design review → design routing → docs / future / archive / operations candidate flow is not yet observed as a stable loop
- current operations still reference several docs / design reflection candidates, but not as a completed design routing session

Disposition:

```yaml
operations_candidate:
  task: design routing の最小 fixture を実行する
  placement: next_operations candidate after current Day0 closures
  source_ref:
    - docs/15_notes_system.md
    - docs/05_roadmap.md
```

---

### 4. Roadmap / plan / operations connection

Maturity:

```text
partially completed
```

Observed strengths:

- roadmap / plan / operations hierarchy is documented
- operations rolling is not treated as simple next-task promotion in docs
- this task itself was created because a plan-driven discovery gap was found
- active_operations uses plan / issue / next refs as candidate sources

Evidence:

- `docs/05_roadmap.md`
- `docs/17_operations_system.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`

Remaining gaps:

- ADAM previously missed plan-driven discovery until the user corrected the gap
- no explicit recurring gate yet says: read roadmap / active plan and generate missing operations candidates
- repeated carryover of the same Phase 0 task indicates focus discipline risk

Disposition:

```yaml
docs_update_candidate:
  target:
    - docs/17_operations_system.md
  purpose: add plan-driven discovery check to daily/weekly rolling completed condition if repeated misses continue

operations_absorbed:
  into: Phase 0 routing maturity matrix task
  result: this analysis captures the current gap
```

---

### 5. Operations rolling

Maturity:

```text
operational with known regression risks
```

Observed strengths:

- daily reviews reroll active_operations
- Todoist projection is applied from previous/current snapshots
- archive_operations is used for completed tasks
- completed evidence is separated from structural placement
- due_date / due_type are propagated through projection apply in current operation

Evidence:

- `docs/17_operations_system.md`
- `notes/04_operations/active_operations.md`
- `notes/07_reports/daily/2026-05-14.md`

Known risks:

- ADAM recently misjudged review date and had to be corrected by the user
- repeated carryover of the same Day0 task became normalized until called out
- report / issue tree tool failure interpretation needed correction
- Sunday weekly review mode must avoid double projection

Disposition:

```yaml
status: operational_with_monitoring
next_check: Sunday Weekly Review Mode 2026-05-17
```

---

### 6. Daily / weekly review

Maturity:

```text
partially completed
```

Observed strengths:

- daily review reads operations, confirms completion evidence, touches issues, rerolls active, applies Todoist projection, and writes daily report
- missed weekly review was recovered as Immediate Gate
- Sunday Weekly Review Mode is documented
- 2026-05-10 weekly review snapshot/report exist

Evidence:

- `docs/17_operations_system.md`
- `notes/07_reports/daily/2026-05-14.md`
- `notes/07_reports/weekly/2026-05-10.md`

Remaining gaps:

- report template / README hardening issue remains open
- weekly issue routing check must be stronger than state confirmation when issues require disposition
- ADAM previously misinterpreted tool failure as content evidence
- daily review date handling recently regressed

Disposition:

```yaml
issue_remains_open:
  file: notes/01_issues/2026-05-03_review_report_template_gate_issue.md

operations_candidate:
  task: report template / README hardening
  placement: next or weekly review candidate, not immediate unless report quality regresses again
```

---

### 7. Runtime / fixture confirmation

Maturity:

```text
operational for validator / runtime-sensitive work
```

Observed strengths:

- DELTA dynamic D7 split was not closed until actual runtime behavior was confirmed
- L3 unavailable-day guard was confirmed via runtime fixtures
- L3 question index guard was confirmed via runtime fixtures and restoration read-back
- logs preserve validator versions and restoration evidence

Evidence:

- `notes/10_logs/2026-05-09_delta_next_operations_dynamic_d7_validator_fix.md`
- `notes/10_logs/2026-05-09_delta_special_day_l3_unavailable_guard.md`
- `notes/10_logs/2026-05-11_delta_l3_question_index_runtime_fixture.md`
- `notes/07_reports/weekly/2026-05-10.md`

Remaining gaps:

- actual behavior discipline is good when explicitly named, but needs to remain automatic for future schema/runtime tasks
- DELTA write-resource schema reflection gate remains active

Disposition:

```yaml
status: operational
monitor_in:
  - DELTA write resource schema reflection gate
  - DELTA Todoist projection profile
```

---

### 8. Bug / regression logging

Maturity:

```text
operational method fixed
```

Observed strengths:

- logs layer role is defined
- ADAM bug fix log operating method exists
- tool failure interpretation miss was logged separately
- ADAM bug log is explicitly not execution SSOT

Evidence:

- `notes/10_logs/README.md`
- `notes/10_logs/adam_bug_fix_log_operating_method.md`
- `notes/10_logs/2026-05-11_adam_issue_tree_response_too_large_misinterpretation.md`
- `notes/04_operations/archive_operations.md`

Remaining gaps:

- large `adam_bug_fix_log.md` may need future indexing / summarization
- repeated categories should be elevated to docs / instruction if they recur

Disposition:

```yaml
status: operational_with_review_monitoring
```

---

### 9. Handover / restart

Maturity:

```text
partially completed
```

Observed strengths:

- handover is defined as restart entry point, not execution SSOT
- handover template exists
- restart failure was detected and logged

Evidence:

- `docs/15_notes_system.md`
- `notes/04_operations/next_operations.md`
- `notes/10_logs/2026-05-05_adam_handover_latest_detection_failure.md`

Remaining gaps:

- latest pointer is not implemented
- month-folder / handover index decision remains next_operations item
- restart still risks needing user-supplied exact path

Disposition:

```yaml
operations_candidate:
  task: handover latest index と月別フォルダ構成を導入する
  current_location: notes/04_operations/next_operations.md
  priority: medium_high_after_current_phase0_front
```

---

### 10. Test system

Maturity:

```text
partially completed
```

Observed strengths:

- validator behavior is tested / fixture-confirmed for recent DELTA changes
- repo tests are referenced in operations and logs
- runtime fixtures are used as closure evidence

Evidence:

- `notes/07_reports/weekly/2026-05-10.md`
- `notes/10_logs/2026-05-11_delta_l3_question_index_runtime_fixture.md`

Remaining gaps:

- Phase 0-wide test system maturity is not yet summarized as its own operating model
- test system is strong in DELTA validator work but not yet generalized for ADAM routing / review flows

Disposition:

```yaml
status: partially_completed
follow_up_candidate:
  task: ADAM routing/review fixture checklist を作る
  placement: future_or_next_after_design_routing
```

---

## Plan-driven discovery gate

ADAM should use this gate during daily / weekly rolling when roadmap / plan is a candidate source.

### Gate steps

1. Read current roadmap phase.
2. Read active plan for that phase.
3. Extract explicit completion conditions and重点テーマ.
4. Compare current active / next operations against those conditions.
5. For each missing condition, classify:
   - already satisfied by evidence
   - active task exists
   - next task exists
   - future/design/issue candidate needed
   - absorbed by existing task
6. Do not promote everything automatically.
7. Apply dependency / blocker / Day capacity check.
8. Save disposition evidence.

### Gate result for this run

| Gap | Disposition |
|---|---|
| intake routing not yet operational | keep `現在の inbox を一回整理する` in next; promote after Day0 closures |
| design routing not yet operational | create/promote `design routing の最小 fixture を実行する` candidate in next at next reroll |
| report template hardening open | keep issue progressed; consider next/weekly candidate |
| handover latest pointer missing | keep existing next task; promote after current front if restart reliability becomes blocker |
| runtime fixture discipline | operational; monitor in DELTA schema/projection tasks |
| operations rolling | operational with monitoring; Sunday weekly review is next structural checkpoint |

---

## Operations candidate disposition

### Active / keep active

No active task replacement is needed.

The current active front remains correct:

```text
Phase 0 routing maturity matrix を作り、plan-driven discovery gate を整理する
```

This task is completed by this analysis once active/archive are updated.

### Next candidates

Keep or add during next rolling:

1. `現在の inbox を一回整理する`
   - current location: `next_operations.md`
   - purpose: intake routing operational fixture

2. `design routing の最小 fixture を実行する`
   - new candidate
   - purpose: prove design review → routing → destination follow-through

3. `report template / README hardening を実行する`
   - candidate from existing report template issue
   - purpose: close recurring report format/tool-fact gap

4. `handover latest index と月別フォルダ構成を導入する`
   - current location: `next_operations.md`
   - purpose: restart reliability

### Absorbed

- plan-driven discovery gap: absorbed into this matrix and active task closure
- ADAM-only scoping correction: absorbed into this analysis

### Future

- EVE maturity evaluation
  - not now
  - reactivate only after EVE has real operational loop evidence

---

## EVE deployment note

Do not treat this matrix as EVE maturity evidence.

Reusable candidates for future EVE deployment are:

- operations as execution SSOT
- Todoist as projection, not SSOT
- Outlook as schedule SSOT
- daily/weekly review separation
- issue/intake/design routing separation
- handover as restart entry point
- runtime behavior confirmation before closure

But these are only deployment candidates until EVE has its own operational evidence.

---

## Closure judgment

This task can be closed for ADAM-only scope.

Completed conditions satisfied:

- Phase 0重点テーマ were listed
- ADAM-only domains were compared using one maturity scale
- intake routing gaps were listed
- design routing gaps were listed
- plan-driven discovery gate was defined
- follow-up candidates were dispositioned into active / next / future / absorbed
- EVE maturity was explicitly excluded to avoid speculation

Recommended next active task:

```text
DELTA chapter-only normalization fixture を実行する
```

Rationale:

- it is already Day0 second task
- the Phase 0 matrix task is now complete for ADAM-only scope
- no Immediate Gate blocks the DELTA fixture
