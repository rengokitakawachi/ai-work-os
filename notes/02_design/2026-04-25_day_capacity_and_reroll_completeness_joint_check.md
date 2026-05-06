# 2026-04-25 day_capacity_and_reroll_completeness_joint_check

## 目的

operations 提案時に、

- Day 容量が軽すぎる
- reroll completeness が不足する

のどちらか一方だけを見るのではなく、
両方を同時に確認する最小チェックを固定する。

本メモの目的は、
operations 提案や reroll 提案の前に通す共通ゲートを明示し、
局所的な改善で別の崩れを生まないようにすることである。

---

## 背景

2026-04-19 の issue `20260419-023` では、
短時間で終わる task を Day の主構成に近い形で置いてしまい、

- task は 0.5〜1.5h 程度
- 1日は約2h の task

という既存運用ルールに対して、
Day 容量が軽すぎる提案を出してしまった。

一方、recent daily review では、
Day 容量だけを見ても不十分であり、

- plan
- open issue
- next_operations
- current active

を見ずに reroll すると、
候補源の網羅不足で active が局所最適になることも確認できた。

したがって、
operations 提案時には
**Day 容量** と **reroll completeness**
を別々ではなく同時に確認する必要がある。

---

## 結論

operations 提案や reroll 提案の前には、
次の 2 系統を同時に確認する。

1. Day 容量
2. reroll completeness

この 2 系統のどちらかが未充足なら、
提案は完成扱いにしない。

つまり、
**Day 容量 OK でも candidate source が欠けていれば止める**
し、
**candidate source を見ていても Day が軽すぎれば止める**。

---

## 最小チェック項目

### A. Day 容量チェック

各 Day について、次を確認する。

- 主 task が極端に軽すぎないか
- Day 合計が概ね 2h 前後の作業量として読めるか
- 0.5〜1.5h 程度の task 粒度から大きく外れていないか
- 軽い task しかない場合、補完 task が入っているか

### B. reroll completeness チェック

reroll 提案前に、少なくとも次を見たか確認する。

- plan
- open issue
- next_operations
- current active

さらに、

- active_operations だけでなく next_operations まで更新対象として見ているか
- candidate source 未確認のまま active を直接組んでいないか

を確認する。

### C. 依存順チェック

- その Day 内で前提 task が先に置かれているか
- 実験より前に固定すべき構造 task が先に置かれているか
- 後段確認 task だけが先頭に来ていないか

---

## 提案前の4問

operations 提案や reroll 提案の前に、
最低限次の 4問を通す。

1.
この Day は軽すぎないか

2.
candidate source は
- plan
- open issue
- next_operations
- current active
を確認したか

3.
依存順は崩れていないか

4.
active だけでなく next まで含めて更新案を見ているか

この 4問のどれかに `no` が残るなら、
提案はまだ閉じない。

---

## fail-closed 条件

次の場合、
operations 提案は fail-closed で止める。

- Day0 が軽い単独 task に近い構成
- candidate source の一部未確認
- active だけ更新して next を見ていない
- 依存順が崩れている
- 近接論点だけで active を直組みしている

---

## 出力上の最小明示

operations 提案時には、
少なくとも次を短く明示するとよい。

- Day 容量の見立て
- candidate source 確認済みか
- 依存順の見立て
- active / next の両方を見たか

これにより、
提案が
「思いつきの順番」ではなく
「容量と completeness を通したもの」
だと説明できる。

---

## 期待効果

この joint check により、

- 軽すぎる Day 提案を減らせる
- plan / issue / next の埋没を減らせる
- reroll completeness と Day 容量を同時に守れる
- operations 提案の質を completed condition ベースで説明しやすくなる

---

## 完了条件

- Day 容量と reroll completeness を同時に見る必要性を説明できる
- 最低限の candidate source が固定されている
- Day が軽すぎる場合に止める条件を説明できる
- active / next の両方を見ることがチェックに含まれている
- operations 提案前の最小4問を共通ゲートとして使える

---

## 次に落とす作業

- `operations 提案時の joint check を instruction / review 運用へ返すかを判断する`
- 必要なら `daily review reroll candidate source minimum check` と統合して上位 rule にまとめる
