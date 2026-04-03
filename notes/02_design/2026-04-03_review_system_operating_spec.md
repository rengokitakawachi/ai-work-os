# 2026-04-03 Review System Operating Spec

## 目的

AI Work OS / EVE における review の種類と役割を体系化する。

現在は、
daily report、
weekly review、
monthly review、
intake review など複数の review が存在する。

本仕様では、
それぞれの目的、入力、出力、更新対象を整理し、
役割重複を防ぐ。

---

## 結論

review は以下の 4種類に分ける。

- intake review
- daily review
- weekly review
- monthly review

このうち、

- intake review は未整理入力を構造化するための review
- daily / weekly / monthly review は運用を更新するための review

と定義する。

---

## 全体像

```text
未整理入力
↓
intake review
↓
issue / design / future

roadmap
↓
plan
↓
operations
↓
daily review
↓
operations 更新
↓
weekly review
↓
plan / operations / roadmap 確認
↓
monthly review
↓
roadmap / phase / plan 群の見直し
```

---

## review の分類

### 1. intake review

目的

未整理入力を構造化し、
issue / design / future へ安全に振り分ける。

入力

- 00_inbox 配下の未整理入力
- 関連ファイル群
- 必要に応じて 80_future/inbox の再活性化対象

出力

- 1テーマ1メモ
- issue
- design
- future
- source_ref 付き派生メモ

更新対象

- 00_inbox
- 01_issues
- 02_design
- 80_future/inbox
- 99_archive

特徴

- ファイル単位ではなくチャンク単位で処理する
- 現 phase / 次期 phase より先のものは future に送る
- future から active に戻すときも再度 intake review を通す

---

### 2. daily review

目的

その日の実績を確認し、
翌日の実行順へ反映する。

入力

- 当日の実施内容
- 現行 operations
- 必要に応じて関連 plan

手順

1. 当日の実績を確認する
2. 明日の実行順を調整する
3. operations を更新する
4. 日報を書く

出力

- 更新済み operations
- daily report

更新対象

- 04_operations
- 07_reports/daily

特徴

- 短期実行順の調整を担う
- plan 自体を毎日更新することは目的にしない
- ただし plan とずれが出ていないかは観察する

---

### 3. weekly review

目的

roadmap / plan / operations の整合を確認し、
次週の方針へつなぐ。

入力

- その週の operations 進捗
- 現行 plan
- 現行 roadmap
- daily report 群

手順

1. roadmap の方向がまだ妥当か確認する
2. 現行 plan が重点テーマとして妥当か確認する
3. operations の進捗を確認する
4. 次週の実行方針を整理する
5. 必要なら plan を継続 / 分割 / 完了 / defer / 新規化する
6. 週報を書く

出力

- 更新済み operations
- 必要に応じて更新された plan
- weekly report
- roadmap 反映候補

更新対象

- 03_plan
- 04_operations
- 07_reports/weekly（導入時）
- 80_future
- 99_archive
- 必要に応じて docs 反映候補

特徴

- roadmap → plan → operations を接続し直す review 地点
- active plan と future plan の境界調整もここで行う
- completed / superseded / split は archive 判定する
- deferred_to_future は 80_future/plan へ送る判断を行う

---

### 4. monthly review

目的

phase の現在地と中期方針を見直す。

入力

- monthly 対象の daily / weekly 蓄積
- roadmap
- plan 群
- operations の履歴

出力

- monthly report
- roadmap 見直し案
- plan 群の整理結果

更新対象

- 07_reports/monthly
- docs/05_roadmap.md への反映候補
- 03_plan
- 80_future
- 99_archive

特徴

- phase の進み具合を確認する
- roadmap の前提が崩れていないかを見る
- future へ送ったものの再評価もここで行う

---

## review の役割分離

### intake review と daily review の違い

- intake review は未整理入力を扱う
- daily review は進行中の実行管理を扱う

### daily review と weekly review の違い

- daily review は短期調整
- weekly review は中位計画との整合確認

### weekly review と monthly review の違い

- weekly review は次週更新
- monthly review は phase / roadmap の見直し

---

## future との関係

future は review と強く結びつく。

### future に送るタイミング

- intake review 時
  - 次期 phase より先の未整理入力
- weekly review 時
  - deferred な active plan
- monthly review 時
  - 今月扱わない中期論点の再整理

### future から戻すタイミング

- intake review 再実行
- weekly review
- monthly review

ルール

- future から active へ直接戻さない
- 必ず review を通して再判定する

---

## reports との関係

### daily report

daily review の結果を記録する。

### weekly report

weekly review の結果を記録する。

### monthly report

monthly review の結果を記録する。

reports は review の結果を蓄積するレイヤーであり、
review そのものではない。

---

## 判断

- review は 4種類に分ける
- intake review は入力整理
- daily / weekly / monthly review は運用更新
- weekly review を roadmap → plan → operations の接続点とする
- monthly review を roadmap / phase 見直しの接続点とする

---

## 影響範囲

- notes/02_design/intake_review_and_source_ref_spec.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/03_plan/README.md
- notes/04_operations/...
- notes/07_reports/README.md
- docs/05_roadmap.md
