# 2026-04-17 operations_queue_quick_win_example

## 目的

operations_queue において、
どのような候補に `quick_win` を付けてよいかを
具体例で固定する。

本メモは、
quick_win の usage guideline を
queue 運用へ落とし込むための analysis である。

---

## 結論

operations_queue で `quick_win` を付けてよい典型例は、
**issue routing 由来だが、短時間・低摩擦・接続価値の3条件を満たす接続修正系 task**
である。

例えば次のような候補は妥当である。

```json
{
  "title": "operations queue payload に必要最小 metadata を追加する",
  "route_to": "operations",
  "reason": "rolling 比較を成立させるための接続補強",
  "impact_now": "medium",
  "quick_win": "high",
  "candidate_draft": {
    "task": "operations queue payload に必要最小 metadata を追加する",
    "source_ref": [
      "src/services/flow-control/issue-routing-notes-write.js",
      "src/services/flow-control/adapters.js"
    ],
    "notes": [
      "reroll 比較に必要な metadata の最小補強"
    ]
  }
}
```

---

## なぜ妥当か

この例は、
quick_win guideline の 3 条件を満たす。

### 1. 低時間

小さな metadata 追加であり、
2〜10分程度で終わる見込みがある。

### 2. 低摩擦

対象は直前に開いていた code file であり、
文脈切替がほぼない。

### 3. 接続価値

終えると queue → reroll 比較が少し安定し、
本筋 task の比較材料が増える。

したがって、
`quick_win: high` は妥当である。

---

## 逆に付けない例

次のような候補には付けない。

- issue routing とは関係が薄い小掃除
- 単に短いが、別ファイル群へ大きく文脈移動する修正
- 重要そうに見えるが、実際は investigation が必要な task
- 本筋を避けるための気分転換タスク

つまり、
queue の quick_win は
「今ついでに拾える接続修正」に限定するのが自然である。

---

## active との違い

queue 候補は
`active_continuity`
を持たない。

したがって、
queue の quick_win は
active の継続バイアスを置き換えるものではない。

意味はあくまで、

- queue の中で少し浮く
- linked 帯で少し押し上がる
- 低摩擦な接続修正を拾いやすくする

である。

---

## reroll 上の期待値

現行 ranking では、
queue candidate の `quick_win` は

- plan_alignment
- importance
- active_continuity

の後に効く。

したがって、
この例に `quick_win: high` を付けても

- plan 直結の direct 候補
- linked で continuity を持つ active 候補

を大きく逆転することは期待しない。

一方で、
同じ queue 帯や同順位帯の中では
少し上に来やすくなる。

---

## 判断

operations_queue における quick_win の典型例は、
**すぐ終わる接続修正系 task**
である。

この種の task は、
plan 主軸を壊さず、
今の文脈のまま小さく前進できるため、
queue 側で quick_win を付ける最初の実例として妥当である。
