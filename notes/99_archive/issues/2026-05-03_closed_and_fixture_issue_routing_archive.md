# closed and fixture issue routing archive

## date

2026-05-03

## source

`notes/01_issues/idea_log.md`

## routing reason

この archive は、`idea_log.md` に残っていた closed issue と、今回の routing fixture により役目終了と判断した deferred fixture issue を保存する。

This archive is a routed destination. It is not an execution source of truth.

---

## routing summary

archive:

- `20260327-002`
- `20260421-026`
- `20260421-027`
- `20260425-030`

future:

- none

reason:

- `status: closed` の issue は原則 archive
- `20260421-026` は `status: deferred` だが、将来扱う実質論点ではなく routing fixture 用の比較 issue であるため、今回の検証後は archive が自然

---

## archived issues

### 20260327-002

- title: AI instructions・schema の配置を code/config/ai/ に統一する必要がある
- category: architecture
- impact: high
- status: closed
- created_at: 2026-03-27

summary:

ADAM と EVE の instructions / schema を code resource から直接参照できる `config/ai/` 配下へ移す必要があった。配置移行そのものは完了済みで、残論点は ADAM instruction と repo 正本の分担・同期に切り分かれている。

archive_reason:

配置移行 issue としては完了済みであり、残論点は別 issue / active task で扱う方が自然。

---

### 20260421-026

- title: open 以外の issue を future へ送る判定が運用上も自然か確認する必要がある
- category: operations
- impact: medium
- urgency: low
- status: deferred
- created_at: 2026-04-21

summary:

issue routing の第二バッチで、status が open ではない issue が `route_to: future` へ送られるかを確認するための比較用 issue。

archive_reason:

一般則として deferred issue は future 候補になりうるが、この issue は将来扱う実質論点ではなく routing fixture 用の比較材料である。今回の routing 検証で判断対象にしたことで役目を終えたため、future ではなく archive が自然。

---

### 20260421-027

- title: 役目終了した issue を archive へ送る判定が keep / future と混線しないか確認する必要がある
- category: operations
- impact: low
- urgency: low
- status: closed
- created_at: 2026-04-21

summary:

issue routing の第二バッチで、終了済み issue が `route_to: archive` へ送られるかを確認するための比較用 issue。

archive_reason:

本 fixture により `status: closed → archive` の実運用確認対象となり、役目を終えた。

---

### 20260425-030

- title: repoResourceGet bulk の files パラメータが改行区切りを複数ファイルとして扱わず 1 パス扱いになる
- category: api
- impact: medium
- urgency: medium
- status: closed
- created_at: 2026-04-25
- closed_at: 2026-04-29

summary:

当初は newline separator 未対応に見えたが、実害は tree が返す resource-prefixed path を read / bulk に直結できない path normalization gap だった。修正後、ADAM runtime と DELTA runtime-visible で bulk 成功を確認済み。

resolution:

- `src/services/repo-resource/common.js` で docs / notes prefix を正規化
- `src/services/delta-resource.js` で `systems/delta/` prefix を正規化
- ADAM runtime で docs / notes / delta bulk 成功を確認
- DELTA GPT runtime-visible で delta bulk 成功を確認

archive_reason:

修正・runtime confirmation 済みのため、active issue として保持する必要がない。

---

## source cleanup

`idea_log.md` 本体からの削除はこの write では実行していない。

理由:

- `idea_log.md` は大きい単一ファイルであり、全文更新時の破損リスクがある
- routing destination 保存を先に閉じ、source cleanup は結果評価後に分離する方が安全
