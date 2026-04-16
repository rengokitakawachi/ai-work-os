# Handover

## 概要
issue routing の可変評価 schema を design と code の両方で前進させ、2026-04-15 の daily review を完了した。
具体的には、`impact` を issue 固定値として扱うのではなく、default assessment と routing decision に分ける方針を design で固定し、code 側でも `default_impact / default_urgency / impact_now / urgency_now / evaluated_at` を input → normalize → rules → placement → routing → action plan まで通す形へ補正した。
あわせて、Todoist を operations の projection として扱う前提を review と instruction に反映済みであり、daily review では projection drift の補正も実施した。

---

## 成功（Success）
- `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md` を作成し、issue routing の可変評価 schema を固定した
- `src/services/flow-control/rules.js` に `evaluated_at / impact_now / urgency_now` を追加した
- `src/services/flow-control/adapters.js` に `default_impact / default_urgency` を追加した
- `src/services/flow-control/issue-routing-actions.js` に可変評価項目を通した
- 関係コードの読み直しにより、`placement.js` と `normalize.js` で値が落ちる問題を発見し修正した
- 2026-04-15 の daily review を完了し、`active_operations.md`、daily report、content、Todoist projection を更新した
- 前回完了済みなのに Todoist で open のままだった task を close し、現在の Day0 task を Todoist に投影した

---

## 判明事項（Findings）
- schema 拡張は design と rules だけでは不十分で、`normalize -> rules -> placement -> routing -> action plan` の値の通り道全体を確認する必要がある
- `placement.js` が evaluation の拡張項目を落としていたため、見た目上は実装されていても end-to-end では成立していなかった
- `normalize.js` が `assessment` を保持していなかったため、将来 `assessment.impact_now` を優先する設計に対して経路が閉じていなかった
- Todoist は task 状態の正本ではなく operations の projection として扱うべきであり、daily review では projection 同期まで閉じる必要がある

---

## 失敗 / 未解決（Issues）
- issue routing の action plan を notes write へ接続する usecase は未実装
- `idea_log` など実データ 1 ファイルに対する dry run で、可変評価項目が `routed_candidates` と `action plan` に実際に残るかの再確認は未了
- `next / archive` と Todoist projection の同期方針はまだ粗い
- `daily review の出力から content 抽出と operations rolling の接続ルールを design 観点で整理する` は未着手のまま active Day1 に残っている
- active-first 原則を外した運用違反の再発防止と、repo 履歴確認 API の issue は `idea_log` に記録済みだが未処理

---

## 次のアクション（Next Actions）
- Day0 の `issue routing の後処理統合と可変評価 schema の整理を進める` から再開する
- まず `idea_log` を使った 1 ファイル dry run を行い、`evaluated_at / impact_now / urgency_now` が end-to-end で残るか確認する
- 問題なければ、action plan を notes write へ接続する最小 usecase を検討する
- 次の daily review では、Todoist projection drift が再発していないかも確認する

---

## 関連docs
- `docs/13_dev_workflow.md`
- `docs/15_notes_system.md`
- `docs/17_operations_system.md`

---

## 関連code
- `config/ai/adam_instruction.md`
- `src/services/flow-control/adapters.js`
- `src/services/flow-control/rules.js`
- `src/services/flow-control/placement.js`
- `src/services/flow-control/normalize.js`
- `src/services/flow-control/issue-routing.js`
- `src/services/flow-control/issue-routing-actions.js`

---

## 関連notes
- `notes/02_design/2026-04-14_issue_routing_end_state_first_and_incremental_implementation.md`
- `notes/02_design/2026-04-15_issue_routing_variable_assessment_schema.md`
- `notes/02_design/2026-04-03_review_system_operating_spec.md`
- `notes/04_operations/active_operations.md`
- `notes/07_reports/daily/2026-04-15.md`
- `notes/09_content/drafts/schema_should_be_fixed_before_notes_write.md`
- `notes/01_issues/idea_log.md`

---

## 状態サマリ
- API：issue routing の可変評価 schema は code に入ったが、notes write 接続は未了
- docs整合：Todoist を projection として扱う前提と daily review 完了条件は instruction / review spec に反映済み
- notesフロー：daily report と content は 2026-04-15 分まで保存済み、active Day0 は issue routing 継続

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docs・code・notes・operationsを取得し、現状を把握してから Day0 の `issue routing の後処理統合と可変評価 schema の整理を進める` を再開して
