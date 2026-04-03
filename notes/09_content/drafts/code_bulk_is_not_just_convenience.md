# タイトル案

code bulk は便利機能ではなく構造整合の論点  
repo-resource の access layer を実運用に耐える形へ揃える

## 問題

repo-resource は docs / notes / code を同じ access layer で扱う思想を持っているが、現状は code だけ bulk 読取が未実装である。  
そのため、複数の code ファイルを横断して確認するたびに単体 read を繰り返す必要があり、再開時や整合確認時のコストが高い。

## 背景

実際の運用では、以下のような複数ファイル同時確認が頻繁に起きる。

- instruction と schema の整合確認
- repo-resource の service / handler / config の横断確認
- handover の Related code 読取
- docs と code の差分確認

このとき docs と notes には bulk がある一方で、code だけ bulk がなく、操作契約の対称性が崩れていた。

## なぜ重要か

- 再開時の Related code 読取が速くなる
- 横断整合確認の確認コストが下がる
- docs / notes / code の操作モデルが揃う
- access layer の思想と実装実態のズレを減らせる

## 解決

code bulk を無制限に入れるのではなく、制約付きの read-only bulk として導入する。

- 許可 prefix は既存 code 制約に従う
- 件数上限を付ける
- 総サイズ上限を付ける
- 一部成功 / 一部失敗を許容する
- file 単位で結果を返す
- まずは read-only とし、update 系とは分離する

## 学び

code bulk は単なる便利機能ではない。  
docs / notes / code を同じ access layer で扱うなら、横断読取の操作契約が揃っていないこと自体が実運用上の摩擦になる。  
思想上の対称性は、再開コストや確認コストとして実際の運用に現れる。

## 意思決定

- code bulk は必要論点として issue / operations に載せる
- 無制限ではなく、小さく安全に導入する
- まずは read-only bulk に限定する
- 実装前に方針と制約を先に確定する

## Before / After

- Before:
  code bulk はあると便利、なくてもよい機能に見えていた

- After:
  code bulk は access layer の整合性と再開効率のために必要な機能だと整理できた

## メモ（ラフ）

- 「便利」ではなく「構造の欠け」という言い方がよい
- handover の Related code 読取と結びつけると伝わりやすい
- 一貫した API 契約は運用コストを下げる
- 無制限 bulk を避け、件数とサイズ制限を最初から設計する
