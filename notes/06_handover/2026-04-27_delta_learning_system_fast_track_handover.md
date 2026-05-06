# Handover

## 概要

新スレッド ADAM_0426 への引き継ぎ。

delta 学習支援システムを AI Work OS の開発計画に取り込むための operations candidate を保存する。

delta は、2026-08-23 の社会保険労務士試験に向けた学習支援 system である。
ChatGPT 5.5 を UI とし、学習履歴は GitHub に保存する。
長期 roadmap / 中期 plan / 日々の operations / 学習履歴 / review を持ち、進捗に応じて plan と operations を更新する。

---

## 成功（Success）

- ADAM / EVE の My GPT 反映用 config は整理済み
  - `config/ai/adam_instruction.md`
  - `config/ai/adam_schema.yaml`
  - `config/ai/adam_knowledge.md`
  - `config/ai/eve_instruction.md`
  - `config/ai/eve_schema.yaml`
  - `config/ai/eve_knowledge.md`
- `common_*` / `procedures/*` / `*_mygpt_instruction.md` は削除済み
- `dialogue.md` / `from-adam.md` / `from-claude.md` は残す方針
- delta の fast-track architecture design は保存済み
  - `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md`

---

## 判明事項（Findings）

- Adam/EVE は現状ほぼ一体的に開発しているため、分けずに `core_system` として扱う
- ADAM は controller / developer / governance
- EVE は work assistant / execution partner
- delta は `core_system` とは独立した domain system として扱う
- future systems が増える可能性があるため、delta から `systems/{system_id}/` 構造を採用する
- common は薄い platform kernel とする
- routing / planning / operations rolling / review は common に丸ごと置かない
- common には base interface と primitive だけ置く
- 学習固有の判断は delta adapter / delta instruction / delta schema に置く

---

## 失敗 / 未解決（Issues）

- delta design は保存済みだが、まだ active / next / future に placement されていない
- delta は design 保存だけで完了扱いにしない
- completed condition は、delta の初期 roadmap / plan / operations が作られ、実運用開始できる状態
- 2026-08-23 の社会保険労務士試験に向けた期限駆動案件のため、future に寝かせる判断は慎重に扱う

---

## 次のアクション（Next Actions）

ADAM_0426 で実行すること:

1. `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md` を読む
2. current `active_operations.md` / `next_operations.md` / Phase 0 plan と比較する
3. delta を operations candidate として reroll に入れる
4. active / next / future のどこに置くか判断する
5. 可能なら短期で以下の task を切る
   - `delta MVP resource layout を作る`
   - `delta 社労士試験向け initial roadmap / plan / operations を作る`
   - `delta learning history daily log template を作る`
6. design 保存だけで完了扱いにせず、delta の初期 roadmap / plan / operations が作られ、実運用開始できる状態を completed condition として扱う

operations candidate 案:

- task: delta 学習支援システムの fast-track architecture を開発計画に取り込む
  source_ref:
    - notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
    - docs/13_dev_workflow.md
    - docs/15_notes_system.md
    - docs/17_operations_system.md
  due_date: 2026-04-28
  due_type: date
  why_now:
    - 2026-08-23 の社会保険労務士試験に向けた期限駆動案件である
    - delta は future system ではなく、短期で MVP 設計と手動運用開始が必要である
    - Adam/EVE instruction/schema 再層化と同じ common/platform 論点に直結するため、現行 Phase 0 と接続できる
  completed_condition:
    - delta の配置が active / next / future のいずれかに決まっている
    - delta MVP の最初の実行 task が operations に入っている
    - 2026-08-23 試験日から逆算した初期 roadmap / plan / operations 作成 task が切れている

---

## 関連docs

- docs/13_dev_workflow.md
- docs/15_notes_system.md
- docs/17_operations_system.md

---

## 関連code

- config/ai/adam_instruction.md
- config/ai/adam_schema.yaml
- config/ai/adam_knowledge.md
- config/ai/eve_instruction.md
- config/ai/eve_schema.yaml
- config/ai/eve_knowledge.md

---

## 関連notes

- notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md
- notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md

---

## 状態サマリ

- API：ADAM / EVE schema は今回は更新なし
- docs整合：delta は docs 反映前。まず design / operations placement が必要
- notesフロー：delta design は保存済み。次は operations candidate として reroll 対象にする

---

## 引き継ぎプロンプト

この handover を読み込んで、関連 docs / notes / operations を取得し、delta 学習支援システムを operations candidate として reroll に入れてください。

特に `notes/02_design/2026-04-27_delta_learning_system_fast_track_architecture.md` を読み、current active_operations / next_operations / Phase 0 plan と比較したうえで、delta を active / next / future のどこに置くか判断してください。

design 保存だけで完了扱いにせず、delta の初期 roadmap / plan / operations が作られ、実運用開始できる状態を completed condition としてください。
