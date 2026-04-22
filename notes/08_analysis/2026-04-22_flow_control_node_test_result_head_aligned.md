# 2026-04-22 flow_control_node_test_result_head_aligned

## 目的

GitHub main `2c04437` に対して、HEAD 一致状態で実行した flow-control 周辺 `node --test` の正式結果を記録する。

---

## 前提

前回の test 実行は、local working tree が HEAD と不一致で、しかも test 対象ファイルに差分が混在していたため、正式結果としては採用しない。

今回は、対象ファイルを `git checkout HEAD -- ...` で HEAD に戻し、対象ファイル差分ゼロを確認した後の実行結果である。

---

## 実行対象

- `src/services/flow-control/issue-routing.test.js`
- `src/services/flow-control/design-routing.test.js`
- `src/services/flow-control/intake-routing.test.js`
- `src/services/flow-control/rules.test.js`

## 実行コマンド

```bash
node --test src/services/flow-control/issue-routing.test.js \
            src/services/flow-control/design-routing.test.js \
            src/services/flow-control/intake-routing.test.js \
            src/services/flow-control/rules.test.js
```

---

## 結果サマリー

- total: 36
- pass: 34
- fail: 2

補足:
- `intake-routing.test.js` の前回 fail は解消した
- 代わりに `rules.test.js` で正式 fail が出た
- これが GitHub main `2c04437` に対する正式結果である

---

## fail 詳細

### 1. `design-routing.test.js:109`

テスト名:
- `routeSingleDesignCandidate falls back to design retain`

観測:
- actual: `undefined`
- expected: `no_op`

読み取り:
- design retain の `write_status: no_op` は routing action plan 層ではなく apply result 層で付く可能性が高い
- したがって、現時点では実装不整合より test の参照層ずれが第一候補

### 2. `rules.test.js:107`

テスト名:
- `evaluateCandidate keeps non-high-impact open issue in issue`

観測:
- actual: `design`
- expected: `issue`

読み取り:
- `source_type === issue` の architecture issue で、category 判定が non-high-impact keep より先に効いている
- intake 側の最小分岐追加と issue routing 側 keep bias の境界が崩れた可能性がある

---

## 判断

- GitHub main に対する正式 fail は `design-routing.test.js` と `rules.test.js` の 2 件である
- `intake-routing.test.js` fail は正式結果では消えているため、次の主論点ではない
- 次に優先すべきは
  1. design retain の `no_op` 期待を test 層に合わせて補正すること
  2. non-high-impact open issue が design に吸われる判定順を修正すること

---

## 次の自然なタスク

1.
`design retain fallback の no_op 期待を test 層に合わせて補正する`

2.
`non-high-impact open issue が design に吸われる判定順を修正する`

3.
その後に flow-control 周辺 test を再実行して green を確認する
