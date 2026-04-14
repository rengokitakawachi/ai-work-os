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
