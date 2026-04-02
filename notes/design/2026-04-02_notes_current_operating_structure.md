# 2026-04-02 Notes Current Operating Structure

## 目的

現在の repo 上で、notes が実際にどう運用されているかを明文化する。

本メモは、理想構造や将来構造ではなく、
現時点で存在しているフォルダ、運用されているレイヤー、
すでに主に参照されているファイル群を整理するための design 草案とする。

この整理は、以下の前提資料になる。

- notes インデックス番号仕様
- フォルダ移行マッピング
- notes/README.md の更新
- docs/15_notes_system.md の差分整理

---

## 背景

現在の notes は README や一部 design README に書かれている構造より先に運用が進んでいる。

特に以下のズレがある。

- notes/README.md では exploration が主線に残っている
- notes/design/README.md でも exploration / exploration/memo 前提が残っている
- 一方で実運用では inbox/dev_memo、operations、handover、reports、content が中核になっている
- ideas は実態として issue レイヤーに近い
- analysis は横断確認に使われている
- archive はすでに存在するが、主線ではない

そのため、まず「いま実際に何が使われているか」を切り出しておく必要がある。

---

## 結論

現時点の notes は、以下の3層で見ると分かりやすい。

1. 中核運用レイヤー
2. 補助・周辺レイヤー
3. 旧構造または移行中レイヤー

---

## 1. 中核運用レイヤー

### notes/inbox/

役割:
- 未整理入力の入口
- iPhone / web / 会話由来メモの一次受け皿

実態:
- notes/inbox/web/
- notes/inbox/dev_memo/
が存在し、未整理入力の実質的な中核入口になっている

評価:
- 現在の主線入口として確立済み

---

### notes/design/

役割:
- docs 直前の仕様草案
- 構造整理
- ルール整理
- API / フロー / 保存先の設計

実態:
- 標準開発フロー
- phase / plan / operations
- repo-resource access
- intake review
- notes 構造再編
などの主要設計メモが集約されている

評価:
- docs 直前レイヤーとして確立済み

---

### notes/operations/

役割:
- 短期実行順の正本
- 今何を進めるかの優先順位管理

実態:
- notes/operations/2026-03-26_short_term_plan.md
が実質的な短期実行順の正本として運用されている

評価:
- 中核レイヤーとして確立済み
- ただし週次テンプレートや rolling 運用は未確定

---

### notes/handover/

役割:
- スレッド再開時の正本
- 再開起点のコンテキスト整理

実態:
- 継続的に handover ファイルが蓄積されている
- 実際に最新 handover を読んで再開する運用が成立している

評価:
- 再開用中核レイヤーとして確立済み

---

### notes/reports/

役割:
- daily / monthly のレポート蓄積
- 振り返りと集約

実態:
- notes/reports/daily/
- notes/reports/monthly/
が継続運用されている

評価:
- 中核運用の一部として成立済み

---

### notes/content/

役割:
- 記事素材の蓄積
- 外部価値化の素材保存

実態:
- content/README.md
- content/drafts/
が存在する
- まだ docs 反映前だが、運用レイヤーとしては導入済み

評価:
- 運用先行レイヤー
- 中核候補だが formalize 前

---

### notes/ideas/

役割:
- 現状では idea_log の保存先
- 実態としては課題ログに近い

実態:
- notes/ideas/idea_log.md に architecture / ops / idea などが蓄積されている
- 内容は「アイデア」より issue に近い

評価:
- 現行では中核寄り
- ただし名称と責務は再整理対象
- 将来的には issues へ寄せる前提

---

## 2. 補助・周辺レイヤー

### notes/decisions/

役割:
- 意思決定ログの置き場

実態:
- ディレクトリはある
- ただし現在はまだ厚く運用されていない

評価:
- 重要だが、現時点では薄い
- 今後強化対象

---

### notes/logs/

役割:
- 補助ログ
- 失敗記録や実装補助記録

実態:
- ディレクトリはある
- ただし reports や handover ほどの中核性はない

評価:
- 補助レイヤー

---

### notes/analysis/

役割:
- 横断的な整合確認
- docs / code / notes の確認メモ

実態:
- docs-code-consistency-check.md のような横断確認メモが存在する

評価:
- 主線ではないが有効
- analysis の位置づけは formalize 候補

---

### notes/backlog/

役割:
- backlog 管理
- candidate / ready next / blocked などの保持

実態:
- notes/backlog/dev-backlog.md が存在する
- ただし現在の短期実行順の正本は operations 側へ寄っている

評価:
- 役割が operations と一部競合
- 中核からは外れ気味
- 将来的に再整理対象

---

## 3. 旧構造または移行中レイヤー

### notes/exploration/

役割:
- 旧来の調査・機能検討レイヤー

実態:
- フォルダは残っている
- README も旧方針を保持している
- ただし最近の議論では廃止寄り、または縮小寄り

評価:
- 現在の中核主線ではない
- 移行中 / 凍結候補

---

### notes/archive/

役割:
- 参照専用の退避先

実態:
- フォルダは存在する
- まだ大規模運用は見えない

評価:
- 現役主線ではない
- 最終保管先として維持

---

## 現行主線

実際の運用主線は、現在おおむね以下と見なせる。

```text
input
↓
notes/inbox/
↓
notes/ideas/ または notes/design/
↓
notes/operations/
↓
実行
↓
notes/reports/
↓
必要に応じて notes/handover/
```

補助的に以下が接続する。

```text
- notes/content/
- notes/analysis/
- notes/decisions/
- notes/logs/
```

---

## README / 既存記述とのズレ

### notes/README.md とのズレ

旧記述:
- inbox → exploration → design → docs

現行実態:
- inbox/dev_memo が中心
- exploration は中核ではない
- operations / handover / reports / content が重要
- ideas は issue レイヤーとして機能している

---

### notes/design/README.md とのズレ

旧記述:
- exploration で整理された機能案を design に上げる
- exploration/memo を未整理メモの保存先として扱う

現行実態:
- 未整理の開発メモは inbox/dev_memo に寄っている
- exploration/memo 前提は古い
- design はより広く「docs 直前の構造整理レイヤー」として使われている

---

## 現時点で中核とみなすべきフォルダ

以下は現時点で中核扱いにしてよい。

```text
notes/inbox/
notes/design/
notes/operations/
notes/handover/
notes/reports/
notes/ideas/
notes/content/
```

以下は補助または今後の再整理対象とみなす。

```text
notes/decisions/
notes/logs/
notes/analysis/
notes/backlog/
notes/exploration/
notes/archive/
```

---

## 未確定点

以下は現時点で未確定。

- ideas をいつ issues に変えるか
- plans をどの単位で持つか
- content を正式に中核へ昇格させるか
- analysis を独立レイヤーとして固定するか
- backlog を残すか operations に統合するか
- exploration の最終扱い
- decisions / logs の強化方針

---

## この整理で固定すること

この時点で固定するのは以下。

- 現在の主線は旧 README より進んでいること
- inbox / design / operations / handover / reports はすでに中核運用であること
- ideas は実態として issue レイヤーに近いこと
- content は運用先行の新レイヤーであること
- exploration は中核ではなく移行対象であること
- backlog / analysis / decisions / logs は補助または再整理対象であること

---

## 次のアクション

1. この現行実態を notes インデックス番号仕様に照らして対応付ける
2. フォルダ移行マッピングを統合文書として整理する
3. notes/README.md の更新草案を作る
4. docs/15_notes_system.md の更新草案へ接続する
