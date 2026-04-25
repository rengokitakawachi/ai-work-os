<<APPEND>>

### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- category: architecture
- description: `src/services/todoist.js` と `src/services/todoist/client.js` が並行して存在しており、責務が近い重複実装になっている。`client.js` 側は create / update / delete / list、error normalization、context 付き error を備えており、tasks service / projection 側もこちらを参照している。一方 `todoist.js` は旧来の簡易 wrapper で、create/list のみ、error も素朴で、現在の tasks 系設計と整合しにくい。したがって `client.js` を正本とし、`todoist.js` は参照箇所確認 → deprecated 化 → 参照移行 → テスト確認 → 削除、の順で段階的に廃止する必要がある。
- context: 2026-04-18 の会話で legacy code 廃止の是非を確認する中で、`src/services/todoist.js` と `src/services/todoist/client.js` の並行実装を比較した。`client.js` は `src/services/tasks/service.js` と `src/services/tasks/projection.js` から参照されており、より新しい責務境界に沿っている。一方、`src/services/internal-auth.js` と `src/lib/auth.js` は重複に見えるが、前者は `api/repo-resource.js` で現役利用されているため、同列に legacy と断定するのは早い。まずは Todoist wrapper 側を対象に限定するのが自然である。
- impact: medium
- status: open
- created_at: 2026-04-18

### 20260419-023
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: operations
- description: 会話中に active_operations の再編案を出した際、`issue routing の完成条件を plan / operations に反映する` のような短時間で終わる task を Day0 の単独または主構成に近い形で置いてしまい、`task は 0.5〜1.5h 程度、1日は約2h の task` という既存運用ルールに対して軽すぎる Day 構成を提案してしまった。task 自体は残してよいが、それだけでは Day 容量が不足するため、operations 提案時には各 Day が軽すぎないかを明示的に確認する必要がある。
- context: 2026-04-19 の会話で、issue routing 完成を最優先に再構成する中、Day0 に軽い方針固定 task を単独で置く提案をした。ユーザーから「タスクは0.5〜1.5hくらいの粒度、1日は2hくらいのタスクという原則を忘れてないか」と指摘があり、Day 構成の容量チェックが抜けていたことが判明した。その後、軽い task を残しつつ次 task を追加する形へ修正した。
- impact: medium
- status: open
- created_at: 2026-04-19

### 20260420-024
- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- category: architecture
- description: 現在の routing 論点では、情報の再評価、分解 / 統合、送付先判定、後処理、さらに design / plan / operations などの実ドキュメント作成までを一連で考えがちになっている。しかしこのままでは routing の責務が重すぎる。routing は再評価・分解統合・送付先判定・action plan 生成までに留め、実際の document writing / placement は後段 usecase に分離した方がよい。routing と document writing の間は、完成済み文書ではなく `decision + action plan + normalized payload` を受け渡す構造に改める必要がある。
- context: 2026-04-20 の会話で、routing に再評価、分解 / 統合、design / plan / operations への振り分け、さらに実ドキュメント作成まで一気に背負わせると負荷が重すぎるのではないかという論点が出た。議論の結果、少なくとも document writing は分離すべきであり、routing と writer の間は action plan で引き渡すのが自然という整理になった。
- impact: high
- status: open
- created_at: 2026-04-20

### 20260421-025
- title: category が弱い medium impact issue を keep レイヤーに残せるかを観測する必要がある
- category: general
- description: issue routing の第二バッチで、category が architecture / operations ではない medium impact issue が `route_to: issue` に残るかを確認したい。keep は廃止対象ではなく、弱い issue の保留レイヤーとして機能している必要がある。そのため、route 多様性を増やすだけでなく、keep がなお自然に残るケースを比較対象として用意する必要がある。
- context: 第一バッチ補正後、architecture / operations は keep gate より先に判定する形へ変更した。これにより design / operations route は回復したが、keep が完全に消えると保留レイヤーとしての役割が失われる。第二バッチでは keep が残るべきケースも観測対象に含める必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-21

