# 大規模整備の前に、node:test で最小回帰防止ラインを引く

## 問題

テスト基盤が未整備な repo では、
「ちゃんとした test 導入は後で」となりやすい。

その結果、
分岐ロジックが増えても
最低限の回帰防止すら無い状態が長く続く。

## 背景

今回の repo では、
以下のような分岐中心ロジックが増えていた。

- flow-control の routing / ranking
- repo-resource API の validation / routing
- tasks API の method / auth / validation
- operations → Todoist projection の action 判定

一方で、
package.json に test script は無く、
「まだ test 基盤が無い」と見えやすかった。

ただし実際には、
Node 20 と `node:test` が使え、
既存 test も 1 本あった。

## なぜ重要か

大規模な test 基盤整備を待っていると、
その間の設計変更が全部ノーガードになる。

特に、
純関数寄りのルール判定や
handler の validation / error shape は、
少数ケースでも守る価値が高い。

ここを小さく押さえるだけで、
安心して構造改善を続けやすくなる。

## 解決

まず以下だけを対象にした。

- `src/services/flow-control/rules.js`
- `src/services/flow-control/ranking.js`
- `api/repo-resource.js`
- `api/tasks/index.js`
- `api/tasks/[id].js`
- `api/tasks/project.js`
- `src/services/tasks/projection.js`

そして、
既存流儀に合わせて
`node:test` + `node:assert/strict`
で最小 test を追加した。

加えて、
`package.json` に

- `"test": "node --test"`

を足し、
実行入口も揃えた。

## 学び

- test 基盤が未整備でも、最小回帰防止ラインは引ける
- pure function と handler validation から入ると小さく始めやすい
- 「ちゃんとした test」は後でも、「最低限の test」は今すぐ置ける
- package.json に script が無いことと、test が導入不能であることは別問題

## 意思決定

- 最初の test 対象は pure / handler の分岐ロジックに寄せる
- integration 全体ではなく、最小の価値密度が高い箇所から守る
- 既存流儀があるなら、それに揃えて導入障壁を下げる

## Before / After

- Before
  - test 基盤が無いように見える
  - 分岐ロジックの回帰防止が無い

- After
  - `npm test` の入口がある
  - 主要な分岐ロジックに最小 test がある
  - 構造改善を続ける土台ができる

## メモ（ラフ）

- 「完璧な test 導入を待つほど、最低限の safety net が遅れる」
- `node:test` は導入の心理的ハードルが低い
- 設計改善の途中ほど、最小 test の価値が高い
