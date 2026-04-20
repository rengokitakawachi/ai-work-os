# issue routing は無理に振り分けなくてよい

## 問題

issue routing を「必ず design / plan / operations / future / archive のどこかへ送る処理」と見なすと、自然な送付先がまだない論点まで無理に押し出してしまう。

## 背景

routing と writing の責務分離を整理する中で、送付先がまだ自然でない issue をどう扱うかが論点になった。ここで無理に振り分けるより、issue のまま保持する方が運用上自然だと確認した。

## 解決

- `route_to: issue` を正規結果として扱う
- `keep_items` は writer 側で no-op とする
- 送付先がまだ自然でなければ、無理に issue から出さない

## 学び

routing の品質は「たくさん振り分けること」ではなく、「まだ送らない方がよい論点を残せること」にも依存する。

## 意思決定

- issue routing は無理に issue から振り分けなくてよい
- keep は失敗や暫定退避ではなく、正規の結果とみなす
- design / plan / operations / future / archive に送るのは、送付先が自然なときだけにする
