# 2026-04-28 docs/10 repoResource branch create update draft

## 結論

`docs/10_repo_resource_api.md` へ `repo` resource / `create_branch` action を反映する準備は整った。

この note は docs 本体へ直接反映する前の完成形 draft である。

人間判断後、docs/10 に以下の差分を反映する。

---

## 反映理由

`repoResourceWrite` は runtime-visible schema 上で次を露出している。

```text
resource=repo
action=create_branch
from_branch
```

actual behavior も確認済みである。

```text
repoResourceWrite resource=repo action=create_branch branch=feature/atlas-pre-delta-foundation from_branch=main
status: CREATED
source_sha: 33bfb564142efe8ba2feb114980911e874a630d7
```

read-back も確認済みである。

```text
repoResourceGet resource=code action=read file=package.json branch=feature/atlas-pre-delta-foundation
status: OK
```

したがって、docs/10 の repo-resource API 仕様に branch create を反映する条件は満たしている。

---

## docs/10 反映対象

対象 docs:

```text
docs/10_repo_resource_api.md
```

反映する内容:

- `repo` resource の追加
- `create_branch` action の追加
- 統合 API 一覧への POST create_branch 追加
- 実装状況への branch create confirmed 追加
- request body の `branch` / `from_branch` / `message` 説明
- response shape の説明
- validation / safety rules の追加
- errors: `ALREADY_EXISTS`, `NOT_FOUND`, `INVALID_REQUEST`
- branch selector と branch create の責務差分
- non-goals: branch delete / PR / merge / force update は含めない

---

## 反映案 1: 前提 / 定義 への追加

`branch は GitHub branch selector を示す。` の周辺に以下を追加する。

```markdown
repo は repository-level operation を扱う resource とする。

repo resource は docs / notes / code の file access とは分離する。

現行の repo resource は branch create のみを許可する。

branch create は repository-level ref mutation であり、docs / notes / code の read / write 権限を拡張しない。

branch create における branch は target branch を示す。

branch create における from_branch は source branch を示す。

from_branch が省略された場合は main を使用する。
```

---

## 反映案 2: 基本原則 への追加

`resource ごとに権限を分離する` 周辺に以下を追加する。

```markdown
- repo resource は repository-level operation のみを扱う
- repo resource は docs / notes / code の file path を扱わない
- branch create は feature/* branch の作成に限定する
- branch create は branch delete / PR creation / merge / force update を含まない
```

---

## 反映案 3: 統合後 API 一覧 への追加

`POST /api/repo-resource?action=update&resource=code` の後に以下を追加する。

```markdown
- POST /api/repo-resource?action=create_branch&resource=repo
```

POST branch 指定例の後に以下を追加する。

```markdown
repo create_branch action は request body に target branch と optional source branch を受け取る。

例

{
  "branch": "feature/example",
  "from_branch": "main",
  "message": "create feature branch"
}
```

---

## 反映案 4: 実装状況 への追加

実装状況 list に以下を追加する。

```markdown
- POST /api/repo-resource?action=create_branch&resource=repo：実装済み
- repoResource branch create：main code / repo schema / runtime-visible schema / actual create behavior / read-back 確認済み
```

---

## 反映案 5: resource 定義 への追加

`### code` の後、`### action 定義` の前に以下を追加する。

```markdown
### repo

repository-level operation を保持する resource とする。

現行では branch create のみを許可する。

repo resource は file path を扱わない。

repo resource は docs / notes / code の read / write 権限を拡張しない。

branch create は GitHub ref creation を service 層で実行する。

branch delete、branch rename、force update、PR creation、merge automation は現行範囲に含めない。
```

---

## 反映案 6: action 定義 への追加

`### delete` の後、`### branch` の前に以下を追加する。

```markdown
### create_branch

GitHub branch を作成する。

repo resource に使用する。

feature branch 作成のみを対象とする。

`branch` は作成する target branch を示す。

`from_branch` は source branch を示す。

`from_branch` が省略された場合は `main` を使用する。

`message` は operation trace として扱う。

create_branch は file content を作成・更新・削除しない。
```

---

## 反映案 7: branch 定義への補足

`### branch` の末尾に以下を追加する。

```markdown
branch selector と branch create の `branch` は文脈により意味が異なる。

read / write / tree action における `branch` は対象 Git branch selector である。

repo create_branch action における `branch` は作成する target branch である。

repo create_branch action の source branch は `from_branch` で指定する。
```

