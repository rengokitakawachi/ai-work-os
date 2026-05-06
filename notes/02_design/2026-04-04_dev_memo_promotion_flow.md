# dev_memo → design promotion flow

## 結論

- dev_memo → design は routing として扱う
- design → docs は review（design review）で扱う
- 昇格タイミングは weekly review を基本とする

---

## 背景

dev_memo は思考の中間生成物であり、
放置すると蓄積し、検索性・再利用性が低下する。

一方で、すべてを即 design 化するとノイズが増える。

そのため、
- 即時昇格
- 定期昇格
の2レイヤーで扱う必要がある。

---

## フロー

### 即時

- 明らかに重要な dev_memo
- 他レイヤーに影響する
- 判断ルールになりうる

→ routing により design へ昇格

---

### 定期（weekly review）

- dev_memo を棚卸し
- 昇格候補を抽出

判定
- design へ昇格
- future へ送る
- archive

---

### monthly（design review）

- design 群を整理

判定
- docs 昇格
- 継続
- future
- archive

---

## 判断基準（dev_memo → design）

- 他の処理に影響する
- 再利用される
- 判断ルールになる
- docs 候補になる

---

## 設計原則

- routing と review を混在させない
- dev_memo は未精製の設計
- design は精製済みの設計

---

## 一言

設計は「生成」ではなく「昇格」で作る
