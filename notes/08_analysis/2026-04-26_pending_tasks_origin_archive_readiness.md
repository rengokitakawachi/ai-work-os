# 2026-04-26 pending_tasks origin archive readiness

## 目的

`pending_tasks` 元 inbox file を archive 扱いへ寄せてよいかを、
実運用上の観点から確認する。

対象:

- `notes/00_inbox/dev_memo/2026-03-22_09-40-00_pending_tasks.md`

参照:

- `notes/02_design/2026-04-24_pending_tasks_split_postprocess_archive_pending_rule.md`
- `notes/08_analysis/2026-04-24_pending_tasks_split_reconfirmation_after_intro_exclusion.md`

---

## 確認観点

archive に寄せてよい条件は次である。

- split が成立した
- 導入 / メタ section を除いた主要論点が item 化できた
- 各 item の route は少なくとも説明可能である
- source_ref で元 file を追跡できる
- 元 file を inbox に残さなくても、後続判断に支障がない

---

## 確認結果

### split 成立

`pending_tasks` は見出し単位で具体論点へ分解可能である。

主な論点は次のように分かれている。

- GPT指示の改善
- Todoist Action連携
- Action動作確認
- archive運用ルールの詳細化
- inbox運用の実践検証
- duration設計
- Outlook連携設計
- MindMeister連携設計

判断:

- split は成立している

---

### 導入 / メタ section 除外

`概要` / `まとめ` / `summary` は除外対象として整理済みである。

2026-04-24 の再確認で、`概要` 除外の最小未達は閉じたと判断済みである。

判断:

- 導入 / メタ section 除外は成立している

---

### source_ref 維持

派生 item は元 file を source_ref として参照できる。

元 file を inbox に残さなくても、参照関係は source_ref により維持できる。

判断:

- source_ref 維持は成立している

---

### 後続判断への支障

現在残っている論点は、元 file の再分解ではなく、
intake routing 全体の後処理 rule への一般化である。

そのため、元 file を作業対象として inbox に残し続ける必要は弱い。

判断:

- 後続判断への支障は小さい

---

## 結論

`pending_tasks` 元 inbox file は、実運用上 archive 扱いへ寄せてよい。

理由:

- split は成立している
- 導入 / メタ section 除外も成立している
- source_ref で追跡できる
- 残論点は元 file の未分解ではなく、後処理 rule の一般化へ移っている
- 無理由で inbox に残す状態は避けるべきである

---

## 注意

この確認は、元 file の物理的な移動を即実行するものではない。

本 task の完了条件は、
`archive 扱いへ寄せてよいか` の実運用判断を閉じることである。

実際の移動 / delete / archive 保存は、intake 後処理 rule の一般化または別 task で扱う。

---

## completed condition

この task は次を満たしたため完了候補とする。

- archive 寄せの可否を確認した
- pending に残すべき未判断がないことを確認した
- source_ref 維持により、元 file を inbox に残さなくても後続判断できると整理した
- 物理移動は別 task として分離した
