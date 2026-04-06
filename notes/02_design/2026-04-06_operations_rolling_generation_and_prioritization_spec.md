# Operations Rolling Generation and Prioritization Spec

## 1. 概要

本specは、operations（短期実行順）の生成規律と優先順位づけを定義する。

目的：

- operations を「並べるもの」から「生成されるもの」へ進化させる
- roadmap / plan との接続を強化する
- 実行結果を上位へ返す構造を持たせる

---

## 2. Operations の定義

operations は以下とする：

- 上位計画（roadmap / plan）を短期実行へ落とす
- 実行結果を上位へ返す

```text
operations = 上位計画を実行に落とし、
実行結果で上位計画を更新する短期実行正本
```

---

## 3. 生成フロー

operations は以下の順で生成される。

### 3.1 候補抽出

候補元：

- plan
- issue
- design
- dev_memo
- 会話
- review

---

### 3.2 operations 化判定

以下を満たすものを候補とする：

- 実行可能粒度である
- 明確な対象を持つ
- 完全に不明確ではない

※「今やるべきか」はここでは判定しない

---

### 3.3 スコア補助生成

各候補に対して補助情報を付与する：

- plan_link
- blocker
- quick_win
- dependency
- urgency
- importance
- why_now

※これは優先順位の補助であり、決定ロジックではない

---

### 3.4 優先順位づけ

候補を以下に基づき並べる：

- スコア補助
- 文脈（phase / 今週の重点 / 状況）
- ADAM の判断

```text
candidates
↓
ranking（相対順位）
```

---

### 3.5 配置（7日枠）

```text
ranking 上位から順に採用
↓
7日枠に入るもの
= active_operations

残りの上位
= next_operations
```

---

## 4. 案件分類

A / B / C は性質分類であり、優先順位には直接使用しない。

- A: plan / roadmap 直結
- B: 支援・前提整備
- C: 保留・将来候補

配置は必ず順位で決める。

---

## 5. 配置モデル

配置は固定ルールではなく、相対順位によって決定する。

### 原則

```text
配置 = 順位と枠によって決まる
```

- active は「7日枠に入った集合」
- next は「その次の候補集合」
- issue / future は順位と状態によって判断

---

## 6. review 返却

operations 実行後は以下へ返却する：

- plan 更新
- roadmap 補正候補
- issue close / split
- design 更新

---

## 7. 重要原則

- operations は上位から生成される
- 同時に、下位から上位へ返す
- 配置は固定条件ではなく相対順位で決める
- スコアは補助であり決定ではない
- C案件も順位次第で active / next に入る

---

## 8. 今後の拡張

- スコアリングの定量化
- 自動候補抽出
- review 連携の自動化
