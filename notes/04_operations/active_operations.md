# active_operations

## Day0（04/05 日）

- docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を比較表にする
  source_ref:
    - notes/01_issues/idea_log.md#20260404-004
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/02_design/2026-04-04_operations_active_archive_model_light_draft.md

- operations の正本構造案を 1つに絞る
  source_ref:
    - notes/02_design/2026-04-04_operations_active_archive_model_light_draft.md
    - notes/02_design/2026-04-03_plan_layer_operating_spec.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md

- operations 実体の移行差分を洗い出す
  source_ref:
    - notes/01_issues/idea_log.md#20260405-008
    - notes/02_design/2026-04-05_operations_next_archive_snapshot_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/standby_operations.md

## Day1（04/06 月）

- operations の task 記法を「task / source_ref / 必要なら補足」に統一する
  source_ref:
    - notes/02_design/intake_review_and_source_ref_spec.md
    - notes/02_design/operations_generation_rules.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md

- active_operations の既存タスクに source_ref を適用する
  source_ref:
    - notes/02_design/2026-04-04_operations_active_archive_model_light_draft.md
    - notes/02_design/intake_review_and_source_ref_spec.md

- notes design に残る旧表現を洗い出して、置換対象一覧を作る
  source_ref:
    - notes/01_issues/idea_log.md#20260404-005
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md

## Day2（04/07 火）

- roadmap / plan / operations の接続条件を文章で整理する
  source_ref:
    - notes/02_design/2026-04-03_plan_layer_operating_spec.md
    - notes/02_design/operations_generation_rules.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md

- issue / dev_memo / design から operations へ落とす条件を表にする
  source_ref:
    - notes/02_design/2026-04-04_dev_memo_promotion_flow.md
    - notes/00_inbox/dev_memo/2026-04-04_routing_hybrid_control_model.md
    - notes/02_design/2026-03-28_standard_development_flow_routing_table.md

## Day3（04/08 水）

- operations 周辺で docs に未反映の差分を一覧化する
  source_ref:
    - notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md
    - notes/02_design/2026-04-04_docs_05_roadmap_phase0_update_draft.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md

- docs 番号衝突と旧 docs 群の整理方針をメモにまとめる
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md

## Day4（04/09 木）

- review system と operations rolling の接続ルールを確認する
  source_ref:
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/04_operations/active_operations.md
    - notes/07_reports/daily/2026-04-04.md

- dev_memo → design → docs の昇格フローと operations の接続点を整理メモにする
  source_ref:
    - notes/02_design/2026-04-04_dev_memo_promotion_flow.md
    - notes/00_inbox/dev_memo/2026-04-04_routing_hybrid_control_model.md

## Day5（04/10 金）

- Phase 0 完了条件に対する未充足項目を洗い出す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md

- Phase 1 の各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md

## Day6（04/11 土）

- next_operations の候補を見直して次の Day0 候補を補充する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-05_operations_next_archive_snapshot_model.md

- next_operations 論点の再判定条件を整理する
  source_ref:
    - notes/01_issues/idea_log.md#20260404-003
    - notes/00_inbox/dev_memo/2026-04-04_19-05-00_operations_eve_execution_intelligence_memo.md
    - notes/02_design/2026-04-05_operations_next_archive_snapshot_model.md

---

## ルール

- 上から順に実行優先度とする
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- operations の各タスクは source_ref を持つ
- 未完了タスクは翌日以降へ移動する
- 近未来候補は next_operations に移す
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は構造整合を優先する
