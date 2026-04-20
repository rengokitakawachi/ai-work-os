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
  - allowlist 方式で repo root config file の read/create/update を許可した
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
  - issue routing では送付先が自然でなければ issue に残してよいことを明記した
- `issue routing と writer 間の action plan 受け渡し項目を定義する` を完了した
  - `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md` を作成した
  - `normalized_items / routing_decisions / action_plan` の3層受け渡しを固定した
  - `keep_items` を no-op とし、`route_to: issue` を正規結果として扱う前提を固定した

---

## ルール

- 完了タスクを必要に応じてここへ移す
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は 99_archive 側とする
