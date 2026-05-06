# 2026-04-24 pending_tasks_split_postprocess_archive_pending_rule

## 目的

`pending_tasks` を split した後、
元 inbox file を

- archive に移すか
- pending として inbox に残すか

の最小ルールを固定する。

本メモの目的は、
粒度改善後に残った inbox 後処理の未決定を閉じることである。

---

## 前提

`pending_tasks` については、
すでに次が成立している。

- split 実装は入った
- `概要` / `まとめ` / `summary` は除外対象に入った
- 各具体論点は見出し単位で item 化できる
- route / source_ref / role boundary は大きく崩れていない

したがって、
残る主論点は
**元 inbox の役目がいつ終了したとみなせるか**
である。

---

## docs / spec との整合

`intake_review_and_source_ref_spec.md` の原則は次である。

- inbox は原則そのまま保持する
- 処理対象ファイルは原則 archive へ移動する
- ただし判断困難な場合は pending として inbox に残してよい
- 無理由で残さない
- 判断可能なものを pending に逃がさない

したがって、
`pending_tasks` split 後の後処理も

- 原則 archive
- 例外として pending

で整理するのが自然である。

---

## 結論

`pending_tasks` の元 inbox file は、
**split が成立し、主要論点の派生先判断が可能になった時点で archive 寄り**
とする。

ただし、
次のいずれかが残る場合のみ
pending として inbox に残してよい。

- split 自体が不成立
- テーマがまだ曖昧
- 派生先判断が難しい
- 元ファイルを見ながら追加の再分解が必要

つまり、
`pending_tasks` は
「split したから即 pending」でも
「split したら必ず archive」でもない。

**役目終了したら archive、未判断が残るなら pending**
が最小ルールである。

---

## 判定ルール

### archive に寄せる条件

次を満たす場合、
元 inbox file は archive に寄せてよい。

- split が成立した
- 導入 / メタ section を除いた主要論点が item 化できた
- 各 item の route は少なくとも説明可能である
- source_ref で元 file を追跡できる
- 元 file を inbox に残さなくても、後続判断に支障がない

### pending に残す条件

次のいずれかがある場合、
元 inbox file は pending として残してよい。

- split が不成立
- 導入を除いても論点境界がまだ曖昧
- item 化はできたが、保存先や扱いが不安定
- 追加の再分解や手動確認を予定している
- 元 file をそのまま参照しながら次 task を進める必要がある

---

## 今回の `pending_tasks` への適用

現在の `pending_tasks` については、
粒度改善としては十分に前進しているが、
次の task として

- split 後の archive / pending rule 自体の整理

を今まさに行っている段階だった。

このタイミングでは、
rule 固定前までは pending 扱いでも自然だった。

しかし、
本ルール固定後の判断としては、
`pending_tasks` は
**archive 寄り**
とみなしてよい。

理由:

- split は成立した
- `概要` など導入ノイズは除外済み
- source_ref で元 file 追跡ができる
- 残論点は粒度ではなく後処理 rule 側へ移った

したがって、
この `pending_tasks` 自体を今後も inbox に残し続ける理由は弱い。

---

## 運用上の最小ルール

### 原則

- `pending_tasks` split 後は archive を第一候補とする

### 例外

- split 不成立
- 追加分解予定あり
- 派生先判断未了
- 保留理由を1文で説明できる

このときのみ pending を許可する。

### 禁止

- 何となく残す
- source_ref があるのに習慣的に inbox に置き続ける
- 後続判断可能なのに pending に逃がす

---

## 期待効果

このルールにより、

- 粒度改善後の inbox 後処理が説明可能になる
- `pending_tasks` が inbox に居座り続けるのを防げる
- source_ref を持つ派生 item と元 file の役割差が明確になる
- intake routing の completed condition を「route した」ではなく「後処理まで判断した」で見やすくなる

---

## 完了条件

- `pending_tasks` split 後の原則が archive であると説明できる
- pending に残す例外条件を明示できる
- `無理由で残さない` を運用ルールとして固定できる
- この rule をもとに、今後の intake 後処理判断が一貫して行える

---

## 次に落とす作業

- `pending_tasks` 元 inbox を archive 扱いへ寄せてよいかを実運用上確認する`
- 必要なら `intake routing の inbox 後処理 rule` 全体へ一般化する`
