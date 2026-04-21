# Handover

## 概要
2026-04-20 までに issue routing の完成条件を「実運用で効果が見えること」として plan / operations に反映し、routing と document writing の責務分離方針、および `normalized_items / routing_decisions / action_plan` の handoff schema を design に固定した。  
daily review では active / next / archive_operations、Todoist projection、daily report、content まで更新済み。  
その後 2026-04-21 日中で `repo の adam_instruction.md 変更を ADAM instruction へ反映する` を完了扱いに更新した。  
新スレッドでは、まず `routing と writing を分離する最小実装を入れる` を実行し、その後 issue routing 第一バッチ運用実験へ進むのが自然。

---

## 成功（Success）
- issue routing の完成条件を Phase 0 plan / operations に反映した
- issue routing の最小運用実験で使う issue 候補と観測項目を固定した
- `notes/02_design/2026-04-20_routing_and_document_writing_separation.md` を作成し、routing と document writing の責務分離方針を固定した
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md` を作成し、`normalized_items / routing_decisions / action_plan` の3層 handoff schema を固定した
- issue routing では、送付先がまだ自然でなければ `route_to: issue` / `keep_items` を正規結果として扱う方針を design に反映した
- 2026-04-20 の daily review を完了し、operations / Todoist projection / daily report / content を更新した
- `repo の adam_instruction.md 変更を ADAM instruction へ反映する` を 2026-04-21 日中完了扱いに更新した

---

## 判明事項（Findings）
- issue routing は「必ずどこかへ送る処理」ではなく、自然な送付先がまだない item を issue のまま保持できる方が運用上自然
- routing と writing を分離しないまま実験すると、観測対象が旧構造のままになりやすい
- writer の主入力は completed document ではなく `action_plan` とみなす方が責務分離しやすい
- repo 上の instruction 更新と、実際の ADAM instruction 反映は別物として扱う必要がある
- operations 提案 / reroll では、前提変更チェック・Day 容量チェック・依存順チェックが再発防止に重要

---

## 失敗 / 未解決（Issues）
- `routing と writing を分離する最小実装を入れる` は未着手
- issue routing 第一バッチ運用実験は未実施
- issue routing 第一バッチの観測結果記録も未着手
- docs 番号衝突整理と Phase 1 各 plan 接続案は後段の補助 task として残っている
- `notes/07_reports/daily/2026-04-20.md` には「ADAM instruction 実反映未完了」とあるが、現時点では日中完了扱いへ更新済みであり、report と current active の間に時差がある

---

## 次のアクション（Next Actions）
- `routing と writing を分離する最小実装を入れる`
- `issue routing の第一バッチ運用実験を実施する`
- `issue routing 第一バッチの観測結果を記録する`
- その後、`docs 番号衝突と旧 docs 群の整理方針をメモ化する`
- 続けて、`Phase 1 各 plan と operations 接続案を並べる`

---

## 関連docs
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

---

## 関連code
- `config/ai/adam_instruction.md`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`
- `src/services/flow-control/issue-routing-notes-write.js`
- `src/services/flow-control/orchestrate.js`

---

## 関連notes
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/04_operations/archive_operations.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- `notes/02_design/2026-04-20_routing_and_document_writing_separation.md`
- `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md`
- `notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md`
- `notes/07_reports/daily/2026-04-20.md`
- `notes/09_content/drafts/issue_routing_can_keep_items_in_issue.md`

---

## 状態サマリ
- API：issue routing / notes write / rolling の責務分離方針は design で固定済み。code 側の最小実装はまだ。
- docs整合：Phase 0 plan、operations、instruction repo file は更新済み。daily report には一部時差あり。
- notesフロー：2026-04-20 daily review は完了済み。active / next / archive / report / content / Todoist projection 更新済み。

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して。最初は `notes/04_operations/active_operations.md` を正本として確認し、次に `notes/02_design/2026-04-20_routing_and_document_writing_separation.md` と `notes/02_design/2026-04-20_issue_routing_action_plan_handoff_schema.md` を読んでから、`routing と writing を分離する最小実装を入れる` に進むこと。その後、`notes/02_design/2026-04-20_issue_routing_minimum_operation_experiment.md` を参照して issue routing 第一バッチ運用実験へ進むこと。
