<<APPEND>>

### 20260404-006
- title: intake routing / issue routing のハイブリッド制御モデルを設計する必要がある
- category: architecture
- description: intake routing および issue routing は、入力の構造化や保存先判定など定型処理と、文脈理解や優先順位判断などの非定型判断が混在する。このため、すべてを ADAM に委ねるか、すべてをプログラム化するかではなく、両者を組み合わせたハイブリッド制御モデルを設計する必要がある。具体的には、入力収集・候補生成・ルールチェックなどはプログラムが担い、最終的な分類・優先度・例外判断は ADAM が担う構造が有力である。
- context: routing は AI Work OS の基盤フローであり、再現性と柔軟性の両立が必要になる。完全 ADAM 依存では揺れが大きくなり、完全プログラム化では曖昧入力に対応できない。現時点ではハイブリッドが最も合理的であり、Phase 0 では役割分担の整理、Phase 1 以降で段階的な自動化を進める方針が適している。
- impact: high
- status: open
- created_at: 2026-04-04