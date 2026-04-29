# 2026-04-30 issue_log append overwrite regression analysis

## 結論

`notes/01_issues/idea_log.md` は、`<<APPEND>>` を content として `update` に渡したことで、過去ログ全体ではなく append 断片で上書きされた可能性が高い。

これは正本相当の issue log を欠損させる重大事故である。

2026-04-30 時点で、`idea_log.md` は repo history 断片から復元済みである。

---

## 直接原因

`repoResourceWrite(action=update)` は file content を完全置換する API である。

にもかかわらず、ADAM は `content: "<<APPEND>>\n\n..."` を append 命令として API が解釈すると仮定した。

現行 code では `updateNote(file, content, ...)` は `putContentFile(path, content, ...)` に直結し、content の特殊 marker を解釈しない。

つまり `<<APPEND>>` は append directive ではなく、単なる本文として保存される。

---

## 根本原因

- API behavior を観測せず、擬似 directive を使った
- write 前に API contract を確認しなかった
- `update` が full replacement であることを軽視した
- issue log のような蓄積型ファイルに対して、read → full content merge → update の原則を徹底しなかった
- GPT-5.5 最適化後に、過去に自然に守れていた慎重な write discipline が弱くなった可能性がある

---

## 再発防止

### Immediate rule

`<<APPEND>>` のような未実装 pseudo command を API content に入れてはならない。

append が必要な場合は、次のどちらかのみ許可する。

1. API と schema に正式な `append` action を実装し、runtime behavior を確認する
2. target file を read し、assistant 側で全文を合成して `update` する

### Rule placement

これは再発防止かつ正本整合に関わる write gate なので、instruction 対象である。

Knowledge には詳細 procedure を置く。

---

## 実装済み API capability

repoResourceGet に以下を追加した。

- `history`
  - file の commit history を取得する
- `show`
  - 指定 ref / commit における file content を取得する
- `compare`
  - branch / commit 間の差分概要を取得する
- `diff`
  - `compare` と同じ実装へ routing する alias
- `search`
  - GitHub code search API による補助検索
- `grep`
  - GitHub tree / blob を直接読んで行単位検索する read-only grep

復旧には `history` と `show` を使用した。

追加欠落調査には `grep` を使用した。

---

## Recovery result

`notes/01_issues/idea_log.md` は復元済み。

復元後 sha:

```text
b83f8b96743496c71834244b0a69131ae9c89065
```

復元内容:

- `# idea_log` から始まる正規構造に戻した
- `<<APPEND>>` marker を除去した
- `20260326-003` から `20260430-034` まで復元した
- `20260425-030` は daily report / archive_operations に従い closed として復元した
- `20260423-028` は open のまま維持した
- `20260430-031` から `20260430-034` を維持した

補完しなかったもの:

- `20260403-004`
- `20260409-014`

理由:

- repo history 上で内容確認できなかったため
- 欠番を推測で補完しないため

---

## Additional APPEND damage scan

`repoResourceGet resource=repo action=grep` を実装し、`notes/` 配下を層別に direct grep した。

検索語:

```text
<<APPEND>>
```

結果:

- `notes/00_inbox/`: 0件
- `notes/01_issues/`: 0件
- `notes/02_design/`: 0件
- `notes/03_plan/`: 0件
- `notes/04_operations/`: 0件
- `notes/05_decisions/`: 0件
- `notes/06_handover/`: 1件
- `notes/07_reports/`: 0件
- `notes/08_analysis/`: 4件
- `notes/09_content/`: 0件
- `notes/10_logs/`: 0件
- `notes/80_future/`: 0件
- `notes/99_archive/`: 0件

検出された 5 件は、すべて事故説明または再発防止ルール本文である。

未復元の `<<APPEND>>` 断片は確認されていない。

---

## Other file checks

重点確認したファイル:

- `notes/04_operations/archive_operations.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/06_handover/2026-04-30_phase0_hardening_next_resume_handover.md`

判断:

- `archive_operations.md` は過去日次分が連続して残っており、append 断片上書きの兆候はない
- `active_operations.md` は reroll / gate 更新履歴であり、APPEND 断片化の兆候はない
- `next_operations.md` は reroll / candidate 追加履歴であり、APPEND 断片化の兆候はない
- handover は `<<APPEND>>` 補足だけになる事故があったが、完全版へ復元済み

---

## Current severity

severity: high

理由:

- issue log は今後の routing / review / operations candidate source の一部である
- 欠損したまま追記すると、欠損状態が canonical として固定される
- regression analysis にも issue log history が必要になる

現在の状態:

- known data damage: recovered
- additional notes scan: no unrecovered APPEND fragment found
- prevention rule: instruction reflected
- repo capability: code implemented and actual behavior confirmed for history / show / grep

---

## Remaining gates

完了扱いにする前に残る gate:

- `config/ai/adam_schema.yaml` に repo history / show / compare / search / grep を反映する
- configured Action schema に反映する
- runtime-visible schema に repo action が表示されることを確認する
- `docs/10_repo_resource_api.md` に repo history / show / compare / grep を反映する
- `repo/search` は GitHub code search の false negative があり得るため、APPEND 調査では `repo/grep` を優先する

---

## Source refs

- notes/01_issues/idea_log.md
- notes/06_handover/2026-04-30_phase0_hardening_next_resume_handover.md
- notes/04_operations/archive_operations.md
- notes/04_operations/active_operations.md
- notes/04_operations/next_operations.md
- api/repo-resource.js
- src/services/repo-resource/repo.js
- src/services/repo-resource/notes.js
- src/services/repo-resource/common.js
- docs/10_repo_resource_api.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
- config/ai/adam_schema.yaml
