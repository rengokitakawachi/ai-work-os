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
