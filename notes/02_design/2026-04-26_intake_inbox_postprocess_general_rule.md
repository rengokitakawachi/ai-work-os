# 2026-04-26 Intake Inbox Postprocess General Rule

## 目的

intake routing 後の元 inbox file を、
archive / pending のどちらで扱うかを判断する一般 rule を固定する。

本 design は、`pending_tasks` で確認した archive / pending rule を intake routing 全体へ一般化する。

---

## 背景

`pending_tasks` では、複数論点を含む元 file を split し、
導入 / メタ section を除外し、source_ref を維持した上で、
元 file を archive 扱いへ寄せてよいかを確認した。

確認結果として、
元 file を inbox に残し続ける必要は弱く、
archive 扱いへ寄せてよいと判断できた。

この判断を `pending_tasks` 固有の対症療法にせず、
intake routing 全体の後処理 rule として一般化する。

---

## 前提

intake routing の対象は、未整理入力である。

処理単位は file ではなく、chunk / item / theme である。

元 file は source_ref の参照先として保持するが、
処理完了後も inbox に残し続ける必要があるとは限らない。

---

## 基本原則

### 1. inbox は作業入口であり、長期保管場所ではない

inbox は未整理入力を受ける場所である。

routing 済みの元 file を無理由で inbox に残すと、
未処理と処理済みが混ざり、再評価対象が曖昧になる。

---

### 2. 処理対象 file は archive 原則

intake routing が成立した元 file は、原則 archive 扱いへ寄せる。

archive 扱いにしてよい条件は次である。

- chunk / item / theme への分解が成立した
- 主要論点の route または保持先を説明できる
- 派生メモに source_ref が残っている
- 元 file を inbox に残さなくても後続判断に支障がない
- 保留理由を1文で説明できない

---

### 3. pending は例外である

pending は、処理済みをなんとなく残す場所ではない。

pending に残してよいのは、次のいずれかがある場合のみである。

- chunk 分解が成立していない
- テーマ境界が曖昧である
- route / 保存先判断が未了である
- 情報不足により判断不能である
- 元 file を参照しながら追加分解する予定がある
- 保留理由を1文で説明できる

---

### 4. source_ref があれば inbox に残す理由は弱くなる

派生メモに source_ref が残っていれば、
元 file は追跡可能である。

したがって、source_ref が成立しているのに、
元 file を inbox に置き続けることは原則避ける。

---

## 判断手順

intake routing 後、対象 file ごとに次を確認する。

1. 分解は成立したか
2. 主要論点の route / 保存先は説明できるか
3. 派生メモに source_ref は残っているか
4. 元 file を inbox に残さないと困る具体理由はあるか
5. pending 理由を1文で説明できるか

判断:

- 1〜3 が yes、4〜5 が no なら archive
- 4〜5 が yes なら pending
- 1〜3 のどれかが no なら pending または再 routing

---

## archive 扱いの意味

archive 扱いとは、元 file の役目が終わったとみなすことである。

必ずしもこの design の時点で物理移動を実行することを意味しない。

実際の移動は、別の write task または intake routing apply 処理で行う。

---

## pending 扱いの意味

pending 扱いとは、元 file が未処理または判断保留であることを明示することである。

pending に残す場合は、保留理由を明示する。

例:

- `テーマ境界が曖昧なため pending`
- `追加分解予定があるため pending`
- `route 判断に必要な前提情報が不足しているため pending`

---

## pending_tasks からの一般化

`pending_tasks` では、次が成立した。

- split が成立した
- 導入 / メタ section は除外できた
- source_ref で元 file を追跡できる
- 残論点は元 file の再分解ではなく、後処理 rule の一般化へ移った

したがって、`pending_tasks` 元 file は archive 扱いへ寄せてよい。

この事例から、一般 rule としては次を採用する。

> 処理済みで source_ref が残っている元 file は archive 原則。pending は理由を説明できる場合だけ許可する。

---

## completed condition

この rule は次を満たしたら成立とみなす。

- archive 原則と pending 例外が説明できる
- source_ref と元 file の役割差が説明できる
- pending に残す条件が明確である
- `pending_tasks` の事例から一般化できている
- 後続の intake routing apply / file move task に渡せる

---

## 判断

intake routing 後の inbox 後処理は、
`archive 原則 / pending 例外` とする。

判断可能なものを pending に逃がさない。

source_ref が成立している元 file は、
作業入口としての役目を終えた時点で archive 扱いへ寄せる。
