# issue routing design candidate disposition

## date

2026-05-03

## purpose

`notes/02_design/2026-05-03_issue_routing_design_candidates.md` に一時保持した 19 件の design candidate を、正式な吸収先または後続扱いへ disposition する。

This file is the final disposition for the 2026-05-03 issue routing design candidates. The original candidate file is no longer a holding queue after this disposition.

## source

- `notes/01_issues/idea_log.md`
- `notes/08_analysis/2026-05-03_issue_routing_result.md`
- `notes/02_design/2026-05-03_issue_routing_design_candidates.md`

## summary

| disposition | count |
|---|---:|
| absorbed_by_existing_design | 12 |
| connected_to_active_or_next_review | 4 |
| retained_as_consolidated_design_topic | 3 |
| new_individual_design_needed_now | 0 |
| total | 19 |

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

### 20260404-005

- title: notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある
- disposition: absorbed_by_existing_design
- absorbed_by:
  - `notes/02_design/2026-04-12_intake_and_issue_routing_minimum_roles.md`
  - `notes/02_design/2026-04-12_review_system_and_operations_rolling_connection.md`
- reason: routing / review 分離は既存 design で整理済み。残る作業は docs / stale design cleanup の候補であり、個別 design の新規作成ではない。

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
- reason: daily review が rolling 確定地点であることは既存 design にある。content 抽出は reports/content 側の将来拡張候補として扱う。

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

## connected_to_active_or_next_review

### 20260404-004

- title: docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- disposition: connected_to_active_or_next_review
- connected_to: active Day4 `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`
- reason: docs 反映判断 task が active に存在するため、追加 design 作成ではなく active task の source context として扱う。

### 20260408-012

- title: latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- disposition: connected_to_active_or_next_review
- connected_to:
  - `notes/01_issues/2026-05-03_handover_index_structure_issue.md`
  - `notes/04_operations/next_operations.md` task 9
- reason: handover latest index / restart entry point 整備の next task に接続する。個別 design を今作らず、handover procedure 更新判断時に扱う。

### 20260326-003

- title: notesフォルダ構造の責務ベース整理の必要性
- disposition: connected_to_active_or_next_review
- connected_to: active Day4 `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`
- reason: notes 構造は docs/15 の責務整理に接続する。今は追加 design ではなく docs update judgment に渡す。

### 20260402-001

- title: 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- disposition: connected_to_active_or_next_review
- connected_to: active Day4 `docs/15 / docs/17 に routing core / weekly routing session を反映するか判断する`
- reason: notes / reports / content extraction の docs/instruction 反映判断に接続する。個別 design の重複作成はしない。

## retained_as_consolidated_design_topic

### 20260403-001

- title: legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- disposition: retained_as_consolidated_design_topic
- consolidated_topic: repo resource access convergence
- reason: docs access の二系統整理は repo resource API design と implementation cleanup の境界論点。現時点では next_operations task 11 `code resource の repo root allowlist 拡張を設計・確認する` と近いが同一ではないため、統合設計候補として保持する。

### 20260403-002

- title: repo-resource に code bulk 読取が必要
- disposition: retained_as_consolidated_design_topic
- consolidated_topic: repo resource access convergence
- reason: code bulk は repo resource capability design。runtime / schema / docs の reflection と関係するため、repo resource access convergence の一部として保持する。

### 20260408-011

- title: EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある
- disposition: retained_as_consolidated_design_topic
- consolidated_topic: decision extraction operating model
- reason: decision layer は既存 design に完全吸収されていない。今すぐ個別実装ではないが、ADAM / EVE 共通 operating model の design topic として保持する。

## final decision

19 件の design candidate はすべて disposition 済み。

- 既存 design に吸収できるものは重複作成しない
- active / next review に接続するものは、その source context として扱う
- 未吸収のものは consolidated design topic としてこの disposition に保持する
- `notes/02_design/2026-05-03_issue_routing_design_candidates.md` は holding queue ではなく、この disposition への source snapshot として扱う

## remaining work

この disposition により issue routing closure は完了可能。

ただし、以下は将来の review / operations rolling で扱う候補として残る。

- repo resource access convergence
- decision extraction operating model
- docs/15 / docs/17 反映判断
- handover latest index / restart flow procedure 整理
