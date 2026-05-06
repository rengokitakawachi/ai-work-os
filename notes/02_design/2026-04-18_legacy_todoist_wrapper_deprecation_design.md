# 2026-04-18 legacy_todoist_wrapper_deprecation_design

## 目的

並行して存在する Todoist service 実装のうち、
legacy 候補を限定し、
段階的に deprecated 化する方針を固定する。

本メモは、

- 何を legacy 候補とみなすか
- 正本はどちらに寄せるか
- なぜ即削除しないか
- どういう順で廃止するか

を明確にすることを目的とする。

---

## 結論

今回 deprecated 候補として扱うのは
次である。

- `src/services/todoist.js`

正本候補は次である。

- `src/services/todoist/client.js`

ただし、
今すぐ削除はしない。

採るべき順は次である。

1.
参照箇所確認

2.
deprecated 扱いの明示

3.
参照移行

4.
test 確認

5.
削除

---

## なぜ `src/services/todoist.js` を対象にするか

見えている範囲では、
`src/services/todoist.js` は
旧来の簡易 wrapper である。

特徴は次である。

- `createTask`
- `listTasks`

のみを持つ

- error が素朴な `Error`
中心である

- context / step / action / category を持たない

一方、
`src/services/todoist/client.js` は次を持つ。

- `createTask`
- `updateTask`
- `deleteTask`
- `listTasks`

加えて、

- `createError` ベースの normalized error
- `context.step / resource / action`
- upstream status の正規化
- retryable 判定

を備える。

したがって、
現在の tasks service / projection と整合するのは
`client.js` 側である。

---

## 履歴上の位置づけ

過去 notes を確認すると、
`src/services/todoist.js` は
最初から不要だった file ではない。

むしろ 2026-03-22 時点では、
Todoist 系の中心実装に近い位置づけで扱われていた。

### 2026-03-22 時点の材料

- `notes/06_handover/2026-03-22_09-10-00_todoist_system_design.md`
- `notes/00_inbox/dev_memo/2026-03-22_16-20-00_phase1_todoist_api_rearchitecture_plan.md`

この時点では、
handover の related code に

- `src/services/todoist.js`
- `api/task/create.js`
- `api/task/list.js`

が並んでおり、
旧 API / 旧 Todoist wrapper を含む構成が
実運用中心に近い扱いを受けていた。

また dev_memo でも、
`src/services/todoist.js` は
当時の「新系」側として列挙されている。

したがって、
`src/services/todoist.js` は
歴史的には一度中心寄りの役割を持っていたとみなすのが自然である。

### 2026-03-25 以降の材料

- `notes/02_design/2026-03-25_tasks_api_alignment_design.md`

この design では、
変更箇所として

- `src/services/tasks/service.js`
- `src/services/todoist/client.js`

が明示されている。

これは、
Todoist 接続責務を
`client.js` 側へ寄せる設計意図が
この時点で前面化していることを示す。

つまり、
`todoist.js` が中心だった時期から、
`client.js` を正本候補とする方向へ
責務の重心が移っている。

### 2026-04-09 時点の材料

- `notes/02_design/2026-04-09_operations_to_todoist_one_way_projection_prototype.md`

この design では明確に、
projection 実装は

- `src/services/todoist/client.js` を土台にする
- delete は `client.js` に最小追加する
- create / update / list は `client.js` に接続する

と整理されている。

これは、
operations → Todoist projection の正本接続先として
`client.js` が選ばれていることを意味する。

### 履歴から導ける整理

履歴全体を通すと、
位置づけは次のように読める。

1.
2026-03-22 頃
- `src/services/todoist.js` は中心寄りの現役実装

2.
2026-03-25 頃
- tasks API 整列の中で `client.js` が前面化

3.
2026-04-09 頃
- projection 設計でも `client.js` を土台にすると明記

4.
現在
- `src/services/tasks/service.js`
- `src/services/tasks/projection.js`
が `client.js` を参照している

したがって、
`src/services/todoist.js` は

- 最初から不要だった file
ではなく、
- 歴史的に中心だった実装が、後段設計で `client.js` に置き換えられつつある legacy 候補

と捉えるのが最も自然である。

---

## 現時点で確認できる整合

見えている範囲では、
次が `client.js` 側を参照している。

- `src/services/tasks/service.js`
- `src/services/tasks/projection.js`

つまり、
tasks 系の現行実装は
すでに `client.js` 側へ寄っている。

このため、
`todoist.js` は
正本ではなく
legacy 候補とみなすのが自然である。

---

## 現時点の段取り判断

現時点では、次の整理が最も自然である。

- `src/services/todoist.js` は legacy 候補として限定済み
- `src/services/todoist/client.js` は正本候補ではなく、実質的に現行正本として扱ってよい
- `src/services/todoist.js` には deprecated header が入り、新規利用禁止も明示済み
- tasks 本線は `client.js` に収束している

したがって、
この論点の次段は
「deprecated 化するか」ではなく
**削除判断 gate をどう順に満たすか**
である。

採るべき順は次である。

1.
repo 全体 usage の最終確認

