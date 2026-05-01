# 2026-05-01 routing type destination constraints

## 目的

routing type ごとに許可される destination を整理し、routing 判断の誤りを防ぐ。

特に以下の再発を防ぐ。

- `analysis` を routing destination と誤認する
- 外部記事要約をそのまま `content` に送る
- intake / issue から docs candidate へ早すぎる昇格を行う
- design routing で自然に発生する issue / content を見落とす

---

## source_ref

- docs/15_notes_system.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- config/ai/adam_knowledge.md
- notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md

---

## 基本 destination

routing destination は原則として次を使う。

1. issue
2. operations candidate
3. design
4. docs candidate
5. future
6. decision
7. content
8. archive

---

## 補助 state / postprocess

以下は destination ではなく state / postprocess として扱う。

- pending
- retain
- relocation
- split required

### pending

判断不能理由、解除条件、再評価地点を持つ状態。

### retain

現 layer に残す理由が明確な状態。

### relocation

existing file の価値を保ったまま、より適切な layer へ移す処理。

例:

```text
notes/02_design/foo.md
→ notes/80_future/design/foo.md
```

### split required

1 file 内に複数 theme があり、分割・派生 output が必要な状態。

---

## analysis の扱い

`analysis` は routing destination ではない。

`analysis` は routing session / review / observation の作業ログである。

analysis に記録するもの:

- 読んだ source
- chunk / theme 分解
- destination 判断
- postprocess 判断
- pending / retain / archive / relocation の理由
- remaining gates

analysis に記録しただけでは routing 完了ではない。

routing 完了には、必要情報が適切な destination へ送られている必要がある。

---

## content の扱い

`content` は外部記事の要約置き場ではない。

content は、AI Work OS / ADAM / EVE / DELTA の開発・運用から生まれた独自価値を、将来 note 記事化・収益化するためのネタ帳である。

外部記事は content の直接 destination ではなく、材料として扱う。

外部情報が content seed になるのは、以下のように AI Work OS 内の判断・失敗・改善・設計思想へ変換された場合に限る。

```text
external source
→ design / issue / operations / future などで利用
→ AI Work OS 内で独自の判断・失敗・改善・設計が生まれる
→ content seed
```

---

## destination constraints by routing type

## 1. intake routing

対象:

- inbox input
- web clip
- raw memo
- dev memo
- imported article

### primary

- issue
- design
- future
- archive

### allowed

- operations candidate
- content

### exceptional

- docs candidate
- decision

### notes

intake routing は未整理入力を扱うため、docs candidate へ直行しないのが原則。

operations candidate は、具体 task と completed condition が作れる場合のみ allowed。

content は、外部情報そのものではなく、AI Work OS 内の独自価値に変換された場合のみ allowed。

---

## 2. issue routing

対象:

- open issue
- keep issue
- future issue
- issue-like problem statement

### primary

- operations candidate
- design
- future
- archive
- issue

### allowed

- decision

### exceptional

- docs candidate
- content

### notes

issue routing は課題を扱うため、自然な行き先は operations candidate / design / future / archive / issue keep である。

issue から docs candidate へ直接飛ばすのは原則避ける。まず design で構造化し、docs 昇格条件を満たしたら docs candidate とする。

content は、issue 対応の過程で AI Work OS 独自の学びが生まれた場合のみ exceptional に扱う。

---

## 3. design routing

対象:

- notes/02_design の design note
- design draft
- docs 直前の草案
- current / stale / future design

### primary

- docs candidate
- design
- future
- archive
- operations candidate

### allowed

- decision
- issue
- content

### exceptional

- none

### notes

design routing の主目的は、design を docs candidate / design retain / future/design / archive / operations candidate へ送ることである。

ただし design を読む過程で、未解決の構造問題、docs / runtime 矛盾、安全性問題が見つかることがあるため、issue は allowed とする。

また design 検討の過程で AI Work OS 独自の判断・失敗・改善・設計思想が生まれることがあるため、content は allowed とする。

ただし content は外部記事や design 内容の単なる要約ではない。

---

## 4. routing session

対象:

- 複数 layer / 複数 source の横断整理
- inbox / issue / design / analysis / future の滞留
- archive decision backlog
- pending / relocation / retain の再評価

### primary

- issue
- operations candidate
- design
- future
- archive

### allowed

- docs candidate
- decision
- content

### exceptional

- none

### notes

routing session は個別 routing の逐次実行ではない。

routing session は、複数 source / layer を横断し、chunk 分解・統合・価値化・destination 決定・postprocess を行う上位 usecase である。

個別 routing は routing session 内で使われる sub-usecase になりうる。

---

## 5. conversation / pre-routing

対象:

- 会話中に出た新規論点
- ユーザーの補足指摘
- 実行中に出た新規 candidate

### primary

- issue
- operations candidate
- design
- future
- content

### allowed

- decision

### exceptional

- docs candidate
- archive

### notes

conversation / pre-routing は軽量分類であり、直接 archive や docs candidate へ進めるのは危険。

archive は source を読んで postprocess を判断してから行う。

docs candidate は design 経由で docs 昇格条件を確認してから扱う。

---

## 6. review-generated routing

対象:

- daily review / weekly review / monthly review で出た候補
- review 中に見つかった completed / stale / pending / future candidate

### primary

- operations candidate
- future
- archive
- issue
- design

### allowed

- decision
- content
- docs candidate

### exceptional

- none

### notes

review は routing の代替ではない。

review で routing が必要な候補を発見した場合、routing session または個別 routing に渡す。

weekly review は routing session の自然な発動地点である。

---

## destination selection guard

routing destination を決める時は、次を確認する。

1. routing type は何か
2. candidate destination は primary / allowed / exceptional のどれか
3. exceptional を選ぶ場合、理由と completed condition があるか
4. analysis を destination として扱っていないか
5. content に外部記事要約を入れていないか
6. archive 前に必要情報が適切な destination へ移ったか
7. operations candidate は direct active 化せず rolling へ渡したか
8. docs candidate は design / docs 昇格条件を満たしているか

---

## completed condition

この整理の completed condition:

- routing destination の基本セットを定義する
- pending / retain / relocation / split required を destination ではなく state / postprocess として分ける
- analysis は routing destination ではないと明記する
- content は本システム由来の独自価値に限ると明記する
- intake / issue / design / routing session / conversation / review-generated routing の destination constraints を定義する
- design routing の issue / content を allowed にする

対応:

- すべて反映済み。

---

## judgment

routing type ごとの destination constraints は必要である。

特に重要な correction:

- design routing では issue / content も自然に発生するため allowed とする
- analysis は destination ではなく作業ログ
- content は外部記事要約ではなく AI Work OS 由来の独自価値
- routing session は個別 routing の batch ではなく横断統合 usecase
