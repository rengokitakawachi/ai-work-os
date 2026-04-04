## 2026-03-26

### 20260326-003
- title: notesフォルダ構造の責務ベース整理の必要性
- category: architecture
- description: notesのディレクトリ構造をフェーズではなく責務ベースで固定し、思考フローと一致させる必要がある
- context: Idea Captureや課題整理モード導入により、ideas / backlog / design / operations の役割分離が重要になった
- impact: high
- status: open
- created_at: 2026-03-26

## 2026-03-27

### 20260327-001
- title: スレッド切替後の再開フローが手動依存で重い
- category: ops
- description: ChatGPT は特定の作業種類に限らず、会話が長くなると反応が遅くなる。そのため一定のタイミングで新しいスレッドへ切り替える運用を行っている。引き継ぎ書の仕組み自体は有効だが、スレッド切替後は引き継ぎ書を読むだけでは十分ではなく、docs / notes / code を追加で読み込み全体構造を理解する必要がある。現状ではその初期読込を毎回手動で指示する必要があり、再開フローが自動化・定型化されていないことが負担になっている。
- context: 長いスレッドでは ChatGPT の応答が遅くなるため、作業継続のために定期的にスレッドを切り替えている。
- impact: high
- status: open
- created_at: 2026-03-27

## 2026-04-03

### 20260403-001
- title: legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- category: architecture
- description: docs access が二系統に分かれている
- context: docs/10 に統一方針あり
- impact: medium
- status: open
- created_at: 2026-04-03

### 20260403-002
- title: repo-resource に code bulk 読取が必要
- category: architecture
- description: code の bulk read が未実装
- context: 再開時の横断読取コストが高い
- impact: medium
- status: open
- created_at: 2026-04-03

## 2026-04-04

### 20260404-003
- title: Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- category: architecture
- description: next_operations 拡張論点
- context: Todoist 表示との整合
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-004
- title: docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- category: architecture
- description: operations 定義が二重化している
- context: repo 全体再読で判明
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-005
- title: notes/design に残る旧用語を routing / review 分離モデルへ統一する必要がある
- category: ops
- description: intake review など旧表現が残存
- context: current model と不整合
- impact: medium
- status: open
- created_at: 2026-04-04
