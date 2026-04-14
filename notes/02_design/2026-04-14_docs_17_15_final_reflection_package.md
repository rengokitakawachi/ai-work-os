# 2026-04-14 docs_17_15_final_reflection_package

## 目的

`docs/17_operations_system.md` と `docs/15_notes_system.md` の本体反映を進めるため、
今回の実装・テスト・daily review を踏まえた最終反映用本文を 1 つの package として固定する。

この package は、
現在の docs 本体に直接 write できない前提のもとで、
人間反映時にそのまま参照できる最終版とする。

---

## 今回反映する差分の要約

### docs/17_operations_system.md

反映する差分

- 日中運用と review 時運用の分離
- active に完了 task が残りうる条件
- next_operations は backlog ではなく candidate source / 候補プール
- rolling は `next の繰り上げ` ではなく candidate 比較と配置の処理
- rolling の最小責務を `candidate collection / normalization / rule evaluation / ranking / placement` と明記
- 例外 reroll は整合回復時のみ許容

### docs/15_notes_system.md

反映する差分

- short-term execution の正本は `04_operations`
- `06_handover` は再開入口であり、実行正本ではない
- `07_reports` は review の結果物であり、保存だけでは review 完了ではない
- intake routing / issue routing / operations rolling の最小責務
- routing 後処理と archive / future / issue の使い分け
- operations rolling に `candidate collection / normalization / rule evaluation / ranking / placement` を反映

### docs/13_dev_workflow.md

今回の package では本文反映対象に含めない。

理由

- まず `docs/17` と `docs/15` を優先して execution / notes 骨格を閉じる方が自然
- `docs/13` は follow-up として差分案を別途整理する方が差分最小になる

---

## docs/17_operations_system.md 反映後全文

# 17 Operations System

## 目的

operations を短期実行計画の正本として定義し、
AI Work OS における実行層の基盤を確立する。

---

## 位置づけ

- roadmap は上位方針
- plan は中期計画
- operations は短期実行計画

operations は「今何をやるか」を決定する正本とする。

日中運用では、
`active_operations` を実行対象の正本として扱う。

---

## 基本原則

- operations は短期実行順の正本とする
- operations は 7日ローリング計画を持つ
- operations は schedule ではない
- future に operations は置かない
- Outlook は schedule の正本とする
- rolling の確定更新は review 地点で行う
- 日中は active の順序と Day 構造を原則維持する
- 完了判定と構造変更判定は分けて扱う
- weekly review で archive_operations の snapshot を保存する

---

## 構造

operations は以下の構造を持つ。

- active_operations（正本）
- next_operations（近未来候補）
- archive_operations（一時アーカイブ）

---

## active_operations

active_operations は短期実行順の正本とする。

### 7日ローリングモデル

active_operations は以下の構造を持つ。

- Day0（今日）
- Day1（明日）
- Day2
- Day3
- Day4
- Day5
- Day6

### ルール

- 各 Day はタスク順序を持つ
- 時刻は持たない
- 仮配置であり、確定スケジュールではない
- 日付は参考であり拘束ではない
- 日中は active を上から順に実行する
- active に完了認識済み task が残っていても、daily review 前なら許容する
- active に完了 task が残っているだけで未整合としない
- archive への移動や Day 再編成の確定は daily review で行う

---

## next_operations

next_operations は、
active_operations の次に来る近未来候補を保持する。

### ルール

- active_operations にまだ入れないタスクを格納する
- active の次に来る候補プールとして扱う
- active が実行不能な場合の補充候補プールとして扱う
- daily / weekly review で再評価する
- backlog 化しない
- future の代替にしない

---

## archive_operations

archive_operations は、
今週の完了タスクを一時的に保持する。

### ルール

- 完了タスクを必要に応じて格納する
- daily review または weekly review で扱う
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は `99_archive` 側とする

---

## ローリング更新

### 日中運用

- active_operations を正本として実行する
- 完了認識や軽い順序調整はありうる
- ただし archive 移動と rolling 確定は行わない

