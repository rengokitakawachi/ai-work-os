# 2026-04-16 active_operations_as_reroll_candidate_source

## 目的

`active_operations.md` を、
operations reroll の入力 candidate source として扱う
最小設計を固定する。

本メモは、
active を固定済み結果として閉じず、
plan / next / issue / operations_queue と同じ比較土俵に戻すための
仕様境界を定義することを目的とする。

---

## 結論

`active_operations` は、
**reroll 時には candidate source の1種として読む。**

ただし、
それは「未配置候補」と完全に同一ではない。

active 由来 candidate は、
**既存配置済み task を candidate に戻したもの**
として扱う。

したがって、
次を metadata に保持する。

- `generated_from: active_operations`
- `already_active: true`
- `existing_rolling_day`
- `active_continuity`

この candidate は、
他候補と同じ土俵で reroll にかける。

ただし、
`already_active` と `active_continuity` により、
軽い維持補正を持つ。

---

## なぜ必要か

現行の rolling が
plan / issue / next / queue だけを入力にすると、
既存 active を含んだ再配置ではなく、
新規候補集合の順位づけに近くなる。

しかし実運用で欲しいのは、
次である。

- 今 active にある task
- 新規に上がってきた task
- next にいた task
- plan 直結候補
- issue routing 由来候補

を同じ比較土俵に乗せたうえで、
reroll すること

そのため、
active_operations も candidate source に戻す必要がある。

---

## 位置づけ

構造は次とする。

```text
active_operations
next_operations
plan
issue
operations_queue
↓
candidate collection
↓
normalization
↓
ranking
↓
placement
↓
new active / next / future
```

このとき active_operations は、

- 正本である
- ただし reroll 時には candidate source に再投影される

という二重の位置づけを持つ。

これは矛盾ではなく、
**正本を再評価入力へ戻す**
ための処理である。

---

## active 由来 candidate の考え方

active task は、
すでに placement 後の task である。

したがって、
queue や issue 由来の pre-task candidate と
完全同型ではない。

区別は次とする。

- queue payload
  = pre-task candidate

- active task
  = placed task を reroll candidate に戻したもの

この違いを失わないため、
active 由来 candidate には
metadata を持たせる。

---

## active 由来 candidate の最小項目

active task から reroll candidate へ戻す際、
最低限次を持てばよい。

- `title`
  - 元の `task`

- `source_ref`

- `why_now`

- `notes`

- `metadata.generated_from: active_operations`

- `metadata.already_active: true`

- `metadata.existing_rolling_day`

- `metadata.active_continuity: light`

必要に応じて次も持てる。

- `due_date`
- `due_type`
- `target_date`

ただし最小段階では必須にしない。

---

## 変換イメージ

### active task

```yaml
- task: issue routing の後処理統合と可変評価 schema の整理を進める
  source_ref:
    - notes/01_issues/idea_log.md
  rolling_day: Day0
  why_now:
    - issue routing は Phase 0 直結論点であり、先頭維持で詰める価値が高い
  notes:
    - 保存 / routing / 反映 / 再評価の責務分離を崩さない
```

### reroll candidate

```json
{
  "title": "issue routing の後処理統合と可変評価 schema の整理を進める",
  "candidate_type": "operations",
  "source_ref": [
    "notes/01_issues/idea_log.md"
  ],
  "why_now": [
    "issue routing は Phase 0 直結論点であり、先頭維持で詰める価値が高い"
  ],
  "metadata": {
    "generated_from": "active_operations",
    "already_active": true,
    "existing_rolling_day": "Day0",
    "active_continuity": "light",
    "notes": [
      "保存 / routing / 反映 / 再評価の責務分離を崩さない"
    ]
  }
}
```

---

## active_continuity の意味

`active_continuity` は、
固定優先ではない。

意味は次である。

- 既存 active を毎回無意味に入れ替えない
- 継続価値を少し持たせる
- ただし plan 整合や stale 判定に負ければ落ちうる

したがって、
これは **軽い維持補正** である。

---

## ranking への含意

ranking では、
active 由来 candidate を
他候補と同じ土俵に乗せる。

ただし、
次の主従を守る。

- `plan_alignment` が最重要
- `active_continuity` は軽い補助
- `quick_win` は追加の補助加点

つまり、
active にいることだけでは残れない。

一方で、
同等帯なら active 継続側がやや有利になる。

---

## future 送りとの関係

active 由来 candidate も、
必要なら future に落ちうる。

例:

- stale 化している
- phase 不一致になった
- 前提条件待ちになった
- いま active に置く理由が弱くなった

これは重要である。

active を candidate source に戻す意味は、
維持判定だけでなく
**落とす判定も同じ土俵で行える**
ことにある。

---

## next_operations との関係

next は
すでに rolling 後の上位候補である。

active と next の違いは次である。

- active
  - 既存配置済み
  - continuity 補正あり

- next
  - 未配置
  - continuity 補正なし

この差を metadata で保持する。

---

## code 側の最小 adapter

最小実装としては、
次のような adapter を想定する。

`buildActiveOperationsSourceBundle(...)`

責務は次である。

- active_operations.md を読む
- task block を抽出する
- reroll candidate item に変換する
- source bundle として返す

source_type は次でよい。

- `active`

---

## source_type の扱い

ranking では
source_type も補助比較に使いうる。

したがって、
`active` は明示 source_type として定義する。

これは queue のような unknown 扱いにしない方が自然である。

理由:
- active は reroll 上重要な既存配置群だから
- continuity 補正を持つ source として区別したいから

---

## 今やらないこと

最小段階では次をやらない。

- active task の自動 stale 判定高度化
- completion / archive の自動移送
- due_date に基づく強制優先
- quick_win の定量推定
- active source の永続 metadata 拡張

まずは、
active を reroll 入力 source として戻せるようにすることが先である。

---

## 判断

`active_operations` は、
operations reroll において
candidate source として戻すのが自然である。

ただし、
単なる未配置候補ではなく、
**既存配置済み task を再評価用に戻した source**
として扱う。

そのため最小設計は次である。

- `buildActiveOperationsSourceBundle(...)` を置く
- `source_type: active` を定義する
- `already_active / existing_rolling_day / active_continuity` を持たせる
- plan整合を最重要にしつつ、
  continuity は軽い補助として扱う

この形なら、
active を固定特権にせず、
しかし無意味に不安定にもせず、
reroll の比較土俵へ自然に戻せる。
