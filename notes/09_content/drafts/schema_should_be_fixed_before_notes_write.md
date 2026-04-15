# schema_should_be_fixed_before_notes_write

## ひとことで言うと

notes write に進む前に、
まず schema を固定した方がよい。

特に flow-control のように
複数レイヤーをまたぐ処理では、
write より先に値の通り道を安定させる必要がある。

## 問題

issue routing の後処理統合を進めると、
すぐに notes write へ行きたくなる。

ただしその前に、
次が揃っていないと危ない。

- input
- normalize
- rules
- placement
- routing
- action plan

このどこかで値が落ちると、
write 先だけ増えても整合は壊れる。

## 今回の具体例

可変評価 schema を入れたとき、
最初は次を追加した。

- default_impact
- default_urgency
- impact_now
- urgency_now
- evaluated_at

見た目としては進んでいたが、
実際には

- `normalize.js` で `assessment` が落ちる
- `placement.js` で `impact_now` などが落ちる

という穴があった。

つまり、
write より前に flow 全体を読み直す必要があった。

## 使える原則

- write は最後に近い段で入れる
- 先に返り値 schema を固定する
- 1段ずつ値が落ちていないか確認する
- code はファイル単位ではなく flow 単位で読む
- 途中で穴が見つかったら、先に経路を塞ぐ

## なぜ価値があるか

この順番を守ると、

- notes write の手戻りが減る
- 責務分離を崩しにくい
- dry run の信頼性が上がる
- schema と実装のズレを早く見つけられる

flow-control 系の実装では、
かなり効く考え方だと思う。

## まだ粗いメモ

- 「write に行きたくなる瞬間ほど schema を疑う」と言い換えられる
- issue routing だけでなく review / projection 同期にも広げられる
- 実装前の設計論ではなく、実装途中の安全策として書ける
