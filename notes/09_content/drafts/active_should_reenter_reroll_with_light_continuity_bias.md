# active は固定特権ではなく reroll 入力へ戻すべき

## 問題

active_operations を固定済みの結果としてだけ扱うと、
reroll が「既存 active を踏まえた再配置」ではなく、
新規候補集合の順位づけに寄りやすい。

## 背景

operations の実運用では、

- current active
- next
- plan 由来候補
- issue routing 由来候補
- operations queue 由来候補

を同じ比較土俵に乗せて、
再度 priority を見直したい。

しかし active を入力に戻さないと、
「いま active にあるものを残すか落とすか」
を同じ土俵で判定できない。

## なぜ重要か

これがないと、

- stale active が居座る
- 逆に毎回総入れ替えになる
- reroll ではなく候補の単独評価になる

という問題が出やすい。

## 解決

active_operations を
reroll candidate source に戻す。

ただし、
未配置候補と完全同型にはしない。

metadata に

- generated_from: active_operations
- already_active: true
- existing_rolling_day
- active_continuity: light

を持たせて、
same table + light continuity bias
として扱う。

## 学び

active は守るべきだが、
固定特権にしてはいけない。

必要なのは
「残すかどうかを再評価できる active」
である。

## 意思決定

- plan_alignment を最重要に置く
- active_continuity は軽い補助に留める
- quick_win は追加加点にする
- active は reroll candidate source に戻す

## Before / After

- Before:
  active は固定結果、queue や plan 候補だけで ranking されやすい

- After:
  active も reroll 入力に戻り、plan / next / queue と同じ土俵で比較される

## メモ（ラフ）

- active を戻すと reroll の意味が出る
- continuity bias は必要だが固定優先ではない
- stale を落とせて、新規強候補も食い込めるバランスが重要
