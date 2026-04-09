<<APPEND>>

### 20260409-015
- title: tasks API 全体を execution projection 前提で再設計する必要がある
- category: architecture
- description: 現行の tasks API は Todoist を直接操作する途中実装として成立しているが、将来は execution projection を扱う API として再定義する必要がある。今回の operations → Todoist projection プロトタイプでも、projection service を差し込むには既存の tasks API / service / Todoist client が橋渡し層として機能する一方、close が update に寄っていること、delete が未実装であること、projection service との責務分離が未整理であることが明らかになった。したがって、tasks API 全体について、Execution View 前提の責務境界、projection service との接続、close / delete の意味づけ、正本との関係を再設計する必要がある。
- context: `2026-03-25_strategy_api_and_tasks_boundary.md` では Tasks API を Todoist 直接操作 API から execution projection API へ移行する構想が示されており、`2026-03-25_tasks_api_alignment_design.md` でも API は薄く、変換は service 層に集約し、外部依存仕様は service に閉じる原則が置かれている。今回の operations projection design では、まずは現状 repo に接続できる最小差分で projection service を導入する方針を採ったが、これはあくまで途中形であり、Tasks API 全体の再定義は独立論点として残すべきである。
- impact: high
- status: open
- created_at: 2026-04-09
