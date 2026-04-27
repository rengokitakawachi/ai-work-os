# 2026-04-27 Delta Learning System Fast Track Architecture

## 目的

2026-08-23 の社会保険労務士試験に向けて、学習支援システム `delta` を実践投入するための設計判断を固定する。

本 design は、現在の ADAM / EVE 開発メインストリームを担当している `ADAM_0426` に対して、delta を開発計画へ入れるための引き渡し材料とする。

---

## 背景

ユーザーは、汎用業務支援システム EVE と、EVE の開発用システムであり EVE の prototype でもある ADAM を運用している。

これらを基盤として、学習支援システムを構築したい。

学習支援システムのコード名は `delta` とする。

delta は、Adam/EVE と同じように次を持つ。

- 長期 roadmap
- 中期 plan
- 日々の operations
- 学習履歴
- review
- 進捗に応じた plan 修正
- ChatGPT 5.5 を UI とする対話運用

試験日は 2026-08-23 であり、開発は通常の future 扱いではなく、期限駆動の実践投入候補として扱う必要がある。

---

## 現時点の設計判断

### 1. Adam/EVE は分けない

ADAM と EVE は、現状ほぼ一体的に開発されている。

ADAM は EVE の開発 controller であり、EVE の prototype でもある。

そのため、Adam / EVE を別々の system として無理に分離しない。

当面は `core_system` として一体で扱う。

```text
core_system
- code_name: adam_eve
- role:
  - ADAM: controller / developer / governance
  - EVE: work assistant / execution partner
- owns:
  - current docs
  - current notes
  - current operations
  - current code
```

---

### 2. delta は core_system とは独立 system として扱う

delta は学習支援 system であり、開発・業務支援とは正本データと評価軸が異なる。

そのため、delta は独立した domain system として扱う。

```text
delta
- purpose: 学習支援
- domain: learning
- owns:
  - learning roadmap
  - learning plan
  - learning operations
  - learning history
  - learning review
  - learning resources
```

---

### 3. common は薄くする

routing / planning / operations rolling / review を丸ごと common に置かない。

common に置くのは、domain 非依存の primitive / framework / interface だけとする。

判断ロジックは system 側に置く。

```text
common に置くもの
- resource access
- markdown read / write
- source_ref
- Candidate base
- OperationTask base
- Review base
- ActionPlan base
- system registry
- adapter interface
- auth / error / logging
- dry_run / apply boundary
```

```text
common に置かないもの
- 学習遅れをどう扱うか
- 復習を優先するか新規学習を優先するか
- 社労士試験日からどう逆算するか
- ADAM/EVE の Phase 0 優先判断
- 開発 review と学習 review の具体判断
```

---

### 4. system 側に domain policy / schema / instruction を置く

delta 固有の知能は、common ではなく delta 側に閉じる。

```text
delta 側に置くもの
- learning routing policy
- learning planning policy
- learning operations policy
- learning review policy
- learning schema
- delta instruction
- delta adapter
```

---

## 推奨全体構造

```text
AI Work OS Platform
├─ common
│  ├─ resource access
│  ├─ base schema
│  ├─ system registry
│  ├─ adapter interface
│  ├─ projection base
│  ├─ auth / error / logging
│  └─ dry_run / apply framework
│
├─ core_system
│  ├─ code_name: adam_eve
│  ├─ ADAM role
│  ├─ EVE role
│  ├─ current docs / notes / code / operations
│  └─ core policies
│
├─ systems
│  └─ delta
│     ├─ docs
│     ├─ roadmap
│     ├─ plan
│     ├─ operations
│     ├─ history
│     ├─ review
│     ├─ resources
│     └─ config
│
└─ future systems
```

---

## delta resource layout 案

新規 system の初例として、delta から `systems/{system_id}` 構造を採用する。

```text
systems/delta/
├─ docs/
│  ├─ 00_delta_index.md
│  ├─ 01_delta_concept.md
│  ├─ 02_delta_architecture.md
│  ├─ 03_delta_data_model.md
│  └─ 04_delta_review_policy.md
│
├─ roadmap/
│  └─ delta_roadmap.md
│
├─ plan/
│  └─ 2026_sharoushi_exam_plan.md
│
├─ operations/
│  ├─ active_operations.md
│  ├─ next_operations.md
│  └─ archive_operations.md
│
├─ history/
│  └─ 2026-04.md
│
├─ review/
│  ├─ daily/
│  ├─ weekly/
│  └─ monthly/
│
├─ resources/
│  └─ materials.md
│
└─ config/
   ├─ delta_instruction.md
   └─ delta_schema.yaml
```

---

## delta data model 草案

### LearningRoadmap

- goal
- exam_date
- target_exam
- target_level
- subjects
- milestones
- risk_areas

### LearningPlan

- period
- focus_subjects
- target_skills
- materials
- weekly_targets
- completion_conditions
- review_cadence

### LearningOperationTask

OperationTask base を継承する。

共通項目:

- task
- source_ref
- rolling_day
- due_date
- due_type
- why_now
- notes
- status
- completed
- external

delta 固有項目:

