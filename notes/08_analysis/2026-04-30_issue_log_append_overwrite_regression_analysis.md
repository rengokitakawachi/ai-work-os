# 2026-04-30 issue_log append overwrite regression analysis

## 結論

`notes/01_issues/idea_log.md` は、`<<APPEND>>` を content として `update` に渡したことで、過去ログ全体ではなく append 断片で上書きされた可能性が高い。

これは正本相当の issue log を欠損させる重大事故である。

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

### Recovery dependency

完全復元には repo history / show / diff 機能が必要。

理由:

- 現在の file content は欠損後の状態の可能性がある
- handover / reports だけでは issue log 全文復元の正確性が保証できない
- GitHub の過去 commit から `notes/01_issues/idea_log.md` の直前版を取得する必要がある

---

## 必要な API capability

repoResourceGet に以下を追加する。

- `history`
  - file の commit history を取得する
- `show`
  - 指定 ref / commit における file content を取得する
- `diff`
  - file の base / head 差分を取得する
- `compare`
  - branch / commit 間の差分概要を取得する

最低限、復旧には `history` と `show` が必要。

---

## Recovery plan

1. repoResource history / show を実装する
2. runtime schema / behavior を確認する
3. `notes/01_issues/idea_log.md` の破損前 commit を特定する
4. 破損前 content を取得する
5. 破損後に追加した issue `20260430-033` / `20260430-034` などを安全に merge する
6. full content update で復元する
7. read-back で issue log が過去 issue を含む完全版になっていることを確認する

---

## Current severity

severity: high

理由:

- issue log は今後の routing / review / operations candidate source の一部である
- 欠損したまま追記すると、欠損状態が canonical として固定される
- regression analysis にも issue log history が必要になる

---

## Source refs

- notes/01_issues/idea_log.md
- api/repo-resource.js
- src/services/repo-resource/notes.js
- src/services/repo-resource/common.js
- docs/10_repo_resource_api.md
- config/ai/adam_instruction.md
- config/ai/adam_knowledge.md
