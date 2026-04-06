# Operations Generation Rules

## 状態

このファイルは旧仕様です。

operations の生成規律は、generation / ranking / placement を分けず、
以下の spec に統合しました。

- notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md

---

## 統合理由

従来このファイルは、
issue / design から operations への変換ルールを中心に扱っていました。

しかし現行モデルでは、operations は以下を一体で扱います。

- candidate collection
- normalization
- generation 条件判定
- decomposition
- helper scoring
- ranking
- placement
- active / next / archive への出力

そのため、generation だけを独立正本として残すと
仕様が二重化し、Flow Control および operations rolling の現行設計と不整合になります。

---

## 現在の正本

operations rolling の正本は以下です。

- notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md

関連して参照すべき設計:

- notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
- notes/02_design/2026-04-06_operations_task_schema.md

---

## 扱い

- このファイルは移行メモとして保持する
- 新規仕様判断には使わない
- 更新は原則行わない
