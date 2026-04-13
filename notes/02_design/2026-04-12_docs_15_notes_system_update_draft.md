# 2026-04-12 docs_15_notes_system_update_draft

## 目的

`docs/15_notes_system.md` の更新差分案を作成する。

本差分案では、
notes 構造説明と現行運用の差のうち、
共通骨格として docs に上げてよい内容だけを整理する。

---

## 更新方針

- 既存の notes レイヤー構造は維持する
- `04_operations` の日中運用 / review 時運用の違いを補強する
- `06_handover` は再開入口だが、短期実行順正本は operations である点を補強する
- `07_reports` は review の結果物であり、保存だけでは review 完了ではない点を補強する
- intake / issue routing / operations rolling の最小責務を追加する
- routing 後処理と future / archive の使い分けを補強する
- ADAM 固有の応答制御文言は docs に上げない

---

## 主な反映ポイント

### 1. 基本原則の補強

追加する内容

- 短期実行順の正本は `04_operations`
- handover は再開入口
- report は review の結果物
- review 完了は report 保存だけでなく、必要な更新まで含む

### 2. `04_operations` の補強

追加する内容

- active には完了認識済み task が daily review まで残りうる
- archive 移動と rolling 確定は review 時に行う
- next は backlog ではなく近未来候補プール
- rolling は candidate source の比較と配置を含む

### 3. `06_handover` の補強

追加する内容

- handover は再開入口
- ただし短期実行順の正本は operations
- 再開後は関連 docs / notes / code と operations に戻る

### 4. `07_reports` の補強

追加する内容

- reports は review と強く結びつく
- report は review の結果物
- 保存だけでは review 完了とはみなさない

### 5. routing の補強

追加する内容

- intake routing は未整理入力を issue / design / future / archive へ振り分ける
- issue routing は issue を operations / design / future / archive / issue に送る
- routing 後は振り分けた先の処理を行う
- 役目終了なら archive
- 判断に迷うなら先送りして残す

### 6. review の補強

追加する内容

- daily review は operations 更新
- weekly review は plan / operations / future 調整
- review は進行中資産の更新であり、routing の代替ではない

---

## docs に上げるもの / 上げないもの

### 上げるもの

- operations が短期実行順正本である点
- handover は再開入口である点
- reports は review の結果物である点
- active に完了 task が残りうる点
- archive 移動と rolling 確定は review 時に行う点
- intake routing / issue routing / operations rolling の最小責務
- routing 後処理
  - 役目終了なら archive
  - 迷うなら残す

### 上げないもの

- ADAM 固有の回答順
- 会話制御の細則
- GPT editor 前提の操作
- 特定 task 名や Day 配置
- routing の細かな会話判断フロー
- 現行 code の関数名そのもの

---

## 反映後全文ドラフト

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
