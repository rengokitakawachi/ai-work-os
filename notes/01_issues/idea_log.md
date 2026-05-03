# idea_log

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
- description: ChatGPT は特定の作業種類に限らず、会話が長くなると反応が遅くなる。そのため一定のタイミングで新しいスレッドへ切り替える運用を行っている。引き継ぎ書の仕組み自体は有効だが、スレッド切替後は引き継ぎ書を読むだけでは十分ではなく、docs / notes / code を追加で読み込み全体構造を理解する必要がある。現状ではその初期読込を毎回手動で指示する必要があり、再開フローが自動化・定型化されていないことが負担になっている。加えて、ADAM が会話肥大化を運用上の切替タイミングとして明示的に扱っておらず、適切な区切りでスレッド切替を提案する仕組みも不足している。
- context: 長いスレッドでは ChatGPT の応答が遅くなるため、作業継続のために定期的にスレッドを切り替えている。再開起点の正本は notes/handover、短期実行管理の正本は operations としたい。理想は、引き継ぎ書を読んだら必要な docs / notes / code を自動で読みに行き、全体構造を把握したうえで再開できる状態である。また、ADAM には会話肥大化を検知したら作業の区切りでスレッド切替を提案してほしい。
- impact: high
- status: open
- created_at: 2026-03-27

### 20260327-003
- title: 課題発見から実装までの標準開発フローと判断を自動化する必要がある
- category: ops
- description: 開発フローが一貫していないため、課題、検討、設計、実装に関するファイルの置き場所や流れがぶれやすい。その結果、ファイルが散らかる、どこを見ればよいか分かりにくい、同じ確認を繰り返しやすい、作業効率が落ちるという問題が起きている。課題発見から整理、設計、仕様反映判断、実装までを毎回同じ順序で進められる標準フローを確立したい。さらに、フローが決まっているなら、課題の種類判定、保存先判定、次アクション判定も ADAM が自動で行える状態にしたい。
- context: 理想状態は、課題の種類ごとに保存先と次アクションが自動で決まり、課題発見から実装まで毎回同じ順序で進められることにある。標準フローは単なる手順書ではなく、ADAM が現在フェーズ、保存先、次アクションを判断するための実行ルールとして設計したい。
- impact: high
- status: open
- created_at: 2026-03-27

## 2026-03-31

### 20260331-001
- title: 商品化のためのdecision_logとcase_studyレイヤーが必要
- category: architecture
- description: docs / notes / reports だけでは第三者向け価値に変換しづらいため、意思決定理由とBefore/Afterを明示的に抽出・蓄積するレイヤーが必要である
- context: 将来的なマネタイズ（テンプレ販売・カスタマイズ・発信）を見据えた際、再利用可能な知見として整理されていないと価値提供が難しい
- impact: high
- status: open
- created_at: 2026-03-31

### 20260331-002
- title: failure_logと運用崩壊ポイントの蓄積が必要
- category: ops
- description: 失敗や運用崩壊ポイントは意図的に記録しないと消失し、プロダクト改善や発信価値を損なうため専用ログが必要
- context: 成功ログだけでは差別化にならず、失敗と修正の履歴が重要な価値になる
- impact: medium
- status: open
- created_at: 2026-03-31

## 2026-04-01

### 20260401-001
- title: operationsからTodoistへのタスク自動作成機能が必要
- category: ops
- description: operationsに定義されたタスクをTodoistのEVE開発プロジェクトへ自動で反映する機能が必要。一方向連携（operations → Todoist）とし、正本はoperationsに保持する。
- context: 実行UIとしてTodoistを利用することで、通知・チェック・日次運用の利便性を向上させる。現在は手動転記だが、将来的にはcreateTask APIで自動生成したい。
- impact: high
- status: open
- created_at: 2026-04-01

### 20260401-002
- title: note記事用ドラフトをリポジトリ内で蓄積・運用する仕組みが必要
- category: architecture
- description: 将来的なマネタイズに向けて、note記事として公開可能なドラフトを日々の開発と並行して蓄積する仕組みが必要。記事を書くのではなく、問題・解決・意思決定・学びなどの素材を構造的に蓄積し、いつでも記事化できる状態を維持する。
- context: 開発中の思考や意思決定は時間経過で失われやすく、後から記事を書くのは困難である。日報・design・issue・decision_logなどと連携し、自然に記事素材が蓄積される仕組みが必要。
- impact: high
- status: open
- created_at: 2026-04-01

