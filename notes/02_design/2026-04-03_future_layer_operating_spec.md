# 2026-04-03 Future Layer Operating Spec

## 目的

`80_future` レイヤーの役割と運用方針を定義する。

特に、
intake routing 時にどのような入力を `80_future` へ送るか、
また plan のうちどのようなものを `80_future` へ移すかを明文化する。

本仕様は、
今後 `notes/80_future/` を実体化する前提整理として扱う。

---

## 結論

- future は必要
- 実フォルダ名は `80_future/` とする
- future は archive と似た位置にあるが、意味は異なる
- future は「今は扱わないが、将来また扱う可能性があるもの」を置く
- intake routing により future へ送られる入力がある
- active plan のうち deferred なものも future へ送る
- 最初の内部構成は `plan/` `inbox/` を基本とする

---

## 定義

### future

future は、
現時点では着手しないが、
将来の phase で扱う可能性が高いものを保持するレイヤーである。

future は archive ではない。

future は「役目を終えたもの」を置く場所ではなく、
「まだ役目は来ていないもの」を保持する場所とする。

### archive

archive は、
役目を終えたもの、
置き換えられたもの、
履歴として保持するものを置く場所とする。

---

## 位置づけ

```text
active layers
↓
80_future
↓
99_archive
```

意味としては以下とする。

- active layers
  - 今扱っているもの
- 80_future
  - 今は扱わないが、将来扱う可能性があるもの
- 99_archive
  - 役目を終えたもの

---

## 80_future の想定構成

最初は以下を基本とする。

```text
notes/80_future/
README.md
plan/
inbox/
```

### 80_future/plan

- 今 phase では扱わない plan
- 将来再開候補
- deferred_to_future の plan

### 80_future/inbox

- 次期フェーズより先で使う未整理入力
- 今は issue / design / plan に上げない入力
- 将来向け未整理保管

---

## intake routing との関係

future は intake routing と強く関係する。

intake routing 時には、
未整理入力を読んだ結果、
現フェーズや次期フェーズでは扱わないと判断したものを
future へ送る。

### 基本方針

- inbox は未整理入力の入口
- intake routing は入力をチャンク分解し、テーマ単位へ再構成する
- 今やる必要がないものを無理に issue / design 化しない
- ただし削除もしない
- その受け皿として future を使う

---

## intake routing で future に移す対象

### 1. 次期フェーズより先で使う未整理入力

現フェーズまたは次期フェーズでは使わないと判断した入力は、
`80_future/inbox/` へ移す。

例

- 今の roadmap 上では Phase 3 以降で使う前提の論点
- 現時点で設計対象にすると premature なもの
- 将来のために保持したいが、今は解釈しすぎたくないもの

### 2. 前提条件が未整備で今は扱えない入力

重要性はあるが、
前提不足のため今 issue / design に上げない方がよいものは、
`80_future/inbox/` へ移す。

例

- 正本構造が未確定なため設計対象にできないもの
- 他の phase 完了後でないと意味を持たないもの

### 3. phase 基準で future 判定されたテーマメモ

チャンク分解・テーマ統合の結果、
「今はやらない」と判断したテーマメモは future に置く。

例

- テーマとしては独立する
- source_ref も持てる
- ただし現 phase では active 化しない

---

## plan との関係

future は plan の退避先にもなる。

### 80_future/plan に移す対象

active plan のうち、
今は進めないが将来また扱う可能性が高いものを
`80_future/plan/` に移す。

例

- phase の順序上、後ろ倒しにした plan
- 前提条件未整備で defer した plan
- 今月は扱わないが、次の月や次の phase で戻す plan

### 80_future/plan に移さないもの

以下は future ではなく archive に送る。

- completed
- superseded
- split 元
- 役目を終えた plan

---

## 判断基準

### future に送る

- 今はやらない
- 将来また扱う可能性がある
- まだ役目は終わっていない
- 現 phase / 次期 phase の対象ではない
- 無理に issue / design 化しない方がよい

### archive に送る

- 完了した
- 置き換えられた
- 分割元として役目を終えた
- 履歴として保持すればよい

---

## 再活性化ルール

future に置かれたものは、
active layers や operations に直接戻してはならない。

再活性化時は、対象レイヤーに応じた再判定を行う。

### inbox 系

`80_future/inbox/` にあるものは、
intake routing を再実行して
issue / design / plan / future への再配置を判断する。

必要条件:

- 前提条件が整備された
- 優先順位が上昇した
- 関連する issue / design が発生した
- review により再評価対象となった

### plan 系

`80_future/plan/` にあるものは、
weekly review または monthly review で
active plan に戻すか、
引き続き future に残すかを判断する。

### 禁止事項

- `80_future/inbox/` から active layers / operations への直接移動
- `80_future/plan/` から operations への直接移動
- 再評価なしの再利用

---

## weekly review との関係

weekly review では以下を確認する。

- active plan の継続 / 完了 / defer
- defer する plan を `80_future/plan/` に送るか
- operations の対象外になったテーマがないか
- 今 phase では扱わない論点が増えていないか
- `80_future/plan/` から active plan に戻すものがあるか

weekly review は、
active と future の境界を調整する場でもある。

---

## monthly review との関係

monthly review では以下を確認する。

- future に送った要素の再評価要否
- roadmap 上の phase 進行により active 化すべき future の有無
- future と archive の誤配置がないか
- `80_future/plan/` の継続 / 戻し / archive 化の必要性

---

## routing / review の役割分離

- intake routing は未整理入力の再構成と振り分けを担う
- weekly / monthly review は進行中資産の見直しと再判定を担う

future の運用では、
未整理入力系は routing を通し、
plan 系は review を通す。

---

## source_ref との関係

future に送るテーマメモにも source_ref は保持してよい。

future は未整理または deferred なレイヤーだが、
出自追跡は維持する。

---

## 判断

- future は archive と区別して採用する
- 実体化する場合は `80_future/` とする
- 最初は `plan/` `inbox/` で始める
- intake routing 時に future へ移動する対象があることを正式に扱う
- deferred な plan の受け皿としても future を使う
- `80_future/inbox/` は intake routing 再実行で戻す
- `80_future/plan/` は weekly / monthly review で戻す

---

## 影響範囲

- notes/80_future/README.md
- notes/02_design/intake_review_and_source_ref_spec.md
- notes/02_design/2026-04-03_plan_layer_operating_spec.md
- notes/03_plan/README.md
- notes/02_design/2026-04-03_review_system_operating_spec.md
- notes/02_design/2026-04-06_flow_control_and_usecase_architecture.md
