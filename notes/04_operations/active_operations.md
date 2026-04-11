# active_operations

## Day0（04/11 土）

- task: web 版 GPT editor で ADAM instruction の最新変更を反映する
  source_ref:
    - code/config/ai/adam_instruction.md
    - config/ai/adam_schema.yaml
    - notes/02_design/2026-04-03_review_system_operating_spec.md
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - instruction / schema はパソコンからしか反映できないため、明日の着手直後に実行できる位置へ固定する必要がある
  notes:
    - web 版 GPT editor 前提
    - 反映対象は instruction と schema の最新変更
    - 他 task より先に着手する
  due_date: 2026-04-11
  due_type: date
  external:
    todoist_task_id: 6gMXcHXWMGPX727H

- task: web 版 GPT editor に ADAM instruction と schema の今回の更新を反映する
  source_ref:
    - code/config/ai/adam_instruction.md
    - code/config/ai/adam_schema.yaml
    - notes/04_operations/active_operations.md
  rolling_day: Day0
  why_now:
    - repo 側で更新した instruction / schema を GPT editor 側にも揃えないと、今回追加した状態判断ルールが実運用へ反映されない
  notes:
    - web 版 GPT editor 前提
    - 反映対象は `config/ai/adam_instruction.md` と `config/ai/adam_schema.yaml`
    - `Operations状態判断手順` の追加と schema description 更新を反映する
  due_date: 2026-04-11
  due_type: date
  external:
    todoist_task_id: 6gMXcHc42wwx5v4H

- task: Phase 0 plan に対する現行 operations の接続を見直す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day0
  why_now:
    - conversation routing と active-first execution を通した結果、直近作業が Phase 0 完了条件へどう効くかを再確認する必要がある
  notes:
    - plan と operations の対応が読める状態に揃える
  due_date: 2026-04-11
  due_type: date
  external:
    todoist_task_id: 6gMJc6pFXHq3wwJR

## Day1（04/12 日）

- task: weekly review 前提で active / next / archive の更新準備をする
  source_ref:
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day1
  why_now:
    - active-first 運用試験の結果を weekly review に返すため、繰越・完了・snapshot の材料を整理する必要がある
  notes:
    - reroll で動いた差分をそのまま週次へ渡せる形にする
  due_date: 2026-04-12
  due_type: date
  external:
    todoist_task_id: 6gMJc6wgfF6cHJrR

## Day2（04/13 月）

- task: docs 反映候補として execution governance 変更点を整理する
  source_ref:
    - code/config/ai/adam_instruction.md
    - notes/04_operations/active_operations.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
  rolling_day: Day2
  why_now:
    - instruction と operations で試験運用した結果を見てから docs へ反映する方針のため、候補整理を後段に置く
  notes:
    - active-first execution と reroll 原則の有効性・副作用を評価材料としてまとめる
  due_date: 2026-04-13
  due_type: date
  external:
    todoist_task_id: 6gMJc73FGmh6Q4V2

## Day3（04/14 火）

- task: conversation routing と execution governance の試験結果を handover / report に返す準備をする
  source_ref:
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day3
  why_now:
    - 試験運用の結果と次判断が追えるように、返却先を意識して整理する必要がある
  notes:
    - report / handover / docs 候補への返却観点を揃える
  due_date: 2026-04-14
  due_type: date
  external:
    todoist_task_id: 6gMJc733R6Fhj8vR

## Day4（04/15 水）

- task: next_operations 上位候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
  rolling_day: Day4
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

## Day5（04/16 木）

- task: Day6 補充候補を reroll 観点で選定する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day5
  why_now:
    - active の完了が進んだため、次の 7 日枠補充方針を先に見ておく必要がある
  notes:
    - next / plan / issue から補充候補を比較する
  due_date: 2026-04-16
  due_type: date
  external:
    todoist_task_id: 6gMJc796JxmPPWR2

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
