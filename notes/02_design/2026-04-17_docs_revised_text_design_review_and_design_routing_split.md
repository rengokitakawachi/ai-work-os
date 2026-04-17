# 2026-04-17 docs_revised_text_design_review_and_design_routing_split

## 目的

`design review`
と
`design routing`
を分離する docs 修正について、
実際に差し替え可能な本文を固定する。

対象 docs は次の 3 本である。

- `docs/15_notes_system.md`
- `docs/13_dev_workflow.md`
- `docs/05_roadmap.md`

---

## docs/15_notes_system.md

### 差し替え対象 1

`## フロー` 内の `### issue routing` の直後に、
次を追加する。

```text
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
```

### 差し替え対象 2

`### review` を次に差し替える。

```text
### review

- daily review: operations 更新
- weekly review: plan / operations / future 調整
- monthly review: 全体整合
- design review: design layer の棚卸し・整合確認・routing 候補抽出

review は進行中資産の更新を担い、
routing の代替ではない。
```

---

## docs/13_dev_workflow.md

### 差し替え対象 1

`#### 4 routing` を次に差し替える。

```text
#### 4 routing

未整理入力や issue や design を構造化し、
適切なレイヤーへ送る。

- intake routing
  - 未整理入力を issue / design / future / archive へ振り分ける

- issue routing
  - issue を operations / design / future / archive / issue へ再配置する

- design routing
  - design を docs / design / future / archive / operations candidate へ再配置する

routing は保存先判定と初期処理を担う。

routing は review の代替ではない。
```

### 差し替え対象 2

`#### 7 review` を次に差し替える。

```text
#### 7 review

review は進行中資産の見直しと更新を担う。

- daily review
  - 当日の実績確認
  - 完了 task の archive 移動
  - 未完了 task の繰越判断
  - 明日の実行順調整
  - operations 更新
  - daily report 保存

- weekly review
  - roadmap / plan / operations / future の整合確認
  - 次週方針の整理
  - weekly report 保存

- monthly review
  - roadmap / phase / plan 群の見直し
  - design layer の棚卸し
  - design routing 対象の抽出
  - monthly report 保存

report は review の結果物であり、
保存だけでは review 完了とはみなさない。
```

---

## docs/05_roadmap.md

### 差し替え対象 1

`### monthly review` を次に差し替える。

```text
### monthly review

- daily / weekly の蓄積を集約して整理する
- roadmap の現在地を確認する
- phase の進み具合を確認する
- plan 群を整理する
- future / archive の再評価を行う
- design layer の棚卸しと design routing 対象抽出を行う
- 月報を書く

位置づけ

monthly review は roadmap の正式な見直し地点とする。

phase の現在地を確認し、
中期方針のズレを補正する場でもある。
```

### 差し替え対象 2

`### design review` を次に差し替える。

```text
### design review

- stale / 重複 / 未整理 design を確認する
- docs 昇格候補を抽出する
- future / archive 候補を抽出する
- design routing に渡す対象を整理する

位置づけ

design review は monthly review の一部として実施する。

design review 自体は棚卸しと候補抽出を担い、
送付先判定は design routing で行う。
```

### 差し替え対象 3

`### design review` の直後に、
次を追加する。

```text
### design routing

- design を docs / design / future / archive / operations candidate のどこへ送るかを判定する
- docs 昇格条件を満たすかを確認する
- 将来向け deferred design は future/design へ送る
- 役目を終えた design は archive へ送る
- 実行候補に落とす価値があるものは operations candidate 化を検討する

位置づけ

design routing は design review で抽出された候補の行き先判定を担う。

review の代替ではなく、
review 後の routing 処理として扱う。
```

---

## 判断

この本文案により、

- design review = 棚卸し・整合確認・候補抽出
- design routing = 行き先判定

の分離を、
`docs/15_notes_system.md`
`docs/13_dev_workflow.md`
`docs/05_roadmap.md`
の 3 本へ一貫して反映できる。
