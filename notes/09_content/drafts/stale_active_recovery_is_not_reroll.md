# タイトル案

stale active の整合回復は reroll ではない  
実行前に必要なのは「再配置」ではなく「正本修復」だった

## 問題

operations を active-first で運用していると、
最新 handover や archive では完了扱いなのに、
`active_operations.md` の先頭に古い task が残ることがある。  
この状態で次に進むと、
「active の先頭を実行している」つもりでも、
実際には stale な正本に従ってしまう。

## 背景

active-first execution の試験運用では、
まず active の先頭から実行対象を取る前提だった。  
しかし実際には、
handover / archive / active の反映タイミング差により、
完了済み task が active 先頭に残るケースが見つかった。  
最初は reroll で直す発想もありえたが、
これは優先順位の再判断ではなく、
既存正本の不整合修復として扱う方が自然だった。

## なぜ重要か

- active-first execution を形骸化させない
- 正本修復と優先順位再配置を混同せずに済む
- reroll の発火条件を絞れ、運用が過剰にならない
- 再開時の確認手順を安定させられる

## 解決

stale な active 先頭 task を見つけた場合は、
新規候補の検討や reroll に入る前に、
先に active 正本の整合回復を行う。

手順は以下。

1. latest handover / related notes / operations を確認する  
2. active 先頭が stale かを確認する  
3. stale なら active 正本を修復する  
4. 修復後の先頭 task を現行の実行対象とする  
5. 新規候補があるときだけ reroll に進む

## 学び

- stale active の整合回復は reroll ではない
- reroll は新規候補発生時の再配置ルールとして絞る方が強い
- active-first execution を守るには、まず active 自体が正しくなければいけない
- 実行前に必要なのは「並べ替え」ではなく「正本修復」であることがある

## 意思決定

- stale active は reroll と切り分ける
- stale active は前処理として修復する
- 修復後に新規候補がある場合のみ reroll を検討する

## Before / After

- Before:
  active 先頭に違和感があっても、reroll や次作業へ進みそうだった

- After:
  まず active 正本を修復し、その後に実行または reroll を判断するようになった

## メモ（ラフ）

- active-first execution の補足ルール
- reroll の誤用を防ぐ
- handover / archive / active のタイミング差で起きる
- 「正本修復」と「優先順位再配置」は別概念
