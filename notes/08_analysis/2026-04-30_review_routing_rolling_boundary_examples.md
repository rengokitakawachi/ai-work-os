# 2026-04-30 review routing rolling boundary examples

## 目的

`daily / weekly review と routing / rolling の責務境界を実例で確認する` の成果物として、daily review / weekly review / routing / rolling の責務境界を実例で整理する。

特に次を確認する。

- daily review / weekly review / routing / rolling の入出力
- review が report 作成だけではないこと
- routing が review の代替ではないこと
- rolling が next 繰り上げではなく、candidate comparison / placement であること
- daily review では、将来 note 記事化・収益化を目指すための content seed を抽出すること

---

## source_ref

- docs/15_notes_system.md
- docs/17_operations_system.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/08_analysis/2026-04-30_intake_routing_archive_pending_reobservation.md
- notes/08_analysis/2026-04-30_intake_routing_reobservation_return_to_operations.md
- notes/08_analysis/2026-04-30_design_routing_minimum_operation_rule.md
- notes/08_analysis/2026-04-30_design_routing_candidate_inventory.md
- notes/04_operations/active_operations.md

---

## 前提

docs/15 では、review は進行中資産の更新を担い、routing の代替ではない。

docs/17 では、operations は短期実行順の正本であり、daily review は rolling の主要確定地点、weekly review は rolling の再設計地点である。

Phase 0 plan では、routing / planning / review の責務分離を共通 operating model の中心として扱う。

---

## content の位置づけ

notes/09_content は、将来的に AI Work OS の開発・運用・失敗・設計判断を note 記事化し、収益化を目指すためのネタ帳である。

daily review では、単なる実績記録だけでなく、外部読者に価値がある content seed を抽出する。

content seed の例:

- 設計判断の背景
- 失敗と再発防止
- AI Work OS の思想
- ADAM / EVE / DELTA の役割分担
- routing / review / operations の実運用知見
- GPT runtime reflection の落とし穴
- Tool Result Integrity や Write Gate の実例
- 「自律的に行動する OS」としての ADAM の進化
- before / after
- 読者への示唆
- note 記事の仮タイトル案
- 有料記事化できそうな深掘りテーマ

content は report の代替ではない。

report は当日の実績・判断・学びを残す結果物であり、content は将来の外部発信・収益化に向けた素材である。

---

## 1. daily review

### 責務

daily review は、当日の実績を確認し、operations を次の実行状態へ更新し、学び・判断・失敗・設計原則・運用改善を report / content へ返す usecase である。

主な責務:

- Day0 実績確認
- completed task の確認
- 完了 task の archive_operations 移動
- 未完了 task の carryover
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- active_operations / next_operations 更新
- 必要に応じて Todoist projection 更新
- daily report の作成
- 当日の実行から得た学び・判断・失敗・設計原則・運用改善を、将来 note 記事化するための content seed として抽出する
- AI Work OS / ADAM / EVE / DELTA の開発過程を、外部読者に価値がある形で語れる素材として残す
- 収益化を見据え、単なる作業ログではなく「記事のネタ」「主張」「失敗談」「設計原則」「before / after」「読者への示唆」に分けて保持する
- 必要に応じて notes/09_content へ送る

### 入力

- active_operations
- next_operations
- plan
- open issue
- 実行結果
- completed condition の観測結果
- 当日の判断
- 当日の失敗
- 当日の設計原則
- 当日の運用改善
- 将来記事化できそうな content seed

### 出力

- 更新済み active_operations
- 更新済み next_operations
- archive_operations
- daily report
- content seed / content candidate / content draft
- 必要に応じて Todoist projection

### 注意

daily review は report 作成だけではない。

report は review の結果物の1つであり、operations 更新や candidate source 確認を伴わなければ review 完了ではない。

また、daily review では、将来 note 記事化・収益化に使える content seed を落とさない。

---

## 2. weekly review

### 責務

weekly review は、plan / operations / future / archive / content direction の整合を再設計する usecase である。

主な責務:

