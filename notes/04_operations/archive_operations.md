# archive_operations

## 概要

今週の完了タスクを一時的に保持する。

`archive_operations` は、
weekly review までの短期履歴置き場であり、
長期保存の正本ではない。

---

## Current week completed tasks

### 2026-05-07

- task: DELTA reverse-planning operations generator を実装・確認する
  completed_at: 2026-05-07
  source_ref:
    - notes/02_design/2026-05-05_delta_operations_generation_engine.md
    - notes/10_logs/2026-05-07_delta_configured_action_schema_v0_6_4_user_confirmed.md
    - notes/10_logs/2026-05-07_delta_configured_instruction_user_confirmed.md
    - notes/10_logs/2026-05-07_delta_runtime_reflection_blocked_actual_behavior_unconfirmed.md
    - notes/10_logs/2026-05-07_delta_runtime_fixture_active_next_guard_failure.md
    - notes/10_logs/2026-05-07_delta_active_next_heading_guard_fix.md
    - notes/10_logs/2026-05-07_delta_runtime_fixture_retest_resolved_main_sources_missing.md
    - notes/10_logs/2026-05-07_delta_main_source_files_imported.md
    - notes/10_logs/2026-05-07_delta_main_source_read_confirmation_resolved.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/history/daily/2026-05-05.md
    - systems/delta/operations/active_operations.md
    - systems/delta/operations/next_operations.md
    - systems/delta/config/delta_action_schema.yaml
    - src/services/delta-operations.js
    - src/services/delta/reverse-planning-generator.js
    - src/services/delta/operations-split.test.js
    - config/ai/from-claude.md
  completed_evidence:
    - configured GPT Action schema v0.6.4 user-confirmed
    - configured DELTA instruction user-confirmed
    - runtime-visible `deltaResourceGet` / `deltaResourceWrite` confirmed
    - runtime `delta_operations` allowed files include `active_operations.md` and `next_operations.md`
    - active embedded `# Next operations` heading/table reject confirmed after ADAM validator fix
    - next period-block row reject confirmed
    - valid no-op update with read_evidence confirmed
    - main required source files readable: roadmap / plan / latest daily history / active / next
    - active_operations Immediate Gate marked resolved
  remaining_risk:
    - README-only corrupt commits remain in repository history under user-approved Option A
    - root `config/adam_schema.yaml` and `config/eve_schema.yaml` still require later classification as internal / legacy schema
    - DELTA disposable runtime fixture branches can be cleaned later if needed

### 2026-05-05

- task: ADAM / EVE instruction configured GPT reflection を確認する
  completed_at: 2026-05-05
  source_ref:
    - config/adam_instruction.md
    - config/eve_instruction.md
    - config/eve_action_schema.yaml
    - notes/08_analysis/2026-05-05_adam_eve_instruction_reflection_check.md
    - notes/04_operations/active_operations.md
  completed_evidence:
    - ADAM runtime fixture PASS
    - EVE runtime fixture PASS
    - active_operations gate marked resolved
    - Todoist projection task closed: `6gX2rrfXcWXCR24q`
  remaining_risk:
    - none for this gate

- task: DELTA minimum generator / test readiness
  completed_at: 2026-05-05
  source_ref:
    - config/from-claude.md
    - notes/10_logs/2026-05-05_delta_operations_generator_service_implementation.md
    - src/services/delta/operations-generator.js
    - src/services/delta/operations-generator.test.js
  completed_evidence:
    - ATLAS final repository test result: 106 PASS / 0 FAIL
    - operations-generator.test.js PASS
    - minimum deterministic generator exists
    - runtime preflight negative / positive fixtures PASS
    - daytime recommendation fixture PASS
  remaining_risk:
    - original DELTA reverse-planning issue was later tracked and closed by `DELTA reverse-planning operations generator を実装・確認する`

### 2026-05-04

- task: ADAM / EVE / DELTA の Action schema 正規ファイル名ルールを固定する
  completed_at: 2026-05-04
  source_ref:
    - config/ai/adam_action_schema.yaml
    - config/ai/eve_action_schema.yaml
    - config/ai/adam_instruction.md
    - config/ai/eve_instruction.md
    - systems/delta/config/delta_action_schema.yaml
    - systems/delta/config/delta_schema.yaml
    - notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md
    - notes/10_logs/adam_bug_fix_log.md
  completed_evidence:
    - ADAM canonical Action schema confirmed: `config/ai/adam_action_schema.yaml` branch `main` sha `ef97d3c2ebcc0afe18a3dbbab6e9f4a02983f0f0`
    - EVE canonical Action schema confirmed: `config/ai/eve_action_schema.yaml` branch `main` sha `8bbead866bd682f8a996a93e7d4a5dc7d0053de2`
    - DELTA canonical Action schema confirmed after branch-aware correction: `systems/delta/config/delta_action_schema.yaml` branch `feature/atlas-pre-delta-foundation` sha `1c332448ef03065150a088d9b2bcfc4bc30f4e50`
    - ADAM instruction updated: sha `ccd50476b175c37adf3a71834c150fd244ca2a2b`
    - EVE instruction updated: sha `bb8f1e4721212dd6f46e432acb37c1e797f22f42`
    - Evidence note corrected: `notes/08_analysis/2026-05-04_action_schema_canonical_filename_rule.md` sha `257f8ff04f69c8f8cd13db55ee7049f9a633fdd2`
    - Todoist task closed: `6gWVwpfQPfxGpv7H`
  remaining_risk:
    - DELTA duplicate `systems/delta/config/delta_action_schema_v0.6.yaml` remains because delete action was not supported
    - runtime reflection / runtime-visible schema / actual behavior remain separate

---

## Last weekly snapshot

- `notes/99_archive/operations/2026-05-03_weekly_operations.md`
- snapshot sha: `acbbbc339243b00d3e92410a55d250de3348edcd`

Cleared at:

- 2026-05-03 Sunday Weekly Review Mode

---

## ルール

- 完了タスクを必要に応じてここへ移す
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は 99_archive 側とする
