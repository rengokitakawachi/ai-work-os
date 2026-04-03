# ADAM / EVE 共通の Routing and Planning Core Model メモ

## 概要

今回の整理で見えてきたのは、ADAM と EVE を別々のものとして考えるより、共通の骨格を持つシステムとして設計した方が美しいということだった。

その共通骨格は、単なる review 中心ではなく、

- intake routing
- issue routing
- roadmap / plan / operations
- review

を分離して接続するモデルとして表現できる。

本メモは、その全体像を軽量に残すための dev memo である。

---

## 結論

重要なのは、以下を分離すること。

1. 未整理入力をどこへ送るか
2. issue をどこへ送るか
3. 上位計画から短期実行順へどう具体化するか
4. 進捗と整合をどう見直すか

つまり、思考・仕分け・計画・見直しを別レイヤーにすることが、ADAM と EVE の両方に効く。

---

## 共通骨格

```text
未整理入力
↓
intake routing
↓
issue / dev_memo / future / archive
↓
issue routing
↓
plan / operations / design / future / archive
↓
実行
↓
review
```

この骨格は、開発にも一般業務にも転用できる可能性が高い。

---

## 各要素の役割

### 1. intake routing

未整理入力を受ける入口。

対象:
- 会話入力
- メモ
- web 情報
- 思いつき
- 曖昧な相談

役割:
- 入力を読む
- 構造化の必要性を見る
- issue にするか、dev_memo に置くか、future に送るかを決める

これは review というより、入口での仕分けである。

---

### 2. issue

何が問題か、何が論点かを保持するレイヤー。

ここではまだ、何をやるかを決め切らない。
問題の所在と意味を保持することが主目的。

---

### 3. issue routing

issue を次のレイヤーへ送る仕分け。

役割:
- 今すぐ実行順に落とすべきか
- 中期テーマとして持つべきか
- まだ考えを広げるべきか
- design が必要か
- 将来送りか
を判断する

送り先:
- plan
- operations
- design
- future
- archive
- 必要に応じて dev_memo

これは issue に対する review というより、routing / triage / dispatch に近い。

---

### 4. roadmap / plan / operations

3階層 planning の中核。

- roadmap = 上位方針 / 到達したい状態
- plan = 一定期間またはテーマ単位の中期計画
- operations = 直近の実行順

重要なのは、operations だけを実行正本にすること。

roadmap と plan は方向と重点を持ち、
operations は「今何をやるか」を持つ。

---

### 5. review

review は routing とは分ける。

役割:
- 進捗確認
- 優先順位見直し
- roadmap / plan / operations の整合確認
- 継続 / 完了 / defer / split の判断

つまり review は、振り分けではなく見直しである。

---

## ADAM と EVE の関係

### ADAM

ADAM は主に開発を扱う。

追加レイヤー:
- docs
- design
- code
- decisions

ただし、根幹は共通骨格の上に乗る。

---

### EVE

EVE は一般業務を扱う。

追加接続:
- Todoist
- Outlook
- Teams
- Obsidian など

ただし、こちらも根幹は同じで、

- intake routing
- issue routing
- planning
- review

の流れを持つ方が自然。

---

## なぜ重要か

この整理が重要なのは、review に何でも背負わせずに済むから。

もし routing と review を混ぜると、

- 振り返り
- 整合確認
- 次レイヤーへの仕分け
- 実行順変更

が一箇所に集まり、責務が曖昧になる。

今回の整理では、

- routing は送る
- planning は具体化する
- review は見直す

に分離できた。
これはかなり根幹的な構造改善。

---

## 今回の設計上の美点

- intake routing と issue routing を分けた
- routing と review を分けた
- plan と operations を分けた
- ADAM 固有部分と EVE へ展開できる共通骨格を分けた

この4点が揃うと、システムがかなり崩れにくくなる。

---

## 今後の見方

今後、何か新しい機能や運用ルールを考えるときは、まず以下を問うとよさそう。

- これは intake routing の話か
- これは issue routing の話か
- これは planning の話か
- これは review の話か
- これは ADAM 固有か
- これは EVE にも共通化できるか

---

## 当面の扱い

- いきなり docs に昇格しない
- まずは dev memo と issue で保持する
- 直近は roadmap docs 更新や repo-resource 論点を優先する
- 必要なら後で design へ昇格する

---

## 補足メモ

- 「review ではなく routing」という整理はかなり大きい
- issue は溜める場所、routing は流す場所、operations は実行する場所
- EVE に一般業務 planning を持たせるとき、この骨格が核になる可能性が高い
- ADAM の開発フローを共通 OS モデルとして見直す視点が重要
