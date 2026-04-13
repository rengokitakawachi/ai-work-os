# 2026-04-13 handover_entry_and_active_head_interpretation_rule

## 目的

`latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する`
の成果物として、
handover と active_operations の使い分けを固定する。

本メモは、
- 新スレッド再開時に handover をどう使うか
- 日々の同一スレッド内の再開では何を正本として読むか

を分けて整理するためのものである。

---

## 結論

結論は次の通り。

### 新スレッド再開時

1.
latest handover を読む

2.
関連 docs / notes / code を読む

3.
active_operations を読む

4.
active 先頭 task を現在の実行対象として確定する

### 日々の同一スレッド内の再開時

1.
active_operations を読む

2.
active 先頭 task を現在の実行対象として確定する

3.
必要に応じて関連 design / issue / report を補助参照する

つまり、

- handover は新スレッド再開時の入口
- active_operations は短期実行順の正本

である。

---

## 役割分離

### handover

handover は新スレッド再開時の入口である。

役割

- 前回セッションの要約
- 何が進んだか
- 何が未解決か
- どこを読めばよいか
- 再開時の注意点

handover は、
新しい会話スレッドで文脈を再接続するために使う。

### active_operations

active_operations は短期実行順の正本である。

役割

- 今どの順で何を進めるかを示す
- 実行対象を一意に定める
- 日中運用の基準になる

したがって、
「実際に何をやるか」は
常に active_operations で確定する。

---

## 新スレッド再開時の基本フロー

```text
latest handover
↓
関連 source を読む
↓
active_operations を読む
↓
active 先頭 task を現在の実行対象とする
↓
必要なら issue / design / next を補助参照する
```

重要なのは次。

- handover を読んだだけで task を確定しない
- handover の next action をそのまま実行対象にしない
- active を読んでから確定する

---

## 日々の同一スレッド内の再開フロー

```text
active_operations
↓
active 先頭 task を現在の実行対象とする
↓
必要なら関連 design / issue / report を補助参照する
```

重要なのは次。

- 同一スレッド内の日々の再開では latest handover を使わない
- handover は日々の再開の正本ではない
- その場の実行判断は active 先頭で確定する

---

## handover の next action の解釈

handover に書かれた next action は、
新スレッド再開時に次のどちらかとして読む。

### 1. active 先頭 task の説明

handover の next action が、
現行 active の先頭と一致する、
または実質的に同じ意味なら、
active 先頭 task の説明として読む。

この場合、
実行対象は active 先頭 task である。

### 2. stale な再開メモ

handover の next action が、
現行 active と一致しない場合は、
そのまま実行対象にしない。

この場合は、

- その handover は当時の再開候補を示していた
- その後 daily review や reroll で active が更新された

と解釈する。

つまり、
handover の next action は stale になりうる。

---

## 競合時のルール

handover の next action と active 先頭が競合した場合は、
次で判断する。

### 原則

- active 先頭を優先する

理由

- short-term execution order の正本は active_operations だから

### 例外

- active が壊れている
- active が古い
- active に重複がある
- active 先頭が実行不能
- handover 側に新しい整合回復情報がある

この場合のみ、
整合回復として reroll または確認を行う。

ただし、
handover に書いてあるだけでは例外にしない。

---

## 何をその場で実行してよいか

### 新スレッド再開時

- active 先頭 task
- active 先頭 task に必要な source 読取
- active 先頭 task の成果物作成

### 日々の同一スレッド内の再開時

- active 先頭 task
- active 先頭 task に必要な source 読取
- active 先頭 task の成果物作成

再開後すぐにやってはいけないのは次。

- handover の next action を理由に active 外 task を実行する
- next の task を横入りで実行する
- issue を見つけてすぐ active 扱いする
- reroll を飛ばして順番を変える

---

## issue / next / design の使い方

再開時にこれらは補助的に使う。

### issue

- active の背景論点確認に使う
- 新しい論点の起点確認に使う

### next

- active が壊れている場合の候補確認に使う
- reroll 時の素材として使う

### design

- active 先頭 task を進めるための構造理解に使う

ただし、
どれも active より先に実行対象を決める材料にはしない。

---

## 最小ルール

- handover は新スレッド再開時の入口
- 日々の同一スレッド内の再開では handover を使わない
- active_operations は短期実行順の正本
- 新スレッド再開時は handover → related sources → active の順で読む
- 日々の再開時は active から読む
- 実行対象は active 先頭で確定する
- handover の next action は説明または stale メモとして扱う
- 競合時は active 優先
- 例外は active の整合回復時のみ

---

## この整理で防げる誤り

- 日々の再開で latest handover を読み始める
- handover の next action をそのまま実行してしまう
- active を読まずに前回の流れを再開してしまう
- next や issue を見て横入り実行してしまう
- handover と active の役割を混同する

---

## 判断

再開品質を安定させるには、
- handover を新スレッド再開の入口
- active_operations を実行正本

として明確に分ける必要がある。

したがって、

- 新スレッド再開時は handover から入る
- 日々の作業再開時は active から入る

が正しい。
