# archive_operations

## 概要

今週の完了タスクを一時的に保持する。

`archive_operations` は、
weekly review までの短期履歴置き場であり、
長期保存の正本ではない。

---

## Current week completed tasks

### 2026-05-17

- task: Sunday Weekly Review Mode を実行する
  completed_at: 2026-05-17
  source_ref:
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
    - notes/99_archive/operations/2026-05-17_weekly_operations.md
    - notes/07_reports/daily/2026-05-17.md
    - notes/07_reports/weekly/2026-05-17.md
    - notes/01_issues/idea_log.md
    - notes/01_issues/2026-05-17_todoist_projection_and_bug_log_gate_issue.md
    - notes/01_issues/2026-05-03_review_report_template_gate_issue.md
    - notes/01_issues/2026-05-03_routing_maturity_gap_intake_design_issue.md
  completed_evidence:
    - daily close executed first
    - weekly operations snapshot saved at `notes/99_archive/operations/2026-05-17_weekly_operations.md`
    - snapshot sha: `9e117a221249661309d5a57bf64dad32df10b176`
    - issue state check performed for current touched issues
    - `notes/01_issues/2026-05-17_todoist_projection_and_bug_log_gate_issue.md` touched and left progressed
    - active / next operations rerolled for week of 2026-05-18
    - Todoist projection updated once after weekly reroll
  remaining_risk:
    - `現在の inbox を一回整理する` remains incomplete because full `notes/00_inbox` listing is blocked
    - report template hardening remains open
    - design routing minimum fixture remains open
    - Todoist projection delete / close / defer semantics need monitoring

---

## Last weekly snapshot

- `notes/99_archive/operations/2026-05-17_weekly_operations.md`
- snapshot sha: `9e117a221249661309d5a57bf64dad32df10b176`

Cleared at:

- 2026-05-17 Sunday Weekly Review Mode

Previous weekly snapshot:

- `notes/99_archive/operations/2026-05-10_weekly_operations.md`
- snapshot sha: `7e881de90451bee85f01ffb8825472b7fcc2fe05`

---

## ルール

- 完了タスクを必要に応じてここへ移す
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は 99_archive 側とする
