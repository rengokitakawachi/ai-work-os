# Supabase as Metadata DB Memo

## 概要

Supabase は、AI Work OS / EVE で将来的に DB を導入する場合の有力候補として気になっている。

ただし、現時点では本流の設計・整合作業から少し外れるため、
今すぐ深掘りせず、軽い dev_memo として退避する。

---

## 現時点の判断

- Supabase は有力候補
- ただし今すぐ導入しない
- 正本を置き換える用途ではなく、補助DBとして考えるのが自然

---

## 想定する役割

Obsidian / notes を正本のまま維持しつつ、
Supabase は以下のような用途に向く可能性がある。

- issue / design / plan / operations の関係管理
- operations 候補の収集結果
- ranking / scoring の履歴
- review / routing の実行ログ
- future 再活性化の履歴
- 検索・集計・可視化の補助

---

## 役割分担の仮説

- notes / Obsidian
  - 思考・文脈・設計・本文の正本

- Supabase
  - 関係・状態・履歴・検索補助のDB

---

## 注意点

- issue / design / plan の本文正本を DB に移さない
- 長文思考資産を DB 中心で扱わない
- 今の Phase 0 では導入優先度は高くない

---

## 今後の検討トリガー

以下が強くなったら再検討する。

- 関係追跡が手で重い
- scoring knowledge を履歴比較したい
- operations 候補生成を program 化したい
- review / routing のログ蓄積が必要
- EVE 側で件数が増える

---

## 当面の扱い

- 今は本流から外す
- 将来の DB 候補として保持する
- まずは Flow Control / routing / operations の整合を優先する
