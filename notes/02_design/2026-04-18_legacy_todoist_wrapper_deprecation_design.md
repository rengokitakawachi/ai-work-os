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
