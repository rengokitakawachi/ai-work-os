# 2026-04-27 docs/10 repo-resource branch selector 更新案

## 目的

`docs/10_repo_resource_api.md` に repoResource branch selector の仕様を反映するための更新案を定義する。

この note は docs 本体更新前の草案であり、docs 本体はまだ更新しない。

---

## 参照元

- `docs/10_repo_resource_api.md`
- `docs/11_doc_style.md`
- `config/ai/adam_schema.yaml`
- `api/repo-resource.js`
- `src/services/repo-resource/common.js`
- `src/services/repo-resource/docs.js`
- `src/services/repo-resource/notes.js`
- `src/services/repo-resource/code.js`
- `notes/02_design/2026-04-27_branch_selector_main_docs_schema_reflection_gap.md`

---

## 反映方針

差分最小で追記する。

既存の docs read only 方針は変更しない。

未確認の runtime-visible schema / configured Action refresh は docs の確定仕様として扱わない。

ただし、main code behavior と repo schema には branch selector が反映済みであるため、repo-resource API の仕様として branch selector を追記する。

---

## 追加案 1: 前提 / 定義

`前提 / 定義` セクションの `request_id` 定義付近に以下を追加する。

```markdown
branch は GitHub branch selector を示す。

branch が省略された場合は、環境変数 GITHUB_BRANCH を使用する。

GITHUB_BRANCH も未設定の場合は main を使用する。

branch は repo-resource API の request-level option とする。

branch は docs / notes / code の read 系 action と notes / code の write 系 action に適用する。

branch は docs の write を許可するものではない。
```

---

## 追加案 2: 基本原則

`基本原則` セクションに以下を追加する。

```markdown
- branch selector は request-level option とする
- branch selector は docs / notes / code の参照先 branch を切り替える
- branch selector は write 権限を拡張しない
- docs は branch selector 使用時も read only とする
```

---

## 追加案 3: 統合後 API 一覧

`統合後 API 一覧` の直後に以下を追加する。

```markdown
すべての repo-resource GET action は optional query parameter `branch` を受け取る。

例

- GET /api/repo-resource?action=read&resource=code&file=api/repo-resource.js&branch=feature/example
- GET /api/repo-resource?action=tree&resource=notes&branch=feature/example

repo-resource POST action は request body に optional `branch` を受け取る。

例

{
  "file": "02_design/example.md",
  "content": "# example",
  "branch": "feature/example"
}
```

---

## 追加案 4: 実装状況

`実装状況` セクションに以下を追加する。

```markdown
- repoResource branch selector：main code / repo schema 反映済み
```

---

## 追加案 5: action 定義

`action 定義` の後、または `bulk` 定義の後に以下を追加する。

```markdown
### branch

GitHub branch selector を示す optional parameter とする。

GET action では query parameter として受け取る。

POST action では request body field として受け取る。

branch が指定された場合、GitHub read / write / tree operation は指定 branch を対象にする。

branch が省略された場合、環境変数 GITHUB_BRANCH を使用する。

GITHUB_BRANCH も未設定の場合、main を使用する。

branch は以下の場合に invalid とする。

- .. を含む
- / で始まる
- / で終わる
- \\ を含む
- // を含む
- .lock で終わる
- 空白または Git ref として危険な記号を含む

invalid branch の場合は INVALID_REQUEST を返す。
```

---

## 追加案 6: notes 作成 / 更新 / 削除の request 例

既存の notes 作成例の後に以下を追加する。

```markdown
branch 指定例

{
  "file": "02_design/new-spec.md",
  "content": "# title",
  "branch": "feature/example"
}
```

既存の notes 更新例の後に以下を追加する。

```markdown
branch 指定例

{
  "file": "02_design/new-spec.md",
  "content": "# updated title",
  "branch": "feature/example"
}
```

notes 削除セクションに以下を追加する。

```markdown
branch 指定例

{
  "file": "02_design/new-spec.md",
  "branch": "feature/example"
}
```

---

## 追加案 7: code 作成 / 更新の request 例

既存の code 作成例の後に以下を追加する。

```markdown
branch 指定例

{
  "file": "src/services/example.js",
  "content": "export function example() {}",
  "branch": "feature/example"
}
```

既存の code 更新例の後に以下を追加する。

```markdown
branch 指定例

{
  "file": "src/services/example.js",
  "content": "export function example() { return true; }",
  "branch": "feature/example"
}
```

---

## 追加案 8: レスポンス仕様

`エラー仕様` より前、または各レスポンス例の補足として以下を追加する。

```markdown
repo-resource の read / tree / write response は、resolved branch を `data.branch` に含める。

bulk response では、各 file item に `branch` を含める。

branch が省略された場合も、実際に使用された branch を返す。

例

{
  "ok": true,
  "data": {
    "name": "repo-resource.js",
    "path": "api/repo-resource.js",
    "sha": "xxx",
    "branch": "main",
    "content": "...",
    "content_length": 1234,
    "fetched_at": "2026-04-27T00:00:00Z",
    "status": "OK"
  },
  "request_id": "REQ_ID"
}
```

---

## 追加案 9: セキュリティ / パス検証

`セキュリティ` または `パス検証` セクションに以下を追加する。

```markdown
branch は path ではないが、Git ref として検証する。

branch validation は service 層の GitHub operation 前に実行する。

branch validation 失敗時は GitHub API を呼ばない。

branch selector は resource ごとの権限を変更しない。
```

---

## 追加案 10: 補足

`補足` セクションに以下を追加する。

```markdown
### branch selector の反映層

repoResource branch selector は複数層で確認する。

- code behavior
- repo schema
- configured Action / tool schema
- runtime-visible schema
- actual branch read behavior
- actual branch write behavior

docs に branch selector が記載されていても、runtime-visible schema に branch field が見えるまでは、ADAM runtime から明示的に branch を指定できるとは限らない。

schema file の更新と runtime tool schema 反映は区別する。
```

---

## 非対象

この docs 更新案では以下を扱わない。

- bulk files の newline separator 対応
- ATLAS workflow
- delta resource layout
- VERSION / CHANGELOG
- GitHub branch 作成 API
- PR automation

---

## 推奨適用順

1. 前提 / 定義に branch 定義を追加する
2. 統合後 API 一覧に optional branch の使い方を追加する
3. action 定義に branch を追加する
4. request / response 例に branch を追加する
5. セキュリティ / パス検証に branch validation を追加する
6. 補足に反映層の区別を追加する

---

## 完了条件

この draft は、docs 更新前に以下を満たす。

- 確定済み code behavior のみを反映している
- repo schema の branch field と矛盾しない
- docs read only 方針を変えていない
- runtime-visible schema 未確認を完了扱いしていない
- 差分最小の追記案になっている
