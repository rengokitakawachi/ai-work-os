# issue routing design candidate disposition

## date

2026-05-03

## status

closed_with_per_theme_design_files

## purpose

`notes/02_design/2026-05-03_issue_routing_design_candidates.md` に一時保持した 19 件の design candidate を、1テーマ単位で実用可能な design file または既存 design へ disposition する。

This file is the disposition index. It is not itself a consolidated design document.

## source

- `notes/01_issues/idea_log.md`
- `notes/08_analysis/2026-05-03_issue_routing_result.md`
- `notes/02_design/2026-05-03_issue_routing_design_candidates.md`

## per-theme design files created

- `notes/02_design/2026-05-03_repo_resource_access_convergence_design.md`
- `notes/02_design/2026-05-03_decision_extraction_operating_model_design.md`
- `notes/02_design/2026-05-03_notes_docs_reflection_design.md`
- `notes/02_design/2026-05-03_handover_restart_flow_design.md`

## summary

| disposition | count |
|---|---:|
| absorbed_by_existing_design | 10 |
| connected_to_per_theme_design_file | 9 |
| new_individual_issue_design_needed_now | 0 |
| total | 19 |

## connected_to_per_theme_design_file

### notes / docs reflection design

Design file:

- `notes/02_design/2026-05-03_notes_docs_reflection_design.md`

Source issues:

- `20260326-003` notesフォルダ構造の責務ベース整理の必要性
- `20260402-001` 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- `20260404-004` docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- `20260404-005` notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある

Reason:

notes 構造、docs 反映、reports / content extraction、routing / review terminology は1つの docs reflection theme として扱う方が実用的である。

### repo resource access convergence design

Design file:

- `notes/02_design/2026-05-03_repo_resource_access_convergence_design.md`

Source issues:

- `20260403-001` legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- `20260403-002` repo-resource に code bulk 読取が必要

Reason:

legacy docs API、repo-resource docs、code bulk、root allowlist、schema/runtime reflection は repo resource access convergence theme として扱う。

### decision extraction operating model design

Design file:

- `notes/02_design/2026-05-03_decision_extraction_operating_model_design.md`

Source issue:

- `20260408-011` EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある

Reason:

decision layer は既存 design に完全吸収せず、ADAM / EVE 共通 operating model の独立 theme として扱う。

### handover restart flow design

Design file:

- `notes/02_design/2026-05-03_handover_restart_flow_design.md`

Source issue:

- `20260408-012` latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある

Reason:

handover latest pointer、restart entry point、active_operations 先頭 task / closure action 解釈は、handover restart flow theme として扱う。

## absorbed_by_existing_design

### 20260327-003

- title: 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md`
  - `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- reason: 標準開発フローは、Flow Control / intake routing / issue routing / operations rolling の usecase 分解として既に設計されている。個別 design を重複作成しない。

### 20260404-001

- title: EVE でも operations を正本にし、外部ツールは projection として扱う設計を検討したい
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md`
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: operations 正本 / external tool projection の考え方は、Todoist projection prototype と review / rolling 接続に吸収済み。EVE 一般化は今後の Phase 1/2 で扱う。

### 20260404-002

- title: active_operations 単一継続更新と weekly review archive 判定の運用を固める必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: daily / weekly review と rolling 確定地点、archive 確定の境界が既存 design に定義されている。

### 20260404-003

- title: Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-16_issue_routing_operations_candidate_queue.md`
  - `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- reason: next_operations は rolling 後の出力、operations candidate queue は rolling 前の入力という分離が既存 design にある。

### 20260404-006

- title: intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md`
- reason: Flow Control のプログラム責務と ADAM 判断責務の分離として既に設計されている。

### 20260405-008

- title: operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: active / next / archive の役割と review での rolling 確定が整理済み。

### 20260406-009

- title: operations rolling の生成規律と優先順位づけを再設計する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- reason: operations rolling の generation / ranking / placement が既に正式 spec 化されている。

### 20260408-010

- title: stale な active_operations を先に整合回復してから先頭 task を実行する補足ルールが必要
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: 日中の例外 reroll / 整合回復条件として吸収できる。必要なら docs/17 反映候補で扱う。

### 20260409-013

- title: daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: daily review が rolling 確定地点であることは既存 design にある。content 抽出は notes/docs reflection design 側の future handling として扱う。

### 20260412-016

- title: operations rolling を next の繰り上げとして誤認しない必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md`
- reason: next は candidate source ではなく rolling 後の出力であり、operations rolling は ranking / placement 一体処理として定義済み。

### 20260420-024

- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md`
  - `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
- reason: Flow Control と usecase、routing 後処理の分離に吸収できる。必要なら writer usecase は future design topic として分離する。

## final decision

19 件の design candidate はすべて 1テーマ単位で利用可能な design path に disposition 済み。

- 既存 design に吸収できるものは重複作成しない
- 未分割で残っていた theme は per-theme design file として作成した
- `notes/02_design/2026-05-03_issue_routing_design_candidates.md` は holding queue ではなく、この disposition への source snapshot として扱う

## remaining work

この disposition により issue routing closure は完了可能。

将来の review / operations rolling で扱う候補:

- `notes/02_design/2026-05-03_repo_resource_access_convergence_design.md`
- `notes/02_design/2026-05-03_decision_extraction_operating_model_design.md`
- `notes/02_design/2026-05-03_notes_docs_reflection_design.md`
- `notes/02_design/2026-05-03_handover_restart_flow_design.md`