## 2026-04-02

### 20260402-001
- title: 新しいnotes構造と日報時のcontent抽出運用をinstructionとdocsへ反映する必要がある
- category: ops
- description: notes の indexed 構造への移行が進んだため、ADAM instruction と docs を旧構造のまま放置すると保存先や判断基準が再びずれる。特に 03_plan の追加、07_reports の保存先、09_content の位置づけ、日報作成時に content 化できるネタを同時抽出する運用は、instruction と docs の両方に反映する必要がある。
- context: 現在の notes 構造は 00_inbox / 01_issues / 02_design / 03_plan / 04_operations / 05_decisions / 06_handover / 07_reports / 08_analysis / 09_content / 10_logs / 99_archive に整理されつつある。一方で instruction や docs/15_notes_system.md、notes/README.md はまだこの新構造を十分に反映できていない。日報トリガー時に 07_reports/daily/YYYY-MM-DD.md へ保存すること、および content 候補を 09_content/drafts/ に残す運用も明文化が必要。
- impact: high
- status: open
- created_at: 2026-04-02

### 20260402-002
- title: GitHub Issues / Projects を将来の実装追跡レイヤーとして使うか検討が必要
- category: ops
- description: GitHub Issues / Projects は PR 接続や実装追跡には有効だが、現時点で導入すると notes / operations / Todoist と役割が重なり、二重管理でフローが複雑化する可能性がある。今すぐ導入するのではなく、共同開発や PR 追跡需要が高まった段階で限定導入するかを再検討する必要がある。
- context: EVE 連携の外部実行UIとしては Todoist を採用済みであり、現状は notes/01_issues が論点、notes/04_operations が短期実行順、Todoist が実行状態の正本として機能している。GitHub Issues は code / docs 変更と PR を結びつける用途では価値がある一方、現段階では管理先を増やしすぎると効率低下の懸念があるため、将来の導入候補として保持する。
- impact: medium
- status: open
- created_at: 2026-04-02

## 2026-04-03

### 20260403-001
- title: legacy docs API と github-docs.js を repo-resource/docs.js に統一する必要がある
- category: architecture
- description: 現在 docs 取得系は legacy docs API（`/api/docs`, `/api/docs-read`, `/api/docs-bulk`）と `repo-resource` 系の二系統が併存している。将来的には docs access を `repo-resource/docs.js` に統一し、`src/services/github-docs.js` と legacy endpoint 群を整理する必要がある。
- context: `docs/10_repo_resource_api.md` では docs の repo-resource 統合方針が仕様として定義されている。一方で現行実装では `api/docs.js`、`api/docs-read.js`、`api/docs-bulk.js` が `src/services/github-docs.js` を使用しており、docs access が二系統に分かれている。`src/services/github-repo-resource.js` は削除済みであり、次は docs access 側の整理を論点として明示しておきたい。
- impact: medium
- status: open
- created_at: 2026-04-03

### 20260403-002
- title: repo-resource に code bulk 読取が必要
- category: architecture
- description: 再開時や整合確認時に複数の code ファイルを横断して読む頻度が高く、単体 read のみでは確認コストが高い。repo-resource の docs / notes / code の操作モデルを揃えるためにも、件数・サイズ制限付きの code bulk 読取を実装する必要がある。
- context: handover の Related code 読取、instruction と schema の整合確認、repo-resource 実装の横断確認では複数 code ファイルをまとめて読む需要がある。一方で現行実装は code の tree / read / create / update のみで、bulk は未実装である。無制限 bulk ではなく、許可 prefix・件数上限・総サイズ上限を持つ read-only bulk として小さく導入するのが妥当。
- impact: medium
- status: open
- created_at: 2026-04-03

### 20260403-003
- title: roadmap / plan / operations の3階層を一般業務版 EVE にも展開したい
- category: architecture
- description: 開発用に整理している roadmap / plan / operations の3階層は、一般業務でも有効な責務分離になっている可能性が高い。将来的に、一般業務を扱う EVE にも同様の planning 機能を持たせられるよう、開発専用モデルではなく汎用 planning model として再利用できるかを検討する必要がある。
- context: 現在の docs/05_roadmap.md では、roadmap = 上位計画、plan = 中期計画、operations = 短期実行順として整理されている。この分離は開発以外にも転用可能に見えるが、現時点では EVE 開発計画としての色が強い。今すぐ深掘りはせず、将来の設計論点として保持したい。
- impact: medium
- status: open
- created_at: 2026-04-03

