# archive_operations

## 概要

今週の完了タスクを一時的に保持する。

`archive_operations` は、
weekly review までの短期履歴置き場であり、
長期保存の正本ではない。

---

## 位置づけ

- 今週の一時アーカイブ
- weekly review 前の退避先
- 99_archive へ保存する前段

---

## タスク

- `2026-04-05_operations_next_archive_snapshot_model.md` を operations 正本構造の採用案として固定した
- operations 実体の移行差分を洗い出した
- `next_operations.md` を作成した
- `archive_operations.md` を作成した
- `standby_operations.md` を廃止した
- `config/ai/adam_instruction.md` の operations 利用ルールを最小差分で更新した
- `docs/15_notes_system.md` を新 operations モデルへ更新した
- `docs/17_operations_system.md` を新 operations モデルへ更新した
- `operations_generation_rules.md` の役割を rolling spec へ統合し、`notes/99_archive/design/operations_generation_rules.md` へ移動した

--- 再構築に伴うアーカイブ ---

- active_operations を schema 準拠で再構築した（再構築により置換）
- next_operations を schema 準拠で再構成した（旧版・再構築前）
- Flow Control / routing / operations の整合を確認した（初期整合作業）
- future_layer_operating_spec に残る旧用語修正（進展済み）
- standard_development_flow_v2 更新（進展済み）

--- 2026-04-09 daily review ---

- `conversation routing を 1 件フルフローで実運用検証する` を完了した
- `active-first execution 原則で operations 運用を 1 周試す` を完了した
- `classification_and_routing_spec の扱いを決める` を完了した
  - 結論: archive
  - archive 先: `notes/99_archive/design/classification_and_routing_spec.md`

--- 2026-04-10 daily review ---

- `web 版 GPT editor で ADAM instruction の最新変更を反映する` を完了した
  - web 版 GPT editor への instruction 反映を確認した
  - operations → Todoist projection を EVE開発 project へ接続した
  - Todoist task の再作成と date 反映まで確認した

--- 2026-04-11 daily review ---

- `Phase 0 plan に対する現行 operations の接続を見直す` を完了した
  - Phase 0 完了条件に対する active / next の対応を整理した
  - `Phase 0 位置づけ` を active_operations / next_operations に追加した
  - `Phase 0 直結 task` と `補助 task` を明示した

--- 2026-04-12 daily review ---

- `weekly review 前提で active / next / archive の更新準備をする` を完了した
  - weekly review へ渡す繰越 / 完了 / snapshot 材料を整理した
- `docs 反映候補として execution governance 変更点を整理する` を完了した
  - docs 反映候補と docs 反映順を整理した
- `conversation routing と execution governance の試験結果を handover / report に返す準備をする` を完了した
  - report / handover / docs 候補への返却観点を整理した
- `next_operations 上位候補を再評価する` を完了した
  - next の上位候補と後段候補を再評価した
- `Day6 補充候補を reroll 観点で選定する` を完了した
  - Day6 補充の第一候補と次点候補を固定した
- `review system と operations rolling の接続ルールを design 観点で確認する` を完了した
  - daily / weekly review と rolling の接続ルールを整理した
- `Phase 0 完了条件に対する未充足項目を洗い出す` を完了した
  - Phase 0 の true gap を整理した
- `docs / notes / instruction の operations 周辺未反映差分を一覧化する` を完了した
  - docs/17 と docs/15 を優先反映対象として固定した

--- 2026-04-13 daily review ---

- `latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する` を完了した
  - handover は新スレッド再開時の入口、active_operations は短期実行順の正本と整理した
  - `notes/02_design/2026-04-13_handover_entry_and_active_head_interpretation_rule.md` を作成した
- `plan から operations への接続弱化ポイントと重要 issue の埋没防止ルールを design に整理する` を完了した
  - plan → issue → operations の接続弱化と重要 issue の埋没防止ルールを整理した
  - `notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md` を作成した

--- 2026-04-14 daily review ---

- `docs-ready draft を基に docs/17_operations_system.md と docs/15_notes_system.md の本体反映を進める` を完了した
  - docs/17 と docs/15 の本体更新を完了した
  - docs/13_dev_workflow.md の差分作成と本体更新も完了した
- `plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する` を完了した
  - adam_instruction.md に issue 保存と issue routing の責務分離を含む暫定原則を反映した
  - issue routing の実データ dry run、decision schema、action plan 分離まで進めた
  - `notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md` を作成した

--- 2026-04-18 daily review ---

