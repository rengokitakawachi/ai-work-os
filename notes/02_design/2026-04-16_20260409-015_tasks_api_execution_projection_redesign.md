# 2026-04-16 20260409-015 tasks_api_execution_projection_redesign

## 目的

Tasks API を、
Todoist 直接操作 API の途中形から、
execution projection 前提の API へ再定義するための
最小 design draft を作る。

本メモは、
issue routing の design apply により生成された初期草案であり、
既存の Strategy / Tasks boundary 設計を前提に、
Tasks API 全体の再設計論点を整理することを目的とする。

---

## source issue

- issue_id: 20260409-015

## source_ref

- notes/01_issues/idea_log.md
- notes/02_design/2026-03-25_strategy_api_and_tasks_boundary.md
- notes/02_design/2026-03-25_tasks_api_alignment_design.md

## routing decision

- route_to: design
- reason: architecture 系 issue のため、先に design で構造整理する
- evaluated_at: 2026-04-16T00:00:00Z
- impact_now: high
- urgency_now:
- next_action: create_or_update_design

## raw summary

現行の Tasks API は Todoist を直接操作する途中実装として成立しているが、
将来は execution projection を扱う API として再定義する必要がある。
operations → Todoist projection のプロトタイプを通じて、
projection service を差し込む余地は見えた一方、
close が update に寄っていること、
delete が未実装であること、
projection service との責務分離が未整理であることが明らかになった。
したがって、Tasks API 全体について、
Execution View 前提の責務境界、
projection service との接続、
close / delete の意味づけ、
正本との関係を再設計する必要がある。

---

## 背景

既存 design では、
`2026-03-25_strategy_api_and_tasks_boundary.md` が
Strategy API と Tasks API の責務境界を定義している。

そこでは、
将来の Tasks API を
「Strategy Domain の execution projection を扱う API」
として再定義する方向が既に示されている。

一方、
`2026-03-25_tasks_api_alignment_design.md` は
docs / code の不整合回復と、
service 層責務の整理に主眼があり、
Tasks API 全体の再定義までは扱っていない。

今回の issue は、
その上位論点として、
Tasks API を projection 前提の API として
どう再設計するかを扱う必要がある。

---

## 問題

現行 Tasks API には次の中途半端さが残っている。

### 1. Todoist 直接操作 API と projection API が混在している

現在は Todoist を直接操作する入口として機能しているが、
設計上は execution projection API へ寄せたい。

このため、

- API の意味
- service 層の責務
- Todoist client の位置づけ

が途中形のまま混ざっている。

### 2. close / update / delete の意味が未整理

少なくとも次が未整理である。

- close は projection 上の完了更新なのか
- update は execution view 更新なのか
- delete は Todoist 削除なのか、projection 解除なのか

### 3. 正本との関係が曖昧

AI Work OS の原則では、
正本は docs / notes / operations など上位構造側にあり、
Todoist は projection / execution view として扱うべきである。

しかし現状の Tasks API は、
Todoist を実質的な中心に見せやすい。

---

## 再設計の方向

### 1. Tasks API を execution projection API として再定義する

Tasks API の責務は次に寄せる。

- execution projection の生成
- execution projection の更新
- execution view の読取
- projection 状態の反映

### 2. API は薄く、projection ロジックは service に寄せる

これは既存原則と同じである。

- API 層
  - validation
  - routing
  - dispatch

- service 層
  - projection 変換
  - Todoist 反映
  - projection 状態の整合

### 3. Todoist は正本ではなく投影先とする

Tasks API は
Todoist 直接操作 API ではなく、
正本側の execution projection を扱う API と解釈する。

---

## 最小論点

今後具体化すべき最小論点は次である。

### 1. create の意味

- projection 生成
- task node 作成
- Todoist への即時反映

のどこまでを含むか

### 2. update の意味

- execution view の属性更新
- projection metadata 更新
- Todoist task 更新

のどれを担うか

### 3. close の意味

- Todoist 完了
- projection completed
- 正本側 status 更新

の接続をどうするか

### 4. delete の意味

- projection 削除
- Todoist 削除
- 正本からの切離し

をどう分けるか

### 5. projection service の責務

- 正本 → Todoist 変換
- Todoist → execution state 反映
- conflict handling
- request_id / traceability

をどこまで持たせるか

---

## 既存 design との関係

この論点は、
次の既存 design を置き換えるものではなく、
上位整理として接続する。

- 2026-03-25_strategy_api_and_tasks_boundary.md
- 2026-03-25_tasks_api_alignment_design.md

自然な進め方は次である。

1.
本メモで Tasks API 全体再定義の論点を固定する

2.
既存 boundary design と矛盾しない形で
projection service の責務を具体化する

3.
必要なら docs / API spec 側へ反映する

---

## 今回の位置づけ

本メモは、
issue routing の最初の design apply により生成した
最小 draft である。

したがって、
まだ次は未了である。

- schema 固定
- endpoint ごとの意味づけ確定
- projection service との責務分離詳細化
- Todoist client との境界確定
- docs 反映

---

## 判断

Tasks API 全体の再設計は、
単なる docs / code 不整合修正ではなく、
execution projection 前提へ API の意味を再定義する論点として扱うのが自然である。

この論点は architecture 系であり、
operations 実装へ直接落とす前に、
先に design で構造整理する必要がある。
