# 2026-04-26 Recent Issue Placement Operating Design

## 目的

直近 issue を、会話の勢いで即 active task 化せず、
plan / operations / dev_memo / future / issue のどこへ置くかを判断する運用線を固定する。

この design は、Phase 0 の issue routing 完成条件のうち、
`route_to: operations` は即 active 化ではなく rolling 比較対象化である、という判断を実運用に落とすための補助設計である。

---

## 背景

2026-04-25 に次の issue が追加された。

- `20260425-029`: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- `20260425-030`: repoResourceGet bulk の files パラメータが改行区切りを複数ファイルとして扱わず 1 パス扱いになる

どちらも実行候補になり得るが、
見つけた直後に active に横入りさせると operations の実行順と daily review reroll の意味が崩れる。

そのため、直近 issue は一度 placement 判断を通し、
active / next / design / dev_memo / future / issue に分けて扱う。

---

## 判断原則

### 1. issue はまず issue として保持する

新規論点は、まず `notes/01_issues/idea_log.md` に残す。

保存直後に完了扱いしない。

---

### 2. active 化は operations rolling を通す

issue が重要でも、即 active に入れない。

active に入る条件は次のいずれか。

- daily review / weekly review の reroll で選ばれた
- active が壊れており、例外 reroll が必要
- 既存 active task の completed condition を直接満たす前提 task である

---

### 3. plan に返す条件

次に該当する issue は plan へ返す。

- 既存 plan の完了条件に影響する
- 中期方針や phase の前提を変える
- 複数 operations task に分解する必要がある
- 後続 plan の入口になる

plan に返す場合も、直接 plan を書き換える前に design / analysis で整理する。

---

### 4. operations に返す条件

次に該当する issue は operations candidate として扱う。

- 0.5〜1.5h 程度の実行 task に切れる
- 直近の active / next と依存関係がある
- 実行すれば Phase 0 の completed condition に近づく
- 今週内に観測または確認できる

ただし、`operations candidate` は即 active ではない。

active / next / future の配置は reroll で決める。

---

### 5. design に返す条件

次に該当する issue は design に返す。

- 責務分離、schema、手順、境界線を先に決める必要がある
- いきなり code / instruction を触ると局所最適化になりやすい
- completed condition を先に定義する必要がある
- 複数 layer にまたがる

---

### 6. dev_memo に返す条件

次に該当する issue は dev_memo に留める。

- まだ設計化するには粗い
- 再利用価値はあるが、今の operations に直結しない
- 具体 task へ切るには観測不足
- issue / design / operations のどれにもまだ自然に入らない

---

### 7. future に返す条件

次に該当する issue は future に送る。

- 今の phase では扱わない
- 価値はあるが、Phase 0 の completed condition に直接効かない
- 後続 phase で再評価する方が自然

---

## 直近 issue への適用

### 20260425-029

- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- impact: high
- urgency: medium
- category: architecture

判断:

- 送付先: `design` + `operations candidate`
- active placement: Day1 に配置済み
- 先にやること: instruction rewrite ではなく、core / procedure / schema の分離方針を design に落とす

理由:

- instruction は ADAM runtime の振る舞い全体に影響するため、即書き換えは危険である
- ただし現行 instruction の肥大化は今後の運用品質に影響するため、Phase 0 の共通 operating model 整備に関係する
- completed condition は、repo 更新ではなく、runtime 上で新しい instruction 分離が効くことまで含める必要がある

後段:

- design 作成
- repo instruction 再層化案
- schema / procedure spec 分離案
- runtime 反映確認 task

---

### 20260425-030

- title: repoResourceGet bulk の files パラメータが改行区切りを複数ファイルとして扱わず 1 パス扱いになる
- impact: medium
- urgency: medium
- category: api

判断:

- 送付先: `design` + `operations candidate`
- active placement: Day2 に配置済み
- 先にやること: 実装ではなく、files 区切り仕様を整理する

理由:

- daily review / handover / 関連ファイル確認で再発しており、運用効率と信頼性に影響する
- ただし仕様未確認のまま API を変更すると、schema / runtime tool schema / client expectation の不整合が起きる
- completed condition には、repo schema 更新、runtime tool schema 反映、実際の bulk read 成功確認を分けて含める必要がある

後段:

- docs/10_repo_resource_api.md の現行仕様確認
- api/repo-resource.js の separator handling 確認
- config/ai/adam_schema.yaml の `files` 説明確認
- 改行区切り対応または error message 明確化の最小実装
- runtime schema 反映確認

---

## placement 判断表

| issue | primary placement | secondary placement | active placement | 理由 |
|---|---|---|---|---|
| 20260425-029 | design | operations candidate | Day1 | high impact architecture。即 rewrite ではなく分離方針を先に固定する |
| 20260425-030 | design | operations candidate | Day2 | API 仕様不明確。再発済みだが実装前に仕様線を固定する |
| 20260423-028 | archive candidate / issue routing review | operations evidence | archive candidate | runtime dry_run まで確認済み。issue status 更新は issue routing / review で扱う |
| 20260420-024 | design | plan candidate | keep | routing/document writing 分離の上位設計として継続保持 |
| 20260418-022 | operations candidate | design | active Day4 | deprecated 化済み。削除前 gate として再配置済み |

---

## completed condition

この task は、次を満たしたら完了とみなす。

- 直近 issue を即 active 化しない判断線が明文化されている
- `20260425-029` と `20260425-030` の placement が決まっている
- それぞれの次 action が active_operations 上で読める
- plan / operations / dev_memo / future の使い分けが説明できる
- 後段で issue routing / daily review に返せる形になっている

---

## 判断

直近 issue の扱いは、保存後すぐに実行するのではなく、
`issue → placement 判断 → operations rolling → active / next / future 配置` の順で扱う。

今回の2件はどちらも価値があるが、
実装や instruction 変更に直行せず、まず design で境界と completed condition を固定してから実行する。
