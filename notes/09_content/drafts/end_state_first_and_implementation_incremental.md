# end_state_first_and_implementation_incremental

## ひとことで言うと

複雑なワークフロー実装ほど、
完成形を後回しにすると局所最適が積み重なる。

だから、
最終形態は先に固定し、
実装は段階化した方がよい。

## 問題

issue routing を作っていると、
次のものが一気に絡む。

- issue
- routing
- review
- operations
- design
- future
- archive
- notes write

ここで完成形を決めずに都度つなぐと、
責務が混ざりやすい。

逆に、
最終形態を一気に実装しようとすると、
依存が多すぎて壊れた地点が分かりにくい。

## 気づき

一番自然だったのは次の進め方だった。

- end-state first
- implementation incremental

つまり、

1. 最終 schema と責務を先に固定する
2. 実装は段階化する
3. 各段で dry run できる状態を保つ

## 今回の具体例

issue routing では、
少なくとも 4 層に分けると整理しやすかった。

- issue
- routing decision
- action plan
- review

この分離を先に決めたことで、

- 保存と routing を分ける
- routing と後処理を分ける
- routing と review を分ける
- 可変評価は decision 側に置く

という原則が見えやすくなった。

## 使える原則

- 保存は保存だけにする
- 判定は routing で行う
- 反映は action plan に分ける
- 再評価は review に寄せる
- write は後段に寄せる
- 返り値 schema を先に安定させる

## なぜ価値があるか

このやり方だと、

- end-state を見失わない
- 手戻りを局所化できる
- dry run で穴を見つけやすい
- docs / instruction / code の整合を取りやすい

複雑な AI Work OS の flow-control では、
特に効く考え方だと思う。

## まだ粗いメモ

- big bang 実装を避ける話として書ける
- issue routing だけでなく review / operations rolling にも広げられる
- 「完成形を先に書くが、一気に入れない」が核
- 実データ dry run とセットで語ると説得力が出る
