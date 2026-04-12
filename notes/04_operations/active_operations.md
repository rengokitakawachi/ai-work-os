# active_operations

## Phase 0 位置づけ

### Phase 0 直結 task

- `weekly review 前提で active / next / archive の更新準備をする`
- `docs 反映候補として execution governance 変更点を整理する`
- `conversation routing と execution governance の試験結果を handover / report に返す準備をする`
- `review system と operations rolling の接続ルールを design 観点で確認する`
- `Phase 0 完了条件に対する未充足項目を洗い出す`
- `docs / notes / instruction の operations 周辺未反映差分を一覧化する`

### 補助 task

- `next_operations 上位候補を再評価する`
- `Day6 補充候補を reroll 観点で選定する`

## Day0（04/12 日）

- task: weekly review 前提で active / next / archive の更新準備をする
  source_ref:
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day0
  why_now:
    - active-first 運用試験の結果を weekly review に返すため、繰越・完了・snapshot の材料を整理する必要がある
  notes:
    - reroll で動いた差分をそのまま週次へ渡せる形にする
  due_date: 2026-04-12
  due_type: date
  external:
    todoist_task_id: 6gMJc6wgfF6cHJrR

## Day1（04/13 月）

- task: docs 反映候補として execution governance 変更点を整理する
  source_ref:
    - code/config/ai/adam_instruction.md
    - notes/04_operations/active_operations.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
  rolling_day: Day1
  why_now:
    - instruction と operations で試験運用した結果を見てから docs へ反映する方針のため、候補整理を後段に置く
  notes:
    - active-first execution と reroll 原則の有効性・副作用を評価材料としてまとめる
  due_date: 2026-04-13
  due_type: date
  external:
    todoist_task_id: 6gMJc73FGmh6Q4V2

## Day2（04/14 火）

- task: conversation routing と execution governance の試験結果を handover / report に返す準備をする
  source_ref:
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day2
  why_now:
    - 試験運用の結果と次判断が追えるように、返却先を意識して整理する必要がある
  notes:
    - report / handover / docs 候補への返却観点を揃える
  due_date: 2026-04-14
  due_type: date
  external:
    todoist_task_id: 6gMJc733R6Fhj8vR

## Day3（04/15 水）

- task: next_operations 上位候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
  rolling_day: Day3
  why_now:
    - conversation routing 実運用で生じた新規 next 候補を含め、近未来候補の相対順位を見直す必要がある
  notes:
    - daily review の出力接続論点
    - handover 起点解釈論点
    - decision 最小運用モデル論点
    を再評価対象に含める
  due_date: 2026-04-15
  due_type: date
  external:
    todoist_task_id: 6gMJc74JX58cJ3cR

## Day4（04/16 木）

- task: Day6 補充候補を reroll 観点で選定する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day4
  why_now:
    - active の完了が進んだため、次の 7 日枠補充方針を先に見ておく必要がある
  notes:
    - next / plan / issue から補充候補を比較する
  due_date: 2026-04-16
  due_type: date
  external:
    todoist_task_id: 6gMJc796JxmPPWR2

## Day5（04/17 金）

- task: review system と operations rolling の接続ルールを design 観点で確認する
  source_ref:
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/2026-04-12_day6_refill_candidate_selection.md
  rolling_day: Day5
  why_now:
    - D5 / D6 の不正 task を active から除去したため、next の最上位から Phase 0 直結 task を補充する
    - execution governance の試験結果を review system 側へ返す接続点として最優先である
  notes:
    - reroll による active 補充
    - daily / weekly review の返却点と operations 更新点を明確にする
  due_date: 2026-04-17
  due_type: date
  external:
    todoist_task_id: 6gMmpj5CfJcjgxf2

## Day6（04/18 土）

- task: Phase 0 完了条件に対する未充足項目を洗い出す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/2026-04-12_day6_refill_candidate_selection.md
  rolling_day: Day6
  why_now:
    - D5 / D6 の不正 task 削除後の reroll で、Phase 0 直結の次点候補を active へ補充する
    - review と operations の接続確認の次に、Phase 0 の残差分を確認する流れが自然である
  notes:
    - reroll による active 補充
    - execution governance と conversation routing を含めて再評価する
  due_date: 2026-04-18
  due_type: date
  external:
    todoist_task_id: 6gMmpjVMH4pgvgPR

## Day6 例外補充（04/12 日中-2）

- task: docs / notes / instruction の operations 周辺未反映差分を一覧化する
  source_ref:
    - notes/08_analysis/2026-04-04_repo_readthrough_findings.md
    - notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md
    - code/config/ai/adam_instruction.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  rolling_day: Day6_refill_2
  why_now:
    - active の既存 task は会話上すでに完了認識済みで、日中の実行対象が尽きている
    - `docs/05_roadmap.md` はすでに Phase 0 反映済みであり、次は next_operations の最上位へ戻るのが自然
    - operations 周辺の docs / notes / instruction の未反映差分を横断で一覧化する価値が高い
  notes:
    - 例外 reroll による active 補充
    - docs 15 / 17 と instruction / related design の反映漏れを比較する
    - archive 移動や Day 再編成は still daily review まで保留
  due_date: 2026-04-12
  due_type: date
  external:
    todoist_task_id: 6gMmwXgHXxh86wjR

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
