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

以下を満たすもののみ operations に入る：

- 今やる意味がある（why_now）
- 実行可能粒度である
- 依存関係が致命的に未解決でない
- 優先順位理由を説明できる

---

### 3.3 重みづけ

各候補に以下を付与する：

- plan_link（high / medium / low）
- blocker（yes / no）
- quick_win（yes / no）
- dependency（high / medium / low）
- why_now（必須）

---

### 3.4 配置

重みづけ結果に基づき配置する：

- active_operations
- next_operations
- issue
- future

---

## 4. 案件分類

A / B / C は性質分類であり、配置には直接使用しない。

- A: plan / roadmap 直結
- B: 支援・前提整備
- C: 保留・将来候補

配置は必ず重みづけで決める。

---

## 5. 配置ルール

### active

- plan_link が高い
- または blocker 解消に直結
- または quick_win で流れを改善

### next

- 今すぐではないが近い将来やる
- active の後続候補

### issue

- まだ判断が粗い
- 粒度が大きい
- 今やる理由が弱い

### future

- 現phase外
- 中長期

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
- 配置は分類ではなく重みづけで決める
- C案件も重み次第で active / next に入る

---

## 8. 今後の拡張

- 重みづけのスコア化
- 自動候補抽出
- review 連携の自動化