### 20260403-005
- title: 運用の目詰まりを検知する flow check 機能が必要
- category: ops
- description: 現在の notes / plan / operations 構造では、どこに情報があるかだけでなく、どこで流れが止まっているかを検知できることが重要になってきている。inbox に未整理入力が溜まっている、dev_memo が issue や plan に昇格しないまま残っている、issue が routing されていない、plan が operations に落ちていない、operations が過密化している、といった目詰まりをざっと点検し、次に何を流すべきか指摘する flow check 機能が必要。
- context: intake routing / issue routing / roadmap / plan / operations / review の骨格が見えてきたことで、次は全体の流れを健康診断する層が必要になってきた。review が見直しであるのに対し、flow check は滞留や停滞を検知して「何をすべきか」を示す機能として位置づけたい。
- impact: medium
- status: open
- created_at: 2026-04-03

### 20260403-006
- title: flow check の結果を可視化する dashboard 機能が必要
- category: ops
- description: 将来的に、inbox・dev_memo・issue・plan・operations・future などの各レイヤーでどこに目詰まりがあるかを一目で把握できる dashboard が必要。flow check が目詰まりを点検する機能だとすれば、dashboard はその結果や滞留状況を継続的に見える化する層として位置づけたい。
- context: flow check 論点を整理する中で、単発の確認だけでなく、未整理件数、未routing件数、plan→operations 未接続、operations 過密、future 放置などをまとめて見られる可視化レイヤーがあると、今どこが詰まっているかを直感的に把握しやすいと分かった。まずは flow check の検知観点を固め、その後に dashboard へつなげるのが自然。
- impact: medium
- status: open
- created_at: 2026-04-03

## 2026-04-04

### 20260404-001
- title: EVE でも operations を正本にし、外部ツールは projection として扱う設計を検討したい
- category: architecture
- description: EVE の短期実行順も operations を正本にし、Todoist・MindMeister・Outlook・Teams などは projection / view / 実行UI として接続する設計が有力である。これにより ADAM / EVE の骨格を揃えやすくなり、外部ツール依存を下げながら実行性を高められる可能性がある。
- context: ADAM / EVE の全体構成を見直す中で、EVE から design / decisions などを早期に排除するより、多くのレイヤーを共通候補として持ち、違いは運用強度と外部接続に置く方が自然だと分かってきた。特に EVE でも operations を正本とし、Todoist は実行UI、MindMeister は構造可視化、Outlook は calendar projection として扱う整理は、共通 operating model の観点で重要な論点である。
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-002
- title: active_operations 単一継続更新と weekly review archive 判定の運用を固める必要がある
- category: ops
- description: operations の正本ファイルは日付ベースより責務ベースの命名が自然であり、`active_operations.md` を単一継続更新ファイルとして扱う方針を検討したい。保留したものを future に operations として置くのではなく、plan / issue / future item に戻し、旧 operations は節目のみ `archive_operations_YYYY-MM-DD.md` として保存する。archive 判定は weekly review の中で行う運用が有力である。
- context: `notes/04_operations/2026-03-26_short_term_plan.md` という日付ベース命名には、短期実行順の正本としての意味が出にくいという違和感が出た。検討の結果、active / archive は自然だが、future に operations を置くのは原則不自然と整理できた。daily では継続更新、weekly review で大きな再構成や phase / plan 切替時のみ archive を切る方が運用負荷が低く、review system とも整合しやすい。
- impact: medium
- status: open
- created_at: 2026-04-04

