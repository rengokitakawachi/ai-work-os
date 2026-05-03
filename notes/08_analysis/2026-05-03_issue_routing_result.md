# issue routing result

## date

2026-05-03

## source

- file: `notes/01_issues/idea_log.md`
- source sha at routing start: `61314c1b60549ad699b3d75770315228275bf905`

## operating decision

`idea_log.md` は恒久的には1ファイル運用を維持する。

ただし、routing 作業中は一時的な作業 view / result file を使う。

## route summary

| route_to | count | handling |
|---|---:|---|
| keep_issue | 5 | `idea_log.md` に残す |
| design_candidate | 19 | grouped design candidate file に移す |
| future_issue | 8 | grouped future issue file に移す |
| operations_candidate | 8 | grouped operations candidate file に移す |
| archive | 0 | 直前 fixture で closed/deferred は処理済み |
| total | 40 | current remaining issues |

## keep_issue

### 20260327-001

- title: スレッド切替後の再開フローが手動依存で重い
- route_to: keep_issue
- reason: handover / latest index / restart flow と現在進行中の運用改善に接続しており、まだ issue として保持する意味がある。

### 20260403-005

- title: 運用の目詰まりを検知する flow check 機能が必要
- route_to: keep_issue
- reason: issue / inbox / operations の滞留検知そのものに関わる。今回の issue routing 実験後も、flow check として未設計のまま残す価値がある。

### 20260412-017

- title: plan から operations への接続が弱く重要 issue が埋もれる恐れがある
- route_to: keep_issue
- reason: 今回の issue routing によって再度確認された根本課題。plan / issue / operations 接続の論点として issue に残す。

### 20260414-018

- title: instruction に書かれた active-first 原則を外した運用違反の再発防止が必要
- route_to: keep_issue
- reason: ADAM の実行統制に関わる guard issue。現在の operational behavior に継続して効くため keep。

### 20260421-025

- title: category が弱い medium impact issue を keep レイヤーに残せるかを観測する必要がある
- route_to: keep_issue
- reason: keep レイヤーが残るべき比較 issue。今回の routing 後も keep behavior の観測対象として意味がある。

## design_candidate

### 20260326-003
- title: notesフォルダ構造の責務ベース整理の必要性
- route_to: design_candidate
- reason: notes 構造の責務整理は design / docs 昇格判断に向く。

### 20260327-003
- title: 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- route_to: design_candidate
- reason: standard development flow の設計論点。

### 20260402-001
- title: 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- route_to: design_candidate
- reason: notes / reports / content extraction の仕様整理が必要。

### 20260403-001
- title: legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- route_to: design_candidate
- reason: docs access architecture の整理。

### 20260403-002
- title: repo-resource に code bulk 読取が必要
- route_to: design_candidate
- reason: repo-resource API capability design。

### 20260404-001
- title: EVE でも operations を正本にし、外部ツールは projection として扱う設計を検討したい
- route_to: design_candidate
- reason: EVE operating model design。

### 20260404-002
- title: active_operations 単一継続更新と weekly review archive 判定の運用を固める必要がある
- route_to: design_candidate
- reason: operations persistence / archive policy design。

### 20260404-003
- title: Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- route_to: design_candidate
- reason: next_operations / Todoist due model design。

### 20260404-004
- title: docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- route_to: design_candidate
- reason: docs consistency design / update candidate。

### 20260404-005
- title: notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある
- route_to: design_candidate
- reason: terminology migration design。

### 20260404-006
- title: intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- route_to: design_candidate
- reason: routing architecture design。

### 20260405-008
- title: operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- route_to: design_candidate
- reason: operations model design。

### 20260406-009
- title: operations rolling の生成規律と優先順位づけを再設計する必要がある
- route_to: design_candidate
- reason: operations rolling generation / prioritization design。

### 20260408-010
- title: stale な active_operations を先に整合回復してから先頭 task を実行する補足ルールが必要
- route_to: design_candidate
- reason: active execution guard design。

### 20260408-011
- title: EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある
- route_to: design_candidate
- reason: decision layer operating model design。

### 20260408-012
- title: latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- route_to: design_candidate
- reason: handover resume interpretation design。