### daily review

- rolling の主要確定地点
- Day0 の実績確認
- 完了 task の archive 移動
- 未完了タスクの再配置
- Day1 以降の繰り上げ
- 新しい Day6 の補充
- next_operations の更新
- active_operations の更新

### weekly review

- rolling の再設計地点
- 7日構成の再設計
- 優先順位の再構築
- next_operations の再評価
- archive_operations を snapshot 保存
- active_operations と next_operations を次週前提で再調整する

### 例外 reroll

日中に reroll が必要になる場合はある。

ただし、
それは通常運用ではなく整合回復として扱う。

許容する例

- active が壊れている
- active に重複がある
- active が実行不能になっている
- 誤混入 task を除去しないと次へ進めない

この場合のみ、
例外的に reroll を行ってよい。

---

## operations rolling の最小責務

operations rolling は、
`next_operations` の先頭をそのまま繰り上げる処理ではない。

operations rolling は、
roadmap / plan を前進させるために、
候補を比較して短期実行順を決める処理とする。

最小責務は次の通り。

- candidate collection
- normalization
- rule evaluation
- ranking
- placement

candidate source の例

- plan の主要論点や直近作業
- open issue
- design 未反映差分
- next_operations
- future からの再活性化候補

next_operations は candidate source の一つであり、
決定権を持つ正本ではない。

---

## operations と schedule の分離

operations はスケジュールではない。

- operations = 何を進めるか / どの順で進めるか
- Outlook = いつ実行するか / 何時から何時に置くか

この分離を維持する。

---

## 判断

- operations は短期実行計画の正本とする
- 日中運用と review 時運用を分ける
- 7日ローリングにより柔軟な運用を実現する
- next_operations は近未来候補と補充候補を保持する
- archive_operations により週次履歴を軽量に保存する
- daily review は rolling の主要確定地点とする
- weekly review は rolling の再設計地点とする
- Outlook を schedule の正本として分離する

---

## docs/15_notes_system.md 反映後全文

# 15 Notes System

## 目的

未確定情報、課題、設計草案、運用記録を管理し、
docs への昇格を制御する。

notes は AI Work OS における思考・運用レイヤーであり、
構造的正本（docs）へ至る前段として機能する。

---

## 位置づけ

- notes は思考レイヤーである
- notes は SSOT ではない
- 正式仕様は docs に置く
- 実装実態は code に置く

---

## 基本原則

1  
notes は正本ではない

2  
未確定情報は notes に書く

3  
いきなり docs を書かない

4  
docs 更新前に design を経由する

5  
短期実行順の正本は 04_operations とする

6  
06_handover は再開入口とする

7  
実績と振り返りは 07_reports に残す

8  
意思決定は 05_decisions に残す

9  
report は review の結果物として扱う

---

## レイヤー構造

notes は時間軸と状態に基づいて以下に分かれる。

- active layers  
  今扱っている情報

- 80_future  
  将来扱う可能性がある情報（時間軸レイヤー）

- 99_archive  
  役目を終えた情報

---

## ディレクトリ構成

notes/
README.md
00_inbox/
01_issues/
02_design/
03_plan/
04_operations/
05_decisions/
06_handover/
07_reports/
08_analysis/
09_content/
10_logs/
80_future/
99_archive/

---

## 中核レイヤー

- 00_inbox
- 01_issues
- 02_design
- 03_plan
- 04_operations
- 06_handover
- 07_reports
- 09_content

---

## 補助レイヤー

- 05_decisions
- 08_analysis
- 10_logs
- 80_future
- 99_archive

---

## 各ディレクトリの役割

### 00_inbox

未整理入力の入口。

web や dev_memo を含む。

未整理入力は、
routing により後続レイヤーへ送る前段として扱う。

---

### 01_issues

課題や論点を保持するレイヤー。

issue は保持だけでなく、
後続レイヤーへ展開される前提の中間状態とする。

issue routing では、
issue を `operations / design / future / archive / issue`
のどこへ送るかを判定する。

