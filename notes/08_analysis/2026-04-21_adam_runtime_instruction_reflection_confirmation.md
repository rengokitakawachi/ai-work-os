# 2026-04-21 adam_runtime_instruction_reflection_confirmation

## 目的

`completed condition ベース判断手順` と
`反映種別分離ルール`
が、repo 上の instruction 更新だけでなく、
ADAM の実運用判断にも反映されているかを確認する。

本メモは、
この会話内で実際に起きた判断修正をもとに、
ADAM 実運用 instruction への反映が成立したかを確認するための
analysis である。

---

## 参照

- `config/ai/adam_instruction.md`
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`
- `notes/03_plan/2026-04_phase0_adam_to_eve_common_operating_model.md`

---

## 結論

現時点では、
`completed condition ベース判断手順` と
`反映種別分離ルール`
は、
**ADAM の実運用判断にも反映された**
とみなしてよい。

理由は次の 2 点である。

1.
issue routing の完了判定で、
`route 多様性観測は進んだが、rolling の実 reroll と node test が未完了`
として、repo 更新や観測メモ作成だけで completed 扱いにしなかった。

2.
`ADAM instruction 反映` に関して、
repo の `config/ai/adam_instruction.md` 更新済みであっても、
それだけでは `ADAM 実運用 instruction 反映` completed とせず、
別 task として再オープンした。

この 2 つは、
今回追加した instruction ルールが
単なるファイル更新に留まらず、
会話中の実判断に使われたことを示している。

---

## 観測できた runtime 反映

### 1. 完成条件ベース判断の反映

この会話では、
issue routing の次タスク提案時に

- 実装進捗
ではなく
- 完成条件の未達

を主語に task を組み直した。

その結果、
`node --test`
は補助タスクとして後置し、
先に

- 第二バッチ候補整理
- future / archive 候補追加
- 第二バッチ routing 観測
- rolling 接続観測
- keep / future / archive 妥当性整理

を進めた。

これは
`completed condition ベース判断手順`
が runtime で効いていた証拠である。

---

### 2. 反映種別分離の反映

この会話では、
当初

- repo instruction 更新
- ADAM instruction 反映完了

を混同していたが、
その後

- repo 反映
- operations 正本反映
- ADAM 実運用反映

を分離し、
`ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する`
を未完了 task として再オープンした。

さらに、
今回その task を閉じるにあたり、
「この会話中の判断で実際に効いたか」を根拠に使っている。

これは
`反映種別分離ルール`
が runtime で効き始めた証拠である。

---

## どこまで反映できたか

### repo反映
- 済み

対象:
- `config/ai/adam_instruction.md`

### 正本反映
- 済み

対象:
- `notes/04_operations/active_operations.md`
- `notes/04_operations/next_operations.md`

### 実運用反映
- 済み

根拠:
- issue routing 完了判定で completed condition 未達を主語に判断した
- 反映系 task で repo 更新済みを理由に completed 扱いしないよう修正した

---

## まだ残る注意点

### 1. 一度反映されたことと、継続して守れることは別

今回の runtime 反映確認は、
この会話内では成立した。

ただし、
今後の別論点や別 reroll でも同じ分離が守られるかは、
継続観測が必要である。

### 2. 反映系 task の命名

今後も
`反映する`
だけの task 名を使うと再混同しやすい。

可能な限り

- repo 反映
- 正本反映
- 実運用反映確認

を task 名に含める方が安全である。

---

## 判断

今回の会話では、
追加した instruction ルールが

- issue routing の completed 判定
- ADAM instruction 反映 task の再オープン判断

に実際に使われた。

したがって、
`ADAM 実運用 instruction へ完成条件ベース判断手順を反映確認する`
は、
この観測をもって completed 扱いにしてよい。
