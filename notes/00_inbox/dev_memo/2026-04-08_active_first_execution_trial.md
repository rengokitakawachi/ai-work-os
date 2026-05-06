# Active First Execution Trial

## 概要

2026-04-08 の再開セッションにおいて、
active-first execution 原則と reroll before execution 原則が、
現行 instruction / operations / routing design と整合して運用できるかを確認した。

今回は、
新規会話からの横入り実行が発生しないケースを対象にした 1 周目の確認とする。

---

## 対象状況

再開時点で、
latest handover では `next_operations.md` 再構成が完了扱いだった一方、
`active_operations.md` には同 task が Day0 先頭として残っていた。

このため、
まず active 正本の整合を回復し、
その後に Day0 の先頭 task を再確定した。

---

## 実施内容

1.
latest handover を読み直した

2.
related docs / code / operations を取得した

3.
handover / archive / active の間に、
完了済み task が active 先頭に残る不整合を発見した

4.
`active_operations.md` から完了済み task を除去し、
現在の Day0 先頭を
`active-first execution 原則で operations 運用を 1 周試す`
へ揃えた

5.
その後、
会話中に新たな issue / operations candidate が発生していないことを確認した

---

## 確認できたこと

- active 外 task を横入りで実行せず、
  先に active 正本の整合を回復してから進める流れは成立した

- 「新規候補が発生していない場合」は reroll を発火せず、
  現在の active 先頭をそのまま実行対象とする運用で問題ない

- reroll before execution 原則は、
  新規候補発生時のルールであり、
  毎ターン無条件 reroll を要求するものではないと整理できる

- handover → related docs / notes / code → operations の再開順は、
  active-first execution と矛盾しない

- active の先頭 task が stale な場合は、
  そのまま次作業へ進まず、
  先に operations 正本の整合回復を行う必要がある

---

## 今回は未確認のこと

- 会話中に新規 issue が発生したケースで、
  その場実行を止めて reroll 提案へ送る挙動

- 会話起点 candidate を
  active / next / future のどこへ置くかを提案し、
  合意後に保存まで通す full flow

- reroll 実施後に、
  既存 active task がどの条件で押し下がるかの判断基準

---

## 現時点の判断

active-first execution 原則は、
少なくとも
「再開時に stale な active を正してから、
新規候補がない限り先頭 task を進める」
という基本ケースでは成立する。

一方で、
この 1 周は
「新規横入りなしケース」の確認に留まる。

したがって、
次の本命検証は
conversation routing を 1 件フルフローで通し、
新規候補発生時に reroll before execution が本当に守れるかを確認することになる。

---

## 次アクション

- Day1 task の
  `conversation routing を 1 件フルフローで実運用検証する`
  を次の主要検証対象とする

- その際、
  以下を必ず観測対象にする
  - issue 化の粒度
  - operations candidate 化の有無
  - placement 提案
  - reroll 実施有無
  - 保存順序

- 必要に応じて、
  active-first execution の補足ルールとして
  「stale active の整合回復を先に行う」
  を design または docs 候補へ送る
