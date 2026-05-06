# 2026-04-27 Branch Selector Runtime Schema Handover

## 目的

新スレッドへ移行するため、repoResource branch selector 実装と schema reflection の現在地を引き継ぐ。

handover は restart entry point であり、execution source of truth ではない。

再開時は、この handover だけで判断せず、必ず `active_operations` と参照ファイルを読むこと。

---

## 結論

repoResource branch selector は、main 上で次の層まで確認済み。

```text
code behavior: complete for main implementation
repo schema: complete
runtime-visible schema: complete
explicit branch read behavior: complete
explicit branch write behavior: not complete
docs reflection draft: complete
docs reflection: not complete
```

次にやるべき1つは次。

```text
explicit branch write behavior を harmless scoped file で確認する
```

---

## 重要な文脈

当初の active_operations / branch policy では、repoResource branch selector は feature branch 実装対象だった。

しかし会話中にユーザーが次を明示した。

```text
Mainでbranch selectorを実装しよう
```

このため、branch selector は例外的に main に実装済み。

active_operations にはまだ `repoResource branch selector を feature branch へ実装する` と書かれているため、再開時にこの文言だけで feature branch 実装に戻らないこと。

ただし operations は短期実行順の正本なので、再開時には active_operations を読み、必要ならこの例外実行結果を踏まえて operations rolling / archive / carryover を判断する。

---

## 完了済み作業

### main 整合分類

現 main の docs/code 不一致を分類し、current-main mismatch はなしと判断した。

保存済み:

- `notes/02_design/2026-04-27_main_alignment_repair_proposal.md`

結論:

```text
current-main mismatch: なし
main 直接修正: 不要
```

ただし、その後ユーザー判断により branch selector は main に実装されたため、後続で docs reflection が必要になった。

---

### feature branch 開始手順

feature branch target は次に固定済み。

```text
feature/atlas-pre-delta-foundation
```

保存済み:

- `notes/02_design/2026-04-27_feature_branch_start_procedure.md`

重要点:

- 手動 patch 適用は不採用
- main 直接 write 禁止対象を整理済み
- ただし branch selector はユーザー判断により main 実装へ例外変更済み

---

### branch selector code behavior

main に実装済み。

更新済み code:

- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `api/repo-resource.js`
- `api/repo-resource.test.js`

実装内容:

- `normalizeBranch()` を追加
- `getConfig(options)` に request-level branch を追加
- GET query `branch` を受け取る
- POST body `branch` を受け取る
- service 層へ branch options を伝播
- GitHub read / write / tree で branch を使用
- read / tree / write response に resolved branch を返す
- branch validation tests を追加

主な保存確認済み sha:

- `api/repo-resource.js`: `b7565cd69a021d21e6e28a95838890c70caa2bb8`
- `api/repo-resource.test.js`: `0e127395119d8ea1d5e7925aa414c945c754aadb`
- `src/services/repo-resource/common.js`: `afc06496c4451cf36bc5ae25e539374881e2f57e`
- `src/services/repo-resource/docs.js`: `b2fd7740f69429d370874ce328b2a279db115041`
- `src/services/repo-resource/notes.js`: `0098b89fb82c5d67a41e26049c4d12a7fc9c7ca1`
- `src/services/repo-resource/code.js`: `39a7a1322c2ff3911aafba1afa62cd1205f5ccc3`

---

### repo schema

`config/ai/adam_schema.yaml` は更新済み。

保存確認済み sha:

- `config/ai/adam_schema.yaml`: `b4f76b171ecf492e7bf24d8e336ba4da99313807`

反映内容:

- schema version `2.1.6` → `2.2.0`
- `repoResourceGet` GET parameter に optional `branch` を追加
- `RepoResourceWriteRequest` に optional `branch` を追加
- read / tree / bulk / write response schema に `branch` を追加

---

### runtime-visible schema

旧スレッドでは initially branch field が見えなかった。

