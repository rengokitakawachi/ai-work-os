# 2026-04-27 Branch Policy for ATLAS / Delta Work

## Decision

AI Work OS repo は、以後 `Docs-aligned main / Notes-driven branch / Versioned merge` model で運用する。

短く言うと、次の3層で扱う。

```text
main = Docs-aligned stable version
branch = Notes-driven development space
merge = Docs-reconciled and version bumped integration
```

---

## Core Principle

`main` は docs と一致している安定版である。

新規開発は feature branch で行う。

Feature branch では notes/design/analysis が先行してよい。

Feature branch を `main` に統合するときに、docs / code / config / operations / version を一致させる。

---

## Context

Delta 開発では、次の変更が増える。

- `systems/delta/` resource 作成
- roadmap / plan / operations / history / review template 作成
- repo-resource / system-resource 周辺の API 変更
- docs と実装差分の反映案
- ATLAS testing system の GitHub Actions / CI workflow 整備
- branch selector / versioning など repo operation 基盤の整備

これまでの運用では main repository を直接使うことが多かった。

しかし、delta と ATLAS により source / docs / operations の変更量が増えるため、main 直書きのまま進めると rollback / review / Claude test handoff が難しくなる。

また、実態が docs より先に進む場面が増えるため、`main` と feature branch の意味を分ける必要がある。

---

## Model

## 1. main = Docs-aligned stable version

`main` は docs と一致している安定版として扱う。

`main` では次が一致している必要がある。

- docs
- code
- config
- operations model
- schema files
- version metadata

`main` に docs と矛盾する code / config / workflow を置かない。

`main` は「いまの正本整合済み状態」であり、実験場ではない。

---

## 2. branch = Notes-driven development space

Feature branch は開発・検証・実験の作業空間である。

Feature branch では notes/design/analysis が先行してよい。

Feature branch 内では次を許容する。

- notes/design が docs より先に進む
- code が docs 反映案より先に試作される
- ATLAS / Claude review により spec gap が見つかる
- delta resource layout が provisional に作られる
- implementation と docs 反映案が並行で育つ

ただし、branch 内の状態は `unreleased` / `not yet docs-aligned` として扱う。

Branch 内 notes は開発正本に近い役割を持てるが、main docs と同格の SSOT ではない。

---

## 3. merge = Docs-reconciled and version bumped integration

Feature branch を `main` に統合するときは、code だけを merge しない。

Merge 前に最低限次を確認する。

- docs 反映案がある
- docs と code / config / operations の差分が説明されている
- ATLAS test / review が完了している
- version bump が必要なら決まっている
- user が merge 判断している

Merge 後の `main` は、再び docs-aligned stable state でなければならない。

---

## Versioning

Version 管理は lightweight に始める。

初期採用するもの:

- `VERSION`
- `CHANGELOG.md`

`VERSION` は repo 全体の main stable version を表す。

`CHANGELOG.md` は main に統合された変更だけを記録する。

Feature branch 内の作業ログは notes に置き、main 統合時に CHANGELOG へ要約する。

---

## Version Bump Rule

Semantic versioning を参考にするが、初期は軽量運用とする。

```text
patch:
  docs 整合、軽微 bug fix、内部実装の小修正、挙動を変えない整理

minor:
  ATLAS、delta、branch selector、system-resource などの機能追加

major:
  SSOT 構造、API 互換性、operations 正本構造を壊す変更
```

Version bump は branch 内で提案し、main merge 時に確定する。

---

## Policy

### main branch

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
- version bump
- CHANGELOG update

---

### feature branch

以下は feature branch で行う。

- repoResource branch selector implementation
- repoResourceGet bulk separator implementation
- ATLAS GitHub Actions / test workflow
- system-resource or delta resource API implementation
- package.json script change
- config schema change
- docs 正本反映の実 commit
- version bump / CHANGELOG update
- delta resource layout の初期一括作成

推奨 branch 名:

```text
feature/atlas-pre-delta-foundation
feature/repo-resource-branch-selector
feature/repo-resource-bulk-separator
feature/atlas-test-workflow
feature/delta-mvp-resources
```

---

### PR / review

Feature branch の変更は PR 単位で確認する。

PR では最低限次を見る。

- docs / design との整合
- test result
- ATLAS / Claude review result
- scope creep がないこと
- version bump の妥当性
- main に入れてよい粒度であること

Merge 判断は user が行う。

ADAM は merge 判断を代替しない。

---

## ATLAS Boundary

ATLAS は test / verification / CI review system である。

ATLAS は以下を担当する。

- npm test execution
- GitHub Actions result observation
- Claude review handoff
- spec_gap / test_result の記録
- regression guard
- merge 前の verification support

ATLAS は merge authority を持たない。

Claude が review / test_result を出しても、それだけで main 反映完了とはしない。

---

## repoResource Branch Selector Boundary

現行 runtime tool は branch を明示的に切り替える操作を持たない。

repo implementation では `GITHUB_BRANCH || 'main'` が使われているが、ADAM runtime から現在 branch を変更できるとは限らない。

したがって、branch selector を repoResourceGet / repoResourceWrite に追加する方針を採用する。

区別する層:

- repo implementation supports branch by environment config
- repo implementation supports request-level branch selector
- repo schema has branch field
- configured Action / tool schema is refreshed
- runtime-visible tool schema exposes branch field
- actual branch read / write behavior is confirmed

Branch-sensitive write の前には、どの branch に書かれるかを確認する。

確認できない場合、code / workflow / schema / VERSION / CHANGELOG の変更は実行せず、差分案に留める。

---

## Immediate Operating Rule

Delta 前環境整備では、次の順で進める。

1. Branch policy を `Docs-aligned main / Notes-driven branch / Versioned merge` model に更新する。
2. repoResource branch selector の設計 / 差分案を作る。
3. ATLAS testing system の最小方針を decision / design に固定する。
4. repoResourceGet bulk separator は branch selector 後に実装する。
5. GitHub Actions / ATLAS test workflow の最小差分を作る。
6. docs / code / operations 実態差分を棚卸しする。
7. docs 反映案は notes/02_design を経由し、人間判断後に main へ統合する。
8. delta resource layout の一括作成は branch 前提で行う。

---

## Non-goals

この decision では次をまだ固定しない。

- GitHub branch を作成する具体 API
- PR 自動作成
- branch protection rule
- automated Claude comments
- semantic-release 導入
- GitHub Release 自動化
- strict coverage threshold

---

## Follow-up Tasks

- repoResource branch selector の設計 / 差分案を作る
- ATLAS testing system の最小方針を固定する
- repoResourceGet bulk の files 区切り仕様を branch selector 後に実装する
- GitHub Actions / ATLAS test workflow の最小差分を作る
- docs と code / operations 実態の差分を棚卸しする
- docs 反映案に branch / ATLAS / bulk separator / versioning / delta precondition を含める

---

## Status

accepted
