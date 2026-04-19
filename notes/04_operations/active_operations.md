# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- なし

### 補助 task

- `docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- `Phase 1 各 plan と operations 接続案を並べる`

## Day0（04/20 月）

- task: docs 番号衝突と旧 docs 群の整理方針をメモ化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/00_inbox/dev_memo/2026-04-04_repo_consistency_check_followup.md
    - notes/04_operations/next_operations.md
  rolling_day: Day0
  why_now:
    - repo 全体整合には必要だが、直近は reroll dry_run / design routing 後段 / review 接続整理を優先していた
    - Phase 0 直結の実装確認 task 群が閉じたため、次は docs 側の整合負債をメモ化して整理方針を固定するのが自然である
  notes:
    - docs 15 / 16 系の衝突整理を含む
  due_date: 2026-04-20
  due_type: date
  external:
    todoist_task_id: 6gQFMv28VrRWm55H

## Day1（04/21 火）

- task: Phase 1 各 plan と operations 接続案を並べる
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md
    - notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md
    - notes/04_operations/next_operations.md
  rolling_day: Day1
  why_now:
    - 次 phase への接続には必要だが、直近は docs 整合と Phase 0 の直近残タスクを優先したい
  notes:
    - Todoist / Outlook 接続の前段として保持する
  due_date: 2026-04-21
  due_type: date
  external:
    todoist_task_id: 6gQFMvgvW5j8QJ5H

## Day2（04/22 水）

- なし

## Day3（04/23 木）

- なし

## Day4（04/24 金）

- なし

## Day5（04/25 土）

- なし

## Day6（04/26 日）

- なし

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
