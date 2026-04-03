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

---

## 推奨実行順

1. `docs/15_notes_system.md` に新しい notes indexed 構造を反映する
2. `10_repo_resource_api.md` と code 実装の差分を洗い出す
3. `05_roadmap.md` を現行 design / notes 運用と照合し、更新要否を判断する
4. ADAM instruction の repo正本ハイブリッド運用を実装する
5. source_ref の適用ルールを定義する
6. operations の `weekly_tasks.md` 単一継続更新ファイル運用ルールとテンプレートを設計する
7. notes/plans/ の単位と役割を具体化する
8. ideas → issues の再編方針を整理する
9. notes フォルダ構造の再編方針を正式確定する
10. フォルダ移行マッピングを定義する
11. インテークレビューを正式な運用機能として定義する
12. future レイヤーの導入と運用ルールを定義する
13. GitHub ユーザー名変更の影響調査を先に行う
14. 1ファイルを論点チャンクに分解して 1テーマ1メモへ変換するルールを定義する

---

## タスク

### P0

- [x] Instructions に Idea Capture ルールを追加
- [x] Instructions に 課題整理モード を追加
- [x] 課題整理モードを1回実行（現状課題の収集）

---

### P1

- [x] 課題を issue として蓄積する方針を整理
- [x] 標準開発フローのステップごとに、判断内容・保存先・次アクションを対応付ける
- [x] 旧開発メモフォルダを新フォルダ構成へ移行する計画を作る
- [x] README を現行 docs に整合する内容へ更新する
- [x] AI instructions・schema の配置を `code/config/ai/` に統一する
- [x] notes フォルダのインデックス番号仕様を design に昇格する
  - ref: notes/02_design/2026-04-02_notes_indexed_structure_spec.md

- [x] notes の現行運用構造を整理し、中核フォルダと責務を明文化する
  - ref: notes/02_design/2026-04-02_notes_current_operating_structure.md

- [ ] notes/plans/ の単位と役割を具体化する
  - ref: notes/02_design/2026-03-27_phase_plan_operations_structure.md

- [ ] ideas → issues の再編方針を整理する
  - ref: notes/00_inbox/dev_memo/2026-03-27_13-35-00_development_flow_restructure_discussion.md

- [ ] notes フォルダ構造の再編方針を正式確定する
  - ref: notes/00_inbox/dev_memo/2026-03-27_13-35-00_development_flow_restructure_discussion.md

- [ ] フォルダ移行マッピングを定義する
  - ref: notes/02_design/2026-04-02_notes_folder_migration_mapping.md

- [x] `15_notes_system.md` と `notes/README.md` の差分を洗い出す
  - ref: docs/15_notes_system.md

- [ ] 新しい notes indexed 構造を `docs/15_notes_system.md` に反映する
  - ref: issue 20260402-001

- [x] 新しい notes indexed 構造を `notes/README.md` に反映する
  - ref: issue 20260402-001

- [x] 日報保存先と content 抽出運用を ADAM instruction に反映する
  - ref: issue 20260402-001

- [x] 日報作成時に `07_reports/daily/` 保存と `09_content/drafts/` 抽出を同時実行する運用を定義する
  - ref: issue 20260402-001

- [ ] `10_repo_resource_api.md` と code 実装の差分を洗い出す
  - ref: docs/10_repo_resource_api.md

- [ ] `05_roadmap.md` を現行 design / notes 運用と照合し、更新要否を判断する
  - ref: docs/05_roadmap.md

- [ ] decision_log / case_study レイヤーを設計する
  - ref: issue 20260331-001

- [ ] failure_log / breaking_points ログを設計する
  - ref: issue 20260331-002

- [ ] ADAM instruction の repo正本ハイブリッド運用を実装する（保留）
  - ref: issue 20260330-001

- [ ] source_ref の適用ルールを定義する
  - ref: notes/00_inbox/dev_memo/2026-03-27_15-25-00_future_and_reference_model_discussion.md

- [ ] operations の `weekly_tasks.md` 単一継続更新ファイル運用ルールとテンプレートを設計する
  - ref: issue 20260329-001

- [ ] operations から Todoist（EVE開発）へタスクを一方向反映する仕組みを設計する
  - ref: issue 20260401-001

- [ ] note記事ドラフトをリポジトリ内で蓄積・運用する仕組みを設計する
  - ref: issue 20260401-002

---

### P2

- [ ] インテークレビューを正式な運用機能として定義する
- [ ] future レイヤーの導入と運用ルールを定義する
- [ ] GitHub ユーザー名変更の影響調査を行う（Vercel / GitHub Actions / 外部 API / Webhook）
- [ ] 1ファイルを論点チャンクに分解して 1テーマ1メモへ変換するルールを定義する

---

## 完了条件

- 課題収集フローが実運用できる
- 計画に必要な材料が揃う
- 標準開発フロー設計の前提となるフォルダ構造と運用ルールが固まる
- 重要 issue の着手順が operations に反映されている
- 旧構造と README の混在が縮小している
- 軽量な整合タスクが先に消化され、未完了の数が圧縮されている

---

## メモ

- 思考速度を優先する
- 完璧な整理は後回し
- まずは土台と混在解消を進める
- GitHub ユーザー名変更は後回しにすると移行コストが上がるため、調査だけ先行する
- notes indexed 構造の設計草案は notes/02_design/2026-04-02_notes_indexed_structure_spec.md を参照
- 現行運用構造の整理は notes/02_design/2026-04-02_notes_current_operating_structure.md を参照
- `docs/15_notes_system.md` の更新草案は notes/02_design/2026-04-02_docs_15_notes_system_update_draft.md を参照
- `notes/README.md` は現行 indexed 構造へ更新済み
- ADAM instruction には日報保存先と content 抽出運用を反映済み
- 計画系整理は notes/02_design/2026-03-27_phase_plan_operations_structure.md を参照
- 標準開発フロー routing は notes/02_design/2026-03-28_standard_development_flow_routing_table.md を参照
- フォルダ移行マッピングは notes/02_design/2026-04-02_notes_folder_migration_mapping.md を参照
- future と source_ref の論点は notes/00_inbox/dev_memo/2026-03-27_15-25-00_future_and_reference_model_discussion.md を参照
- operations の rolling 7日管理論点は issue 20260329-001 を参照
- AI instructions / schema 配置移行論点は完了済み
- instruction の repo正本ハイブリッド運用論点は issue 20260330-001 を参照
