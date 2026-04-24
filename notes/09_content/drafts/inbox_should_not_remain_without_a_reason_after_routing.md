# routing 後の inbox は無理由で残さない

## 問題

inbox を処理した後も、
何となく元ファイルを残し続けると、
未処理なのか、処理済みだが保留なのかが分からなくなる。

## 背景

`pending_tasks` は最初、
複数論点が混在していたため split が必要だった。
その後、見出し単位の item 化と導入除外を入れたことで、
粒度改善としては十分に前進した。

## なぜ重要か

source_ref が派生 item 側に残っているなら、
元 inbox を習慣的に残し続ける理由は弱い。
無理由で残すと、
inbox が「未整理入力置き場」ではなく
「何でも残る置き場」になってしまう。

## 解決

後処理ルールを

- 原則 archive
- 未判断が残るときだけ pending

に固定する。

## 学び

粒度改善が終わった後に残る論点は、
parser ではなく inbox 後処理であることが多い。

## 意思決定

- routing 後の inbox は原則 archive に寄せる
- pending は例外であり、保留理由を説明できるときだけ許可する
- source_ref があることと inbox に残すことは別問題として扱う

## Before / After

- Before: 処理済みでも習慣的に inbox へ残りやすい
- After: 役目終了したら archive、未判断が残るときだけ pending

## メモ（ラフ）

- `pending_tasks` で固めた rule を intake 全体へ一般化できるかは別 task
