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

### 20260405-008
- title: operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- category: architecture
- description: operations については、過去の design と最新の整理を踏まえると、`active_operations.md`、`next_operations.md`、`archive_operations.md` を `notes/04_operations/` 配下に持ち、weekly review で `archive_operations.md` をそのまま `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` へ保存する運用が最も継続しやすい。このため、現行の `standby_operations` 前提の実体とルールを、新しい3ファイル構成へ移行する必要がある。
- context: 既存 design では `standby_operations` や `99_archive` 直保存が混在していたが、議論を通じて `next_operations` の方が意味に合い、archive は weekly に整理せず snapshot 保存する方が運用コストが低いと判断した。design は `02_design/2026-04-05_operations_next_archive_snapshot_model.md` に作成済みであり、次は issue と operations 実体を揃える段階に入っている。
- impact: high
- status: open
- created_at: 2026-04-05

### 20260406-009
- title: operations rolling の生成規律と優先順位づけを再設計する必要がある
- category: operating_model
- description: 現行の operations は 7日ローリングの器はあるが、何を候補として抽出し、どの条件で operations 化し、どの重みづけで active / next / issue に配置するかの規律が弱い。そのため、適当に埋めているように見えやすく、roadmap / plan から落ちてきた短期実行順としての接続感も薄い。operations は単なる短期 TODO ではなく、上位計画を実行に落としつつ、実行結果を上位へ返す短期実行正本として再設計する必要がある。
- context: 議論を通じて、operations は roadmap → plan → operations の下位層であるだけでなく、実行結果を plan / roadmap に返す観測点でもあると整理された。また、A / B / C の案件分類は性質分類であり、active / next / issue への配置は分類だけでなく重みづけで決めるべきだと確認された。特に、plan / roadmap への効き具合、ブロッカー解消度、quick win 性、依存関係、今やる必然性を踏まえた優先順位づけが必要である。C案件も分類だけで除外するのではなく、重みづけ結果によって active や next に入ることを許容する。
- related_dev_memo:
  - notes/00_inbox/dev_memo/2026-04-06_operations_rolling_gap_and_direction.md
- impact: high
- status: open
- created_at: 2026-04-06

### 20260408-010
- title: stale な active_operations を先に整合回復してから先頭 task を実行する補足ルールが必要
- category: operating_model
- description: active-first execution 原則の試験運用により、latest handover では完了済みの task が active 先頭に残る stale 状態が発生しうることが判明した。この場合、そのまま先頭 task を実行すると operations 正本との整合が崩れ、active-first execution 自体が形骸化する。したがって、再開時または実行開始時に active 先頭が stale と判定された場合は、先に active_operations の整合回復を行い、その後に現時点の先頭 task を実行する補足ルールが必要である。
- context: 2026-04-08 の再開セッションでは、`next_operations.md` 再構成が handover / archive で完了扱いだった一方、`active_operations.md` では同 task が Day0 先頭に残っていた。この不整合を解消したうえで初めて、Day0 の実際の先頭 task として `active-first execution 原則で operations 運用を 1 周試す` を実行対象に確定できた。今回の観察から、reroll before execution 原則とは別に、stale active の整合回復を先に行う前処理ルールが必要だと分かった。
- related_dev_memo:
  - notes/00_inbox/dev_memo/2026-04-08_active_first_execution_trial.md
- impact: medium
- status: open
- created_at: 2026-04-08

### 20260408-011
- title: EVE 前提の decision 抽出履歴モデルを ADAM で先行試験する必要がある
- category: operating_model
- description: 一般業務では、過去に「なぜそう判断したか」「何を前提にしたか」「他にどんな案があったか」を後からたどれることが重要である。そのため、EVE では docs / issue / design / plan / operations / dev_memo を紐づけ元とする重要判断の抽出履歴を `notes/05_decisions/` に集約するモデルが必要になる可能性が高い。いきなり EVE に実装するのではなく、まずは ADAM で最小運用モデルを試す必要がある。
- context: 現状の `notes/05_decisions/README.md` は意思決定ログの役割を示しているが、抽出元、集約先、相互参照、最小 schema、保存条件までは整理されていない。一方、operations 運用強化や conversation routing の実運用を進める中でも、重要な判断を後から追える構造の必要性が見えてきた。EVE に広げる前に、ADAM で 05_decisions の最小運用モデルを定義し、実際の判断を少数件で試すのが自然である。
- impact: medium
- status: open
- created_at: 2026-04-08

### 20260408-012
- title: latest handover 起点の次作業選定と active_operations 先頭の解釈ルールを整理する必要がある
- category: operating_model
- description: 最新 handover を読んで「次にやる1つ」を決める場面では、handover の Next Actions と active_operations の先頭 task が同一粒度で並ばず、見かけ上ずれて見えることがある。このままだと、再開時の次作業選定で handover 優先か active 優先かの解釈が揺れ、active-first execution 原則の運用に迷いが生じる。したがって、latest handover を起点に次作業を決める際の解釈順序、特に active task の未完部分と handover 記載の次アクションの関係を整理する必要がある。
- context: 今回の再開では、active_operations の Day0 先頭は `active-first execution 原則で operations 運用を 1 周試す` のままだが、latest handover ではその本命未完として `conversation routing を 1 件フルフローで実運用検証する` が次アクションとして強く示されていた。そのため、両者は競合ではなく、上位 task とその未完検証項目の関係として読める一方、現状ルールにはその読み分けが明文化されていないことが分かった。
- impact: medium
- status: open
- created_at: 2026-04-08

### 20260409-013
- title: daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- category: operating_model
- description: daily review では reports を保存して終わりではなく、価値化できる論点は content に抽出し、同時に operations を更新する必要がある。しかし現状は、日報から何を content に上げるか、どの時点で operations rolling に反映するか、review の出力としてどこまでを一連処理とみなすかが明文化されていない。このままだと、日報は書かれても content 抽出や rolling 連携が会話依存になりやすい。したがって、daily review の出力から content 抽出と operations 更新をどう接続するか整理する必要がある。
- context: 今回の 2026-04-08 日報作成では、先に daily report を作成し、その後に content 抽出価値の有無を確認し、さらに active_operations の rolling を行った。この順は実務上自然だった一方で、review system spec には「日報を書く」「operations を更新する」まではあるが、content 抽出の位置づけは reports README 側の運用原則に留まっている。日報 → content → rolling の接続点を整理すると、review 出力の扱いがより安定する可能性がある。
- impact: medium
- status: open
- created_at: 2026-04-09
