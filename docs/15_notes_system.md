# docs/15_notes_system.md

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

`01_issues` は恒久 backlog ではない。

routing により `design / future / operations / archive` へ流せる issue は、
issue layer に残し続けない。

---

### 02_design

仕様草案。

docs 直前の構造整理レイヤー。

実装より先に構造整理が必要な論点を保持する。

issue routing から design へ送られたものは、
単なる holding list で止めず、
1テーマ1design file または既存 design への吸収として扱う。

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

routing の作業分割、fixture result、disposition evidence は 08_analysis に置ける。

ただし 08_analysis は routing destination の代替ではない。

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

routing により役目を終えた issue / input / design は、
source_ref、routed_to、archive_reason を付けて archive へ送る。

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

---

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

issue routing は、送付先をラベル付けして終わる処理ではない。

routing 後は、送付先ごとの初期処理、元 issue の source cleanup、必要な archive まで行う。

#### issue routing の標準手順

1. issue source を読む
2. issue の粒度を確認する
3. 必要なら 1論点1issue に分解 / 統合する
4. 各 issue に `route_to` を付ける
5. `route_to` ごとに後処理を行う
6. 元 issue を archive / keep / cleanup のどれにするか確定する
7. routing result / disposition evidence を保存する
8. `idea_log.md` には keep issue だけを残す
9. active_operations に closure evidence を戻す

#### route_to ごとの後処理

##### archive

役目終了の issue は archive へ送る。

archive には以下を残す。

- original issue id
- title
- source_ref
- routed_to
- archive_reason
- archived_at

archive 保存後、元 issue は source cleanup 対象とする。

##### future

今は扱わないが保持価値がある issue は `80_future/issue` へ送る。

future には以下を残す。

- original issue id
- title
- reason_for_future
- reactivation_condition
- source_ref

future 保存後、元 issue は source cleanup 対象とする。

##### operations

実行候補は operations candidate として扱う。

issue routing から `next_operations` へ直接入れない。

まず operations candidate として disposition し、
operations rolling により `active / next / future / absorbed` を決める。

既存 active / next / system に吸収できるものは、
吸収先を明示して元 issue を cleanup する。

##### design

設計化が必要な issue は design candidate として扱う。

ただし design candidate holding file で止めてはならない。

必ず次のいずれかに disposition する。

- 既存 design へ吸収する
- 1テーマ1design file を新規作成する
- docs update candidate として既存 active / next task に接続する
- future/design へ送る
- 役目終了として archive へ送る

新規 design を作る場合、issue 単位に機械的に分けるのではなく、
今後 design として参照・更新できる 1テーマ単位に分ける。

複数 issue が同じテーマなら、1つの design file に統合する。

Design 化した issue は、
作成・吸収先の design ref を付けて archive へ送るか、
routing result / disposition に archive_reason を残して source cleanup する。

##### issue

まだ送付先が自然でない issue は `01_issues` に残す。

残す場合は、keep reason を明示する。

#### issue routing の完了条件

issue routing は、以下が満たされるまで完了ではない。

- 全 issue に `route_to` が付いている
- archive 行きは archive 保存と source cleanup が済んでいる
- future 行きは `80_future/issue` 保存と source cleanup が済んでいる
- operations candidate は `active / next / future / absorbed` の disposition が確定している
- design candidate は 1テーマ1design file、既存 design 吸収、docs candidate、future/design、archive のいずれかに disposition 済みである
- design化した issue に source_ref / routed_to / archive_reason が残っている
- `idea_log.md` には keep issue だけが残っている
- routing result / disposition evidence が保存されている
- active_operations に closure evidence が戻っている

この完了条件を満たす前に、次の active task へ進まない。

---

### design routing

design を評価し、

- docs
- design
- future/design
- archive
- operations candidate

のどこへ送るかを判定する。

design routing は、
昇格先や保存先の判定を担う。

docs 昇格条件を満たす design は docs 候補とし、
まだ草案段階のものは design に残す。

将来向けのものは future/design へ送り、
役目を終えたものは archive へ送る。

実行候補として落とす価値がある design は、
operations candidate 化を検討する。

---

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
- design review: design layer の棚卸し・整合確認・routing 候補抽出

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
- issue routing は holding file 作成では完了しない
- design candidate は 1テーマ1design file または既存 design 吸収まで進める
- review と routing は分けて扱う
- operations rolling は candidate source の比較と配置を含む
