# notes/03_plan/README.md

## 役割

plan は、phase に属する一定期間の重点テーマを示すレイヤーである。

roadmap の下位、
operations の上位に位置づける。

EVE の上位計画を、
一定期間で前進させる中位計画として扱う。

---

## 位置づけ

- roadmap は docs で管理する
- plan は notes/03_plan で管理する
- operations は notes/04_operations で管理する
- plan と operations は分ける
- ただし分断ではなく、上位下位でリンクさせる

---

## 階層

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

---

## 役割分離

### roadmap

EVE 全体の進化段階を示す上位計画。

どの phase にいるか、
どこへ向かうかを表す。

### plan

phase の中で、
一定期間に前進させる重点テーマを示す。

今の phase で何を前に進めるかを表す。

### operations

plan を前に進めるための短期実行順を示す。

今週何をやるか、
今日は何をやるか、
進捗はどうかを表す。

---

## ここで扱うもの

- phase に属する重点テーマ
- 2〜4週間程度で前進させる対象
- operations に落とす前の中位計画
- 今の phase で何を前に進めるか
- どこまで進めたら一区切りか

---

## ここで扱わないもの

- 今日やること
- 今週の実行順
- 日々の status 更新
- 仕様草案そのもの
- 実装メモそのもの

仕様草案は design に置き、
短期実行順は operations を正本とする。

---

## 単位

plan は
「phase に属する 2〜4週間程度の重点テーマ」
を 1単位とする。

1 plan = 1テーマ = 1ファイル
を基本とする。

1ファイルに複数テーマを混在させない。

---

## 命名規則

```text
YYYY-MM_<phase>_<theme>.md
```

例

```text
2026-04_phase1_todoist_outlook_foundation.md
2026-04_phase1_schedule_proposal_and_outlook_write.md
2026-05_phase2_github_todoist_mindmeister_projection.md
```

---

## 原則

- plan は短期の実行管理そのものを持たない
- 今日や今週の実行順は operations を正本とする
- 仕様草案そのものは design に書く
- plan は一定期間の重点テーマを保持する
- operations は plan にリンクする
- plan は review を通じて見直す
- active な plan だけを `03_plan` に置く

---

## review との関係

### daily review

- 当日の実績を確認する
- 明日の実行順を調整する
- operations を更新する
- 日報を書く

daily review は、
operations の調整を行う場であり、
plan 自体の毎日更新は目的としない。

### weekly review

- roadmap / plan / operations の整合を確認する
- 次週の実行方針を整理する
- plan の継続 / 分割 / 完了 / defer / 新規化を判断する
- 週報を書く

weekly review は、
plan を見直す主要な review 地点とする。

### monthly review

- roadmap の現在地を確認する
- plan 群を整理する
- design review を行う
- 中期方針を見直す
- future / archive の再評価を行う

---

## future / archive との関係

### `03_plan` に置くもの

- active な plan
- 今の phase で前進させる重点テーマ

### `80_future/plan` に移すもの

- 今は進めないが、将来また扱う plan
- phase の順序上、後ろ倒しにした plan
- 前提条件未整備で defer した plan

### `99_archive` に移すもの

- completed
- superseded
- split 元
- 役目を終えた plan

---

## 保存先

```text
notes/03_plan/
```

---

## 最初の plan 候補

- `2026-04_phase1_todoist_outlook_foundation.md`
- `2026-04_phase1_schedule_proposal_and_outlook_write.md`
- `2026-04_phase1_teams_and_obsidian_light_use.md`

---

## 補足

plan は roadmap と operations の間の抽象度差を埋めるためのレイヤーである。

roadmap だけでは大きすぎ、
operations だけでは短期に寄りすぎるため、
plan を中位計画として置く。

---

## 関連

- `docs/05_roadmap.md`
- `notes/02_design/2026-04-03_plan_layer_operating_spec.md`
- `notes/02_design/2026-04-03_future_layer_operating_spec.md`
- `notes/02_design/2026-04-03_review_system_operating_spec.md`
- `notes/04_operations/2026-03-26_short_term_plan.md`
