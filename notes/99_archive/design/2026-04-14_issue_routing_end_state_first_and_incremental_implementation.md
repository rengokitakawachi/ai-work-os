# 2026-04-14 issue_routing_end_state_first_and_incremental_implementation

## 目的

issue routing の実装方針として、
「最終形態を先に固定し、実装は段階化する」
考え方を整理する。

本メモは、
big bang で最終形態へ飛ぶのではなく、
end-state first で設計を固定しつつ、
小さく安全に収束させるための方針を明文化することを目的とする。

---

## 結論

issue routing は、
最終形態を先に設計すること自体は正しい。

ただし、
最終形態を一気に実装するのは避ける。

採るべき方針は次である。

- end-state first
- implementation incremental

つまり、

1.
最終形態の schema と責務を先に固定する

2.
実装は段階化して進める

3.
各段で dry run 可能な状態を保つ

この方針により、
仕様の見通しと実装の安全性を両立できる。

---

## なぜ一気に最終形態へ行かないか

理由は 3 つある。

### 1. 責務境界がまだ動いている

issue routing では、
少なくとも以下の境界が絡む。

- issue
- routing
- review
- operations
- design
- future
- archive

この境界はかなり整理されたが、
まだ次が変動しうる。

- 可変評価の持ち方
- 後処理の反映先
- design review との接続
- future 再活性化の入口
- notes write の責務分離

この状態で一気に最終実装へ進むと、
広い範囲で手戻りが起こりやすい。

### 2. 最終形態は依存が多い

issue routing の最終形態には、
少なくとも次が関与する。

- issue schema
- routing decision schema
- action plan schema
- notes write 先
- review での再評価
- operations candidate 接続
- design 派生
- archive / future 後処理

これを一度に入れると、
壊れた地点の特定が難しくなる。

### 3. repo の基本原則と相性が悪い

AI Work OS 側の原則は次である。

- docs を正にする
- 小さく安全に前進する
- 保存と判定を分ける
- routing と review を分ける

最終形態を big bang で入れると、
この原則を崩しやすい。

---

## ただし最終形態を後回しにしてよいわけではない

段階実装だけに寄せると、
局所最適の積み重ねになりやすい。

そのため、必要なのは
「先に最終形態を固定し、その形へ段階的に近づける」
やり方である。

つまり、
完成形を後で考えるのではなく、
完成形を先に定義してから、
そこへ最短距離で近づく実装順を選ぶ。

---

## issue routing の最終形態

issue routing の最終形態は、
少なくとも以下の 4 層を分ける。

### 1. issue

issue は論点の記録である。

保持するのは、
比較的変わりにくいものを中心とする。

例

- title
- category
- description
- context
- created_at
- status

ここでの status は、
open / closed などの管理状態に寄せる。

### 2. routing decision

routing decision は、
その時点での評価と送付先判定である。

保持するもの

- evaluated_at
- impact_now
- urgency_now
- route_to
- reason
- review_at
- needs_task_generation
- keep_issue_open
- next_action

ここで重要なのは、
impact のような可変評価を issue 本体ではなく
decision 側に置くことである。

### 3. action plan

action plan は、
routing decision を受けて
次に何を反映すべきかをまとめたものである。

例

- keep_issue
- archive_issue
- design_updates
- operations_candidates
- future_candidates

### 4. review

review は、
routing decision を再評価・更新する地点である。

- daily review
- weekly review
- issue routing review
- future 再活性化時の再判定

review は routing の代替ではなく、
routing decision を見直す更新地点として扱う。

---

## 固定すべき原則

### 1. 保存と routing を分ける

- issue を保存するときは保存だけでよい
- 送付先判定は issue routing 時に行う

### 2. routing と後処理を分ける

- routing は route_to を決める
- 後処理は action plan として分離する

### 3. routing と review を分ける

- routing は保存先判定と初期処理
- review は進行中資産の再評価と更新

### 4. 可変評価は issue 固定値にしない

- impact は固定値ではなく変動しうる
- issue に初期値があってもよいが、最新判断は decision 側を正とする

### 5. operations への正式投入は rolling を通す

- issue routing がやるのは operations candidate 生成まで
- active / next への正式配置は operations rolling が担う

---

## 実装順

最終形態へ向けた実装順は次の 4 段が自然である。

### 第1段

最終 schema を固定する。

固定対象

- issue schema
- routing decision schema
- action plan schema
- 可変評価の置き場

### 第2段

issue routing が最終 schema に近い返り値を持つようにする。

最低限返すもの

- route_to
- reason
- review_at
- keep_issue_open
- next_action
- needs_task_generation

### 第3段

action plan から notes 反映を行えるようにする。

対象

- issue を残す
- archive に移す
- design を派生する
- operations candidate を生成する
- future へ送る

### 第4段

review と再評価を接続する。

対象

- daily review
- weekly review
- future/issue の再活性化
- issue routing review

---

## 進め方の原則

各段の実装では、
次を守る。

- 各段で dry run 可能にする
- schema を先に壊さない
- 返り値を先に安定させる
- write を後段に寄せる
- docs / instruction / code の責務境界を崩さない

---

## この方針の利点

- end-state を見失わない
- 手戻りの局所化ができる
- dry run で検証しやすい
- 保存 / 判定 / 反映 / 再評価の責務が混ざらない
- issue routing を review や rolling に過剰連結しない

---

## 判断

issue routing については、

- 最終形態を先に固定する
- 一気に実装しない
- schema と責務を先に定義する
- 実装は 4 段に分ける

の方針が最も自然である。

この方針により、
big bang 実装の危険を避けつつ、
最終形態へ一直線に収束できる。
