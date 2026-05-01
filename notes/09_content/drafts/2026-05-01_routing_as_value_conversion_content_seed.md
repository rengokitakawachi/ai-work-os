# 2026-05-01 routing as value conversion content seed

## title candidate

AIエージェントの自律性は、自由判断ではなく「判断地点の設計」で作る

---

## source_ref

- notes/07_reports/daily/2026-05-01_daily_review.md
- notes/02_design/2026-04-30_routing_core_concept_redefinition.md
- notes/02_design/2026-05-01_routing_type_destination_constraints.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- notes/08_analysis/2026-05-01_routing_session_weekly_review_procedure_reflection_judgment.md
- notes/01_issues/2026-05-01_inbox_cleanup_once_issue.md

---

## content seed type

AI Work OS / ADAM 運用から生まれた設計思想・失敗・改善のネタ。

外部記事要約ではない。

---

## core insight

今日の一番大きな学びは、routing を「分類」ではなく「情報を価値化する装置」として再定義したこと。

さらに、ADAM の自律性は、毎回好きに判断することではなく、どこで判断し、どこでは粛々と従うかを設計することで高まると整理された。

---

## story material

### before

routing を、issue が出たら都度どこかに送る処理として見ていた。

この理解だと、inbox / issue / design / analysis が増え続けた時に、情報を活かす装置にならない。

また、analysis に記録しただけで routing 済みと誤認しやすい。

### turning point

ユーザーから、初期構想は「蓄積された inbox / design / issue を整理し、情報を chunk に分解し、他情報と結合して価値を高める装置」だったと指摘された。

この指摘により、routing session は個別 routing の batch ではなく、横断統合 usecase として再定義された。

### after

routing session は次を担うものとして整理された。

- source を読む
- chunk / theme に分解する
- 関連情報と結合する
- transform / relocation / retain / pending / archive を判断する
- 必要なら新しい file を作る
- source_ref を残す
- 役目を終えた source を archive する

また、routing destination として `analysis` を誤用しないこと、content は外部記事要約ではなく AI Work OS 由来の独自価値に限定することも整理された。

---

## article angle

### angle 1: AIエージェントの自律性はどこで生まれるか

自律性は、実行中に毎回自由判断させることではない。

むしろ、operation planning / rolling / review の段階で判断品質を高め、daytime execution では active_operations に従って進める。

ただし、次 task へ進む前だけは Proactive Focus Completion Guard として軽量に closure 判定をする。

この「判断地点の設計」が、AIエージェントを暴走させずに自律的に動かす鍵になる。

### angle 2: routing は分類ではなく価値化である

inbox にある情報を issue / design / future / archive に分けるだけなら分類で終わる。

本当に必要なのは、複数の情報を分解・統合し、設計や運用判断として再利用できる形に変えること。

### angle 3: content は外部記事の要約ではない

AI Work OS の content は、外部記事をそのまま要約する場所ではない。

外部記事、開発メモ、失敗、判断、改善がシステム内で結びつき、独自の学びになった時だけ content seed になる。

---

## usable phrases

- AIエージェントの自律性は、自由判断ではなく判断地点の設計で作る。
- routing は情報を分類する処理ではなく、情報を価値に変換する処理である。
- analysis は作業ログであり、情報の最終 destination ではない。
- content は外部記事の要約置き場ではなく、システムから生まれた独自価値のネタ帳である。
- 操作を自動化する前に、判断をどこで行うかを設計する必要がある。

---

## reader value

読者に伝えられる価値:

- AIエージェントを運用するには、自由に動かすより判断地点を固定する方が安定する
- inbox / issue / design / archive のような情報レイヤーは、単なるフォルダではなく情報循環の装置として設計できる
- 外部情報を価値に変えるには、要約ではなく自分のシステム内での判断・失敗・改善に接続する必要がある

---

## status

draft seed

---

## next use

weekly review または content review で、AI Work OS の routing 設計思想記事の素材として再評価する。
