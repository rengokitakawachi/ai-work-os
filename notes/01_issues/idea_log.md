# idea_log

## routing cleanup note

2026-05-03 の issue routing により、closed / fixture / design candidate / future issue / operations candidate は `idea_log.md` から移動または disposition 済み。

- archive: `notes/99_archive/issues/2026-05-03_closed_and_fixture_issue_routing_archive.md`
- design candidates: `notes/02_design/2026-05-03_issue_routing_design_candidates.md`
- future issues: `notes/80_future/issue/2026-05-03_issue_routing_future_candidates.md`
- routing result: `notes/08_analysis/2026-05-03_issue_routing_result.md`
- operations candidate disposition: `notes/08_analysis/2026-05-03_operations_candidate_disposition.md`

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