2.
参照が残っていれば `client.js` へ移行

3.
tasks / projection 周辺の test 確認

4.
削除判断

つまり、
**deprecated 化は成立済みで、残りは削除前の安全確認段階**
と整理するのが自然である。

---

## 追加確認できた現役導線

今回追加で確認した範囲では、
tasks 本線の現役導線は次である。

- `api/tasks/index.js`
- `api/tasks/[id].js`
- `api/tasks/project.js`
- `src/services/tasks/dispatch.js`
- `src/services/tasks/service.js`
- `src/services/tasks/projection.js`

このうち、
Todoist 接続の実体は次に寄っている。

- `src/services/tasks/service.js` → `../todoist/client.js`
- `src/services/tasks/projection.js` → `../todoist/client.js`

したがって、
少なくとも tasks 系の現役導線では
`src/services/todoist.js` を参照していない。

これは、
`src/services/todoist.js` が
現行 tasks 本線からは外れていることを示す強い材料である。

ただし、
repo 全体の import 使用箇所を grep 的に完全確認したわけではないため、
`repo 全体で未使用` とまではまだ断定しない。

---

## code tree から見える追加材料

現 repo の code tree を見ると、
Todoist / task 系の API surface は
かなり整理されている。

確認できた現行 API は次である。

- `api/tasks/index.js`
- `api/tasks/[id].js`
- `api/tasks/project.js`

一方で、
過去 handover / dev_memo に出ていた旧系の候補である

- `api/task/create.js`
- `api/task/list.js`
- `api/task.js`
- `api/task-update.js`
- `api/task-close.js`
- `api/tasks.js`
- `api/todo.js`

は、
現 repo の code resource からは見当たらない。

これは、
`src/services/todoist.js` が接続していた可能性の高い旧 API 導線が、
少なくとも現行 code tree 上では消えていることを示す。

したがって、
現行 code だけを見ると、
Todoist 実行導線は

- `api/tasks/*`
- `src/services/tasks/*`
- `src/services/todoist/client.js`

へ収束しており、
`src/services/todoist.js` は
現行 surface から孤立しつつある可能性が高い。

ただし、
これはなお
`repo 全体未使用` の完全証明ではなく、
見えていない hidden import がないかの最終確認は必要である。

---

## なぜ即削除しないか

現時点では、
repo 全体の import 使用箇所を
完全には確認していない。

したがって、
即削除すると

- hidden import
- 一時的な旧参照
- docs / notes との不整合

を見落とす恐れがある。

そのため、
削除の前に

- usage 確認
- deprecation 明示
- 移行
- test

を入れる必要がある。

---

## 今回対象にしないもの

今回、
同時に見えた重複候補として

- `src/services/internal-auth.js`
- `src/lib/auth.js`

がある。

ただしこれは、
同列に legacy と断定しない。

理由は次である。

- `src/services/internal-auth.js` は
  `api/repo-resource.js` で現役利用されている
- `src/lib/auth.js` は
  tasks API 側で使われている
- 役割統一の検討余地はあるが、
  まず Todoist wrapper ほど単純な legacy 判定はできない

したがって、
今回の deprecation 対象は
Todoist wrapper 側に限定する。

---

## 移行手順

### 1. usage 確認

- `src/services/todoist.js` の import 利用箇所を確認する
- 未使用なら deprecated → 削除候補へ進める
- 使用中なら移行先を `client.js` に寄せる

### 2. deprecation 明示

- file header comment
- design / issue 参照
- 新規利用禁止の明示

### 3. 参照移行

- `todoist.js` 参照があれば `client.js` へ移す
- input / output shape 差分を埋める

### 4. test 確認

- tasks handler
- tasks projection
- Todoist 接続 service

周辺の test を通す

### 5. 削除

- import が消えたことを確認
- design / issue に参照を残す
- file を削除する

---

## 削除判断 gate の現時点整理

現時点で言えることは次である。

### 確認済み

- tasks 本線は `client.js` を正本として使っている
- `todoist.js` は tasks service / projection / api handler からは見えていない
- deprecated 明示は追加済み

### 未確認

- tasks 本線以外で `src/services/todoist.js` を参照する hidden import
- 一時的な旧実装参照
- docs / notes における code 参照の残存

したがって、
削除判断は次の gate を満たしてから行う。

1.
tasks 本線未使用確認
- これは今回かなり確認できた

2.
追加 usage 確認
- repo 全体での旧参照有無を追う

3.
test 通過

4.
削除

---

## 完了条件

この論点を完了とみなす最低条件は次である。

1.
`src/services/todoist.js` の利用有無を確認済み

2.
必要な参照移行が完了している

3.
`client.js` を正本として扱う design が固定されている

4.
関連 test が通る

5.
その後に `src/services/todoist.js` を削除する

---

## 判断

legacy code の廃止は妥当である。

ただし、
一括削除ではなく

- legacy 候補の限定
- 正本の固定
- 移行
- test
- 削除

の順で進めるべきである。

現時点では、
その対象は
`src/services/todoist.js`
に限定するのが自然である。