### 20260404-003
- title: Todoist 連携前提で standby_operations を next_operations へ拡張するか検討が必要
- category: architecture
- description: ADAM 開発プロジェクトは EVE 開発のプロトタイプでもあり、EVE では一般の業務を対象とする。operations を Todoist と連携する前提で考えると、7日ローリングの active_operations だけでは Todoist 上に表示したい実行候補を十分に表現できない可能性がある。そのため、現行の standby_operations を単なる退避場所ではなく、active の次に来る候補群として next_operations へ拡張する案を検討したい。next_operations は Day0〜Day6 の日別分類は持たないが、Todoist 連携の都合上、各タスクに日付情報を持てる可能性がある。ただし、この日付が Todoist の due / deadline / 並び順のどれに対応するべきかは、Todoist の現行仕様と API を確認したうえで確定する必要がある。
- context: operations の 7日ローリングモデルを整理する中で、standby_operations は overflow 退避としては自然だが、EVE の一般業務運用や Todoist 表示を考えると意味が弱いと分かった。Todoist では 1 週間分より先の実行候補も見せたい場面があり、その受け皿として next_operations を持つ案が浮上した。一方で、Todoist の task date / deadline / filter / day_order などの仕様を確認せずに operations 側の date モデルを決めると意味が混線するため、まず仕様調査が必要である。issue として保持したうえで、必要に応じて dev_memo で調査メモを作成し、その後に operations（7日間）へ入れるかを判断する。
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-004
- title: docs/15_notes_system.md と docs/16_operations_system.md の operations 定義差を解消する必要がある
- category: architecture
- description: 現在の docs では、`docs/15_notes_system.md` が operations を `active / archive` の2状態として説明している一方、`docs/16_operations_system.md` では `active_operations / standby_operations` を正式構造として定義している。この差により、operations モデルの docs 正本が二重化しており、notes / instruction / 実運用と照合したときに解釈がぶれる。operations の正本構造を docs 上で一本化する必要がある。
- context: repo 全体の再読により、operations 周辺の最大の docs 不整合は `15` と `16` の間にあることが明確になった。現行の notes 実体、design、ADAM instruction は `active_operations / standby_operations` 前提で揃っている一方、`15_notes_system.md` には旧説明が残っている。このズレを放置すると、Phase 0 の構造整合と EVE への展開判断が不安定になる。
- impact: high
- status: open
- created_at: 2026-04-04

### 20260404-005
- title: notes/design に残る intake review など旧用語を routing / review 分離モデルへ統一する必要がある
- category: ops
- description: `notes/02_design/2026-04-03_future_layer_operating_spec.md`、`notes/02_design/intake_review_and_source_ref_spec.md`、`notes/02_design/standard_development_flow_v2.md`、`notes/02_design/operations_generation_rules.md` には `intake review` など旧 terminology が残っている。現在は routing と review を分離した operating model が固まっているため、design 側の用語とフローも `intake routing / issue routing / daily review / weekly review / monthly review` 前提へ統一する必要がある。
- context: handover と最新 instruction では routing / review 分離が反映済みであり、docs/05_roadmap.md や docs/16_operations_system.md も現行モデル側へ進んでいる。一方で design の一部は旧フロー表現を残しており、将来 docs 昇格や instruction 再整合時のノイズになる。Day0 の整合確認の結果、docs 差分の次に優先して整理すべき残差と判断した。
- impact: medium
- status: open
- created_at: 2026-04-04

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

## 2026-04-05

### 20260405-008
- title: operations 実体を active / next / archive snapshot モデルへ移行する必要がある
- category: architecture
- description: operations については、過去の design と最新の整理を踏まえると、`active_operations.md`、`next_operations.md`、`archive_operations.md` を `notes/04_operations/` 配下に持ち、weekly review で `archive_operations.md` をそのまま `notes/99_archive/operations/YYYY-MM-DD_weekly_operations.md` へ保存する運用が最も継続しやすい。このため、現行の `standby_operations` 前提の実体とルールを、新しい3ファイル構成へ移行する必要がある。
- context: 既存 design では `standby_operations` や `99_archive` 直保存が混在していたが、議論を通じて `next_operations` の方が意味に合い、archive は weekly に整理せず snapshot 保存する方が運用コストが低いと判断した。design は `02_design/2026-04-05_operations_next_archive_snapshot_model.md` に作成済みであり、次は issue と operations 実体を揃える段階に入っている。
- impact: high
- status: open
- created_at: 2026-04-05

## 2026-04-06

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

## 2026-04-08

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

## 2026-04-09

