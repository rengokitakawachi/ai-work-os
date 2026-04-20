# 2026-04-20 issue_routing_minimum_operation_experiment

## 目的

issue routing の完成を、
「コードがあること」ではなく
「実際に運用して効果が見えること」
で判定するため、最小運用実験の入力候補と観測項目を固定する。

---

## 結論

最小運用実験は、まず既存の open issue 2 件を使って開始する。

対象 issue は次の 2 件とする。

1. `20260418-022`
   - title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある

2. `20260419-023`
   - title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある

この 2 件を第一バッチとして routing し、
route 予測、payload 生成、rolling 接続可能性、運用上の違和感を観測する。

ただし、現時点の open issue は 2 件のみであり、
route 多様性は不足している。

したがって、
第一バッチで route が偏る場合は、
会話起点の新論点または今後追加される issue を第二バッチ候補として補う。

---

## 実験対象 issue

### 1. 20260418-022

- category: architecture
- 論点: `src/services/todoist.js` の legacy wrapper 廃止をどう扱うか
- 仮の route 予測:
  - 第一候補: `design`
  - 第二候補: `operations`

理由:

- 単純な今すぐ実行 task というより、
  deprecated 化 → 参照移行 → テスト確認 → 削除
  の段取りや境界整理を伴うため、design 的性格が強い
- 一方で、repo 全体 usage 最終確認のように短期 execution に落ちる面もあり、
  operations 候補化される可能性もある

観測したい点:

- routing が design を選ぶか operations を選ぶか
- その判断理由が説明可能か
- operations へ行く場合、task draft が execution 粒度として妥当か

### 2. 20260419-023

- category: operations
- 論点: Day 容量チェックを外して軽すぎる構成を出さないようにする必要がある
- 仮の route 予測:
  - 第一候補: `design`
  - 第二候補: `operations`

理由:

- 単発 task ではなく、operations 提案ルールの改善論点なので、
  design / governance 的性格が強い
- ただし、実務上は「operations 提案時に容量チェックを入れる」という運用改善 task に落ちる可能性がある

観測したい点:

- process 改善 issue を design と operations のどちらへ送るか
- route 判定が、単発修正と運用ルール改善を区別できているか
- operations に行く場合、active に直結すべきか queue 止まりにすべきか

---

## 観測項目

### A. route 判定

各 issue について、次を確認する。

- `route_to`
- `reason`
- `next_action`
- `keep_issue_open`

観点:

- route が直感に反していないか
- 理由文が運用上説明可能か
- `keep / archive / defer` の扱いが自然か

### B. notes write payload

各 route に応じて、次を確認する。

- `design_writes`
- `operations_candidate_writes`
- `future_writes`
- `archive_writes`
- `kept_issues`

観点:

- suggested_file が自然か
- body に route 理由と source issue が十分残るか
- no-op と write 対象が明確に分かれるか

### C. operations 接続

`route_to: operations` が出た場合、次を確認する。

- `candidate_draft` が rolling 前入力として読めるか
- `task / source_ref / notes` が不足していないか
- active_operations を直接 mutate していないか
- queue payload として扱う設計に整合しているか

### D. 運用上の効果

最終的に次を観測する。

- issue が溜まるだけで終わらず、送付先へ流れるか
- design 化すべきものと execution 候補が混ざりすぎていないか
- future / archive が必要なときに選べるか
- routing 後に何をすべきかが次 action として読めるか

### E. route 多様性

第一バッチでは open issue が 2 件しかないため、
次も観測項目に含める。

- design / operations / future / archive のうち、どの route が実際に出たか
- 出なかった route がある場合、実 issue の母集団不足か、判定ロジックの偏りか
- 第二バッチで補うべき route は何か

---

## 実験手順

1. 対象 issue 2 件を入力として issue routing を実行する
2. `route_to / reason / next_action` を確認する
3. action plan を生成する
4. notes write payload を確認する
5. operations 候補が出た場合は rolling 接続可能性を確認する
6. route 多様性の不足有無を記録する
7. 観測結果を design または report に返す

---

## この段階でまだやらないこと

- active_operations への直接反映
- issue 本体の毎回更新
- queue の永続保存
- route 多様性を満たすためだけの人工 issue 追加

まずは、
現在の open issue をそのまま使って、
実運用の第一バッチを回すことを優先する。

---

## 判断

issue routing の最小運用実験は、
まず既存 open issue 2 件で開始するのが自然である。

route 多様性は不足する可能性が高いが、
その不足自体も観測項目として扱う。

この方針なら、
実装確認ではなく、
実際の issue を流して効果を観測するという
Phase 0 の完成基準に沿って前進できる。
