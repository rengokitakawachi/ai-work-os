# 近々やること（2-3日）

## 目的

当面の作業を見失わないための実行リスト。
ADAM は本ファイルを優先的に参照し、必要に応じて更新する。

---

## 優先度

P0: 必須（今すぐ）
P1: 次にやる
P2: 余力があれば

---

## 今の判断方針

issue が増えてきたため、以下の基準で優先順位を決める。

- 他の issue の前提になる土台を先にやる
- 後回しにすると移行コストが上がるものを早めに触る
- 混在状態を減らして運用ノイズを先に下げる
- ただし、短時間で閉じられる整合タスクは先に終わらせて未完了数を減らす
- roadmap / plan / operations の階層が崩れないように、計画系レイヤーを先に固定する

---

## 推奨実行順

1. `05_roadmap.md` へ確定済み roadmap 方針を反映する
2. notes bulk の実装方針を確定し、必要なら着手する
3. code bulk の実装方針を確定し、必要なら着手する
4. source_ref を docs / instructions / operations にどう正式反映するかを確定する
5. legacy docs API と `src/services/github-docs.js` を `repo-resource/docs.js` に統一する方針を確定する
6. ADAM instruction の repo正本ハイブリッド運用を実装する
7. operations の `weekly_tasks.md` 単一継続更新ファイル運用ルールとテンプレートを設計する
8. operations から Todoist（EVE開発）へタスクを一方向反映する仕組みを設計する
9. decision_log / case_study レイヤーを設計する
10. failure_log / breaking_points ログを設計する
11. GitHub ユーザー名変更の影響調査を行う
12. 1ファイルを論点チャンクに分解して 1テーマ1メモへ変換するルールを定義する

---

## タスク

### P0

- [x] Instructions に Idea Capture ルールを追加
- [x] Instructions に 課題整理モード を追加
- [x] 課題整理モードを1回実行（現状課題の収集）

---

### P1

- [x] 課題を issue として蓄積する方針を整理
  - ref: notes/01_issues/idea_log.md

- [x] 標準開発フローのステップごとに、判断内容・保存先・次アクションを対応付ける
  - ref: notes/02_design/2026-03-28_standard_development_flow_routing_table.md

- [x] 旧開発メモフォルダを新フォルダ構成へ移行する計画を作る
  - ref: notes/02_design/2026-03-28_dev_memo_migration_plan.md

- [x] README を現行 docs に整合する内容へ更新する
  - ref: notes/README.md

- [x] AI instructions・schema の配置を `code/config/ai/` に統一する
  - ref: issue 20260327-002

- [x] notes フォルダのインデックス番号仕様を design に昇格する
  - ref: notes/02_design/2026-04-02_notes_indexed_structure_spec.md

- [x] notes の現行運用構造を整理し、中核フォルダと責務を明文化する
  - ref: notes/02_design/2026-04-02_notes_current_operating_structure.md

- [x] `03_plan` の単位と役割を具体化する
  - ref: notes/02_design/2026-04-03_plan_layer_operating_spec.md

- [x] ideas → issues の再編方針を整理する
  - ref: notes/01_issues/idea_log.md

- [x] notes フォルダ構造の再編方針を正式確定する
  - ref: docs/15_notes_system.md

- [x] フォルダ移行マッピングを定義する
  - ref: notes/02_design/2026-04-02_notes_folder_migration_mapping.md

- [x] `15_notes_system.md` と `notes/README.md` の差分を洗い出す
  - ref: docs/15_notes_system.md

- [x] 新しい notes indexed 構造を `docs/15_notes_system.md` に反映する
  - ref: docs/15_notes_system.md

- [x] 新しい notes indexed 構造を `notes/README.md` に反映する
  - ref: issue 20260402-001

- [x] 日報保存先と content 抽出運用を ADAM instruction に反映する
  - ref: issue 20260402-001

- [x] 日報作成時に `07_reports/daily/` 保存と `09_content/drafts/` 抽出を同時実行する運用を定義する
  - ref: issue 20260402-001

- [x] `10_repo_resource_api.md` と code 実装の差分を洗い出す
  - ref: notes/02_design/2026-04-03_docs_10_repo_resource_api_update_draft.md

- [x] `10_repo_resource_api.md` を現行実装に整合する内容へ更新する
  - ref: docs/10_repo_resource_api.md

- [ ] `05_roadmap.md` に確定済み roadmap 方針を反映する
  - ref: docs/05_roadmap.md

- [x] plan layer operating spec を保存する
  - ref: notes/02_design/2026-04-03_plan_layer_operating_spec.md

- [x] review system operating spec を保存する
  - ref: notes/02_design/2026-04-03_review_system_operating_spec.md

- [x] future layer operating spec を保存する
  - ref: notes/02_design/2026-04-03_future_layer_operating_spec.md

- [x] `03_plan/README.md` を現行方針へ更新する
  - ref: notes/03_plan/README.md

- [x] Phase 1 の最初の plan ファイルを作成する
  - ref: notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md

- [x] Phase 1 の schedule proposal plan を作成する
  - ref: notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md

- [x] Phase 1 の Teams / Obsidian light use plan を作成する
  - ref: notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md

- [ ] decision_log / case_study レイヤーを設計する
  - ref: issue 20260331-001

