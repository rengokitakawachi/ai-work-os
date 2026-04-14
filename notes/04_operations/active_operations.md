# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `docs-ready draft を基に docs/17_operations_system.md と docs/15_notes_system.md の本体反映を進める`
- `plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する`

### 補助 task

- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する`
- `stale active の整合回復ルールを design に整理する`
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する`
- `scoring knowledge の蓄積方針を dev_memo か design に整理する`
- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`

## Day0（04/14 火）

- task: docs-ready draft を基に docs/17_operations_system.md と docs/15_notes_system.md の本体反映を進める
  source_ref:
    - notes/02_design/2026-04-12_docs_17_operations_system_update_draft.md
    - notes/02_design/2026-04-12_docs_15_notes_system_update_draft.md
    - docs/17_operations_system.md
    - docs/15_notes_system.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - A/B/C/D の最小実装とテスト結果が揃ったため、運用正本と docs 正本の差分を早めに閉じる価値が高い
    - docs 本体反映を先頭で進めることで、Phase 0 の共通骨格を仕様として固定しやすくなる
  notes:
    - docs 直接 write 不可のため、まず docs-ready draft を正本反映ベースとして扱う
    - docs/17 と docs/15 を先行し、必要なら docs/13 差分へ接続する
    - 次回 daily review で operations を rolling する際は、issue routing の続きを優先候補として扱う

## Day1（04/15 水）

- task: plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する
  source_ref:
    - notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/01_issues/idea_log.md
  rolling_day: Day1
  why_now:
    - design が固まった直後に実運用へ反映しないと、重要 issue を issue に残すだけで終える再発を防げない
    - issue routing 未完成期の暫定実装として、instruction / docs / operations に最小差分を入れる価値が高い
  notes:
    - instruction 反映、docs 反映候補、operations ルール反映の順で最小差分を検討する
  due_date: 2026-04-14
  due_type: date
  external:
    todoist_task_id: 6gP2JjQ2x3rWHqV2

## Day2（04/16 木）

- task: daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する
  source_ref:
    - notes/07_reports/README.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/09_content/README.md
    - notes/04_operations/active_operations.md
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/01_issues/idea_log.md
  rolling_day: Day2
  why_now:
    - 日報を書いた後に content 抽出と rolling をどう接続するかが会話依存だと、daily review の出力運用が安定しないため、近い将来の設計整理候補として保持する必要がある
  notes:
    - report 保存で終わらず、content 抽出条件と operations 更新の接続点を整理する
    - review と routing の責務分離を崩さない前提で扱う
  due_date: 2026-04-15
  due_type: date
  external:
    todoist_task_id: 6gMr5Mj7cJvC5VH2

## Day3（04/17 金）

- task: stale active の整合回復ルールを design に整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-08_active_first_execution_trial.md
    - notes/04_operations/active_operations.md
    - code/config/ai/adam_instruction.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
  rolling_day: Day3
  why_now:
    - active-first execution の試験運用で stale active の補足ルールが必要と分かったが、現行 active の上位 task よりは後順位で整理する方がよい
  notes:
    - reroll before execution とは別の前処理ルールとして切り分ける
  due_date: 2026-04-16
  due_type: date
  external:
    todoist_task_id: 6gMr5PFQM8fC3XrR

## Day4（04/18 土）

- task: ADAM で試す 05_decisions の最小運用モデルを design に整理する
  source_ref:
    - notes/05_decisions/README.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
  rolling_day: Day4
  why_now:
    - EVE 本実装前に decision の集約モデルを ADAM で試す方針が出たため、抽出元、集約先、最小 schema、相互参照の設計を先に整理する必要がある
  notes:
    - docs / issue / design / plan / operations / dev_memo を紐づけ元とする前提で整理する
  due_date: 2026-04-17
  due_type: date
  external:
    todoist_task_id: 6gMr5Pc8j95X8GfR

## Day5（04/19 日）

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  why_now:
    - 重要ではあるが、いまの task を Todoist で見える化する価値よりは後順位であり、まずは実用価値の高い投影プロトタイプを先に固める方がよい
  notes:
    - score は決定ではなく補助である前提を維持する
    - dev_memo に残す条件と design に昇格する条件を見極める
  due_date: 2026-04-18
  due_type: date
  external:
    todoist_task_id: 6gMr5QWWx4JW5vQR

## Day6（04/20 月）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day6
  why_now:
    - repo 全体整合には必要だが、Phase 0 の接続弱化修正と暫定実装よりは後順位
    - active の 7日枠を維持する補充候補として妥当である
  notes:
    - docs 15 / 16 系の衝突整理を含む

---

## ルール

- 実行対象は active_operations に入っている task のみとする
- 実行は上から順に行う
- Day は仮配置であり固定日付ではない
- 日付と曜日は人間可読性のために付与する
- 日付表示は daily review 時に更新する
- active_operations の各 task は task / source_ref / rolling_day を必須で持つ
- why_now / notes / due_date / due_type は必要に応じて持つ
- operations は候補を優先順位で並べ、7日枠に入るものを active_operations とする
- active に入らなかった上位候補を next_operations に置く
- スコアは補助であり、決定ではない
- 会話中に新規タスク候補が発生した場合は、先に operations rolling を行う
- 新規候補は active / next / future のどこに置くか決めてから扱う
- reroll 前に active 外タスクを実行しない
- 未完了タスクは翌日以降へ移動する
- 完了タスクは必要に応じて archive_operations に移す
- Phase 0 中は Flow Control / routing / operations の実運用整合を優先する
- 直近の daily review rolling では、issue routing の継続実装と後処理統合を優先候補として扱う
