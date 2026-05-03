# idea_log

## routing cleanup note

2026-05-03 の issue routing により、closed / fixture / design candidate / future issue は `idea_log.md` から移動済み。

- archive: `notes/99_archive/issues/2026-05-03_closed_and_fixture_issue_routing_archive.md`
- design candidates: `notes/02_design/2026-05-03_issue_routing_design_candidates.md`
- future issues: `notes/80_future/issue/2026-05-03_issue_routing_future_candidates.md`
- routing result: `notes/08_analysis/2026-05-03_issue_routing_result.md`

このファイルは恒久的に1ファイル運用を維持するが、定期 routing により issue layer に残すべきものだけへ軽量化する。

---

## keep_issue

### 20260327-001
- title: スレッド切替後の再開フローが手動依存で重い
- category: ops
- impact: high
- status: open
- created_at: 2026-03-27
- route_to: keep_issue
- reason: handover / latest index / restart flow と現在進行中の運用改善に接続しており、まだ issue として保持する意味がある。

### 20260403-005
- title: 運用の目詰まりを検知する flow check 機能が必要
- category: ops
- impact: medium
- status: open
- created_at: 2026-04-03
- route_to: keep_issue
- reason: issue / inbox / operations の滞留検知そのものに関わる。今回の issue routing 実験後も、flow check として未設計のまま残す価値がある。

### 20260412-017
- title: plan から operations への接続が弱く重要 issue が埋もれる恐れがある
- category: operations
- impact: high
- status: open
- created_at: 2026-04-12
- route_to: keep_issue
- reason: 今回の issue routing によって再度確認された根本課題。plan / issue / operations 接続の論点として issue に残す。

### 20260414-018
- title: instruction に書かれた active-first 原則を外した運用違反の再発防止が必要
- category: operations
- impact: high
- status: open
- created_at: 2026-04-14
- route_to: keep_issue
- reason: ADAM の実行統制に関わる guard issue。現在の operational behavior に継続して効くため keep。

### 20260421-025
- title: category が弱い medium impact issue を keep レイヤーに残せるかを観測する必要がある
- category: general
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-21
- route_to: keep_issue
- reason: keep レイヤーが残るべき比較 issue。今回の routing 後も keep behavior の観測対象として意味がある。

---

## pending_operations_candidate

These are not active execution tasks. They require operations rolling before active / next placement.

### 20260401-001
- title: operationsからTodoistへのタスク自動作成機能が必要
- category: ops
- impact: high
- status: open
- created_at: 2026-04-01
- route_to: operations_candidate
- reason: Todoist projection foundation に接続する実行候補。

### 20260409-015
- title: tasks API 全体を execution projection 前提で再設計する必要がある
- category: architecture
- impact: high
- status: open
- created_at: 2026-04-09
- route_to: operations_candidate
- reason: Phase 1 / projection foundation の実行候補。

### 20260414-019
- title: repo の履歴確認 API を issue として検討する必要がある
- category: architecture
- impact: medium
- status: open
- created_at: 2026-04-14
- route_to: operations_candidate
- reason: repoResource hardening の実行候補。

### 20260418-020
- title: operations task の粒度と day 容量モデルを明文化する必要がある
- category: operations
- impact: high
- status: open
- created_at: 2026-04-18
- route_to: operations_candidate
- reason: operations docs / guardrail 反映候補。

### 20260418-021
- title: code resource から repo ルート allowlist を読めるようにする必要がある
- category: architecture
- impact: high
- status: open
- created_at: 2026-04-18
- route_to: operations_candidate
- reason: runtime/tool capability hardening の実行候補。

### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- category: architecture
- impact: medium
- status: open
- created_at: 2026-04-18
- route_to: operations_candidate
- reason: code cleanup / service boundary hardening の実行候補。

### 20260419-023
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: operations
- impact: medium
- status: open
- created_at: 2026-04-19
- route_to: operations_candidate
- reason: operations proposal guard 反映候補。

### 20260423-028
- title: Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- category: execution
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-23
- route_to: operations_candidate
- reason: projection schema/runtime bug fix 候補。

### 20260425-029
- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- category: architecture
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-25
- route_to: operations_candidate
- reason: instruction refactor の実行候補。

### 20260430-031
- title: DELTA v0.6 で operations を Todoist execution view へ投影する
- category: execution
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-30
- route_to: operations_candidate
- reason: active/next に接続済みの DELTA v0.6 実行候補。

### 20260430-033
- title: DELTA foundation を main に統合する準備をする
- category: release_management
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-30
- route_to: operations_candidate
- reason: next_operations に接続済みの release management 候補。

### 20260430-034
- title: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- category: architecture
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-30
- route_to: operations_candidate
- reason: next_operations に接続済みの system organization 候補。
