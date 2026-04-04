<<APPEND>>

### 20260404-006
- title: intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- category: architecture
- description: intake routing および issue routing は、入力の構造化や保存先判定など定型処理と、文脈理解や優先順位判断などの非定型判断が混在する。このため、すべてを ADAM に委ねるか、すべてをプログラム化するかではなく、両者を組み合わせたハイブリッド制御モデルを設計する必要がある。具体的には、入力収集・候補生成・ルールチェックなどはプログラムが担い、最終的な分類・優先度・例外判断は ADAM が担う構造が有力である。
- context: routing は AI Work OS の基盤フローであり、再現性と柔軟性の両立が必要になる。完全 ADAM 依存では揺れが大きくなり、完全プログラム化では曖昧入力に対応できない。現時点ではハイブリッドが最も合理的であり、Phase 0 では役割分担の整理、Phase 1 以降で段階的な自動化を進める方針が適している。
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-007
- title: AI Work OS / EVE を AI プラットフォーム非依存で設計する必要がある
- category: architecture
- description: AI の性能優位や実用性は短期間で入れ替わる可能性が高く、ChatGPT 固有機能に強く依存した設計は将来の移行コストと運用リスクを高める。そのため、AI Work OS / EVE は ChatGPT を主要実装先の一つとして利用しつつも、OpenAI 固有の機能や接続方式に閉じない構造を設計原則に入れる必要がある。業務ロジック、正本、ツール契約、承認フローは AI プラットフォーム層から分離し、将来的に Anthropic、Google、その他のモデルやクライアントへ切り替え・併用できる状態を目指すべきである。
- context: EVE では SharePoint / Outlook / Teams など enterprise integration の重要度が高く、社内資産アクセスを ChatGPT 専用機構で囲い込むのは長期的に不利になる。短期的には Action による厳密制御が有力だが、中長期では MCP のようなモデル横断的な接続基盤も併用し、AI プラットフォーム非依存を確保する必要がある。ChatGPT を使うことと、ChatGPT に依存することは区別して扱うべきである。
- impact: high
- status: open
- created_at: 2026-04-04