---

### 02_design

仕様草案。

docs 直前の構造整理レイヤー。

実装より先に構造整理が必要な論点を保持する。

---

### 03_plan

一定期間の重点テーマを整理するレイヤー。

roadmap と operations の中間に位置する。

plan は、
operations rolling における重要な candidate source とする。

---

### 04_operations

短期実行順の正本。

operations は単なる task 一覧ではなく、
rolling（生成・優先順位づけ・配置）によって生成される。

#### operations モデル

- active_operations.md  
  Day0〜Day6 を持つ 7日ローリングの正本

- next_operations.md  
  active の次に来る近未来候補

- archive_operations.md  
  今週の完了タスクの一時アーカイブ

#### 特徴

- operations は future には置かない
- active には完了認識済み task が daily review まで残りうる
- archive への移動と rolling 確定は review 時に行う
- next_operations は backlog ではなく近未来候補プールとして扱う
- archive_operations は weekly review で snapshot 保存する

---

### 05_decisions

意思決定ログ。

---

### 06_handover

スレッド再開時の入口。

関連 docs / notes / code を読み直す起点となる。

ただし、
短期実行順の正本は 04_operations とする。

---

### 07_reports

実績と振り返りを蓄積する。

#### reports 種別

- daily  
  当日の実行、意思決定、学び、次アクション

- weekly  
  roadmap / plan / operations / future の整合確認と方針整理

- monthly  
  全体進捗と構造の見直し

reports は review と強く結びつく。

report は review の結果物であり、
保存だけでは review 完了とはみなさない。

---

### 08_analysis

横断的な整合確認や分析を行うレイヤー。

---

### 09_content

将来の記事執筆や発信のための素材、ネタ、記事ドラフトを蓄積するレイヤー。

日々の設計、実装、振り返りから、
あとで記事化できる論点や学びを保存する。

---

### 10_logs

補助ログ、失敗記録。

---

### 80_future

時間軸レイヤー。

将来扱う可能性があるが、
現時点では active ではない要素を保持する。

#### 構造

future/
  inbox/
  issue/
  design/
  plan/

#### 定義

- future/inbox  
  将来向け未整理入力  
  - web  
  - dev_memo  
  
- future/issue  
  将来扱う課題

- future/design  
  将来扱う設計

- future/plan  
  将来実行する計画

#### 特徴

- routing の結果として生成される
- operations に入らなかった要素の主要な行き先
- archive とは異なる

---

### 99_archive

役目を終えた情報の退避先。

operations の週次履歴は以下に保存する。

notes/99_archive/operations/

---

## フロー

### intake routing

未整理入力を構造化し、

- issue
- design
- future
- archive

へ振り分ける。

routing 後は、
振り分けた先の処理を行う。

元入力や元 issue が役目を終えた場合は archive に移し、
判断に迷う場合は先送りして残す。

### issue routing

issue を評価し、

- operations
- design
- future
- archive
- issue

のどこへ送るかを判定する。

重要 issue は、
issue に残すだけで終わらせず、
operations candidate 化の要否と再評価地点を明示する。

### operations rolling

複数の流入元から候補を収集し、

- candidate collection
- normalization
- rule evaluation
- ranking
- placement

を一体で行い、

- active_operations
- next_operations
- archive_operations

を生成する。

---

### review

- daily review: operations 更新
- weekly review: plan / operations / future 調整
- monthly review: 全体整合
- design review: design の継続 / 昇格 / future / archive 判断

review は進行中資産の更新を担い、
routing の代替ではない。

---

## 昇格ルール

以下を満たした場合のみ  
notes → docs

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針が説明できる

---

## 判断

`docs/15_notes_system.md` では、
現行運用との差分として以下を反映するのが自然である。

- operations は短期実行順正本
- handover は再開入口
- reports は review の結果物
- routing 後は処理を行い、役目終了なら archive、迷うなら残す
- review と routing は分けて扱う
- operations rolling は candidate source の比較と配置を含む
