# Classification and Routing Specification

## 状態

このファイルは旧仕様です。

classification と routing を 1 本の決定論的フローとして扱っていましたが、
現行モデルでは以下へ分離・再整理しました。

- intake routing
- issue routing
- conversation routing
- operations rolling
- review

そのため、この spec は現行の indexed notes 構造、Flow Control、conversation routing と不整合があります。

---

## archive 理由

従来このファイルは、

- knowledge
- issue
- task
- hold

の一次判定と、
保存先・フローを 1 対 1 に固定していました。

しかし現行モデルでは、少なくとも以下が一致しません。

- `notes/knowledge` `notes/issues` など、現行 notes 構造にない保存先を前提としている
- `task → operations 直` を含み、会話起点論点を原則 issue で受ける現行方針とずれる
- review / routing 分離前の世界観が残っている
- Flow Control 上の usecase 分離と整合しない

このため、現行 design の正本として update するよりも、
旧仕様として archive し、現在の正本参照先を明示する方が安全である。

---

## 現在の正本

routing / operations 周辺の現行設計は以下を参照する。

- notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
- notes/02_design/2026-04-07_conversation_triggered_candidate_routing_and_rolling.md
- notes/02_design/intake_review_and_source_ref_spec.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/02_design/2026-04-06_operations_rolling_generation_and_prioritization_spec.md

---

## 扱い

- このファイルは移行メモとして保持する
- 新規仕様判断には使わない
- 更新は原則行わない