---

## 反映案 8: repo branch create section の新設

`### code 更新` の後、`### repo-resource レスポンス` の前に以下を追加する。

```markdown
### repo branch 作成

エンドポイント

POST /api/repo-resource?action=create_branch&resource=repo

概要

GitHub branch を作成する。

現行では `feature/` で始まる target branch のみ作成できる。

branch create は repository-level mutation であり、docs / notes / code の file access とは分離する。

リクエスト例

{
  "branch": "feature/example",
  "from_branch": "main",
  "message": "create feature branch"
}

パラメータ

- branch
  作成する target branch。必須。
- from_branch
  source branch。任意。省略時は main。
- message
  operation trace。任意。

成功レスポンス例

{
  "ok": true,
  "data": {
    "branch": "feature/example",
    "from_branch": "main",
    "source_sha": "SOURCE_COMMIT_SHA",
    "ref": "refs/heads/feature/example",
    "status": "CREATED"
  },
  "request_id": "REQ_ID"
}

validation

- branch は必須
- branch は `feature/` で始まる必要がある
- branch は `main` にできない
- branch は from_branch と同一にできない
- branch / from_branch は Git ref として危険な文字列を含められない

主なエラー

- INVALID_REQUEST
  branch missing / invalid branch / non-feature branch / target equals source
- NOT_FOUND
  from_branch が存在しない
- ALREADY_EXISTS
  target branch が既に存在する
- GITHUB_ERROR
  GitHub ref create response が不正

非対象

- branch delete
- branch rename
- force update ref
- pull request creation
- merge automation
- branch protection operation
```

---

## 反映案 9: repo-resource レスポンスへの追加

`repo-resource の read / tree / write response は、resolved branch を data.branch に含める。` の周辺に以下を追加する。

```markdown
repo create_branch response では、data.branch は作成された target branch を示す。

repo create_branch response では、data.from_branch に source branch を含める。

repo create_branch response では、data.source_sha に source branch の commit SHA を含める。

repo create_branch response では、data.ref に作成された Git ref を含める。
```

---

## 反映案 10: セキュリティへの追加

`### セキュリティ` の branch validation 周辺に以下を追加する。

```markdown
- repo create_branch は feature/* target branch のみ許可する
- repo create_branch は main を target にできない
- repo create_branch は source branch と同一 target を作成できない
- repo create_branch は GitHub ref 作成のみを行い、file content は変更しない
- repo create_branch は branch delete / merge / PR 作成を含まない
```

---

## 反映案 11: エラー仕様への追加

`error.resource` の例に `repo` を追加する。

```markdown
resource
  対象 resource を示す。例: docs | notes | code | repo
```

`error.action` の例に `create_branch` を追加する。

```markdown
action
  対象 action を示す。例: list | tree | read | bulk | create | update | delete | create_branch
```

`step の例` に以下を追加する。

```markdown
- createBranch
```

---

## 反映案 12: 補足への追加

`branch selector の反映層` の後に以下を追加する。

```markdown
### branch create の反映層

repoResource branch create は複数層で確認する。

- code behavior
- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual branch create behavior
- created branch read-back behavior

schema file の更新と runtime tool schema 反映は区別する。

runtime-visible schema と actual branch create / read-back behavior が確認できた場合、ADAM runtime からの実用上の branch create 動作は確認済みとして扱う。
```

---

## 反映しないこと

この docs 反映では以下を追加しない。

```text
branch delete
branch rename
force update ref
pull request creation
merge automation
branch protection operation
docs write capability
notes/code delete expansion
```

---

## 人間判断ポイント

人間に確認すべき判断は次の1点。

```text
docs/10 に repo resource / create_branch action を正式仕様として反映してよいか
```

判断材料:

- code behavior: confirmed
- repo schema: confirmed
- runtime-visible schema: confirmed
- actual branch create behavior: confirmed
- read-back behavior: confirmed
- safety guard: feature/* only
- non-goals: delete / merge / PR / force update excluded

---

## 完了条件

この draft note は次を満たしたため完了とする。

- docs/10 への具体的な反映位置を示した
- 追加する本文案を markdown block として完成形で示した
- branch selector と branch create の `branch` 意味差を明示した
- runtime確認済み事実を反映した
- 人間判断ポイントを1点に絞った