### 20260409-013
- title: daily review の出力から content 抽出と operations rolling をどう接続するか整理する必要がある
- category: operating_model
- description: daily review では reports を保存して終わりではなく、価値化できる論点は content に抽出し、同時に operations を更新する必要がある。しかし現状は、日報から何を content に上げるか、どの時点で operations rolling に反映するか、review の出力としてどこまでを一連処理とみなすかが明文化されていない。このままだと、日報は書かれても content 抽出や rolling 連携が会話依存になりやすい。したがって、daily review の出力から content 抽出と operations 更新をどう接続するか整理する必要がある。
- context: 今回の 2026-04-08 日報作成では、先に daily report を作成し、その後に content 抽出価値の有無を確認し、さらに active_operations の rolling を行った。この順は実務上自然だった一方で、review system spec には「日報を書く」「operations を更新する」まではあるが、content 抽出の位置づけは reports README 側の運用原則に留まっている。日報 → content → rolling の接続点を整理すると、review 出力の扱いがより安定する可能性がある。
- impact: medium
- status: open
- created_at: 2026-04-09

### 20260409-015
- title: tasks API 全体を execution projection 前提で再設計する必要がある
- category: architecture
- description: 現行の tasks API は Todoist を直接操作する途中実装として成立しているが、将来は execution projection を扱う API として再定義する必要がある。今回の operations → Todoist projection プロトタイプでも、projection service を差し込むには既存の tasks API / service / Todoist client が橋渡し層として機能する一方、close が update に寄っていること、delete が未実装であること、projection service との責務分離が未整理であることが明らかになった。したがって、tasks API 全体について、Execution View 前提の責務境界、projection service との接続、close / delete の意味づけ、正本との関係を再設計する必要がある。
- context: `2026-03-25_strategy_api_and_tasks_boundary.md` では Tasks API を Todoist 直接操作 API から execution projection API へ移行する構想が示されており、`2026-03-25_tasks_api_alignment_design.md` でも API は薄く、変換は service 層に集約し、外部依存仕様は service に閉じる原則が置かれている。今回の operations projection design では、まずは現状 repo に接続できる最小差分で projection service を導入する方針を採ったが、これはあくまで途中形であり、Tasks API 全体の再定義は独立論点として残すべきである。
- impact: high
- status: open
- created_at: 2026-04-09

## 2026-04-12

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

## 2026-04-14

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

## 2026-04-18

### 20260418-020
- title: operations task の粒度と day 容量モデルを明文化する必要がある
- category: operations
- description: operations task は 0.5〜1.5時間くらいで一区切りつく明確な作業単位として扱うのが自然である。また、Day は 1 task 固定の slot ではなく、その日の可処分実行枠に応じて複数 task を置ける箱として扱うべきである。現時点では 1日2時間前後を目安に置くが、これは固定仕様ではなく流動的であり、将来的には review や実績からノウハウとして蓄積する対象にする必要がある。したがって、task 粒度ルールと day 容量モデルを docs / design / dev_memo の役割分担つきで明文化する必要がある。
- context: 2026-04-18 の会話で、Day に1タスクではなく複数タスクを置いてよいこと、task 粒度は 0.5〜1.5時間程度、1日2時間前後は固定ではなく知見蓄積対象とする整理が確認された。`2026-04-06_operations_rolling_generation_and_prioritization_spec.md` には 1 task = 1つの明確な作業単位、1セッションで進められる粒度、まではあるが、day を箱として扱うことや 1日実行量をどう見るかの運用ルールはまだ弱い。
- impact: high
- status: open
- created_at: 2026-04-18

### 20260418-021
- title: code resource から repo ルート allowlist を読めるようにする必要がある
- category: architecture
- description: 現在の code resource では `src/`, `api/`, `lib/`, `scripts/`, `config/` 配下は読める一方、repo ルート直下の `package.json`, `vitest.config.js`, `jest.config.js` などは読めない。そのため、テストランナー判定、依存関係確認、workspace 構成確認、設定差分確認が不完全になりやすい。repo ルート全開放ではなく allowlist 方式で、少なくとも `package.json`, `vitest.config.js`, `jest.config.js` を read 対象に追加し、可能なら `tsconfig.json`, `eslint.config.js`, `pnpm-workspace.yaml` なども対象に含める必要がある。
- context: 2026-04-18 の会話で、`package.json / vitest.config.js / jest.config.js は、この環境の code resource では読めませんでした` と確認された。これは repo 内にファイルが存在しないことではなく、repoResourceGet の code resource 側の許可範囲が repo ルート直下を含んでいないことを意味する。実運用上は mirror / snapshot / manifest で迂回できるが、本筋としては tool / 実行環境側で code resource の root allowlist を拡張する方が自然である。
- impact: high
- status: open
- created_at: 2026-04-18

