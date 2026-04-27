# 2026-04-27 ATLAS Testing System Name Decision

## Decision

Claude による test / verification / CI review system の名称を `ATLAS` とする。

正式名は `ATLAS Testing System` とする。

---

## Context

AI Work OS では、既に以下の system / persona naming がある。

- `ADAM`: 開発 controller / governance
- `EVE`: execution partner / task assistant
- `delta`: learning support system

今後 delta 開発に入るにあたり、source / docs / operations の変更量が増える。

その前に、branch 運用、bulk read 改善、docs / code 実態整合、Claude による test / review 環境を整える必要がある。

Claude が担う test / review system にも、ADAM / EVE / delta と並ぶ名称が必要になった。

---

## Meaning

`ATLAS` は、AI Work OS の検証基盤を支える system として扱う。

役割:

- test execution
- CI workflow
- branch / PR verification
- Claude review coordination
- spec gap detection
- regression guard
- test result handoff to ADAM

---

## Boundary

ATLAS は ADAM の代替ではない。

- ADAM: development controller / architecture / operations decision
- ATLAS: test / verification / review support
- Claude: ATLAS の主要実行者または reviewer

ATLAS は EVE の代替でもない。

- EVE: Todoist-centered execution assistant
- ATLAS: development verification system

ATLAS は delta の代替でもない。

- delta: learning support system
- ATLAS: delta を含む開発変更を検証する system

---

## Initial Scope

最小スコープ:

- `.github/workflows/test.yml` による `npm test` 実行
- PR / branch 単位の test result 確認
- Claude による review / spec_gap / test_result の記録
- `config/ai/from-claude.md` を ADAM への handoff surface として使う

後段スコープ:

- coverage
- lint
- branch protection
- PR template
- Claude automated review comments
- ATLAS-specific report template

---

## Operational Implication

Delta 開発前の環境整備 reroll では、ATLAS を以下の task 群に反映する。

- branch 運用方針を design / decision に固定する
- ATLAS testing system の最小方針を固定する
- repoResourceGet bulk の files 区切り仕様を実装する
- GitHub Actions / test workflow の最小差分を作る
- docs と実態の差分棚卸しをする
- docs 反映案を notes/02_design に作る
- delta MVP resource layout に戻る

---

## Non-goals

初期 ATLAS では次をやらない。

- 完全自動の merge gate
- coverage threshold の強制
- Claude 自動コメントの本格実装
- branch protection rule の即時強制
- delta domain policy の検証自動化

---

## Status

accepted
