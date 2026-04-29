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

### 20260430-034
- title: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- category: architecture
- description: ATLAS は test / verification / CI review system として扱うが、メイン executor は Claude である。ATLAS 関係ファイルを散在させると、検証 prompt / report / fixture / policy / handover の所在が不明確になるため、`systems/atlas/` を Claude 主体の外部実行系 verification subsystem として定義し、関係ファイルの集約方針を整理する必要がある。
- context: 2026-04-30 の会話で、ATLAS 関係ファイルを集約するために `systems/atlas/` を作るべきか確認した。DELTA と同じ `systems/*` 配下に置くのは自然だが、ATLAS は DELTA と違い、ADAM が主実行する subsystem ではなく Claude が主 executor を担う特殊な verification subsystem と整理した。したがって README / roadmap / plan / operations / config / verification / reports / handover / prompts などの初期構成を、ADAM の operations 正本や EVE / DELTA の正本と混線しないように設計する必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-30
- completed_condition:
  - ATLAS の primary executor が Claude であることを明記する
  - ADAM の責務を controller / integration / consistency に限定する
  - `systems/atlas/` に置くものと置かないものを分ける
  - 既存 ATLAS 関係ファイルの移動候補を棚卸しする
  - `systems/atlas/README.md` / roadmap / verification / prompts の初期構成案を作る
  - ATLAS outputs は verification evidence であり execution SSOT ではないことを明記する
- source_ref:
  - docs/05_roadmap.md
  - docs/17_operations_system.md
  - docs/15_notes_system.md
  - notes/04_operations/next_operations.md
