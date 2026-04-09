# active_operations

## Day0（04/09 木）

- task: conversation routing を 1 件フルフローで実運用検証する
  source_ref:
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/01_issues/idea_log.md
    - notes/04_operations/active_operations.md
    - notes/07_reports/daily/2026-04-08.md
  rolling_day: Day0
  why_now:
    - 4/8 時点で active-first execution の基本ケースは確認できたが、本命ケースである issue 起点 → 派生 → rolling → 保存の full flow は未完のため、今日の先頭 task として閉じる必要がある
  notes:
    - 新規論点発生
    - 議論 / issue / operations candidate 判定
    - active / next / future 提案
    - active 外なら実行しない
    - 保存順序
    を明示的に確認する

## Day1（04/10 金）

- task: active-first execution 原則で operations 運用を 1 周試す
  source_ref:
    - notes/04_operations/active_operations.md
    - code/config/ai/adam_instruction.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - notes/07_reports/daily/2026-04-08.md
  rolling_day: Day1
  why_now:
    - 基本ケースは確認済みだが、本命ケースを通したうえで active-first execution を 1 周完了として閉じる必要がある
  notes:
    - 4/8 に stale active 整合回復と新規候補なしケースは確認済み
    - Day0 の full flow 検証結果を踏まえて完了判定する

- task: classification_and_routing_spec の扱いを決める
  source_ref:
    - notes/02_design/classification_and_routing_spec.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
  rolling_day: Day1
  why_now:
    - conversation routing を formalize したことで、旧 routing spec を更新・archive・future のどれに送るか判断できる段階に入った
  notes:
    - 現行 routing 群との重複と残す価値を確認する

## Day2（04/11 土）

- task: scoring knowledge の蓄積方針を dev_memo か design に整理する
  source_ref:
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
    - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
  rolling_day: Day2
  why_now:
    - reroll 運用を始める前に、優先順位判断で生じる迷いをどこへ知見化するかを決める必要がある
  notes:
    - score は決定ではなく補助である前提を維持する

- task: 手動 rolling 1周目で迷った点を抽出し、program に寄せる責務候補を整理する
  source_ref:
    - notes/00_inbox/dev_memo/2026-04-06_manual_rolling_round1_notes.md
    - notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
    - code/config/ai/adam_instruction.md
  rolling_day: Day2
  why_now:
    - reroll の実運用で program 側に寄せるべき判断点を見極めないと hybrid control の責務分離が進まない
  notes:
    - 迷いの多い判断点を収集し、共通処理候補を切り出す

## Day3（04/12 日）

- task: Phase 0 plan に対する現行 operations の接続を見直す
  source_ref:
    - notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
  rolling_day: Day3
  why_now:
    - conversation routing と active-first execution を入れた結果、直近作業が Phase 0 完了条件へどう効くかを再確認する必要がある
  notes:
    - plan と operations の対応が読める状態に揃える

## Day4（04/13 月）

- task: weekly review 前提で active / next / archive の更新準備をする
  source_ref:
    - notes/04_operations/active_operations.md
    - notes/04_operations/next_operations.md
    - notes/04_operations/archive_operations.md
  rolling_day: Day4
  why_now:
    - active-first 運用試験の結果を weekly review に返すため、繰越・完了・snapshot の材料を整理する必要がある
  notes:
    - reroll で動いた差分をそのまま週次へ渡せる形にする

## Day5（04/14 火）

- task: docs 反映候補として execution governance 変更点を整理する
  source_ref:
    - code/config/ai/adam_instruction.md
    - notes/04_operations/active_operations.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
  rolling_day: Day5
  why_now:
    - instruction と operations で試験運用した結果を見てから docs へ反映する方針のため、候補整理を後段に置く
  notes:
    - active-first execution と reroll 原則の有効性・副作用を評価材料としてまとめる

## Day6（04/15 水）

- task: conversation routing と execution governance の試験結果を handover / report に返す準備をする
  source_ref:
    - notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
    - code/config/ai/adam_instruction.md
    - notes/07_reports/daily/2026-04-08.md
  rolling_day: Day6
  why_now:
    - 再開時に試験運用の結果と次判断が追えるように、返却先を先に意識して整理する必要がある
  notes:
    - report / handover / docs 候補への返却観点を揃える

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
