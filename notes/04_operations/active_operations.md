# active_operations

## Day0（04/09 木）

- task: operations → Todoist 片方向 projection プロトタイプの最小仕様を design に整理する
  source_ref:
    - notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md
    - notes/02_design/2026-03-25_strategy_todoist_sync_phase1.md
    - notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
    - notes/04_operations/active_operations.md
    - notes/01_issues/idea_log.md
  rolling_day: Day0
  why_now:
    - いまの task を Todoist で見える化する価値が大きく、ユーザー要求も明確なため、将来の双方向同期とは別に ADAM 用プロトタイプ制約を先に固定する価値が高い
  notes:
    - operations が正本
    - Todoist は execution view
    - 片方向
    - create / update / close を含む
    - 更新主体は ADAM
    - Todoist から operations への自動逆流は行わない

- task: 手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - code/config/ai/adam_instruction.md
  rolling_day: Day0
  why_now:
    - reroll の実運用で program 側に寄せるべき判断点を見極めないと hybrid control の責務分離が進まない
  notes:
    - 迷いの多い判断点を収集し、共通処理候補を切り出す

## Day1（04/10 金）

- task: Phase 0 plan に対する現行 operations の接続を見直す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day1
  why_now:
    - conversation routing と active-first execution を通した結果、直近作業が Phase 0 完了条件へどう効くかを再確認する必要がある
  notes:
    - plan と operations の対応が読める状態に揃える

## Day2（04/11 土）

- task: weekly review 前提で active / next / archive の更新準備をする
  source_ref:
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day2
  why_now:
    - active-first 運用試験の結果を weekly review に返すため、繰越・完了・snapshot の材料を整理する必要がある
  notes:
    - reroll で動いた差分をそのまま週次へ渡せる形にする

## Day3（04/12 日）

- task: docs 反映候補として execution governance 変更点を整理する
  source_ref:
    - code/config/ai/adam_instruction.md
    - notes/04_operations/active_operations.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
  rolling_day: Day3
  why_now:
    - instruction と operations で試験運用した結果を見てから docs へ反映する方針のため、候補整理を後段に置く
  notes:
    - active-first execution と reroll 原則の有効性・副作用を評価材料としてまとめる

## Day4（04/13 月）

- task: conversation routing と execution governance の試験結果を handover / report に返す準備をする
  source_ref:
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-08.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day4
  why_now:
    - 試験運用の結果と次判断が追えるように、返却先を意識して整理する必要がある
  notes:
    - report / handover / docs 候補への返却観点を揃える

## Day5（04/14 火）

- task: next_operations 上位候補を再評価する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
  rolling_day: Day5
  why_now:
    - conversation routing 実運用で生じた新規 next 候補を含め、近未来候補の相対順位を見直す必要がある
  notes:
    - daily review の出力接続論点
    - handover 起点解釈論点
    - decision 最小運用モデル論点
    を再評価対象に含める

## Day6（04/15 水）

- task: Day6 補充候補を reroll 観点で選定する
  source_ref:
    - notes/04_operations/next_operations.md
    - notes/04_operations/active_operations.md
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
  rolling_day: Day6
  why_now:
    - active の完了が進んだため、次の 7 日枠補充方針を先に見ておく必要がある
  notes:
    - next / plan / issue から補充候補を比較する

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
