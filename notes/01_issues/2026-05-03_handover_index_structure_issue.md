# handover index / monthly folder structure issue

## id

20260503-035

## title

handover 一覧取得のレスポンス過大を防ぐため latest index と月別フォルダ構成が必要

## category

operations

## status

open

## created_at

2026-05-03

## description

`notes/06_handover/` 直下の handover が増えると、再開時に一覧取得や tree 取得を行った際にレスポンスが過大になり、最新 handover の特定が不安定になる。

この問題を避けるため、handover を月別フォルダへ分割し、最新 handover へ小さい read で到達できる `latest.md` ポインタを導入する必要がある。

## context

2026-05-03 の再開確認で、`notes/06_handover/` 配下の一覧取得がレスポンス過大で失敗した。

history / direct read による迂回で最新 handover は特定できたが、再開手順としては重く、不安定である。

月別フォルダ化だけでは最新ファイル特定に tree / history / search が残るため、`latest.md` を併用するのが自然と判断した。

## proposed_structure

```text
notes/06_handover/
  handover_template.md
  latest.md
  handover_index.md
  2026/
    04/
      2026-04-29_phase0_hardening_resume_handover.md
    05/
      2026-05-03_delta_v0_6_readiness_handover.md
```

## expected_behavior

- 再開時は `notes/06_handover/latest.md` を小さく read する
- `latest.md` は最新 handover へのポインタであり、全文コピーにしない
- latest handover を読んだ後、必ず `notes/04_operations/active_operations.md` を読む
- handover は restart entry point であり execution SSOT ではない
- execution SSOT は常に `notes/04_operations/active_operations.md`

## completed_condition

- `notes/06_handover/latest.md` の形式を決める
- `notes/06_handover/YYYY/MM/` 構成を採用するか判断する
- 既存 handover の移動方針を決める
- `handover_index.md` が必要か判断する
- handover 作成 procedure に latest 更新を組み込むか判断する
- 移動 / 作成 / 更新を行う場合は Write Gate 後に実行する
- 更新後に read-back し、latest pointer と actual file path の整合を確認する

## source_ref

- notes/06_handover/handover_template.md
- notes/06_handover/2026-05-03_delta_v0_6_readiness_handover.md
- notes/04_operations/active_operations.md