- subject
- topic
- material
- study_type
- estimated_minutes
- target_score
- actual_score
- comprehension
- next_review_date
- weak_point_ref

### LearningHistory

- date
- subject
- topic
- material
- minutes
- study_type
- result
- comprehension
- quiz_score
- weak_points
- next_review_date
- source_ref

### LearningReview

- date
- review_type
- progress_summary
- comprehension_findings
- weak_points
- plan_adjustments
- next_operations_candidates
- risk_to_exam_date

---

## delta review 方針

delta の review は、開発 review ではなく学習進捗 review とする。

### daily review

目的:

- 学習実績の記録
- 予定との差分確認
- 翌日の operations 微調整
- 弱点と復習候補の抽出

見るもの:

- 今日やった教材
- 学習時間
- 正答率
- 理解度
- 詰まった論点
- 次回復習日

### weekly review

目的:

- plan に対する進捗確認
- 科目別の遅れ確認
- 弱点領域の再配置
- 翌週 operations の再構成

見るもの:

- 科目別進捗
- 択一 / 選択の成績傾向
- 学習時間の偏り
- 試験日までの残日数
- 予定変更要否

### monthly review

目的:

- roadmap / plan の再設計
- 模試 / 過去問結果の反映
- 合格可能性に対する戦略修正

---

## delta operations 方針

delta も Adam/EVE と同様に、短期実行順の正本として operations を持つ。

```text
systems/delta/operations/active_operations.md
systems/delta/operations/next_operations.md
systems/delta/operations/archive_operations.md
```

ただし、delta operations は schedule ではない。

- operations = 何を学習するか / どの順で進めるか
- calendar = いつ実行するか
- Todoist = 必要なら projection

---

## API 方針

### 短期

既存 repo-resource を直接拡張するより、まずは設計を固定する。

最小実装は、現行 repo-resource / code resource の上に system root 解決を追加する方向が自然。

### 中期

`system-resource` API を追加する。

```text
GET /api/system-resource?system_id=delta&resource=operations&action=read&file=active_operations.md

POST /api/system-resource?system_id=delta&resource=history&action=create

POST /api/system-resource?system_id=delta&resource=review&action=create
```

### 長期

system registry と adapter により、future systems を追加可能にする。

```text
SystemRegistryEntry
- system_id
- code_name
- resource_root
- adapter
- schema
- instruction
- enabled_features
```

---

## instruction / schema 方針

### common instruction

common instruction は薄くする。

含めるもの:

- SSOT 原則
- resource / source_ref の扱い
- read before write
- write gate
- dry_run / apply
- runtime schema reflection
- system_id の扱い

含めないもの:

- 学習計画判断
- 復習判断
- 社労士試験戦略
- ADAM/EVE 固有の開発運用

### delta instruction

delta instruction に置くもの:

- 学習支援人格
- 社労士試験日を意識した逆算
- roadmap / plan / operations の扱い
- 学習履歴の記録
- 理解度 / 正答率 / 弱点の確認
- plan 修正提案
- 復習タスク生成
- 教材と科目の扱い

### schema

common schema:

- System
- ResourceRef
- Candidate
- OperationTaskBase
- ReviewBase
- ActionPlanBase

delta schema:

- LearningRoadmap
- LearningPlan
- LearningOperationTask
- LearningHistory
- LearningReview
- Material
- WeakPoint

---

## 期限駆動の重要性

delta は将来構想ではなく、2026-08-23 の社会保険労務士試験に向けて実践投入する必要がある。

そのため、最初から完全な multi-system platform を作るのではなく、次の順で進める。

### Step 1: delta design 固定

- system としての delta の境界を固定する
- Adam/EVE core_system とは分ける
- common を薄くする
- delta 固有 schema / instruction / resource layout を固定する

### Step 2: delta MVP resource 作成

- systems/delta/roadmap
- systems/delta/plan
- systems/delta/operations
- systems/delta/history
- systems/delta/review

### Step 3: delta 手動運用開始

最初は API 完成を待たず、GitHub markdown と ChatGPT UI で運用する。

- daily learning log
- weekly review
- active_operations 更新
- plan 修正

### Step 4: 必要な API だけ追加

初期に必要な API は限定する。

- delta resource read
- delta resource create / update
- delta operations read / update
- delta history append
- delta review create

### Step 5: system-resource 化

delta 運用で必要性が見えた後、system-resource API へ進める。

---

## ADAM_0426 への提案タスク

delta は、現行 active に横入り実行するのではなく、ADAM_0426 側で reroll / daily review にかける。

ただし試験日が固定されているため、重要度は高い。

### operations candidate

