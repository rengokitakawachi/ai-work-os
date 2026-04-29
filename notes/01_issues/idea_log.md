<<APPEND>>

### 20260430-033
- title: DELTA foundation を main に統合する準備をする
- category: release_management
- description: DELTA は roadmap / plan / operations / history が存在し、read-only Action、history write、bulk read も runtime confirmation 済みで、すでに運用段階に入っている。現在は `feature/atlas-pre-delta-foundation` 上で運用されているが、これ以上 v0.6 Todoist projection などを積み増す前に、DELTA foundation を main へ統合する準備を進める必要がある。
- context: 2026-04-30 の会話で、main 以外に future branch があり同時開発している場合の統合方針を確認した。branch は恒久的な別正本ではなく、main へ統合するための開発空間として扱うのが自然と整理した。そのうえで、DELTA はすでに運用段階に入っているため、近いうちに main へ入れた方がよいと判断した。v0.6 Todoist projection の前に foundation 統合準備を置く方が、main との乖離を抑えられる。
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-30
- completed_condition:
  - `feature/atlas-pre-delta-foundation` の DELTA 差分を棚卸しする
  - main に入れるべき DELTA files と、branch に残す files を分ける
  - `systems/delta/roadmap/delta_roadmap.md` / `plan` / `operations` / `history` / `config` の整合を確認する
  - ADAM 側 `repoResource delta` resource と docs / code / config の整合を確認する
  - runtime behavior confirmed 済み項目と未確認項目を列挙する
  - main 統合後に DELTA GPT runtime で read / bulk / write behavior を再確認する
- source_ref:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/operations/active_operations.md
  - systems/delta/history/2026-04.md
  - systems/delta/config/delta_action_schema_v0.5.yaml
  - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
