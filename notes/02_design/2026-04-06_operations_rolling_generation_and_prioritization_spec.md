# Operations Rolling Generation and Prioritization Spec

## 1. 概要

本specは、operations（短期実行順）の生成・優先順位づけ・配置を一体として定義する。

目的：

- operations を「並べるもの」から「生成されるもの」へ進化させる
- roadmap / plan / issue / design / input と短期実行を接続する
- 実行結果を上位へ返す構造を持たせる
- Flow Control 上の usecase として一貫した処理モデルを確立する

---

## 2. 位置づけ

operations rolling は Flow Control 上の usecase とする。

```text
Flow Control
↓
operations rolling（本spec）
```

---

## 3. Operations の定義

operations は以下とする：

```text
operations = 上位計画を実行に落とし、
実行結果で上位計画を更新する短期実行正本
```

---

## 4. 全体フロー

operations は以下の一連処理で生成される。

```text
candidate collection
↓
normalization
↓
rule evaluation（generation条件）
↓
decomposition（必要に応じて）
↓
helper scoring
↓
ranking（相対順位）
↓
placement（7日枠）
↓
active / next / archive 出力
```

---

## 5. candidate sources

候補は以下から生成される：

- plan
- issue
- design
- dev_memo
- 会話
- review
- inbox（必要に応じて）

---

## 6. normalization

候補に対して以下を行う：

- source_ref 付与
- 構造整形
- 重複排除
- 最低限の型揃え

---

## 7. generation 条件

以下を満たすものを operations 候補とする：

- 実行可能粒度である
- 明確な対象を持つ
- 完全に不明確ではない

※「今やるべきか」はここでは判定しない

---

## 8. decomposition（分解ルール）

必要に応じて候補を分解する：

- 1 task = 1つの明確な作業単位
- 複数の作業が含まれる場合は分割する
- 分割後も source_ref を保持する

---

## 9. future 送付条件

以下の場合は operations に含めず future に送る：

- 現 phase / 次期 phase の対象ではない
- 前提条件が未整備
- 今扱うと premature になる
- 実行粒度に落とせない

---

## 10. helper scoring（補助情報）

各候補に以下を付与する：

- plan_link
- blocker
- quick_win
- dependency
- urgency
- importance
- why_now

※スコアは補助であり決定ではない

---

## 11. ranking（優先順位づけ）

候補を以下に基づき並べる：

- helper scoring
- 文脈（phase / 今週の重点 / 状況）
- ADAM の判断

```text
candidates
↓
ranking（相対順位）
```

原則：

- スコアは補助であり決定ではない
- 優先順位は相対順位で決める
- A / B / C 分類は直接使用しない

---

## 12. placement（7日枠）

```text
ranking 上位から順に採用
↓
7日枠に入るもの
= active_operations

残りの上位
= next_operations
```

---

## 13. active / next / archive

- active
  - 7日枠に入った集合

- next
  - active に入らなかった上位候補

- archive
  - 完了タスクの一時保存

---

## 14. task schema

各 task は以下を持つ：

必須：

- task
- source_ref
- rolling_day

推奨：

- why_now

任意：

- due_date
- due_type
- target_date
- notes
- completion_criteria

---

## 15. 粒度ルール

- 実行可能であること
- 1セッションで進められる粒度を基本とする
- 曖昧な表現を避ける

---

## 16. review 返却

operations 実行後は以下へ返却する：

- plan 更新
- roadmap 補正候補
- issue close / split
- design 更新

---

## 17. 重要原則

- operations は上位から生成される
- 同時に、下位から上位へ返す
- generation / ranking / placement は一体処理
- 配置は固定条件ではなく相対順位で決める
- C案件も順位次第で active / next に入る

---

## 18. 禁止事項

- generation のみで operations を確定しない
- スコアのみで順位を決定しない
- future 判定を省略しない
- ranking を固定ルール化しない
- placement を感覚で行わない

---

## 19. 今後の拡張

- スコアリングの定量化
- 自動候補抽出
- ranking 補助の高度化
- review 連携の自動化
