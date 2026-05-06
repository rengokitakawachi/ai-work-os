# design routing should be split into decision and action plan

design を整理していると、
「review の中で docs に送るか future に送るかまで決めてしまう」
という混線が起こりやすい。

でも本当は、
ここには 2 つの別の処理がある。

- decision
- action plan

decision は、
その design を

- docs
- design
- future
- archive
- operations

のどこへ送るかを決めること。

action plan は、
その決定を受けて

- docs candidate
- retained no-op
- future draft
- archive draft
- operations queue payload

のどれを返すかを決めること。

この 2 層を分けると、
review と routing が混ざらなくなる。

さらに、
docs へ直接 apply しない、
operations へ直接入れない、
retain は no-op にする、
という運用上の安全策も自然に置ける。

設計を前に進めるときほど、
「何を判断しているのか」と
「何を反映しようとしているのか」を
分ける価値が大きい。