- [ ] failure_log / breaking_points ログを設計する
  - ref: issue 20260331-002

- [ ] ADAM instruction の repo正本ハイブリッド運用を実装する（保留）
  - ref: issue 20260330-001

- [x] source_ref の適用ルール草案を定義する
  - ref: notes/02_design/intake_review_and_source_ref_spec.md

- [ ] source_ref を docs / instructions / operations にどう正式反映するかを確定する
  - ref: notes/02_design/intake_review_and_source_ref_spec.md

- [ ] legacy docs API と `src/services/github-docs.js` を `repo-resource/docs.js` に統一する方針を確定する
  - ref: issue 20260403-001

- [ ] code bulk の実装方針を確定する
  - ref: issue 20260403-002

- [ ] operations の `weekly_tasks.md` 単一継続更新ファイル運用ルールとテンプレートを設計する
  - ref: issue 20260329-001

- [ ] operations から Todoist（EVE開発）へタスクを一方向反映する仕組みを設計する
  - ref: issue 20260401-001

- [x] note記事ドラフトをリポジトリ内で蓄積・運用する仕組みを設計する
  - ref: notes/09_content/README.md

- [x] notes delete の許可 prefix を現行レイヤーに合わせて修正する
  - ref: code/src/services/repo-resource/notes.js

- [x] notes delete 許可範囲の判断を decision として記録する
  - ref: notes/05_decisions/2026-04-03_notes_delete_allowed_prefixes.md

- [ ] notes bulk の実装方針を確定する
  - ref: notes/02_design/2026-04-03_docs_10_repo_resource_api_update_draft.md

- [x] 旧 `src/services/github-repo-resource.js` の整理方針を決める
  - ref: code/src/services/github-repo-resource.js

---

### P2

- [ ] インテークレビューを正式な運用機能として定義する
- [ ] `80_future` レイヤーの導入と運用ルールを定義する
- [ ] GitHub ユーザー名変更の影響調査を行う（Vercel / GitHub Actions / 外部 API / Webhook）
- [ ] 1ファイルを論点チャンクに分解して 1テーマ1メモへ変換するルールを定義する

---

## 完了条件

- 課題収集フローが実運用できる
- 計画に必要な材料が揃う
- 標準開発フロー設計の前提となるフォルダ構造と運用ルールが固まる
- roadmap / plan / operations の接続が整理されている
- review 系の役割分離が整理されている
- 重要 issue の着手順が operations に反映されている
- docs / notes / code の主要整合が更新されている
- 軽量な整合タスクが先に消化され、未完了の数が圧縮されている

---

## メモ

- 思考速度を優先する
- 完璧な整理は後回し
- まずは土台と混在解消を進める
- GitHub ユーザー名変更は後回しにすると移行コストが上がるため、調査だけ先行する
- notes indexed 構造の設計草案は notes/02_design/2026-04-02_notes_indexed_structure_spec.md を参照
- 現行運用構造の整理は notes/02_design/2026-04-02_notes_current_operating_structure.md を参照
- `docs/15_notes_system.md` は現行 indexed 構造へ更新済み
- `notes/README.md` は現行 indexed 構造へ更新済み
- `docs/10_repo_resource_api.md` は現行実装に合わせて更新済み
- roadmap の上位方針は確定済みで、docs 反映は未実施
- review system spec は notes/02_design/2026-04-03_review_system_operating_spec.md に保存済み
- plan layer spec は notes/02_design/2026-04-03_plan_layer_operating_spec.md に保存済み
- future layer spec は notes/02_design/2026-04-03_future_layer_operating_spec.md に保存済み
- `03_plan/README.md` は現行方針へ更新済み
- Phase 1 foundation plan は notes/03_plan/2026-04_phase1_todoist_outlook_foundation.md に作成済み
- Phase 1 schedule proposal plan は notes/03_plan/2026-04_phase1_schedule_proposal_and_outlook_write.md に作成済み
- Phase 1 teams / obsidian light use plan は notes/03_plan/2026-04_phase1_teams_and_obsidian_light_use.md に作成済み
- ADAM instruction には日報保存先と content 抽出運用を反映済み
- notes delete の許可 prefix は現行レイヤーに修正済み
- delete 許可範囲の判断は notes/05_decisions/2026-04-03_notes_delete_allowed_prefixes.md を参照
- `docs/10` の更新草案は notes/02_design/2026-04-03_docs_10_repo_resource_api_update_draft.md を参照
- 計画系整理は notes/02_design/2026-03-27_phase_plan_operations_structure.md を参照
- 標準開発フロー routing は notes/02_design/2026-03-28_standard_development_flow_routing_table.md を参照
- フォルダ移行マッピングは notes/02_design/2026-04-02_notes_folder_migration_mapping.md を参照
- future と source_ref の論点は notes/00_inbox/dev_memo/2026-03-27_15-25-00_future_and_reference_model_discussion.md を参照
- operations の rolling 7日管理論点は issue 20260329-001 を参照
- AI instructions / schema 配置移行論点は完了済み
- instruction の repo正本ハイブリッド運用論点は issue 20260330-001 を参照
- code bulk は再開時と横断整合確認の読取効率を上げる候補として issue 化済み