### 20260421-026
- title: open 以外の issue を future へ送る判定が運用上も自然か確認する必要がある
- category: operations
- description: issue routing の第二バッチで、status が open ではない issue が `route_to: future` へ送られるかを確認したい。future は「今やる対象ではないが保持すべき論点」の受け皿として自然に機能する必要があるため、keep との違いが実運用でも説明できる必要がある。
- context: 現行 rules では `status !== open` の issue は future に送られる。第一バッチでは open issue しか扱っておらず、future route は未観測である。第二バッチでは blocked / pending / deferred のような非 open status を持つ issue を入れて、future 送付が自然に機能するか確認したい。
- impact: medium
- urgency: low
- status: deferred
- created_at: 2026-04-21

### 20260421-027
- title: 役目終了した issue を archive へ送る判定が keep / future と混線しないか確認する必要がある
- category: operations
- description: issue routing の第二バッチで、役目終了が明確な closed issue が `route_to: archive` へ送られるかを確認したい。archive は終了済み論点の明確な受け皿である必要があり、keep や future と混線しないことを観測したい。
- context: 現行 rules では `status === closed` の issue は archive に送られるが、第一バッチでは closed issue を扱っていないため archive route は未観測である。第二バッチでは終了済みの比較用 issue を1件入れて、archive 判定が自然に機能するかを確認する必要がある。
- impact: low
- urgency: low
- status: closed
- created_at: 2026-04-21

### 20260423-028
- title: Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- category: execution
- description: daily review 後の Todoist projection で、新規に create された active task に due が入らない事象が起きた。`notes/04_operations/active_operations.md` には `due_date` が存在し、repo 側の `src/services/tasks/projection.js` も `due_date` / `rollingDayDate` から Todoist `due_string` / `deadline_date` を組み立てる実装を持っている。しかし、実運用で使っている `projectTasks` の projection 入出力スキーマには `due_date` / `due_type` が存在せず、daily review で Action に渡した current_active_tasks へ due 情報が載らなかった。その結果、新規 create task だけが日付なしで作られる。
- context: 2026-04-23 の会話で、daily review 後に ADAM 系の新規 Todoist task 3件へ due が入っていないことを確認した。既存継続 task には due が残っていたため、Todoist 側の一般不具合ではなく、新規 create 経路の伝播欠落と判断した。その後、3件には手動で due_date を補正した。根本的には `projectTasks` の task schema に `due_date` / `due_type` を追加し、projection create/update の payload へ伝播させる必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-23

### 20260425-029
- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- category: architecture
- description: GPT-5.5 向けには、古い prompt stack をそのまま持ち越すのではなく、期待成果、成功条件、制約、利用可能な証拠、最終出力を中心に整理し、細かな手順や形式制約は procedure spec や Structured Outputs / API schema 側へ逃がす方がよい。現在の ADAM instruction は、SSOT、operations、review、write gate、routing、handover、再発防止などの重要ルールを保持している一方で、常時読む必要のある拘束ルール、状況依存の手順、背景知識、出力形式、API schema に任せるべき制約が同じ層に積まれている。これにより GPT-5.5 ではノイズ化、探索範囲の過度な制限、機械的な出力につながる可能性がある。
- context: 2026-04-25 の会話で、ユーザーから「5.5向けに再調整した方がいい？」という確認があり、OpenAI の GPT-5.5 向け案内では古い prompt stack の全持ち越しではなく、期待成果・成功条件を明示し、細かな手順指示を減らし、必要なら Structured Outputs や API 側設定に逃がす方針が示されている、という前提が共有された。ADAM ではルール削除ではなく、`Core Instruction`、`Procedure Specs`、`Structured Outputs / API Schema` の3層へ再分解するのが安全という整理になった。
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-25
