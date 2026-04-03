# 2026-04-03 Plan Layer Operating Spec

## 目的

`notes/03_plan/` の運用仕様を定義する。

roadmap は EVE 全体の上位計画であり、
operations は短期実行順の正本である。

plan はその中間に位置し、
roadmap の phase を一定期間の重点テーマに落とすためのレイヤーとする。

本仕様では、
plan の単位、命名、テンプレート、operations との関係を定義し、
`03_plan` を実運用可能な状態にする。

---

## 結論

- roadmap / plan / operations は分ける
- plan は `notes/03_plan/` で管理する
- plan は「phase に属する 2〜4週間の重点テーマ」を 1ファイルで持つ
- 1 plan = 1テーマ = 1ファイル とする
- operations は plan を前に進める短期実行管理とする
- plan 自体は日次や週次の実行順を持たない
- design は仕様草案、plan は中位計画、operations は短期実行管理として分離する
- daily review と weekly review を通じて plan を運用更新する

---

## 位置づけ

```text
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
```

### roadmap

EVE 全体の進化段階を示す上位計画。

docs で管理する。

### plan

phase の中で、
一定期間に前進させる重点テーマを示す中位計画。

notes/03_plan で管理する。

### operations

plan を前に進めるための短期実行順。

notes/04_operations で管理する。

---

## plan の役割

plan は以下を扱う。

- 今の phase で何を前進させるか
- そのテーマをなぜ今やるか
- どこまでやれば一区切りか
- operations に落とす前の中位計画
- 直近の重点テーマのスコープ定義

plan は以下を扱わない。

- 今日何をやるか
- 今週の実行順
- 日々の status 更新
- 仕様詳細そのもの
- 実装メモそのもの

---

## 単位

plan は
「phase に属する 2〜4週間程度の重点テーマ」
を 1単位とする。

1ファイルに複数テーマを混在させない。

1 plan が大きくなりすぎる場合は分割する。

1 plan が小さすぎる場合は operations へ直接落とすことも許容する。

---

## 命名規則

以下を基本形とする。

```text
YYYY-MM_<phase>_<theme>.md
```

例

```text
2026-04_phase1_todoist_outlook_foundation.md
2026-04_phase1_schedule_proposal_and_outlook_write.md
2026-05_phase2_github_todoist_mindmeister_projection.md
```

### 命名ルール

- YYYY-MM を先頭に置く
- `phase1` `phase2` のように phase を含める
- theme は短く、重点テーマが読める名前にする
- 英語スネークケースを基本とする
- 途中で意味が変わった場合は update ではなく新規 plan を検討する

---

## テンプレート

```md
# YYYY-MM_phaseX_theme

## phase

Phase X: ...

## 位置づけ

この plan が phase の中でどこに位置するかを書く。

## 目的

この期間に前進させる重点テーマを書く。

## 背景

なぜ今これを進めるのかを書く。

## スコープ

この plan で扱うもの

- ...
- ...

この plan で扱わないもの

- ...
- ...

## 完了条件

- ...
- ...
- ...

## 主要論点

### 1. ...

- ...
- ...

### 2. ...

- ...
- ...

## 現時点の仮方針

- ...
- ...

## 関連 docs

- docs/05_roadmap.md

## 関連 design

- ...

## 関連 operations

- notes/04_operations/...

## 次に落とす作業

- ...
- ...

## 次 plan 候補

- ...
- ...
```

---

## operations との関係

- plan は operations の上位に置く
- operations は plan を前に進める短期実行順とする
- operations 側では必要に応じて plan ファイルを参照する
- plan 側には関連 operations を書いてよい
- ただし operations の status を plan にコピーしない

### ルール

- plan は status 管理の正本ではない
- 進捗の細かい変化は operations に寄せる
- plan は「何を前進させるか」と「どこまで進めるか」を保持する
- operations は「今どう進めるか」を保持する

---

## design との関係

- design は仕様草案を保持する
- plan は一定期間の重点テーマを保持する
- design に仕様を書き、
  plan で優先テーマとして束ね、
  operations に実行順を落とす

```text
design
↓
plan
↓
operations
```

ただし、
phase / roadmap との関係では以下の流れとする。

```text
roadmap
↓
plan
↓
operations
```

両者は矛盾しない。

- roadmap は上位計画
- design は仕様草案
- plan は重点テーマ
- operations は短期実行順

---

## レビューとの関係

plan は review を通じて見直す。

### daily review

daily review では以下を行う。

1. 当日の実績を確認する
2. 明日の実行順を調整する
3. operations を更新する
4. 日報を書く

daily review では、
plan 自体を毎日更新することを目的にしない。

ただし、
operations の変化を通じて
plan にズレが出ていないかを観察する。

### weekly review

weekly review では以下を行う。

1. roadmap の方向がまだ妥当か確認する
2. 現行 plan がまだ重点テーマとして妥当か確認する
3. operations の進捗を確認する
4. 次週の実行方針を整理する
5. 必要なら plan を継続 / 分割 / 完了 / 新規化する
6. 週報を書く

weekly review は、
roadmap → plan → operations を接続し直すレビュー地点とする。

### monthly review

monthly review では以下を行う。

- roadmap の現在地確認
- phase の進み具合確認
- plan 群の整理
- 中期方針の見直し
- design review を通じた関連 design の棚卸し

---

## 最初の適用候補

Phase 1 の最初の plan 候補として以下を置く。

### 1. foundation

```text
2026-04_phase1_todoist_outlook_foundation.md
```

対象

- Todoist 一覧取得
- Outlook read
- 空き時間把握

### 2. schedule proposal

```text
2026-04_phase1_schedule_proposal_and_outlook_write.md
```

対象

- 優先順位づけ
- スケジュール案提示
- 承認後の Outlook 書き込み

### 3. communication and light knowledge use

```text
2026-04_phase1_teams_and_obsidian_light_use.md
```

対象

- Teams 通知
- Obsidian 限定利用

---

## 判断

`03_plan` は
「phase に属する 2〜4週間の重点テーマ」
を 1テーマ1ファイルで持つ。

weekly review によって
roadmap / plan / operations の整合を保つ。

これにより、
roadmap と operations の間の抽象度差を埋める。

---

## 影響範囲

- notes/03_plan/README.md
- notes/03_plan/ 配下の今後の plan ファイル
- notes/04_operations/2026-03-26_short_term_plan.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
