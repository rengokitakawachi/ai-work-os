# next_operations

## 概要

active_operations に入らなかった上位候補を保持する。

`next_operations` は、
7日ローリングの `active_operations` に入らなかったが、
近い将来に進める前提の task を置くレイヤーとする。

---

## Phase 0 位置づけ

### Phase 0 直結 task

- なし

### 補助 task

- `issue routing の第二バッチ候補を整理する`
- `flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する`

## 再評価結果（2026-04-21 reroll）

### active へ繰り上げた task

- `flow-control 周辺の node --test 実行確認を行う`
- `issue routing の medium impact keep bias 補正案を design に整理する`
- `issue routing の判定順補正を最小差分で実装する`
- `issue routing 補正後の第一バッチ再観測を行う`

理由

- routing / writing 分離と new handoff shape 統一は code / notes 上で一段落したため、次の主論点は実行確認と issue routing 判定補正である
- `node --test` の実行確認は、return compatibility 撤去後の回帰確認として最優先である
- 第一バッチ観測では medium impact issue が keep に寄りすぎることが分かっており、次は gate 補正論点を design → code → 再観測の順で進めるのが自然である

## タスク

- task: issue routing の第二バッチ候補を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_issue_routing_first_batch_observation.md
    - notes/01_issues/idea_log.md
    - notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md
  why_now:
    - 第一バッチ再観測後も route 多様性が不足する場合に備え、次の観測入力候補を用意しておく価値がある
  notes:
    - design / operations / future / archive の未出 route を補える候補を優先する

- task: flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する
  source_ref:
    - notes/08_analysis/2026-04-21_flow_control_new_handoff_shape_unification.md
    - notes/08_analysis/2026-04-21_routing_return_compatibility_inventory.md
  why_now:
    - 今は handover 自体は不要だが、到達点をどの review 出力で回収するかの整理は後で必要になる
  notes:
    - 同一スレッド運用中は handover を作らない前提を維持する

---

## ルール

- active に入らなかった上位候補を置く
- task / source_ref を必須とする
- why_now / notes / due_date / due_type は必要に応じて持つ
- next は active の次に来る候補プールとして扱う
- 必要に応じて target_date や rolling_day を持ってよい
- daily / weekly review で再評価する
- active_operations に入る前提のものだけを置く
- 会話中に新規候補が発生した場合も、まずは reroll により active / next / future を決める
- backlog 化しない
- 80_future の代替として使わない
