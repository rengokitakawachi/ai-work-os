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

notes には、情報の状態と位置づけを区別するために
以下のレイヤー区分を設ける。

- active layers  
  今扱っている情報

- 80_future  
  今は扱わないが、将来扱う可能性がある情報

- 99_archive  
  役目を終えた情報

これらは遷移順を表すものではない。

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

今何をやるかを管理する。

#### operations モデル

operations は以下のファイル構造を持つ

- active_operations.md  
  Day0〜Day6 を持つ 7日ローリングの正本

- next_operations.md  
  active の次に来る近未来候補

- archive_operations.md  
  今週の完了タスクの一時アーカイブ

operations は future には置かない。

archive_operations は weekly review で snapshot 保存する。

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
  roadmap / plan / operations の整合確認と方針整理

- monthly  
  全体進捗と構造の見直し

reports は review と強く結びつく。

---

### 08_analysis

横断的な整合確認や分析を行うレイヤー。

---

### 09_content

将来の記事執筆や発信のための素材、ネタ、記事ドラフトを蓄積するレイヤー。
日々の設計、実装、振り返りから、あとで記事化できる論点や学びを保存する。

---

### 10_logs

補助ログ、失敗記録。

---

### 80_future

将来扱う可能性があるが、
現時点では扱わない情報を保持するレイヤー。

#### 基本構成

80_future/
plan/
inbox/

- plan  
  deferred な plan

- inbox  
  将来向け未整理入力

future は archive ではない。

---

### 99_archive

役目を終えた情報の退避先。

operations の週次履歴は以下に保存する。

notes/99_archive/operations/

---

## フロー

### intake routing

未整理入力を構造化し、
適切なレイヤーへ振り分ける。

- issue
- design
- plan
- future

今扱わないものは future へ送る。

---

### issue からの展開

issue は以下の流れで展開される

issue
↓
design
↓
plan
↓
operations

すべてがこの順序を必須とするわけではないが、
基本的な昇格経路とする。

---

## operations 運用

- operations は短期実行順の正本
- active / next / archive_operations の3構造を持つ
- future には置かない
- weekly review で archive_operations を snapshot 保存する

---

## reports 運用

- daily：実行と記録
- weekly：整合確認と再編
- monthly：構造見直し

reports は operations と連動する。

---

## 昇格ルール

以下を満たした場合のみ  
notes → docs

- 目的が明確
- 責務が明確
- 命名が確定
- 例外が見えている
- 実装方針が説明できる