```text
task: delta 学習支援システムの fast-track architecture を開発計画に取り込む
source_ref:
  - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  - docs/13_dev_workflow.md
  - docs/15_notes_system.md
  - docs/17_operations_system.md
rolling_day: 未定
due_date: 2026-04-28
due_type: date
why_now:
  - 2026-08-23 の社会保険労務士試験に向けて実践投入したい期限駆動案件である
  - delta は future system ではなく、短期で MVP 設計と手動運用開始が必要である
  - Adam/EVE instruction/schema 再層化と同じ common/platform 論点に直結するため、現行 Phase 0 と競合ではなく接続できる
notes:
  - まず design を operations candidate として扱い、active / next / future 配置を reroll で決める
  - common は薄い kernel とし、delta 固有判断は delta adapter / instruction / schema に置く
  - 実装より先に systems/delta resource layout と MVP 運用範囲を固定する
completed_condition:
  - delta の配置が active / next / future のいずれかに決まっている
  - delta MVP の最初の実行 task が operations に入っている
  - 2026-08-23 試験日から逆算した初期 roadmap / plan / operations 作成 task が切れている
```

---

## 推奨する reroll 判断

ADAM_0426 では、次を確認して配置する。

### 状態層

- repo: design は notes/02_design に保存済み
- canonical: active_operations には未反映
- runtime: ADAM_0426 の operations rolling で再評価が必要

### completed condition

delta 論点は、design 保存だけでは完了ではない。

閉じる条件は次。

- delta を core_system とは別 system として扱うか確定
- delta MVP の resource layout が固定
- initial roadmap / plan / operations 作成 task が active / next に入る
- 試験日から逆算した運用開始日が決まる

### 依存順

1. delta fast-track design を読む
2. current active / next / plan と比較する
3. delta を active / next / future に配置する
4. delta MVP resource layout 作成 task を切る
5. delta 初期 roadmap / plan / operations 作成 task を切る
6. 学習履歴 daily log の最小 template を作る

### 単発 / 継続

- design 保存は単発
- 学習支援 system の実践投入は継続
- daily learning log / weekly learning review は継続運用

---

## 非採用案

### delta を Adam/EVE notes に混ぜる

非採用。

理由:

- 学習履歴と開発履歴が混ざる
- operations 正本が壊れる
- review の評価軸が違う

### common に学習判断を入れる

非採用。

理由:

- common が肥大化する
- future system 追加時に破綻する
- 学習固有の復習 / 理解度 / 試験逆算は delta 固有でよい

### system-resource を最初から作り込む

非採用。

理由:

- 試験日までの実践投入を急ぐ必要がある
- 最初は markdown resource と手動運用で十分
- API は必要性が見えてから最小追加する

---

## 次アクション

ADAM_0426 側で実施する。

1. 本 design を読む
2. current active_operations / next_operations / Phase 0 plan と比較する
3. delta を operations candidate として reroll に入れる
4. delta MVP resource layout 作成 task を active / next に配置する
5. delta 初期 roadmap / plan / operations 作成 task を配置する
6. 必要なら `systems/delta/` の初期ファイル作成 design を別途切る

---

## ADAM_0426 に送るメッセージ

以下を ADAM_0426 に貼り付ける。

ADAM_0426へ。

delta 学習支援システムを開発計画に入れたい。

背景:
- 2026-08-23 の社会保険労務士試験に向けて、delta を実践投入したい。
- delta は学習支援 system。
- 長期 roadmap / 中期 plan / 日々の operations / 学習履歴 / review を持つ。
- ChatGPT 5.5 を UI とし、学習履歴は GitHub に保存する。
- 進捗に応じて plan と operations を更新する。

設計判断:
- Adam/EVE は現状ほぼ一体的に開発しているため、分けずに core_system として扱う。
- ADAM は controller / developer / governance、EVE は work assistant / execution partner という role 差として扱う。
- delta は core_system とは独立した domain system として扱う。
- 今後 future systems が増える可能性があるため、delta から `systems/{system_id}/` 構造を採用する。
- common は薄い platform kernel とする。
- routing / planning / operations rolling / review は、common に丸ごと置かず、base interface と primitive だけ common に置く。
- 学習固有の判断は delta adapter / delta instruction / delta schema に置く。

保存済み design:
- `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md`

ADAM_0426でやってほしいこと:
1. この design を読む。
2. current active_operations / next_operations / Phase 0 plan と比較する。
3. delta を operations candidate として reroll に入れる。
4. active / next / future のどこに置くか判断する。
5. 可能なら短期で以下の task を切る。
   - `delta MVP resource layout を作る`
   - `delta 社労士試験向け initial roadmap / plan / operations を作る`
   - `delta learning history daily log template を作る`
6. design 保存だけで完了扱いにせず、delta の初期 roadmap / plan / operations が作られ、実運用開始できる状態を completed condition として扱う。

operations candidate 案:
task: delta 学習支援システムの fast-track architecture を開発計画に取り込む
source_ref:
  - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
  - docs/13_dev_workflow.md
  - docs/15_notes_system.md
  - docs/17_operations_system.md
due_date: 2026-04-28
due_type: date
why_now:
  - 2026-08-23 の社会保険労務士試験に向けた期限駆動案件である
  - delta は future system ではなく、短期で MVP 設計と手動運用開始が必要である
  - Adam/EVE instruction/schema 再層化と同じ common/platform 論点に直結するため、現行 Phase 0 と接続できる
completed_condition:
  - delta の配置が active / next / future のいずれかに決まっている
  - delta MVP の最初の実行 task が operations に入っている
  - 2026-08-23 試験日から逆算した初期 roadmap / plan / operations 作成 task が切れている
