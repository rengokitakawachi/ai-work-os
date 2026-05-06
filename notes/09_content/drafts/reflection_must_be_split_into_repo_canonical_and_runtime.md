# reflection must be split into repo canonical and runtime

反映系の作業で

- repo を更新した
- operations / notes に反映した
- 実際の判断や運用で効いた

を同じ `反映した` で扱うと、
completed 判定を誤りやすい。

今回、
`adam_instruction.md` を更新しただけで
`ADAM instruction 反映` を完了扱いしそうになったが、
これは

- repo反映
- 正本反映
- 実運用反映

を分けて見れば防げた。

再発防止として、
反映系 task では少なくとも次を分けて記録する。

- repo反映: 対象ファイル更新
- 正本反映: operations / notes / plan 更新
- 実運用反映: reroll / 次タスク提案 / 回答で効いた確認

ポイントは、
repo 更新済みを理由に
runtime 反映 task を閉じないこと。

この分離は、
ADAM の instruction 更新だけでなく、
docs 反映、notes 正本反映、projection 更新にも再利用できる。