- `reroll の最小 dry_run 入出力を確認する` を完了した
  - plan / active / queue を同じ土俵に乗せた最小 dry_run の期待挙動を確認した
  - current code snapshot を再構成した sample dry_run で、plan 優先 / active continuity 補助 / phase mismatch deferred を確認した
- `operations task の粒度ルールと day 容量モデルを整理する` を完了した
  - task は 0.5〜1.5時間程度を目安にする
  - Day は 1 task 固定ではなく複数 task を置いてよいことを固定した
- `code resource の repo root allowlist 変更要求を整理する` を完了した
  - allowlist 方式で repo root config file の read と create/update を許可した
  - `package.json` の read と code tree 反映を確認した
- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する` を完了した
  - `operations → Todoist projection → report → content` の順を固定した
- `stale active の整合回復ルールを design に整理する` を完了した
  - stale active は reroll とは別の正本修復と整理した
- `ADAM で試す 05_decisions の最小運用モデルを design に整理する` を完了した
  - 1 decision 1 file と source_ref / related_refs 分離を固定した
- `scoring knowledge の蓄積方針を dev_memo か design に整理する` を完了した
  - gate / score / override の3層モデルへ寄せる前提を固定した

--- 2026-04-19 daily review ---

- `パソコンで design routing test と reroll sample dry_run を実行する` を完了した
  - `npm test` 57 pass / 0 fail を確認した
  - `node --test src/services/flow-control/design-routing.test.js` 12 pass を確認した
  - reroll sample dry_run が repo 実体で正常終了し、queue payload が `operations_queue` として取り込まれることを確認した
- `src/services/todoist.js の repo 全体 usage を最終確認する` を完了した
  - `src/services/todoist.js` の runtime import / require は repo 全体で見つからなかった
  - tasks 系は `src/services/todoist/client.js` へ移行済みで、legacy wrapper は delete 候補と判断できる状態になった
- `applyDesignRoutingActionPlan の skeleton を切る` を完了した
  - dry_run / apply の責務境界を設けた
  - future / archive への apply 時 write dispatch 骨格を追加した
  - `design-routing.test.js` 13 pass、`npm test` 58 pass を確認した

--- 2026-04-20 daily review ---

- `routing と document writing の責務分離方針を整理する` を完了した
  - `notes/02_design/2026-04-20_routing_and_document_writing_separation.md` を作成した
  - routing は再評価 / 分解統合 / 送付先判定 / action plan 生成までに留める方針を固定した
- `issue routing と writer 間の action plan 受け渡し項目を定義する` を完了した
  - `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md` を作成した
  - `normalized_items / routing_decisions / action_plan` の3層受け渡しを固定した
  - `keep_items` を no-op とし、`route_to: issue` を正規結果として扱う前提を固定した

--- 2026-04-21 daily review ---

- `issue routing の medium impact keep bias 補正案を design に整理する` を完了した
- `issue routing の判定順補正を最小差分で実装する` を完了した
- `issue routing 補正後の第一バッチ再観測を行う` を完了した
- `issue routing の第二バッチ候補を整理する` を完了した
- `future / archive を観測できる issue 候補を追加する` を完了した
- `第二バッチ issue を routing して route 結果を記録する` を完了した
- `operations candidate を rolling に接続して反映確認する` を完了した
- `keep / future / archive の運用妥当性を整理する` を完了した
- `flow-control 新 handoff shape 統一の到達点を report / handover へ返す条件を整理する` を完了した
- `ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する` を完了した
  - issue routing の運用観測ラインを一巡した
  - `keep / future / archive` の役割差と再評価地点を整理した
  - `route_to: operations` は即 active 化ではなく rolling 比較対象化であることを確認した
  - `repo反映 / 正本反映 / 実運用反映` を分離する再発防止ルールを instruction に追加した
- 補正:
  - `ADAM_MMDD` 再開識別子ルールの runtime 反映確認は未完了と判断を修正した
  - repo instruction 更新は完了済みだが、ADAM 実運用への反映確認は 2026-04-22 active へ戻した

--- 2026-04-22 daily review ---

- `flow-control 周辺の node --test 実行確認を行う` を完了した
  - 最新 HEAD `e4e782e` に対して 39件中 39 pass / 0 fail を確認した
- `ADAM 実運用 instruction へ新スレッド再開識別子ルールを反映確認する` を完了した
  - runtime 反映確認済みと扱える状態になった
- `design retain fallback の no_op 欠落が仕様変更か不整合かを整理する` を完了した
- `intake routing の design / issue 期待値ズレが test 側か実装側かを切り分ける` を完了した
- `design retain fallback の no_op 期待を test 層に合わせて補正する` を完了した
- `non-high-impact open issue が design に吸われる判定順を修正する` を完了した
- `intake routing の issue / design / future 最小分岐を spec に沿って実装する` を完了した
- `intake routing の第一バッチ候補を整理する` を完了した
- `intake routing の観測項目を analysis に落とす` を完了した
- `intake routing の第一バッチ期待値ベース observation を記録する` を完了した
- `intake routing 用 inbox markdown adapter の最小要件を整理する` を完了した
- `intake routing 用 inbox markdown adapter の最小実装差分を作る` を完了した
- `intake routing 第一バッチ 3 件の mechanical dry run observation を記録する` を完了した
  - route 多様性は mechanical dry run でも `issue / design / future` の 3 分岐で成立した
  - 次の主論点は `pending_tasks` の複数論点分解要否に絞られた

--- 2026-04-23 daily review ---

- `pending_tasks 向けの inbox チャンク分解拡張要否を整理する` を完了した
  - route 妥当性は成立済みだが、1テーマ1メモと spec 上のチャンク単位処理のために split 拡張が必要と整理した
- `pending_tasks 型複数論点入力の最小 split ルールを design に落とす` を完了した
  - `1見出し = 1item` を最小 split ルールとし、`まとめ` / `summary` は item 化しない方針を固定した
- `intake inbox adapter の複数 item 抽出最小拡張を設計する` を完了した
  - `pending_tasks` 限定 split、split 不成立時の single item fallback、source_ref 維持を設計として固定した
- `intake inbox adapter の複数 item 抽出最小拡張を実装する` を完了した
  - `src/services/flow-control/adapters.js` に `pending_tasks` 専用 split 分岐を追加した
  - split 成功時は見出し単位の複数 item、失敗時は既存 `1ファイル = 1item` にフォールバックする状態になった

--- 2026-04-24 daily review ---

- `pending_tasks 分解後の第一バッチ再観測を行う` を完了した
  - split 実装後の再観測で、route / source_ref / role boundary は維持され、1テーマ1メモ性は改善したと整理した
- `pending_tasks 型 split 後の inbox archive / pending rule を整理する` を完了した
  - 原則 archive、未判断が残るときだけ pending という最小後処理 rule を固定した

--- 2026-04-25 daily review ---

- `daily review reroll で plan / issue / next を必須候補源として確認する最小チェックを design に落とす` を完了した
  - `notes/02_design/2026-04-25_daily_review_reroll_candidate_source_minimum_check.md` に整理済み
- `ADAM の instruction へ daily review reroll gate 反映を確認する` を完了した
  - runtime 上でも daily review 開始時の review mode / candidate source / reroll gate が効いている前提で扱える
  - `notes/08_analysis/2026-04-25_adam_runtime_daily_review_reroll_gate_confirmation.md` に観測済み
- `flow-control 新 handoff shape 統一の到達点を weekly report に返す要点を整理する` を完了した
  - `notes/08_analysis/2026-04-25_flow_control_handoff_shape_weekly_report_points.md` に整理済み
- `docs/05_roadmap.md に Phase 0 をどう位置づけるか整理する` を完了した
  - `notes/02_design/2026-04-25_phase0_positioning_in_roadmap.md` に整理済み
  - docs 本体反映は後段 task として分離する
- `issue routing の完成条件を plan / operations に反映する` を完了した
  - `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md` と operations 上の位置づけへ返した
- `legacy な Todoist service wrapper を deprecated 化する段取りを design / operations に落とす` を完了した
  - deprecated 化済み、残りは削除前 gate として再配置した
- `operations 提案時の Day 容量と reroll completeness を同時に確認するチェック項目を整理する` を完了した
  - `notes/02_design/2026-04-25_day_capacity_and_reroll_completeness_joint_check.md` に整理済み
- `Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす` を完了した
  - repo schema / instruction / design 更新まで完了
  - runtime schema 反映後の dry_run で `due_string` が出ることを確認した
- `ADAM runtime の projectTasks schema に due_date / due_type が反映されたか確認する` を完了した
  - `projectTasks(mode="dry_run")` で `payload.due_string = 2026-04-30` を確認した
  - apply は daily review の Todoist projection 更新で実施する

---

## ルール

- 完了タスクを必要に応じてここへ移す
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は 99_archive 側とする
