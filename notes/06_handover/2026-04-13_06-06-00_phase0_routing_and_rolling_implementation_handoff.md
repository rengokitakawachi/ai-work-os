# Handover

## 概要
このセッションでは、Phase 0 の共通 operating model を前進させるために、operations / routing / review 周辺の整合を集中的に整理した。
特に、plan から operations への接続弱化、重要 issue の埋没、handover と active の再開ルール、docs 反映候補、そして routing / rolling の最小責務を明文化した。

現在は、設計整理の比重が高い区間をほぼ抜けて、次に
`インテーク routing`、`issue routing`、`operations rolling 時の task candidate 生成`
の実装優先順位を上げる判断まで進んでいる。

---

## 成功（Success）
- 4/12 daily review を完了し、active / next / archive / daily report を更新した
- `docs/17_operations_system.md` と `docs/15_notes_system.md` の更新 draft を作成した
- `intake routing / issue routing` の最小責務を design に固定した
- `operations rolling は next の繰り上げではなく、plan 前進のための優先順位決定である` という重要論点を issue 化した
- `plan から operations への接続が弱く、重要 issue が埋もれる` 論点を issue 化し、operations candidate 化して active に反映した
- `handover は新スレッド再開専用、日々の再開は active 起点` という再開ルールを design に修正した
- `plan → issue → operations` の接続弱化と、重要 issue の埋没防止ルールを design に整理した
- 上記 design が固まったため、早期実装対象として
  `plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する`
  を active 前半へ繰り上げた
- 次の実装優先候補として
  `operations rolling 時の task candidate 生成`
  `issue routing`
  `intake routing`
  を高優先と判断した

---

## 判明事項（Findings）
- operations rolling は next から取ってくる処理ではなく、roadmap / plan を前進させるための比較と順位決定である
- next_operations は candidate source の一つであって、決定権を持つ正本ではない
- plan に重要論点があっても、issue に残しただけでは operations に落ちず埋もれる
- issue routing 未完成期は、重要 issue について
  `issue 化 → 位置づけ判定 → candidate 化要否明示 → 再評価地点明示`
  をセットで扱う必要がある
- handover は新スレッド再開時の入口であり、日々の再開では使わない
- 日々の再開では active_operations を正本として先頭 task を実行対象に確定する
- routing は振り分けて終わりではなく、routing 後処理まで含む
- docs 未反映差分は主に `docs/17_operations_system.md` と `docs/15_notes_system.md` に集中している
- 実装としては、routing / rolling は design が進んでいるが code はまだ弱い

---

## 失敗 / 未解決（Issues）
- `docs/17_operations_system.md` と `docs/15_notes_system.md` は draft までで、本体未反映
- `docs/13_dev_workflow.md` の差分案は未作成
- issue routing 機能は設計先行で、実装コードとしてはまだ未完成
- intake routing も同様に、最小責務は整理済みだが実装は未着手に近い
- operations rolling の candidate collection / normalization / task generation も spec はあるが、code 実装はほぼこれから
- active_operations には Day0 / Day1 の task 名が残っているが、会話上では両方完了済み。新スレッド側では、まず handover を読んだ後、related notes と active を確認し、必要なら現状認識を揃えてから Day2 を扱う

---

## 次のアクション（Next Actions）
- まず `active_operations.md` を確認し、現在の正本を把握する
- 次に、早期実装対象として active に入れた
  `plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する`
  を扱う
- その後、実装優先順位の高い候補として以下を reroll 候補に載せる
  - operations rolling 時の task candidate 生成の最小実装
  - issue routing の最小実装
  - intake routing の最小実装
- docs 本体反映を進めるなら、`docs/17` → `docs/15` の順が自然

---

## 関連docs
- docs/05_roadmap.md
- docs/15_notes_system.md
- docs/17_operations_system.md
- docs/13_dev_workflow.md

---

## 関連code
- code/config/ai/adam_instruction.md
- src/services/repo-resource/notes.js
- src/services/tasks/service.js
- src/services/tasks/projection.js

---

## 関連notes
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md
- notes/07_reports/daily/2026-04-12.md
- notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md
- notes/02_design/2026-04-12_docs_17_operations_system_update_draft.md
- notes/02_design/2026-04-12_docs_15_notes_system_update_draft.md
- notes/02_design/2026-04-13_handover_entry_and_active_head_interpretation_rule.md
- notes/02_design/2026-04-13_plan_to_operations_connection_and_important_issue_escalation_rule.md
- notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
- notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
- notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
- notes/01_issues/idea_log.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md

---

## 状態サマリ
- API：routing / rolling 専用実装は未完成。repo resource と tasks / projection は利用可能
- docs整合：operations / notes system の draft はあるが、本体未反映
- notesフロー：issue / design / operations の接続設計はかなり進んだ。次は暫定実装と code 側への着手

---

## 引き継ぎプロンプト

このhandoverを読み込んで、関連docs / notes / code を取得し、現状を把握してから作業を再開して。まず active_operations を確認し、`plan→issue→operations 接続弱化の暫定運用を instruction / docs / operations に反映する` を現在の実行対象として扱って進めて。次に、operations rolling 時の task candidate 生成の最小実装を高優先候補として比較して。