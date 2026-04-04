# EVE のレイヤー共通性と projection model メモ

## 概要

ADAM / EVE の全体構成を再検討する中で、重要な論点がいくつか見えてきた。

特に大きいのは、

- EVE から design / decisions などを早期に排除しない方がよい
- EVE でも inbox / issue / design / plan / operations / decisions / handover / reports / analysis / logs / archive を持つ可能性がある
- EVE の短期実行順も operations を正本にできる可能性がある
- Todoist や MindMeister は正本ではなく projection / view / 実行UI として扱える可能性がある

という点である。

本メモは、その整理を軽量に残すための dev memo である。

---

## 結論

現時点では、

- ADAM と EVE の違いを「レイヤーの有無」で早く固定しない
- 多くの運用レイヤーは共通候補として保持する
- 差はレイヤーの有無より、扱う対象・要求水準・運用強度・外部接続先に置く
- EVE でも operations を短期実行順の正本にする可能性を開く

という方針が最も自然である。

---

## 1. EVE から design / decisions を外しすぎない

一度、ADAM には docs / design / decisions があり、EVE には不要かもしれないという見方が出た。

ただし、この見方は現時点では強く固定しない方がよい。

理由は、一般業務でも複雑な運用や中長期整理が必要になると、

- design
- decisions
- handover
- reports
- analysis
- logs

のような補助レイヤーが十分に必要になりうるから。

したがって、現時点では

- docs と code は ADAM 側に強く寄る可能性が高い
- それ以外の多くのレイヤーは EVE にも実装されうる共通候補

と見た方がよい。

---

## 2. EVE にも広いレイヤー群を持つ可能性がある

今の時点では、EVE にも将来的に以下を持つ可能性がある。

- inbox
- issue
- design
- plan
- operations
- decisions
- handover
- reports
- analysis
- logs
- archive
- future

この整理の良い点は、ADAM / EVE の骨格を揃えやすいこと。

違いは、

- どのレイヤーを強く使うか
- どこを正本にするか
- どの外部系と接続するか

に寄せられる。

---

## 3. EVE でも operations を正本にする可能性がある

EVE は Todoist 正本で考えたくなるが、構造的には operations 正本の方が美しい可能性がある。

つまり、

- operations = 短期実行順の正本
- Todoist = 実行・通知・チェックのUI
- MindMeister = 構造可視化の view
- Outlook = 時間配置 / calendar projection

という分け方である。

この考え方の利点は、

- ADAM と EVE の planning / execution 骨格を共通化できる
- 外部ツール依存を弱められる
- projection 先を差し替えても OS 側の骨格が残る
- flow check / dashboard と接続しやすい

ことにある。

---

## 4. Todoist / MindMeister は projection として扱える

ここでの projection とは、

- 正本ではない
- ただし使いやすい view / 実行UI / 外部投影先として使う

という意味。

例:

- Todoist = タスクの表示、通知、チェック
- MindMeister = 構造の俯瞰や関係整理
- Outlook = 時間配置や予定反映
- Teams = 通知や接続先

この整理により、

「外部ツールが正本を持つ」のではなく、
「AI Work OS 側の正本を、外部ツールへ投影する」
という構造を取りやすくなる。

---

## 5. ADAM と EVE の差の置き場所

今の時点で、ADAM と EVE の差はレイヤーの有無より以下に置く方が自然。

- 扱う対象
- 要求される厳密さ
- SSOT の置き方
- 外部接続先
- docs / code を持つか
- 各レイヤーの運用強度

この整理だと、

- ADAM = docs / code / 厳密な整合が強い
- EVE = operations / external projection が強い

という違いとして表現しやすい。

---

## 6. 今後の見方

今後は、EVE に対しても

- このレイヤーは不要か
ではなく
- このレイヤーは必要になりうるか
- どの程度の強さで持つか
- 正本か、projection か
- ADAM と共通化できるか

で見る方がよい。

---

## 当面の扱い

- いきなり docs に昇格しない
- まずは dev memo と issue に残す
- 直近は roadmap / notes system / routing 系整合を優先する
- 後で EVE 側の operating model を design 化するときの材料にする

---

## 補足メモ

- 「EVE には docs が不要かもしれない」は部分的に正しい
- ただし design / decisions まで不要と決めるのは早い
- EVE の本質差は、レイヤー削減ではなく projection 設計にある可能性が高い
- operations を正本にし、外部ツールを投影先にする整理はかなり強い