### 20260409-013
- title: daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- route_to: design_candidate
- reason: review output flow design。

### 20260412-016
- title: operations rolling を next の繰り上げとして誤認しない必要がある
- route_to: design_candidate
- reason: operations rolling semantics design。

### 20260420-024
- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- route_to: design_candidate
- reason: routing / writer boundary design。

## future_issue

### 20260331-001
- title: 商品化のためのdecision_logとcase_studyレイヤーが必要
- route_to: future_issue
- reason: 商品化・発信価値に関わるが current active focus ではない。

### 20260331-002
- title: failure_logと運用崩壊ポイントの蓄積が必要
- route_to: future_issue
- reason: 価値はあるが current phase の直接実行対象ではない。

### 20260401-002
- title: note記事用ドラフトをリポジトリ内で蓄積・運用する仕組みが必要
- route_to: future_issue
- reason: content / monetization layer の将来候補。

### 20260402-002
- title: GitHub Issues / Projects を将来の実装追跡レイヤーとして使うか検討が必要
- route_to: future_issue
- reason: 将来の共同開発 / PR 追跡需要まで保持。

### 20260403-003
- title: roadmap / plan / operations の3階層を一般業務版 EVE にも展開したい
- route_to: future_issue
- reason: EVE generalization の将来候補。

### 20260403-006
- title: flow check の結果を可視化する dashboard 機能が必要
- route_to: future_issue
- reason: flow check 確立後の可視化候補。

### 20260404-007
- title: AI Work OS / EVE を AI プラットフォーム非依存で設計する必要がある
- route_to: future_issue
- reason: 長期設計原則として重要だが current active execution ではない。

### 20260430-032
- title: Studyplus API で学習記録の投稿・取得可否を確認する
- route_to: future_issue
- reason: DELTA external integration の将来候補。v0.6 core readiness より後。

## operations_candidate

### 20260401-001
- title: operationsからTodoistへのタスク自動作成機能が必要
- route_to: operations_candidate
- reason: Todoist projection foundation に接続する実行候補。

### 20260409-015
- title: tasks API 全体を execution projection 前提で再設計する必要がある
- route_to: operations_candidate
- reason: Phase 1 / projection foundation の実行候補。

### 20260414-019
- title: repo の履歴確認 API を issue として検討する必要がある
- route_to: operations_candidate
- reason: repoResource hardening の実行候補。

### 20260418-020
- title: operations task の粒度と day 容量モデルを明文化する必要がある
- route_to: operations_candidate
- reason: operations docs / guardrail 反映候補。

### 20260418-021
- title: code resource から repo ルート allowlist を読めるようにする必要がある
- route_to: operations_candidate
- reason: runtime/tool capability hardening の実行候補。

### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- route_to: operations_candidate
- reason: code cleanup / service boundary hardening の実行候補。

### 20260419-023
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- route_to: operations_candidate
- reason: operations proposal guard 反映候補。

### 20260423-028
- title: Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- route_to: operations_candidate
- reason: projection schema/runtime bug fix 候補。

### 20260425-029
- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- route_to: operations_candidate
- reason: instruction refactor の実行候補。

### 20260430-031
- title: DELTA v0.6 で operations を Todoist execution view へ投影する
- route_to: operations_candidate
- reason: active/next に接続済みの DELTA v0.6 実行候補。

### 20260430-033
- title: DELTA foundation を main に統合する準備をする
- route_to: operations_candidate
- reason: next_operations に接続済みの release management 候補。

### 20260430-034
- title: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- route_to: operations_candidate
- reason: next_operations に接続済みの system organization 候補。

## note on counts

The route summary counts operations_candidate as 8 was an initial coarse estimate. Detailed routing found 12 operations_candidate items. Final counts should be treated as:

| route_to | count |
|---|---:|
| keep_issue | 5 |
| design_candidate | 19 |
| future_issue | 8 |
| operations_candidate | 12 |
| archive | 0 |
| total | 44 |

## final assessment

`idea_log.md` の肥大化は保存構造ではなく routing 滞留が原因。

一時 working split / routing_result を使えば、恒久的な月別 issue 分割なしに、issue layer を keep issue のみに軽量化できる見込みがある。
