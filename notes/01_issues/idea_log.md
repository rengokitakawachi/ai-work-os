<<APPEND>>

### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- category: architecture
- description: `src/services/todoist.js` と `src/services/todoist/client.js` が並行して存在しており、責務が近い重複実装になっている。`client.js` 側は create / update / delete / list、error normalization、context 付き error を備えており、tasks service / projection 側もこちらを参照している。一方 `todoist.js` は旧来の簡易 wrapper で、create/list のみ、error も素朴で、現在の tasks 系設計と整合しにくい。したがって `client.js` を正本とし、`todoist.js` は参照箇所確認 → deprecated 化 → 参照移行 → テスト確認 → 削除、の順で段階的に廃止する必要がある。
- context: 2026-04-18 の会話で legacy code 廃止の是非を確認する中で、`src/services/todoist.js` と `src/services/todoist/client.js` の並行実装を比較した。`client.js` は `src/services/tasks/service.js` と `src/services/tasks/projection.js` から参照されており、より新しい責務境界に沿っている。一方、`src/services/internal-auth.js` と `src/lib/auth.js` は重複に見えるが、前者は `api/repo-resource.js` で現役利用されているため、同列に legacy と断定するのは早い。まずは Todoist wrapper 側を対象に限定するのが自然である。
- impact: medium
- status: open
- created_at: 2026-04-18
