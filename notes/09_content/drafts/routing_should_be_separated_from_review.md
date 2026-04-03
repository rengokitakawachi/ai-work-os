# タイトル案

review ではなく routing として分ける  
仕分けと見直しを分離するとシステムは崩れにくくなる

## 問題

入力や issue を次のレイヤーへ送る判断と、進捗や整合を見直す判断を同じ review に入れると、役割が広がりすぎて構造が曖昧になる。  
その結果、review が何でも屋になり、仕分け・優先順位変更・振り返り・整合確認が混ざりやすい。

## 背景

当初は issue を見て plan や operations に送る処理も review と呼びたくなったが、整理を進めると、これは振り返りや見直しではなく、仕分けや routing に近いことが明確になった。  
特に、

- 未整理入力をどこへ送るか
- issue を plan / operations / design / future にどう送るか

は、review より routing と捉えた方が自然だった。

## なぜ重要か

- review の責務を進捗確認と整合確認に限定できる
- 仕分けの処理を明確に独立させられる
- issue が溜まるだけで終わらず、次レイヤーへ流せる
- ADAM と EVE に共通の骨格として再利用しやすい

## 解決

review と routing を分離する。

- intake routing = 未整理入力の仕分け
- issue routing = issue の次レイヤー仕分け
- review = 進捗・整合・継続 / 完了 / defer の見直し

この3つを分けることで、役割がかなり明確になる。

## 学び

review という言葉で全部を包むと、設計上の責務がぼやける。  
一方で routing という言葉を使うと、「送る処理」と「見直す処理」をきれいに分離できる。  
命名の違いではなく、システムの骨格に関わる差だった。

## 意思決定

- routing と review は分けて扱う
- intake review より intake routing の方が自然な場面がある
- issue に対する後段処理は issue routing として考える
- review は進捗・整合・見直しに寄せる

## Before / After

- Before:
  仕分けも見直しも review に含めて考えがちだった

- After:
  仕分けは routing、見直しは review と分けた方が構造が安定すると整理できた

## メモ（ラフ）

- review が何でも屋になるのを防ぐ
- 命名ではなく責務分離の問題
- issue は溜める場所、routing は流す場所
- ADAM / EVE 共通骨格の中核論点
