<<APPEND>>

### 20260409-015
- title: tasks API 全体を execution projection 前提で再設計する必要がある
- category: architecture
- description: 現行の tasks API は Todoist を直接操作する途中実装として成立しているが、将来は execution projection を扱う API として再定義する必要がある。今回の operations → Todoist projection プロトタイプでも、projection service を差し込むには既存の tasks API / service / Todoist client が橋渡し層として機能する一方、close が update に寄っていること、delete が未実装であること、projection service との責務分離が未整理であることが明らかになった。したがって、tasks API 全体について、Execution View 前提の責務境界、projection service との接続、close / delete の意味づけ、正本との関係を再設計する必要がある。
- context: `2026-03-25_strategy_api_and_tasks_boundary.md` では Tasks API を Todoist 直接操作 API から execution projection API へ移行する構想が示されており、`2026-03-25_tasks_api_alignment_design.md` でも API は薄く、変換は service 層に集約し、外部依存仕様は service に閉じる原則が置かれている。今回の operations projection design では、まずは現状 repo に接続できる最小差分で projection service を導入する方針を採ったが、これはあくまで途中形であり、Tasks API 全体の再定義は独立論点として残すべきである。
- impact: high
- status: open
- created_at: 2026-04-09

### 20260412-016
- title: operations rolling を next の繰り上げとして誤認しない必要がある
- category: operations
- description: operations rolling は `next_operations` の先頭から順に active へ繰り上げる処理ではない。正しくは、roadmap / plan を前進させるために、いま何をどの優先順位で進めるべきかを再評価し、その結果として active / next / archive を決める処理である。`next_operations` はそのときの候補素材の一つにすぎず、決定権を持つ正本ではない。今回、rolling を `next の繰り上げ` に近く扱ったことで、docs 本体反映のような前進量の大きい task より、既存 next の補助 task を優先しやすくなり、operation の順番妥当性が下がった。したがって、rolling の判断では、まず roadmap / plan / 未充足 / 直近で閉じられる成果を見て、その後に next / issue / design / future を候補素材として比較する必要がある。
- context: 4/12 の operations 再構成では、`next_operations` の既存順を強く引き継いだ結果、`docs/17_operations_system.md` と `docs/15_notes_system.md` の本体更新より、補助整理 task が前に残った。会話上でも、`operations rolling は、ネクストから取ってくるという意味ではない。road mapやplanを進めるために、どの優先順位で進めるのか？を検討すること。そのときの素材の一つがネクストである` という整理に修正した。今後は、rolling を `plan 前進の優先順位決定` として扱い、next は候補素材としてのみ参照する必要がある。
- impact: high
- status: open
- created_at: 2026-04-12

### 20260412-017
- title: plan から operations への接続が弱く重要 issue が埋もれる恐れがある
- category: operations
- description: Phase 0 plan にある重要論点が issue として記録されても、operations candidate 化されず active / next に落ちない場合、plan を前進させるための operations rolling が機能しなくなる。issue routing が未完成な現段階では特に、重要 issue を issue に残しただけで満足すると埋没しやすい。したがって、plan → issue → operations の接続弱化ポイントを明らかにし、重要 issue の位置づけ判定、operations candidate 化、再評価地点をどう最小運用するかを整理する必要がある。
- context: `2026-04_phase0_adam_to_eve_common_operating_model.md` では issue routing と roadmap / plan / operations の接続整理が主要論点に含まれているが、4/12 時点の active / next にはこの論点が明示的に入っていなかった。会話では、`operations rolling は next から取ってくることではなく、roadmap / plan を前進させる優先順位決定であり、next は素材の一つにすぎない` と修正されており、この論点は rolling と issue routing の両方にまたがる重要課題として扱う必要がある。
- impact: high
- status: open
- created_at: 2026-04-12

### 20260414-018
- title: instruction に書かれた active-first 原則を外した運用違反の再発防止が必要
- category: operations
- description: active_operations 外の新規論点について、その場で実装提案や次アクション提案へ進んでしまった。現行 instruction には、実行対象は active_operations に入っている task のみ、会話中に新規候補が出てもその場で横入り実行しない、先に reroll して active / next / future を決める、と明記されている。それにもかかわらず、repo 履歴 API の話題で「作れるか」と「今やるか」を分離できず、active 外実行を誘発する提案を行った。これは原則違反として重く扱い、再発防止として、新規論点では必ず位置づけ判定を先に行い、active 外なら実行提案を止める統制を明示化する必要がある。
- context: 2026-04-14 の会話で、repo の履歴確認 API は技術的には作れると説明した後、そのまま最小 spec や実装順の話へ進み、active_operations に入っていない task を実行対象のように扱ってしまった。ユーザーから「実行は常にactive operation」「そこから外れて実行するのは違反」と指摘され、instruction にも同原則が書かれていることを確認した。単なる注意ではなく、判定順序と提案制限の形で再発防止を整理する必要がある。
- impact: high
- status: open
- created_at: 2026-04-14

### 20260414-019
- title: repo の履歴確認 API を issue として検討する必要がある
- category: architecture
- description: 現在の repoResource 系アクセスでは、instruction や docs の現在内容は読めるが、履歴そのものには直接アクセスできない。そのため、「いつ何が変わったか」「過去版の instruction はどうだったか」を検証するには限界がある。repo の履歴一覧、特定 ref 時点の本文読取、2時点差分取得を行える API があれば、instruction / docs / notes / code の変更経緯を検証しやすくなる。現時点では active_operations 外の新規論点なので即実装はせず、まず issue として位置づけを残す。
- context: 2026-04-14 の会話で、instruction の履歴には直接アクセスできないことを確認した後、repo の履歴にアクセスできる API を作れるかが論点になった。技術的には repoResource 系の拡張として history list / history read / history diff を追加する構想が出たが、その場で実行提案へ進むのは active-first 原則に反するため停止した。次回以降、必要なら design または operations candidate として再評価するため、issue として記録しておく。
- impact: medium
- status: open
- created_at: 2026-04-14