### 20260418-022
- title: legacy な Todoist service wrapper を deprecated 化して段階的に廃止する必要がある
- category: architecture
- description: `src/services/todoist.js` と `src/services/todoist/client.js` が並行して存在しており、責務が近い重複実装になっている。`client.js` 側は create / update / delete / list、error normalization、context 付き error を備えており、tasks service / projection 側もこちらを参照している。一方 `todoist.js` は旧来の簡易 wrapper で、create/list のみ、error も素朴で、現在の tasks 系設計と整合しにくい。したがって `client.js` を正本とし、`todoist.js` は参照箇所確認 → deprecated 化 → 参照移行 → テスト確認 → 削除、の順で段階的に廃止する必要がある。
- context: 2026-04-18 の会話で legacy code 廃止の是非を確認する中で、`src/services/todoist.js` と `src/services/todoist/client.js` の並行実装を比較した。`client.js` は `src/services/tasks/service.js` と `src/services/tasks/projection.js` から参照されており、より新しい責務境界に沿っている。一方、`src/services/internal-auth.js` と `src/lib/auth.js` は重複に見えるが、前者は `api/repo-resource.js` で現役利用されているため、同列に legacy と断定するのは早い。まずは Todoist wrapper 側を対象に限定するのが自然である。
- impact: medium
- status: open
- created_at: 2026-04-18

## 2026-04-19

### 20260419-023
- title: operations 提案時に 1日タスク容量ルールを外して Day が軽すぎる構成を出さないようにする必要がある
- category: operations
- description: 会話中に active_operations の再編案を出した際、`issue routing の完成条件を plan / operations に反映する` のような短時間で終わる task を Day0 の単独または主構成に近い形で置いてしまい、`task は 0.5〜1.5h 程度、1日は約2h の task` という既存運用ルールに対して軽すぎる Day 構成を提案してしまった。task 自体は残してよいが、それだけでは Day 容量が不足するため、operations 提案時には各 Day が軽すぎないかを明示的に確認する必要がある。
- context: 2026-04-19 の会話で、issue routing 完成を最優先に再構成する中、Day0 に軽い方針固定 task を単独で置く提案をした。ユーザーから「タスクは0.5〜1.5hくらいの粒度、1日は2hくらいのタスクという原則を忘れてないか」と指摘があり、Day 構成の容量チェックが抜けていたことが判明した。その後、軽い task を残しつつ次 task を追加する形へ修正した。
- impact: medium
- status: open
- created_at: 2026-04-19

## 2026-04-20

### 20260420-024
- title: routing と document writing を分離し action plan で引き渡す構造へ改める必要がある
- category: architecture
- description: 現在の routing 論点では、情報の再評価、分解 / 統合、送付先判定、後処理、さらに design / plan / operations などの実ドキュメント作成までを一連で考えがちになっている。しかしこのままでは routing の責務が重すぎる。routing は再評価・分解統合・送付先判定・action plan 生成までに留め、実際の document writing / placement は後段 usecase に分離した方がよい。routing と document writing の間は、完成済み文書ではなく `decision + action plan + normalized payload` を受け渡す構造に改める必要がある。
- context: 2026-04-20 の会話で、routing に再評価、分解 / 統合、design / plan / operations への振り分け、さらに実ドキュメント作成まで一気に背負わせると負荷が重すぎるのではないかという論点が出た。議論の結果、少なくとも document writing は分離すべきであり、routing と writer の間は action plan で引き渡すのが自然という整理になった。
- impact: high
- status: open
- created_at: 2026-04-20

## 2026-04-21

### 20260421-025
- title: category が弱い medium impact issue を keep レイヤーに残せるかを観測する必要がある
- category: general
- description: issue routing の第二バッチで、category が architecture / operations ではない medium impact issue が `route_to: issue` に残るかを確認したい。keep は廃止対象ではなく、弱い issue の保留レイヤーとして機能している必要がある。そのため、route 多様性を増やすだけでなく、keep がなお自然に残るケースを比較対象として用意する必要がある。
- context: 第一バッチ補正後、architecture / operations は keep gate より先に判定する形へ変更した。これにより design / operations route は回復したが、keep が完全に消えると保留レイヤーとしての役割が失われる。第二バッチでは keep が残るべきケースも観測対象に含める必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-21

## 2026-04-23

