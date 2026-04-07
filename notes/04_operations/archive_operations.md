# archive_operations

## 概要

今週の完了タスクを一時的に保持する。

`archive_operations` は、
weekly review までの短期履歴置き場であり、
長期保存の正本ではない。

---

## 位置づけ

- 今週の一時アーカイブ
- weekly review 前の退避先
- 99_archive へ保存する前段

---

## タスク

- `2026-04-05_operations_next_archive_snapshot_model.md` を operations 正本構造の採用案として固定した
- operations 実体の移行差分を洗い出した
- `next_operations.md` を作成した
- `archive_operations.md` を作成した
- `standby_operations.md` を廃止した
- `config/ai/adam_instruction.md` の operations 利用ルールを最小差分で更新した
- `docs/15_notes_system.md` を新 operations モデルへ更新した
- `docs/17_operations_system.md` を新 operations モデルへ更新した
- `operations_generation_rules.md` の役割を rolling spec へ統合し、`notes/99_archive/design/operations_generation_rules.md` へ移動した

--- 再構築に伴うアーカイブ ---

- active_operations を schema 準拠で再構築した（再構築により置換）
- next_operations を schema 準拠で再構成した（旧版・再構築前）
- Flow Control / routing / operations の整合を確認した（初期整合作業）
- future_layer_operating_spec に残る旧用語修正（進展済み）
- standard_development_flow_v2 更新（進展済み）

---

## ルール

- 完了タスクを必要に応じてここへ移す
- weekly review で内容を整理せず、そのまま snapshot 保存する
- 保存先は `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` とする
- snapshot 保存後は空にする
- 長期履歴の正本は 99_archive 側とする
