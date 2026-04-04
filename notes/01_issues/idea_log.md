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
- description: ChatGPT は特定の作業種類に限らず、会話が長くなると反応が遅くなる。そのため一定のタイミングで新しいスレッドへ切り替える運用を行っている。引き継ぎ書の仕組み自体は有効だが、スレッド切替後は引き継ぎ書を読むだけでは十分ではなく、docs / notes / code を追加で読み込み全体構造を理解する必要がある。現状ではその初期読込を毎回手動で指示する必要があり、再開フローが自動化・定型化されていないことが負担になっている。加えて、ADAM が会話の肥大化を運用上の切替タイミングとして明示的に扱っておらず、適切な区切りでスレッド切替を提案する仕組みも不足している。
- context: 長いスレッドでは ChatGPT の応答が遅くなるため、作業継続のために定期的にスレッドを切り替えている。再開起点の正本は notes/handover、短期実行管理の正本は operations としたい。理想は、引き継ぎ書を読んだら必要な docs / notes / code を自動で読みに行き、全体構造を把握したうえで再開できる状態である。また、ADAM には会話肥大化を検知したら作業の区切りでスレッド切替を提案してほしい。
- impact: high
- status: open
- created_at: 2026-03-27

### 20260327-002
- title: AI instructions・schema の配置を code/config/ai/ に統一する必要がある
- category: architecture
- description: ADAM と EVE の instructions / schema を code resource から直接参照できる場所へ移し、repo 上の現物確認と差分確認を可能にする必要があった。配置先は `code/config/ai/` とし、instruction / schema を code resource の read 経路に乗せる方針を採用した。
- context: 当初はリポジトリ直下の AI/ フォルダに保存されていたが、そこは現行 access path に含まれていなかった。そのため、repo に現物が存在していても運用上は読みに行きにくかった。現在は `config/ai/adam_instruction.md`、`config/ai/adam_schema.yaml`、`config/ai/eve_instruction.md`、`config/ai/eve_schema.yaml` が code resource 上に存在することを確認済みであり、配置移行そのものは完了している。未着手なのは、ADAM instruction と repo 正本をどう分担・同期するかというハイブリッド運用の整理である。
- impact: high
- status: closed
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