- 7日構成の再設計
- plan と operations の接続確認
- next_operations の再評価
- future の再評価
- archive_operations の snapshot 保存
- 完了済み・未完了・継続観測対象の整理
- 次週の priority 再構築
- daily review で抽出された content seed を見直す
- note 記事化できるテーマを content direction として整理する
- 有料記事化できる深掘り候補を見つける

### 入力

- roadmap
- plan
- active_operations
- next_operations
- archive_operations
- future
- reports
- analysis notes
- open issue
- content seed / content candidate

### 出力

- 次週前提の active_operations
- 更新済み next_operations
- archive snapshot
- weekly report
- content direction
- 必要に応じた follow-up candidate

### 注意

weekly review は大きな rolling / priority 再設計を含む。

単に週報を書くことではない。

また、content seed を記事化候補へ育てる review point としても扱う。

---

## 3. routing

### 責務

routing は、入力や既存 note / issue / design の行き先を決める usecase である。

主な routing:

- intake routing
- issue routing
- design routing
- conversation routing

routing の目的:

- 対象を読む
- item / chunk / issue / design を整理する
- natural destination を決める
- follow-up state を明示する
- 必要なら operations candidate とする
- content 化できる素材なら content candidate としても扱う

### 入力

- inbox
- issue
- design note
- conversation input
- analysis result
- article seed
- development episode

### 出力

- destination
- route result
- source_ref
- postprocess result
- follow-up candidate
- re-evaluation point
- content candidate

### 注意

routing は review ではない。

routing は行き先を決める usecase であり、operations 全体を再構成するものではない。

---

## 4. operations rolling

### 責務

operations rolling は、複数の candidate source を比較し、短期実行順を生成・更新する usecase である。

主な責務:

- candidate collection
- normalization
- dependency / blocker evaluation
- rule evaluation
- ranking
- placement
- Day capacity check
- active / next / future 配置
- active_operations / next_operations 更新

### 入力

- current active
- next_operations
- plan
- open issue
- design / analysis から出た operations candidate
- future からの再活性化候補
- external / runtime gates

### 出力

- active_operations
- next_operations
- 必要なら future / archive への判断
- Todoist projection 更新対象

### 注意

rolling は next_operations の単純繰り上げではない。

next_operations は candidate source の1つであり、決定権を持つ正本ではない。

---

## 実例確認

## 実例A: ADAM runtime reflection 完了後の Day0 先頭2件

### 状況

active_operations Day0 先頭には次が残っていた。

1. `ADAM instruction 最新変更の runtime 反映確認を行う`
2. `repo history / show / grep の docs 反映案を作る`

handover 後アップデートで、この2件はこの会話内では完了判定済みと扱える状態になった。

### 正しい usecase

- 完了判定: daytime execution / completed condition observation
- 構造移動: daily review
- archive 移動: daily review
- reroll: active が壊れていない限り不要
- content seed 抽出: daily review

### 判断

完了 task が active に残っていても daily review 前なら許容される。

したがって、active_operations を即書き換えず、次の active task へ進める判断は妥当。

ただし、この一連の runtime reflection / schema layer separation / APPEND regression recovery は、将来 note 記事化できる重要な content seed である。

---

## 実例B: issue routing completed condition checklist

### 状況

issue routing の単発確認済み項目と継続観測項目を weekly review 向け checklist に整理した。

### 正しい usecase

- checklist 作成: active task execution
- weekly review での利用: weekly review
- operations への反映: daily / weekly review または rolling
- docs 反映候補化: routing / future candidate
- content seed 抽出: daily review / weekly review

### 判断

checklist を作っただけで weekly review が完了したわけではない。

weekly review 時に、この checklist を candidate source として使う。

また、issue routing を「課題を溜める場所」から「設計・operations・future・archive へ流す運用」へ変えた過程は、AI Work OS の記事素材として有効である。

---

## 実例C: intake routing archive / pending 再観測

### 状況

3件の inbox 実データを読み、route result と postprocess result を分けて記録した。

- A/B: archive 原則成立
- C: pending 例外成立

### 正しい usecase