### 20260423-028
- title: Todoist projection で due_date が create payload へ伝播せず新規 task が日付なしで作られる
- category: execution
- description: daily review 後の Todoist projection で、新規に create された active task に due が入らない事象が起きた。`notes/04_operations/active_operations.md` には `due_date` が存在し、repo 側の `src/services/tasks/projection.js` も `due_date` / `rollingDayDate` から Todoist `due_string` / `deadline_date` を組み立てる実装を持っている。しかし、実運用で使っている `projectTasks` の projection 入出力スキーマには `due_date` / `due_type` が存在せず、daily review で Action に渡した current_active_tasks へ due 情報が載らなかった。その結果、新規 create task だけが日付なしで作られる。
- context: 2026-04-23 の会話で、daily review 後に ADAM 系の新規 Todoist task 3件へ due が入っていないことを確認した。既存継続 task には due が残っていたため、Todoist 側の一般不具合ではなく、新規 create 経路の伝播欠落と判断した。その後、3件には手動で due_date を補正した。根本的には `projectTasks` の task schema に `due_date` / `due_type` を追加し、projection create/update の payload へ伝播させる必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-23

## 2026-04-25

### 20260425-029
- title: ADAM instruction を GPT-5.5 向けに core / procedure / schema へ再層化する必要がある
- category: architecture
- description: GPT-5.5 向けには、古い prompt stack をそのまま持ち越すのではなく、期待成果、成功条件、制約、利用可能な証拠、最終出力を中心に整理し、細かな手順や形式制約は procedure spec や Structured Outputs / API schema 側へ逃がす方がよい。現在の ADAM instruction は、SSOT、operations、review、write gate、routing、handover、再発防止などの重要ルールを保持している一方で、常時読む必要のある拘束ルール、状況依存の手順、背景知識、出力形式、API schema に任せるべき制約が同じ層に積まれている。これにより GPT-5.5 ではノイズ化、探索範囲の過度な制限、機械的な出力につながる可能性がある。
- context: 2026-04-25 の会話で、ユーザーから「5.5向けに再調整した方がいい？」という確認があり、OpenAI の GPT-5.5 向け案内では古い prompt stack の全持ち越しではなく、期待成果・成功条件を明示し、細かな手順指示を減らし、必要なら Structured Outputs や API 側設定に逃がす方針が示されている、という前提が共有された。ADAM ではルール削除ではなく、`Core Instruction`、`Procedure Specs`、`Structured Outputs / API Schema` の3層へ再分解するのが安全という整理になった。
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-25

## 2026-04-30

### 20260430-031
- title: DELTA v0.6 で operations を Todoist execution view へ投影する
- category: execution
- description: DELTA の `systems/delta/operations/active_operations.md` は due_date / due_type / study_type / subject / material などを持つ学習実行順の正本であり、Todoist に projection できる形に近い。v0.6 では DELTA operations を Todoist execution view へ投影し、学習予定の見える化と日次実行性を上げる。ただし Todoist は正本ではなく view とし、DELTA operations を canonical として維持する。
- context: 2026-04-30 の会話で、ユーザーから「deltaのoperationもtodoist に投影する機能をつけよう。v0.6で」と提案があった。DELTA roadmap / operations では Todoist projection は optional とされており、既存 ADAM projection service `src/services/tasks/projection.js` を profile 拡張すれば、新規 API route を増やさずに実装できる可能性がある。一方で、既存 projection は description ref が ADAM active_operations 固定であり、DELTA 固有 field と source root を分ける必要がある。
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-30
- source_ref:
  - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md
  - systems/delta/operations/active_operations.md
  - systems/delta/roadmap/delta_roadmap.md
  - src/services/tasks/projection.js

### 20260430-032
- title: Studyplus API で学習記録の投稿・取得可否を確認する
- category: external_integration
- description: Studyplus には外部教材アプリ向け API / SDK が存在するが、公開情報から確認できる中心用途は外部教材アプリから Studyplus へ学習記録を投稿する方向である。DELTA で Studyplus を扱う場合、Studyplus から既存の勉強時間・勉強量を取得できるかは未確認であり、実装前に公式申請・承認条件・read API の有無を確認する必要がある。
- context: 2026-04-30 の会話で、Studyplus に API 等でアクセスできるかを確認した。公式発表と SDK からは `postRecord` による duration / amount / comment の投稿可能性は確認できたが、既存 Studyplus 記録を一覧取得する API は確認できなかった。承認されても投稿だけで、取得はできない可能性があるため、DELTA canonical history の入力元としてはまだ扱わず、外部投稿先または将来連携候補として分離する。
- impact: medium
- urgency: low
- status: open
- created_at: 2026-04-30
- confirmation_needed:
  - Web backend から Studyplus API を使えるか
  - 学習記録の投稿だけでなく取得 API があるか
  - 取得できる場合、取得範囲は本人の記録だけか
  - 教材別 / 日別 / 期間別の勉強時間を取得できるか
  - 個人利用・自分用連携が許可されるか
