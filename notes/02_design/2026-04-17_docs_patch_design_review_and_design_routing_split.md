# 2026-04-17 docs_patch_design_review_and_design_routing_split

## 目的

`design review`
と
`design routing`
を分離するための docs 修正案本文を、
反映前の patch design として固定する。

対象 docs は次の 3 本である。

- `docs/15_notes_system.md`
- `docs/13_dev_workflow.md`
- `docs/05_roadmap.md`

---

## 結論

docs 修正の基本方針は次とする。

- review 側には `design review` を残す
- ただし役割は棚卸し・整合確認・候補抽出に限定する
- routing 側へ `design routing` を追加する
- docs / design / future / archive / operations candidate への送付判定は `design routing` に寄せる

これにより、
`routing と review を混同しない`
原則を保ちながら、
現行運用の実態も自然に説明できる。

---

## docs/15_notes_system.md 修正案

### 差し替え対象

`## フロー` の

- `### issue routing`
- `### operations rolling`
- `### review`

の間に `### design routing` を追加し、
review 節の design review 記述を調整する。

### 追加セクション完成形

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

### review 節差し替え完成形

```text
### review

- daily review: operations 更新
- weekly review: plan / operations / future 調整
- monthly review: 全体整合
- design review: design layer の棚卸し・整合確認・routing 候補抽出

review は進行中資産の更新を担い、
routing の代替ではない。
```

### 反映意図

- design review を review 側に残しつつ責務を限定する
- 送付先判定は routing 側へ明示的に移す

---

## docs/13_dev_workflow.md 修正案

### 差し替え対象

- `#### 4 routing`
- `#### 7 review`

### routing 節差し替え完成形

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

### review 節差し替え完成形

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

### 反映意図

- workflow 上で design routing を正式な routing として追加する
- review には棚卸しと抽出だけを残す
- review → design routing の流れを説明しやすくする

---

## docs/05_roadmap.md 修正案

### 差し替え対象

`## レビュー設計` のうち

- `### monthly review`
- `### design review`

### monthly review 差し替え完成形

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

### design review 差し替え完成形

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

### 追記候補（同節内）

`### design routing`
を review 設計の近くに追加する場合は次でよい。

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

### 反映意図

- roadmap 側でも design review と design routing の責務を分離する
- monthly review の中で棚卸しする構造は維持する
- docs 昇格 / future / archive 判定を routing に戻す

---

## 修正後の構造イメージ

```text
routing
- intake routing
- issue routing
- design routing

review
- daily review
- weekly review
- monthly review
  - design review（棚卸し・候補抽出）
```

この形なら、
review と routing の責務分離を維持したまま、
design を docs に昇格させる前段も自然に説明できる。

---

## 判断

docs 修正案としては、
`design review` を削除するのではなく、

- design review = 棚卸し・整合確認・候補抽出
- design routing = 行き先判定

へ分解するのが最も整合的である。

この patch なら、
現行 docs の違和感を小さい差分で解消できる。
