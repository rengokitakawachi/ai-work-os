# ADAM issue tree response-too-large misinterpretation

status: actual_behavior_corrected
severity: medium
category: tool_result_handling
observed_at: 2026-05-11
reported_by: user

---

## Symptom

During third-party review of the overdue 2026-05-10 weekly review, ADAM interpreted a `repoResourceGet tree` failure on `notes/01_issues` as meaning the issue directory might contain too many files to confirm.

ADAM then wrote or repeated statements such as:

```text
notes/01_issues tree was too large to fetch, so this is not proof that no other issue files exist.
Full issue tree still cannot be fetched in one call due to response size.
```

The user showed a screenshot indicating `notes/01_issues` contained only four files.

---

## Correct observation

ADAM directly read all four files:

- `notes/01_issues/README.md`
- `notes/01_issues/idea_log.md`
- `notes/01_issues/2026-05-03_review_report_template_gate_issue.md`
- `notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md`

Confirmed SHAs at correction time:

```text
notes/01_issues/README.md
sha: 05fd86cc4b0701dea7771260a1d1ab3be0fe82bd

notes/01_issues/idea_log.md
sha: 0869cb2012e49d3340531d6f9c4f917c92f67ad1

notes/01_issues/2026-05-03_review_report_template_gate_issue.md
sha: 1da1e04c473abe35802daad882c37a6f493c4fa4

notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
sha: a320d45623588f4eb3c557a47a421ba2929ee768
```

Thus, the previous interpretation was wrong.

The `response too large` result was a tool call / response behavior issue, not evidence that the directory had many issue files.

---

## Impact

- Weekly review quality was understated as if issue-state confirmation was incomplete due to unknown issue volume.
- Report and snapshot language implied uncertainty that was not supported after the user-provided screenshot and direct read confirmation.
- ADAM treated a tool failure as repository-content evidence, which violates tool failure handling rules.

---

## Root cause

ADAM did not sufficiently distinguish:

- tool call failure / response limit, from
- repository content fact.

ADAM should have immediately switched to direct reads of known files or targeted search, rather than inferring issue volume from the tree failure.

---

## Fix applied

Corrected affected artifacts:

- `notes/07_reports/daily/2026-05-11.md`
- `notes/07_reports/weekly/2026-05-10.md`
- `notes/99_archive/operations/2026-05-10_weekly_operations.md`

Correction content:

- `notes/01_issues` contains four files.
- All four files were directly read and confirmed.
- The earlier response-too-large interpretation was wrong.
- No full issue routing session was executed; the weekly gate performed issue state / active connection confirmation.

`archive_operations.md` should also reflect the corrected issue check state if it still contains the older remaining-risk wording.

---

## Recurrence prevention

- Do not interpret `response too large` as evidence about repository contents.
- After a tree/list failure, use direct reads of known files, narrower path queries, grep/search, or paginated/narrowed calls.
- In reports, distinguish `tool call failed` from `content not present` or `content too large`.
- When the user provides UI evidence contradicting ADAM's tool interpretation, treat it as a correction signal and verify through direct reads.

---

## Linked refs

- `notes/07_reports/daily/2026-05-11.md`
- `notes/07_reports/weekly/2026-05-10.md`
- `notes/99_archive/operations/2026-05-10_weekly_operations.md`
- `notes/04_operations/archive_operations.md`
- `notes/10_logs/adam_bug_fix_log_operating_method.md`

---

## Next disposition

- log_only_after_report_correction
- monitor during future review / tool failure handling
- no separate active task needed unless the pattern recurs