- source_ref:
  - Studyplus API terms
  - Studyplus Android SDK
  - Studyplus API public announcement

### 20260430-033
- title: DELTA foundation を main に統合する準備をする
- category: release_management
- description: DELTA は roadmap / plan / operations / history が存在し、read-only Action、history write、bulk read も runtime confirmation 済みで、すでに運用段階に入っている。現在は `feature/atlas-pre-delta-foundation` 上で運用されているが、これ以上 v0.6 Todoist projection などを積み増す前に、DELTA foundation を main へ統合する準備を進める必要がある。
- context: 2026-04-30 の会話で、main 以外に future branch があり同時開発している場合の統合方針を確認した。branch は恒久的な別正本ではなく、main へ統合するための開発空間として扱うのが自然と整理した。そのうえで、DELTA はすでに運用段階に入っているため、近いうちに main へ入れた方がよいと判断した。v0.6 Todoist projection の前に foundation 統合準備を置く方が、main との乖離を抑えられる。
- impact: high
- urgency: medium
- status: open
- created_at: 2026-04-30
- completed_condition:
  - `feature/atlas-pre-delta-foundation` の DELTA 差分を棚卸しする
  - main に入れるべき DELTA files と、branch に残す files を分ける
  - `systems/delta/roadmap/delta_roadmap.md` / `plan` / `operations` / `history` / `config` の整合を確認する
  - ADAM 側 `repoResource delta` resource と docs / code / config の整合を確認する
  - runtime behavior confirmed 済み項目と未確認項目を列挙する
  - main 統合後に DELTA GPT runtime で read / bulk / write behavior を再確認する
- source_ref:
  - systems/delta/roadmap/delta_roadmap.md
  - systems/delta/plan/2026_sharoushi_exam_plan.md
  - systems/delta/operations/active_operations.md
  - systems/delta/history/2026-04.md
  - systems/delta/config/delta_action_schema_v0.5.yaml
  - notes/02_design/2026-04-30_delta_v0_6_operations_todoist_projection.md

### 20260430-034
- title: ATLAS 関係ファイルを systems/atlas に集約する設計を整理する
- category: architecture
- description: ATLAS は test / verification / CI review system として扱うが、メイン executor は Claude である。ATLAS 関係ファイルを散在させると、検証 prompt / report / fixture / policy / handover の所在が不明確になるため、`systems/atlas/` を Claude 主体の外部実行系 verification subsystem として定義し、関係ファイルの集約方針を整理する必要がある。
- context: 2026-04-30 の会話で、ATLAS 関係ファイルを集約するために `systems/atlas/` を作るべきか確認した。DELTA と同じ `systems/*` 配下に置くのは自然だが、ATLAS は DELTA と違い、ADAM が主実行する subsystem ではなく Claude が主 executor を担う特殊な verification subsystem と整理した。したがって README / roadmap / plan / operations / config / verification / reports / handover / prompts などの初期構成を、ADAM の operations 正本や EVE / DELTA の正本と混線しないように設計する必要がある。
- impact: medium
- urgency: medium
- status: open
- created_at: 2026-04-30
- completed_condition:
  - ATLAS の primary executor が Claude であることを明記する
  - ADAM の責務を controller / integration / consistency に限定する
  - `systems/atlas/` に置くものと置かないものを分ける
  - 既存 ATLAS 関係ファイルの移動候補を棚卸しする
  - `systems/atlas/README.md` / roadmap / verification / prompts の初期構成案を作る
  - ATLAS outputs は verification evidence であり execution SSOT ではないことを明記する
- source_ref:
  - docs/05_roadmap.md
  - docs/17_operations_system.md
  - docs/15_notes_system.md
  - notes/04_operations/next_operations.md