- chunk / theme 分解: intake routing
- route / postprocess 判断: intake routing
- rule 修正要否判断: analysis / active task execution
- file move: 別 write task または review 後の整理
- new candidate 発生: routing / rolling candidate
- content seed 抽出: daily review

### 判断

intake routing は review ではない。

archive 扱いと物理移動も別である。

元 file の物理移動は、Write Gate と対象確認を伴う別 task として扱う。

また、「判断可能なものを pending に逃がさない」「archive 扱いと物理移動を分ける」という運用知見は、将来記事化できる content seed である。

---

## 実例D: intake routing follow-up 候補

### 状況

ChatGPT Agent 外部記事を抽象概念と製品仕様に分割する候補が出た。

### 正しい usecase

- 新規候補化: routing
- active / next / future 配置: operations rolling
- 即 active 横入り: 原則不可
- daily review / reroll の candidate source として保持: 可
- active が壊れている、実行不能、または blocker 解消に必要な場合: 例外 reroll 可
- content seed として保持: 可

### 判断

会話中に出た新規候補は、原則として active に横入りさせない。

この候補は next または future 候補として rolling で比較する。

ただし、current active が実行不能になっている、blocker 解消が必要、または正本整合回復に直結する場合は、必要に応じて例外 reroll / rolling を行ってよい。

また、ChatGPT Agent 記事から抽出した「自律的に行動する OS」としての ADAM の説明素材は、content seed として扱える。

---

## 実例E: design routing candidate inventory

### 状況

4件の design note を読み、次のように分類した。

- docs 昇格候補: none
- future/design 候補: 3件
- archive candidate: 1件
- design retain 候補: 2件
- operations candidate 候補: 3件

### 正しい usecase

- design note の分類: design routing
- archive 実行: archive 条件確認後の write / review
- operations candidate placement: operations rolling
- docs 更新: docs update procedure / Write Gate
- content seed 抽出: daily / weekly review

### 判断

design routing は review ではない。

分類結果を出しただけで active / next / future 配置は確定しない。

operations candidate 化したものは rolling で比較する。

また、古い design note を「すぐ docs 化しない」「future/design に残す」「archive 条件を確認する」と分ける運用自体が、AI Work OS の思想を説明する content seed になる。

---

## 境界まとめ

| usecase | 主目的 | 入力 | 出力 | やってはいけないこと |
|---|---|---|---|---|
| daily review | 当日実績と翌日以降の operations 更新、学びの report / content 化 | active / next / plan / issue / results / execution learnings | active / next / archive / daily report / content seed / content candidate | report 保存だけで完了扱いしない。content 化可能な学びを落とさない |
| weekly review | plan / operations / future / content direction の再設計 | roadmap / plan / operations / future / archive / reports / content candidates | next week structure / weekly report / content direction | 週報作成だけで完了扱いしない。content seed を放置しない |
| routing | 対象の行き先を決める | inbox / issue / design / conversation / article seed | route result / destination / candidate / content candidate | review の代替にしない |
| rolling | 候補を比較し短期実行順へ配置 | plan / issue / next / current active / candidates | active / next / future placement | next 繰り上げだけにしない |

---

## completed condition 対応

対象 task:

`daily / weekly review と routing / rolling の責務境界を実例で確認する`

completed condition:

- daily review / weekly review / routing / rolling の入出力を比較する
- review が report 作成だけではないことを再確認する
- routing が review の代替ではないことを整理する

対応:

- 4 usecase の入出力を比較した。
- daily / weekly review は report 作成だけではなく、operations / plan / future / archive / content の更新を伴うと整理した。
- daily review の責務に、将来 note 記事化・収益化を目指すための content seed 抽出を明示した。
- routing は対象の行き先を決める usecase であり、review の代替ではないと整理した。
- rolling は next 繰り上げではなく、candidate comparison / placement であると整理した。
- 直近実例 A〜E に照らして境界を確認した。

---

## 判断

`daily / weekly review と routing / rolling の責務境界を実例で確認する` は、この note の保存により完了扱い可能。

次に進むべき active task は、`Phase 0 hardening の follow-up candidate を routing する`。
