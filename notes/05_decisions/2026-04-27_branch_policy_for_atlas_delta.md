# 2026-04-27 Branch Policy for ATLAS / Delta Work

## Decision

Delta 開発および ATLAS 整備に入る前に、以後の repo 変更は原則として feature branch 前提で扱う。

`main` は安定版として扱い、日常の設計メモや軽微な operations 更新を除き、code / workflow / system resource の変更は branch 上で行う。

---

## Context

Delta 開発では、次の変更が増える。

- `systems/delta/` resource 作成
- roadmap / plan / operations / history / review template 作成
- repo-resource / system-resource 周辺の API 変更
- docs と実装差分の反映案
- ATLAS testing system の GitHub Actions / CI workflow 整備

これまでの運用では main repository を直接使うことが多かった。

しかし、delta と ATLAS により source / docs / operations の変更量が増えるため、main 直書きのまま進めると rollback / review / Claude test handoff が難しくなる。

---

## Policy

### 1. main branch

`main` は安定版とする。

`main` に直接反映してよいもの:

- conversation-driven operations update
- notes decision / design / report の小さな追加
- handover など再開入口の保存
- user が明示的に main 更新を許可した軽微変更

ただし、以下は原則として main 直書きしない。

- application code change
- API behavior change
- schema change
- GitHub Actions / workflow change
- `systems/delta/` 初期 resource 群の一括作成
- docs 正本反映

---

### 2. feature branch

以下は feature branch で行う。

- repoResourceGet bulk separator implementation
- ATLAS GitHub Actions / test workflow
- system-resource or delta resource API implementation
- package.json script change
- config schema change
- docs 正本反映の実 commit
- delta resource layout の初期一括作成

推奨 branch 名:

```text
feature/atlas-pre-delta-foundation
feature/repo-resource-bulk-separator
feature/atlas-test-workflow
feature/delta-mvp-resources
```

---

### 3. PR / review

Feature branch の変更は PR 単位で確認する。

PR では最低限次を見る。

- docs / design との整合
- test result
- ATLAS / Claude review result
- scope creep がないこと
- main に入れてよい粒度であること

Merge 判断は user が行う。

ADAM は merge 判断を代替しない。

---

### 4. ATLAS boundary

ATLAS は test / verification / CI review system である。

ATLAS は以下を担当する。

- npm test execution
- GitHub Actions result observation
- Claude review handoff
- spec_gap / test_result の記録
- regression guard

ATLAS は merge authority を持たない。

Claude が review / test_result を出しても、それだけで main 反映完了とはしない。

---

### 5. repoResourceWrite boundary

現行 runtime tool は branch を明示的に切り替える操作を持たない。

repo implementation では `GITHUB_BRANCH || 'main'` が使われているが、ADAM runtime から現在 branch を変更できるとは限らない。

したがって、branch policy では次を区別する。

- repo implementation supports branch by environment config
- runtime-visible tool can or cannot select branch
- actual writes currently go to configured branch

Branch-sensitive write の前には、どの branch に書かれるかを確認する。

確認できない場合、code / workflow / schema の変更は実行せず、差分案に留める。

---

## Immediate Operating Rule

Delta 前環境整備では、次の順で進める。

1. Branch policy を decision に固定する。
2. ATLAS testing system の最小方針を decision / design に固定する。
3. repoResourceGet bulk separator は、まず差分案と test 案を作る。
4. branch 書き込み先が確認できるまで、code / workflow の実 write は慎重に扱う。
5. docs 正本反映は notes/02_design の反映案を経由し、人間判断後に行う。
6. delta resource layout の一括作成は branch 前提で行う。

---

## Non-goals

この decision では次をまだ固定しない。

- GitHub branch を作成する具体 API
- PR 自動作成
- branch protection rule
- automated Claude comments
- docs 正本の直接更新
- system-resource API の branch selector

---

## Follow-up Tasks

- ATLAS testing system の最小方針を固定する
- repoResourceGet bulk の files 区切り仕様を実装する前に、branch-sensitive write 可否を確認する
- GitHub Actions / ATLAS test workflow の最小差分を作る
- docs と code / operations 実態の差分を棚卸しする
- docs 反映案に branch / ATLAS / bulk separator / delta precondition を含める

---

## Status

accepted
