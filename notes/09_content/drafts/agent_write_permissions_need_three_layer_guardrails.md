# agent の書き込み権限制御は3層で固める

## 問題

agent に「このファイルだけ触ってよい」と会話で伝えるだけでは、運用ミスや例外ケースで破られる余地が残る。

## 背景

Claude Code に test 系の責務を寄せる方針が固まる一方で、通常書き込み範囲を test / dialogue 周辺へ制限したいという要求が明確になった。会話ルールだけでは強制力が弱く、技術的な guardrail が必要になった。

## なぜ重要か

権限境界が曖昧だと、test 担当 agent が実装本体や docs 正本まで触ってしまい、責務分離が崩れる。設計統制と実行速度を両立するには、役割だけでなく書き込み可能範囲も固定した方がよい。

## 解決

次の 3 層で固める。

- `config/ai/dialogue.md` に運用ルールを明記する
- pre-commit / pre-push で許可外変更を拒否する
- CI でも同じ allowlist を再検査する

## 学び

会話ルールは必要だが十分ではない。agent の行動境界は、運用ルール・ローカル hook・CI 再検査の 3 層に分けると実効性が上がる。

## 意思決定

- Claude Code の通常書き込み範囲は dialogue / test / test 補助 / test 関連設定に限定する
- `src/services/` や `api/` など本体実装は通常禁止とし、例外時のみ proposal → ADAM confirmation を通す
- 技術的制限は `dialogue.md → hook → CI` の順で最小実装する

## Before / After

- Before
  - 会話ルール中心で制御していた
  - 技術的拒否ラインがなかった
- After
  - 運用ルールと技術的 guardrail を分離して設計できる状態になった
  - Claude Code の責務境界を test 系へ寄せやすくなった

## メモ（ラフ）

- allowlist の初期案は `config/ai/dialogue.md`、`**/*.test.js`、`src/lib/testing/`、test 関連 `package.json`、`.github/workflows/test.yml`、`.nvmrc`、`.gitignore`
- `package.json` と `.gitignore` はファイル全体許可だと広すぎるため、必要なら差分パターン検査を後段で追加する
- 完全な OS 権限制御ではなく、まずは最小で安全に前進する
