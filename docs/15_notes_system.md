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
再開時の正本は 06_handover とする

7  
実績と振り返りは 07_reports に残す

8  
意思決定は 05_decisions に残す

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

---

### 01_issues

課題や論点を保持するレイヤー。

issue は保持だけでなく、
後続レイヤーへ展開される前提の中間状態とする。

---

### 02_design

仕様草案。

docs 直前の構造整理レイヤー。

---

### 03_plan

一定期間の重点テーマを整理するレイヤー。

roadmap と operations の中間に位置する。

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
- archive_operations は weekly review で snapshot 保存する

---

### 05_decisions

意思決定ログ。

---

### 06_handover

スレッド再開時の正本。

関連 docs / notes / code を読み直す起点となる。

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
- plan
- future
- archive

へ振り分ける。

---

### operations rolling

複数の流入元から候補を収集し、

- generation
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

---

## 昇格ルール

以下を満たした場合のみ  
notes → docs

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針が説明できる
