# issue routing result

## date

2026-05-03

## source

- file: `notes/01_issues/idea_log.md`
- source sha at routing start: `61314c1b60549ad699b3d75770315228275bf905`
- source sha after cleanup: `0f833d1da1dbc41a0def351c393bd68d0d07096f`

## operating decision

`idea_log.md` は恒久的には1ファイル運用を維持する。

ただし、routing 作業中は一時的な作業 view / result file を使う。

## final route summary

| route_to | count | handling |
|---|---:|---|
| keep_issue | 5 | `idea_log.md` に残す |
| design_candidate | 19 | `notes/02_design/2026-05-03_issue_routing_design_candidates.md` に移動 |
| future_issue | 8 | `notes/80_future/issue/2026-05-03_issue_routing_future_candidates.md` に移動 |
| operations_candidate | 12 | `idea_log.md` に pending operations candidate として残す。operations rolling 前に next へ一括投入しない |
| archive | 0 | 直前 fixture で closed/deferred は処理済み |
| total | 44 | routing 対象 |

## keep_issue

- `20260327-001` — スレッド切替後の再開フローが手動依存で重い
- `20260403-005` — 運用の目詰まりを検知する flow check 機能が必要
- `20260412-017` — plan から operations への接続が弱く重要 issue が埋もれる恐れがある
- `20260414-018` — instruction に書かれた active-first 原則を外した運用違反の再発防止が必要
- `20260421-025` — category が弱い medium impact issue を keep レイヤーに残せるかを観測する必要がある

## design_candidate

- `20260326-003` — notesフォルダ構造の責務ベース整理の必要性
- `20260327-003` — 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- `20260402-001` — 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- `20260403-001` — legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- `20260403-002` — repo-resource に code bulk 読取が必要
- `20260404-001` — EVE でも operations を正本にし、外部ツールは projection として扱う設計を検討したい
- `20260404-002` — active_operations 単一継続更新と weekly review archive 判定の運用を固める必要がある
- `20260404-003` — Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- `20260404-004` — docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- `20260404-005` — notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある
- `20260404-006` — intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- `20260405-008` — operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- `20260406-009` — operations rolling の生成規律と優先順位づけを再設計する必要がある
- `20260408-010` — stale な active_operations を先に整合回復してから先頭 task を実行する補足ルールが必要
- `20260408-011` — EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある
- `20260408-012` — latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- `20260409-013` — daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- `20260412-016` — operations rolling を next の繰り上げとして誤認しない必要がある
- `20260420-024` — routing と document writing を分離し action plan で引き渡す構造へ改める必要がある

## future_issue

- `20260331-001` — 商品化のためのdecision_logとcase_studyレイヤーが必要
- `20260331-002` — failure_logと運用崩壊ポイントの蓄積が必要
- `20260401-002` — note記事用ドラフトをリポジトリ内で蓄積・運用する仕組みが必要
- `20260402-002` — GitHub Issues / Projects を将来の実装追跡レイヤーとして使うか検討が必要
- `20260403-003` — roadmap / plan / operations の3階層を一般業務版 EVE にも展開したい
- `20260403-006` — flow check の結果を可視化する dashboard 機能が必要
- `20260404-007` — AI Work OS / EVE を AI プラットフォーム非依存で設計する必要がある
- `20260430-032` — Studyplus API で学習記録の投稿・取得可否を確認する

## operations_candidate

- `20260401-001` — operationsからTodoistへのタスク自動作成機能が必要
- `20260409-015` — tasks API 全体を execution projection 前提で再設計する必要がある
- `20260414-019` — repo の履歴確認 API を issue として検討する必要がある
- `20260418-020` — operations task の粒度と day 容量モデルを明文化する必要がある
- `20260418-021` — code resource から repo ルート allowlist を読めるようにする必要がある
- `20260418-022` — legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- `20260419-023` — operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- `20260423-028` — Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- `20260425-029` — ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- `20260430-031` — DELTA v0.6 で operations を Todoist execution view へ投影する
- `20260430-033` — DELTA foundation を main に統合する準備をする
- `20260430-034` — ATLAS 関係ファイルを systems/atlas に集約する設計を整理する

## final assessment

`idea_log.md` の肥大化は保存構造ではなく routing 滞留が原因。

一時 working split / routing_result を使えば、恒久的な月別 issue 分割なしに、issue layer を軽量化できる。

今回の結果として、`idea_log.md` は current keep issue と pending operations candidate のみに縮小した。
