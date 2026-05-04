# archive_operations

## 概要

今週の完了タスクを一時的に保持する。

`archive_operations` は、
weekly review までの短期履歴置き場であり、
長期保存の正本ではない。

---

## Current week completed tasks

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
