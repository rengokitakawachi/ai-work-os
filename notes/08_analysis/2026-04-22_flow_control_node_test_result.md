# 2026-04-22 flow_control_node_test_result

## 目的

flow-control 周辺の `node --test` 実行結果を記録し、
Day0 task の結果確認を notes に残す。

---

## 実行コマンド

```bash
node --test src/services/flow-control/issue-routing.test.js \
            src/services/flow-control/design-routing.test.js \
            src/services/flow-control/intake-routing.test.js
```

---

## 結果サマリー

- total: 25
- pass: 23
- fail: 2

補足:
- `issue-routing.test.js` は全 pass
- fail は `design-routing.test.js` と `intake-routing.test.js` にある

---

## fail 詳細

### 1. `design-routing.test.js:109`

テスト名:
- `routeSingleDesignCandidate falls back to design retain`

観測:
- `routing_decision` に `no_op` を期待している
- 実際は `undefined`

読み取り:
- fallback 時の `design_retain` パスが `no_op` を返さなくなっている可能性がある
- fallback removal 系の変更と関係する可能性がある

---

### 2. `intake-routing.test.js:29`

テスト名:
- `routeSingleIntakeCandidate returns handoff-friendly shape`

観測:
- 期待値は `design`
- 実際は `issue`

読み取り:
- intake routing の route 判定ロジックか、test 側期待値のどちらかがズレている
- intake routing 本筋へ入る前に、少なくとも原因の切り分けは必要である

---

## 判断

- Day0 の `flow-control 周辺の node --test 実行確認を行う` は、実行結果確認 task としては完了条件を満たす
- ただし結果は green ではなく、2 fail を伴う観測である
- `issue-routing` は現時点で回帰観測上 stable
- `intake-routing` fail は次の本筋 task に近いため、blocking 性の判断を先に行うのが安全

---

## 次の自然な論点

1.
`design retain fallback の no_op 欠落が仕様変更か不整合かを整理する`

2.
`intake routing の design / issue 期待値ズレが test 側か実装側かを切り分ける`

3.
この 2 件を
- 直ちに active へ入れるか
- intake 候補整理の前に analysis だけ行うか
を operations 上で判断する
