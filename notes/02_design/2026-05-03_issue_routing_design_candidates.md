# issue routing design candidates

## status

superseded_by_disposition

## superseded_by

`notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md`

## date

2026-05-03

## source

- `notes/01_issues/idea_log.md`
- `notes/08_analysis/2026-05-03_issue_routing_result.md`

## purpose

This file was a temporary holding area for design candidates produced by issue routing.

It is no longer an active holding queue. Final disposition is recorded in:

```text
notes/02_design/2026-05-03_issue_routing_design_candidate_disposition.md
```

## final disposition summary

| disposition | count |
|---|---:|
| absorbed_by_existing_design | 12 |
| connected_to_active_or_next_review | 4 |
| retained_as_consolidated_design_topic | 3 |
| new_individual_design_needed_now | 0 |
| total | 19 |

## original candidates

### 20260326-003
- title: notesフォルダ構造の責務ベース整理の必要性
- route_reason: notes 構造の責務整理は design / docs 昇格判断に向く。

### 20260327-003
- title: 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- route_reason: standard development flow の設計論点。

### 20260402-001
- title: 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- route_reason: notes / reports / content extraction の仕様整理が必要。

### 20260403-001
- title: legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- route_reason: docs access architecture の整理。

### 20260403-002
- title: repo-resource に code bulk 読取が必要
- route_reason: repo-resource API capability design。

### 20260404-001
- title: EVE でも operations を正本にし、外部ツールは projection として扱う設計を検討したい
- route_reason: EVE operating model design。

### 20260404-002
- title: active_operations 単一継続更新と weekly review archive 判定の運用を固める必要がある
- route_reason: operations persistence / archive policy design。

### 20260404-003
- title: Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- route_reason: next_operations / Todoist due model design。

### 20260404-004
- title: docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- route_reason: docs consistency design / update candidate。

### 20260404-005
- title: notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある
- route_reason: terminology migration design。

### 20260404-006
- title: intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- route_reason: routing architecture design。

### 20260405-008
- title: operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- route_reason: operations model design。

### 20260406-009
- title: operations rolling の生成規律と優先順位づけを再設計する必要がある
- route_reason: operations rolling generation / prioritization design。

### 20260408-010
- title: stale な active_operations を先に整合回復してから先頭 task を実行する補足ルールが必要
- route_reason: active execution guard design。

### 20260408-011
- title: EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある
- route_reason: decision layer operating model design。

### 20260408-012
- title: latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- route_reason: handover resume interpretation design。

### 20260409-013
- title: daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- route_reason: review output flow design。

### 20260412-016
- title: operations rolling を next の繰り上げとして誤認しない必要がある
- route_reason: operations rolling semantics design。

### 20260420-024
- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- route_reason: routing / writer boundary design。

## note

Use the disposition file for current interpretation. This file is retained as source snapshot only.
