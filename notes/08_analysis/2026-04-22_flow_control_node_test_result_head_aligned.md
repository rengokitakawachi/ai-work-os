# 2026-04-22 flow_control_node_test_result_head_aligned

## 目的

GitHub main の HEAD 一致状態で実行した flow-control 周辺 `node --test` の正式結果を記録する。

---

## 前提

途中で local working tree と HEAD の不一致が見つかったため、混在状態での test 結果は正式結果として採用しない。

正式結果は、対象ファイルを HEAD に戻し、対象ファイル差分ゼロを確認した後の再実行結果のみを採用する。

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

## 最終正式結果

- HEAD: `e4e782e`
- total: 39
- pass: 39
- fail: 0

補足:
- 対象ファイルは HEAD 一致状態で再実行した
- `git status --short` では対象ファイル差分ゼロを確認した
- inbox markdown adapter 追加後も flow-control 周辺 test は全 green になった

---

## 途中で見えた論点

途中の正式再実行では、次の論点が順に見えた。

1.
`design-routing.test.js`
- design retain の `no_op` を routing 層で期待していた
- apply result 層で確認するよう test を補正した

2.
`rules.test.js`
- non-high-impact open issue が `architecture` 判定に吸われていた
- keep bias を優先する判定順へ補正した

3.
`issue-routing.test.js`
- medium-impact architecture / operations issue の期待が `rules.test.js` と不一致だった
- keep bias 優先方針に合わせて test 期待を統一した

4.
`intake-routing.test.js`
- inbox markdown adapter 追加後、`adapters.js` / `index.js` の HEAD 揃え漏れによる import 不整合が一度発生した
- 対象ファイルを HEAD に揃え直した後、adapter 追加分も含めて全 test green を確認した

これらの補正後、最新 HEAD `e4e782e` で全 test green を確認した。

---

## 判断

- flow-control 周辺の回帰確認は green で閉じてよい
- intake routing の最小分岐実装と inbox markdown adapter の最小実装は、周辺 test と整合するところまで到達した
- 次は flow-control 回帰論点ではなく、intake routing 第一バッチ 3 件の mechanical dry run observation へ進むのが自然である

---

## 次の自然なタスク

1.
`intake routing 第一バッチ 3 件の mechanical dry run observation を記録する`

2.
必要なら `pending_tasks` 向けのチャンク分解拡張を別 task 化する