ユーザーが新スレッドで確認し、次を報告した。

```text
repoResourceGet.branch: visible
repoResourceWrite.branch: visible
```

したがって runtime-visible schema は reflected と扱う。

ただし configured Action schema 自体は直接観測できないため、直接確認済みとは書かない。

実用上は runtime-visible schema confirmed とする。

---

### explicit branch read behavior

このスレッドで以下を実行済み。

```json
{
  "action": "read",
  "resource": "code",
  "file": "api/repo-resource.js",
  "branch": "main"
}
```

結果:

```text
ok: true
data.branch: main
```

これにより explicit branch read behavior は confirmed とする。

---

### docs reflection draft

`docs/10_repo_resource_api.md` への branch selector 反映案は作成済み。

保存済み:

- `notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md`

内容:

- branch 定義
- GET query parameter `branch`
- POST body field `branch`
- fallback: `branch` → `GITHUB_BRANCH` → `main`
- response `data.branch`
- bulk item `branch`
- branch validation
- docs read only 方針維持
- runtime-visible schema / behavior 層の区別

---

## 重要な記録 note

以下を必ず読むこと。

- `notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md`
- `notes/02_design/2026-04-27_docs_10_repo_resource_branch_selector_update_draft.md`
- `notes/02_design/2026-04-27_feature_branch_start_procedure.md`
- `notes/04_operations/active_operations.md`

特に reflection gap note の最新判定:

```text
code behavior: complete for main implementation
repo schema: complete
runtime-visible schema: complete
explicit branch read behavior: complete
explicit branch write behavior: not complete
docs reflection draft: complete
docs reflection: not complete
```

---

## 未完了

### explicit branch write behavior

未確認。

次に、harmless scoped file で branch 指定 write を確認する。

候補:

```text
notes/00_inbox/dev_memo/2026-04-27_branch_selector_write_probe.md
```

ただし、write 前に必ず Write Gate を出すこと。

推奨確認手順:

1. `branch: main` を明示して harmless scoped file を create
2. response に `branch: main` が返ることを確認
3. 同じ file を `branch: main` 指定で read
4. content と branch metadata を確認
5. 必要なら同 file を delete するか、probe record として残すか判断する

注意:

- delete は notes resource の `00_inbox/` 配下なら許可範囲
- delete する場合も read / impact 確認と Write Gate が必要
- branch write behavior を確認しても、docs reflection は別作業

---

### docs reflection

docs 本体はまだ更新していない。

`docs/10_repo_resource_api.md` は docs SSOT だが、API 上は read only として扱う。

反映案は notes に作成済みなので、人間判断後に docs 本体へ反映する。

---

### operations alignment

active_operations には今回の実行結果がまだ反映されていない。

再開後、以下のどちらかを判断する。

1. branch selector task を完了扱いに近づけ、未完了層だけを carryover する
2. operations rolling / archive で Day0-Day3 の完了状態を整理する

ただし operations 更新は daily review / reroll procedure に従うこと。

---

## 次スレッドの開始プロンプト案

```text
最新 handover と operations を読んで再開してください。

入口候補:
- notes/06_handover/2026-04-27_branch_selector_runtime_schema_handover.md
- notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md
- notes/04_operations/active_operations.md

注意:
- handover は restart entry point であり execution source of truth ではない
- operations を必ず読む
- branch selector はユーザー判断により main 実装済み
- runtime-visible schema と explicit branch read behavior は確認済み
- 次は explicit branch write behavior を harmless scoped file で確認する
- write 前に Write Gate を出す
```

---

## 次にやるべき1つ

```text
explicit branch write behavior を harmless scoped file で確認する
```

完了条件:

- `repoResourceWrite` に `branch` を明示して harmless write を実行する
- response に resolved branch が返る
- 同じ branch を指定して read し、content と branch metadata を確認する
- reflection gap note の `explicit branch write behavior` を complete に更新する
