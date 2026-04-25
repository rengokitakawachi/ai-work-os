# Handover

## 概要
2026-04-24 daily review までに `pending_tasks` 系の最小粒度改善と inbox 後処理 rule を一段閉じ、Todoist due 欠落問題を issue / design 化した。  
その後 2026-04-25 の会話では、daily review reroll gate の最小チェック、runtime 反映確認、flow-control 新 handoff shape を weekly report に返す要点、Phase 0 の roadmap 上の位置づけ、issue routing completed condition の plan / operations 反映、legacy Todoist wrapper の deprecation 段取り、Day 容量と reroll completeness の joint check まで整理した。  
ただし 2026-04-25 時点ではまだ daily review を実行していないため、これらの一部は runtime 上は完了寄りだが、canonical な `active_operations` 上では未完了のまま残っている。  
新スレッドでは、まず `active_operations` を正本として確認しつつ、今日進めた内容のうち未 daily review 反映のものを整理してから、`Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす` へ進むのが自然。

---

## 成功（Success）
- `pending_tasks` split 実装後の再観測を行い、route / source_ref / role boundary は維持、1テーマ1メモ性は改善と整理した
- `概要` / `まとめ` / `summary` を導入 / メタ section として除外する最小ルールを design に固定し、`src/services/flow-control/adapters.js` に `概要` 除外を実装した
- `pending_tasks` split 後の inbox 後処理 rule を、原則 archive・未判断時のみ pending として design に固定した
- Todoist due 欠落問題の根本原因を、`projectTasks` runtime schema に `due_date` / `due_type` がないことだと切り分け、issue / design に保存した
- 2026-04-24 daily review を完了し、active / next / archive_operations、Todoist projection、daily report、content を更新した
- 2026-04-25 の会話で、`daily review reroll candidate source minimum check` を design に固定した
- 2026-04-25 の会話で、`ADAM の instruction へ daily review reroll gate 反映を確認する` について runtime confirmation を analysis に固定した
- 2026-04-25 の会話で、flow-control 新 handoff shape 統一の weekly report 向け要点を分析メモに圧縮した
- 2026-04-25 の会話で、Phase 0 を roadmap 上で foundation phase として強める位置づけを design に整理した
- 2026-04-25 の会話で、issue routing completed condition の現時点観測反映を plan / operations に書き戻した
- 2026-04-25 の会話で、legacy Todoist wrapper は deprecated 化済みで残りは削除前 gate だと design / operations に整理した
- 2026-04-25 の会話で、Day 容量と reroll completeness を同時に見る joint check を design に固定した

---

## 判明事項（Findings）
- `pending_tasks` 論点は route correctness ではなく input granularity と inbox 後処理に分離して進めるのが安全だった
- routing 後の inbox は、source_ref が成立していれば無理由で残す必要は弱く、原則 archive が自然
- Todoist due 欠落は notes 側ではなく runtime projection interface の欠落であり、repo projection 実装と runtime schema の mismatch が根本原因
- daily review reroll では、`plan / open issue / next_operations / current active` の candidate source を先に確認しないと局所最適になりやすい
- operations 提案の再発防止には、Day 容量だけでなく reroll completeness を同時に見る joint check が必要
- `src/services/todoist.js` は deprecated 化自体は成立済みで、残る主論点は削除前の usage / test gate に移っている
- issue routing の completed condition は「コードがあること」ではなく、送付先判定と後処理が運用で効いていることを plan / operations で読めることにある

---

## 失敗 / 未解決（Issues）
- 2026-04-25 の会話で進めた内容は、まだ daily review 未実施のため canonical な `active_operations` の完了整理へ返していない
- `Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす` は未着手
- `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える` も未着手
- `pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する` は next_operations 側に残っている
- `intake routing の inbox 後処理 rule を一般化する` も next_operations 側に残っている
- 2026-04-25 の進捗は handover / analysis / design には残したが、daily report と archive_operations にはまだ返していない
- Todoist due 欠落問題は応急対策として手動補正済みだが、根治には `projectTasks` schema 側の拡張が必要

---

## 次のアクション（Next Actions）
- まず `notes/04_operations/active_operations.md` を正本として確認し、2026-04-25 会話内で実質完了した task を daily review でどう扱うか判断する
- `Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす`
- 続けて `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える`
- その後、2026-04-25 分の daily review を実行し、active / next / archive / Todoist / daily report / content を更新する
- 余力があれば `pending_tasks 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する` を next から引き上げるか検討する

---

## 関連docs
- `docs/05_roadmap.md`
- `docs/13_dev_workflow.md`
- `docs/17_operations_system.md`

---

## 関連code
- `config/ai/adam_instruction.md`
- `src/services/flow-control/adapters.js`
- `src/services/flow-control/intake-routing.js`
- `src/services/tasks/projection.js`
- `src/services/todoist.js`
- `src/services/todoist/client.js`

---

## 関連notes
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/07_reports/daily/2026-04-24.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`
- `notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md`
- `notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md`
- `notes/02_design/2026-04-25_daily_review_reroll_candidate_source_minimum_check.md`
- `notes/02_design/2026-04-25_day_capacity_and_reroll_completeness_joint_check.md`
- `notes/02_design/2026-04-18_legacy_todoist_wrapper_deprecation_design.md`
- `notes/08_analysis/2026-04-25_adam_runtime_daily_review_reroll_gate_confirmation.md`
- `notes/08_analysis/2026-04-25_flow_control_handoff_shape_weekly_report_points.md`

---

## 状態サマリ
- API：Todoist due 欠落の根本原因は runtime projection schema 側。repo projection 実装は `due_date` / `due_type` を扱えるが `projectTasks` 側が未対応。
- docs整合：Phase 0 foundation 性、issue routing completed condition、daily review reroll gate の意味づけは notes/design/plan に反映済み。docs 本体への追加反映はまだ限定的。
- notesフロー：2026-04-24 daily review は完了済み。2026-04-25 の会話進捗は notes/design/analysis へ保存済みだが、daily review 未実施のため canonical operations への完了反映は未了。

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docsを取得し、現状を把握してから作業を再開して。最初は `notes/04_operations/active_operations.md` を正本として確認し、2026-04-25 会話内で完了寄りになっている task を canonical にどう返すかを意識しながら進めること。次に `notes/02_design/2026-04-23_todoist_projection_due_date_propagation_gap.md` と `src/services/tasks/projection.js` を読んで、`Todoist projection の due_date / due_type 伝播欠落を埋める最小対策を design に落とす` から再開すること。その後 `直近 issue を plan / operations / dev_memo へどう落とすかの運用を整える` へ進み、必要なら 2026-04-25 分の daily review を実行して active / next / archive / Todoist / daily report / content を更新すること.
