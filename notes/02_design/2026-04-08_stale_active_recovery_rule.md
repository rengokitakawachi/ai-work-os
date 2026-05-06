# Stale Active Recovery Rule

## 目的

active-first execution 原則の運用中に、
`active_operations.md` の先頭 task が stale になっている場合の扱いを定義し、
operations 正本と実行順の整合を維持する。

---

## 背景

active-first execution では、
実行対象を `active_operations.md` の先頭から取る。

しかし実運用では、
handover / archive / active の反映タイミング差や、
再構築済み task の残留により、
active 先頭がすでに完了済みまたは置換済みである可能性がある。

この状態で、
active の先頭をそのまま実行すると、
「active の先頭を実行している」ように見えても、
実際には stale な正本に従っていることになる。

---

## 結論

active 先頭 task が stale と判断された場合は、
新規 task の実行や reroll に入る前に、
先に `active_operations.md` の整合回復を行う。

その後、
整合回復後の先頭 task を現時点の実行対象とする。

---

## stale の定義

以下のいずれかを満たす場合、
active 先頭 task を stale とみなす。

- handover では完了扱いだが active に残っている
- archive へ退避済みだが active に残っている
- 同一目的の再構築後 task に置換済みである
- 現行 design / instruction / operations の前提から見て、すでに役目を終えている

---

## 基本ルール

- stale active を見つけたら、そのまま次作業に進まない
- 先に active 正本の整合回復を行う
- 整合回復は reroll と同義ではない
- 整合回復は「正本修復」の前処理とする
- 新規候補が発生していない限り、整合回復後は reroll を必須にしない
- 整合回復後の先頭 task を現行の実行対象とする

---

## reroll との関係

### stale active 整合回復

目的:
- 既存 active 正本の不整合を直す

対象:
- すでに active に入っている task

性質:
- 修復
- 前処理
- 優先順位の再構築ではない

### reroll before execution

目的:
- 新規候補が発生したときに、
  active / next / future の配置を再判断する

対象:
- 新規 candidate と既存候補群

性質:
- 再配置
- 優先順位判断
- rolling usecase

---

## 実行フロー

```text
再開 / 実行開始
↓
latest handover / related notes / operations 確認
↓
active 先頭に stale があるか確認
↓
yes:
  active 正本の整合回復
  ↓
  整合回復後の先頭 task を確認
↓
新規候補があるか確認
↓
yes:
  reroll 提案
no:
  先頭 task を実行
```

---

## 適用タイミング

- handover から再開した直後
- 実行開始前に active 先頭へ違和感があるとき
- archive / handover / active の整合を確認した結果、置換残りが見つかったとき

---

## 保存先の考え方

- 再利用価値があり、まだ issue / design に上げきれない観察のみ dev_memo に残す
- 再発防止ルールとして説明価値がある場合は design に昇格する
- docs 反映は、複数回の運用観察後に判断する

---

## 今回の位置づけ

このルールは、
active-first execution 原則を補強する補足ルールである。

現時点では docs へ即反映せず、
まず design として保持し、
conversation routing / execution governance の試験運用結果と合わせて評価する。

---

## 一文定義

stale な `active_operations.md` 先頭 task を見つけた場合は、
新規実行や reroll に入る前に、
先に active 正本の整合回復を行い、
その後の先頭 task を実行対象とする。
