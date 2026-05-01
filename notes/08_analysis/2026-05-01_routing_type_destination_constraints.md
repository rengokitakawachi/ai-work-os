# 2026-05-01 routing type destination constraints

## 目的

routing type ごとに許可される destination を整理し、routing 判断の誤りを防ぐ。

特に以下の再発を防ぐ。

- `analysis` を routing destination と誤認する
- 外部記事要約をそのまま `content` に送る
- intake / issue から docs candidate へ早すぎる昇格を行う
- design routing で自然に発生する issue / content を見落とす
- issue を無理に operations / design へ送る
- design を無理に future / docs candidate へ送る
- inbox を保管庫として滞留させる

---

## source_ref

- docs/15_notes_system.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- config/ai/adam_knowledge.md
- notes/08_analysis/2026-05-01_archive_decision_unmoved_inventory_current_rule.md

---

## core principle

routing は「無理に流す」処理ではない。

routing は、情報を読み、意味を整理し、最も価値が出る場所へ接続する処理である。

したがって、保持が最適な場合は保持してよい。

ただし、保持は滞留ではない。保持する場合は、理由、再評価地点、次に見る条件を明示する。

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

retain は「何もしない」ではない。

retain は、現 layer に残すことが最も価値を保つという明示判断である。

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

## layer-specific principles

### inbox

inbox は未整理入力の入口であり、保管庫ではない。

inbox に入る情報は、web 情報、開発メモ、思いつき、raw memo など、単なる思いつきや未整理情報を含む。

intake routing の役割は、それらを整理して価値に変え、システムへ接続することである。

routing 後、inbox はできるだけ空に近い方がよい。

ただし、未処理理由や split required があるものは pending として残してよい。

### issue

issue は、課題や未解決問題を保持する layer である。

issue routing では、task に繋がるか、design にできるか、future に送るべきか、archive できるかを判断する。

ただし issue を無理に operations candidate や design に送る必要はない。

問題として保持することが最適なら、issue keep は正当な destination である。

### design

design は、課題・対策・構造案・仕様草案を整理する layer である。

design routing では、その design をどう扱うか判断する。

今すぐ着手しない場合でも、必ず future に送る必要はない。

現 phase で参照価値があり、構造整理として残す意味があるなら design retain は正当な判断である。

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
- 未整理の思いつき

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

intake routing は、inbox に入った情報を振り分けてシステムに繋ぐ役割を持つ。

inbox 情報は未整理であり、単なる思いつき、web 情報、開発メモを含む。

intake routing では、それらの情報を整理し、価値に変える。

未来のことであれば future に送り、将来活用できるようにする。

routing 後の inbox はできるだけ空に近い方がよい。

ただし、未処理理由が明確なもの、split required なもの、公式情報確認が必要なものは pending として残してよい。

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

issue routing は、issue が task に繋がるか、design にできるか、future に送るべきか、archive できるか、issue のまま keep すべきかを判断する。

issue は無理に operations candidate や design に送る必要はない。

issue のまま保持しておくことが最も適切な場合がある。

issue keep を選ぶ場合は、保持理由、再評価地点、次に確認する条件を明示する。

issue から docs candidate へ直接飛ばすのは原則避ける。まず design で構造化し、docs 昇格条件を満たしたら docs candidate とする。

content は、issue 対応の過程で AI Work OS 独自の学びが生まれた場合のみ exceptional に扱う。

---

## 3. design routing

対象:

- notes/02_design の design note
- design draft
- docs 直前の草案
- current / stale / future design
- 課題や対策がまとめられた design note

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

design routing は、design にまとめられている課題・対策・構造案をどう扱うか判断する。

主目的は、design を docs candidate / design retain / future/design / archive / operations candidate へ送ることである。

今すぐ着手しない場合でも、必ず future に送る必要はない。

現 phase で参照価値があり、構造整理として残す意味があるなら design のまま retain してよい。

future に送るのは、現 phase では扱わないが将来活用可能で、design layer に残すより future/design の方が自然な場合である。

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

routing session でも、issue keep / design retain は正当な判断である。

ただし inbox については、未整理入口としての性質上、routing 後はできるだけ空に近づける。

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
9. issue を無理に operations / design へ送っていないか
10. design を無理に future / docs candidate へ送っていないか
11. inbox を保管庫として滞留させていないか
12. retain / keep を選ぶ場合、保持理由と再評価地点があるか

---

## completed condition

この整理の completed condition:

- routing destination の基本セットを定義する
- pending / retain / relocation / split required を destination ではなく state / postprocess として分ける
- analysis は routing destination ではないと明記する
- content は本システム由来の独自価値に限ると明記する
- intake / issue / design / routing session / conversation / review-generated routing の destination constraints を定義する
- design routing の issue / content を allowed にする
- inbox は routing 後できるだけ空に近い方がよいと明記する
- issue keep は正当な destination と明記する
- design retain は正当な判断と明記する
- routing は無理に流す処理ではないと明記する

対応:

- すべて反映済み。

---

## judgment

routing type ごとの destination constraints は必要である。

特に重要な correction:

- intake routing は inbox 情報を整理して価値に変え、routing 後の inbox をできるだけ空に近づける
- issue routing では issue を無理に operations / design へ送らない。issue keep は正当な判断である
- design routing では今すぐ着手しない design を無理に future へ送らない。design retain は正当な判断である
- design routing では issue / content も自然に発生するため allowed とする
- analysis は destination ではなく作業ログ
- content は外部記事要約ではなく AI Work OS 由来の独自価値
- routing session は個別 routing の batch ではなく横断統合 usecase
