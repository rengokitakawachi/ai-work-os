# Future Layer Operating Spec

## 目的

future レイヤーの役割と運用方針を定義する。

future は単なる保管レイヤーではなく、
時間軸に基づいて要素を配置するためのレイヤーとして扱う。

---

## 定義

### future

future は、

「現時点では active ではないが、将来のどこかで扱う可能性がある要素」

を保持する時間軸レイヤーである。

重要なのは、

- やる / やらない
ではなく
- いつ扱うか

で分類することである。

---

## 位置づけ

```text
active layers
↓
future
↓
archive
```

- active layers: 今扱っているもの
- future: 将来扱う可能性があるもの
- archive: 役目を終えたもの

---

## 構造

```text
notes/80_future/
  inbox/
  issue/
  design/
  plan/
```

### future/inbox
- 将来向け未整理入力

### future/issue
- 将来扱う課題

### future/design
- 将来扱う設計

### future/plan
- 将来実行する計画

---

## routing との関係

future は routing の結果として自然に現れる。

intake routing / issue routing の結果として、

- 現在の phase / 優先順位では扱わない
- しかし将来扱う可能性がある

と判断された要素は future に配置される。

---

## operations との関係

future は、

operations 候補にならなかった要素の主要な行き先である。

つまり：

- operations rolling に入らない
- しかし discard もしない

その中間として future に配置する。

---

## 判定基準

### future に送る

- 今は active にしない
- operations に入らない
- 将来扱う可能性がある
- 前提条件待ち
- phase が異なる

### archive に送る

- 完了した
- 置き換えられた
- 役目を終えた

---

## 再活性化

future から active に戻す際は、

必ず routing または review を通す。

### inbox

future/inbox  
→ intake routing 再実行

### issue / design

future/issue / design  
→ routing / design review

### plan

future/plan  
→ weekly / monthly review

---

## review との関係

review は future と active の境界を調整する。

- weekly review: plan / operations / future の調整
- monthly review: phase / roadmap と future の整合

---

## 原則

- future は「今やらない箱」ではない
- future は時間軸による配置レイヤーである
- future から直接 operations へは送らない
- 必ず routing または review を通す
