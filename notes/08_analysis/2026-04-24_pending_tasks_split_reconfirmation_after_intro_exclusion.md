# 2026-04-24 pending_tasks_split_reconfirmation_after_intro_exclusion

## 目的

`pending_tasks` split で `概要` を除外する最小差分の実装後に、
未達だった導入 / メタ section 問題が閉じたかを軽く再確認する。

本メモは、
大きな再観測ではなく、
直前の未達が解消したかだけを確認するための軽量メモである。

---

## 参照

- `notes/08_analysis/2026-04-24_pending_tasks_split_reobservation.md`
- `notes/02_design/2026-04-24_pending_tasks_intro_and_meta_section_exclusion_rule.md`
- `src/services/flow-control/adapters.js`

---

## 実装差分

`src/services/flow-control/adapters.js` の
`isExcludedPendingTasksSection(title)` に
`概要` が追加された。

現行の除外対象は次である。

- `概要`
- `まとめ`
- `summary`

---

## 再確認結果

### 1. 導入 / メタ section 除外

前回未達:
- `概要` が item 化されていた

現状態:
- `概要` は除外対象に入った

判断:
- **導入 / メタ section 除外の最小未達は閉じた**

---

### 2. 1テーマ1メモ

見立て:
- `概要` が落ちたことで、split 後 item はより具体論点に寄る
- 少なくとも導入ノイズで issue item 数が増える問題は減る

判断:
- **1テーマ1メモ性は前回よりさらに改善した**

---

### 3. route / source_ref / role boundary

見立て:
- 今回の差分は除外 title の追加のみであり、route 判定ロジック自体は変えていない
- source_ref 構造も unchanged
- adapter に閉じた差分なので role boundary も維持される

判断:
- **route / source_ref / role boundary は前回評価どおり維持**

---

### 4. 残る論点

今回の差分で閉じたのは
導入 / メタ section 除外だけである。

まだ残る論点は次である。

- split 後の元 inbox を archive に移すか pending に残すかの rule

これは adapter 差分ではなく、
inbox 後処理ルールの task として扱うのが自然である。

---

## 結論

`概要` を除外する最小差分により、
前回再観測で見つかった

- 導入 / メタ section が item 化される

という未達は閉じたとみてよい。

この時点で `pending_tasks` split は、
最小粒度改善としては十分に成立している。

残る主論点は、
粒度ではなく
**split 後の元 inbox の archive / pending rule**
である。

---

## 次にやるべき1つ

- `pending_tasks 型 split 後の inbox archive / pending rule を整理する`
