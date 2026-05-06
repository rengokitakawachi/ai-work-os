# Operations Task Schema

## 1. 目的

operations task が保持する項目を定義し、
短期実行順の正本として必要な情報を安定して扱えるようにする。

本schemaは、以下との整合を目的とする。

- operations rolling
- daily / weekly review
- Todoist projection
- 将来の DB / metadata layer
- Outlook との責務分離

---

## 2. 基本方針

operations は短期実行順の正本である。

したがって、
operations task の主軸は

- 実行順
- rolling 上の配置
- 実行理由
- 出自

であり、
schedule そのものではない。

日付や〆切情報は持ってよいが、
それは実行順を支える補助情報として扱う。

---

## 3. schema

### 必須項目

- `task`
  - 実行する内容
  - 1タスク = 1つの明確な作業単位

- `source_ref`
  - 出自参照
  - notes / docs / code / report などへの参照を持つ

- `rolling_day`
  - Day0〜Day6 のどこに属するか
  - 7日ローリング上の仮配置

### 推奨項目

- `why_now`
  - なぜ今この task をやるのか
  - ranking の説明責任を補助する

- `notes`
  - 実行時の補足
  - 任意の短い説明

### 条件付き項目

- `target_date`
  - その task を主に進めたい日付
  - rolling_day より具体的な日付が必要な場合のみ持つ

- `due_date`
  - 期限または締切日
  - Todoist projection や priority 判断に使う

- `due_type`
  - `hard` / `soft`
  - hard = 明確な期限
  - soft = 目安期限

- `completion_criteria`
  - 完了条件
  - YES / NO 判定しやすい形が望ましい

- `status_note`
  - review 時の短い状態メモ
  - 常設必須にはしない

---

## 4. 各項目の意味

### task

task は、
operations の最小実行単位とする。

要件:

- 実行可能な粒度
- 明確な対象
- 曖昧すぎない表現

---

### source_ref

source_ref は必須とする。

役割:

- なぜこの task が存在するかを追える
- issue / design / plan / report との接続を保つ
- review や handover で再読しやすくする

---

### rolling_day

rolling_day は必須とする。

役割:

- 7日ローリング内の仮配置を示す
- 順位で選ばれた task を、どの day に置くかを表す
- schedule の時刻情報ではない

---

### target_date

target_date は任意とする。

役割:

- rolling_day より具体的な日付を持ちたい場合に使う
- Todoist の due や、レビュー時の目安に使える

注意:

- schedule の正本にはしない
- Outlook の start / end time は持たない

---

### due_date / due_type

due_date は任意だが重要な項目とする。

役割:

- priority 判断の補助
- Todoist projection の due 情報
- review での期限確認

due_type は以下を持つ。

- `hard`
  - 明確な締切
  - 遅れると問題になる

- `soft`
  - 目安日
  - 優先順位調整の参考

---

### why_now

why_now は推奨項目とする。

役割:

- なぜ今 active / next に入っているかを説明する
- ranking の判断を後で再確認できるようにする
- scoring knowledge の蓄積にも有効

---

## 5. 持たないもの

operations task は以下を主項目として持たない。

- start_time
- end_time
- calendar_slot
- schedule_owner

理由:

- schedule の正本は Outlook
- operations は実行順の正本
- 時刻を主に持つと責務が衝突する

---

## 6. Todoist projection との関係

operations task は Todoist へ投影されうる。

対応の考え方:

- `task` → Todoist title
- `due_date` → Todoist due
- `why_now` / `notes` → description の一部候補
- ranking / rolling 情報 → priority / labels へ補助反映候補

補足:

- Todoist は execution view
- operations が正本であり、Todoist は投影先とする

---

## 7. review との関係

daily / weekly review では以下を確認する。

- rolling_day が妥当か
- due_date が priority と整合しているか
- why_now がまだ成立しているか
- target_date が古くなっていないか

review は schema の全項目を毎回埋める場ではなく、
必要な項目だけ更新する場とする。

---

## 8. 記法例

```md
- operations_generation_rules を Flow Control と ranking model に合わせて更新する
  source_ref:
    - notes/02_design/operations_generation_rules.md
    - notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md
  rolling_day: Day2
  why_now:
    - operations 候補生成の旧モデルが残っており、現行設計と不整合
  due_date: 2026-04-08
  due_type: soft
  notes:
    - standard_development_flow_v2 と整合させる
```

---

## 9. 最小運用ルール

最初の運用では以下を最低限とする。

### active_operations

必須:

- task
- source_ref
- rolling_day

推奨:

- why_now
- notes

必要に応じて:

- due_date
- due_type
- target_date
- completion_criteria

### next_operations

必須:

- task
- source_ref

任意:

- why_now
- due_date
- due_type
- notes

補足:
next はまだ rolling_day を強く持たなくてもよい。

---

## 10. 一文定義

operations task は、
短期実行順の正本として、
実行内容・出自・rolling 上の配置を必須で持ち、
必要に応じて due / target_date / why_now を持つ。

---

## 11. 今後の拡張

- priority_rank の内部保持
- estimate / actual の時間記録
- Todoist projection 用の label / project 対応
- DB 用 metadata schema への展開
