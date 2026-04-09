# 2026-04-03 Review System Operating Spec

## 目的

AI Work OS / EVE における review の種類と役割を体系化する。

routing と review を明確に分離し、
役割重複と概念混在を防ぐ。

---

## 結論

review は以下の 3種類に分ける。

- daily review
- weekly review
- monthly review

routing は review とは別の処理として扱う。

- intake routing は未整理入力の構造化と振り分けを担う

---

## 全体構造

未整理入力
↓
intake routing
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

---

## routing

### intake routing

目的

未整理入力を構造化し、
issue / design / future へ振り分ける。

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

- チャンク単位で処理する
- future から戻す場合も routing を再実行する

---

## review の分類

### 1. daily review

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

完了条件

- 当日の実績確認が終わっている
- 明日の実行順調整が終わっている
- operations 更新が終わっている
- daily report が保存されている

実行チェック

daily review 開始時は、先に以下を固定する。

- 今回の手順
- 更新対象
- 完了条件

daily report は review の結果物であり、
report を保存しただけでは daily review 完了とみなさない。

特徴

- 短期実行順の調整を担う
- plan 自体を毎日更新することは目的にしない
- report 保存だけで終わらず、operations 更新まで含めて完了とする

---

### 2. weekly review

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
- 07_reports/weekly
- 80_future
- 99_archive

特徴

- roadmap → plan → operations を接続し直す review 地点
- active plan と future plan の境界調整もここで行う

---

### 3. monthly review

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
- design review をここで実施する

---

## 役割分離

### routing と review の違い

- routing は未整理入力を扱う
- review は進行中資産を扱う

---

## future との関係

### future に送るタイミング

- intake routing 時
- weekly review 時
- monthly review 時

### future から戻すタイミング

- intake routing（再実行）
- weekly review
- monthly review

ルール

- future から active へ直接戻さない
- 必ず routing を通して再判定する

---

## 判断

- routing と review は分離する
- intake は review ではない
- review は運用更新に限定する
