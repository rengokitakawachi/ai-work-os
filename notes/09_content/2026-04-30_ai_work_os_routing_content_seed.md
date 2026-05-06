# 2026-04-30 AI Work OS routing content seed

## 目的

将来的に AI Work OS / ADAM / EVE / DELTA の開発過程を note 記事化し、収益化を目指すための素材を残す。

この file は完成記事ではなく、content seed / ネタ帳である。

---

## source_ref

- notes/02_design/2026-04-30_routing_core_concept_redefinition.md
- notes/08_analysis/2026-04-30_routing_session_checklist.md
- notes/08_analysis/2026-04-30_weekly_review_routing_session_integration.md
- notes/07_reports/2026-04-30_daily_review.md
- config/ai/adam_instruction.md

---

## seed 1: routing はフォルダ移動ではなく、情報を活かす装置

### 主張

AI Work OS における routing は、単なるファイル移動や issue の都度分類ではない。

蓄積された inbox / dev memo / issue / design / analysis / web clip を読み、chunk に分解し、関連情報と結合し、新しい価値ある file を作り、元 file を archive することで、情報の滞留を解消する装置である。

### 読者価値

多くの人はメモや web clip を保存するが、保存した情報は増え続けるだけで使われない。

AI Work OS では、情報を「保存」ではなく「流す」対象として扱う。

### 記事タイトル案

- AI時代のメモ管理は「保存」ではなく「routing」になる
- inbox を溜めないための AI Work OS 設計
- 情報を活かすための routing という考え方

---

## seed 2: transform routing と relocation routing

### 主張

routing には少なくとも2種類がある。

- transform routing: 情報を chunk 分解・統合して新しい file を作る
- relocation routing: 既存 file の価値はそのままに、より適切な layer へ移す

### 例

transform:

- 複数の web 記事から AI agent operation principles を作る
- 元記事は archive する
- 新 file に source_ref を残す

relocation:

- design note が現 phase 対象外だが将来価値を持つ
- `notes/02_design/foo.md` から `notes/80_future/design/foo.md` へ移す

### 読者価値

情報整理を「捨てる / 残す」の二択にしない。  
価値化する、移動する、保留する、archive する、の複数選択肢を持つ。

---

## seed 3: archive 判定だけでは滞留解消にならない

### 主張

archive 判定と archive 移動は別である。

ただし、判定だけで終わると情報は元 folder に残り続ける。  
routing が滞留解消機能であるなら、条件を満たした file は routing session 内で archive 移動まで行ってよい。

### 読者価値

「後で整理する」が積み重なると、整理システム自体が滞留を生む。  
安全な Write Gate と source_ref を持てば、AI が archive move まで担える。

---

## seed 4: ADAM の判断力を上げる Proactive Focus Completion Guard

### 主張

ADAM は active_operations を機械的に消化するだけでは不十分である。

ただし実行中に毎回大きく再判断すると operations が正本として機能しない。

そこで、判断は planning / rolling / review で厚く行い、daytime execution では active に従う。  
ただし次 task へ進む直前だけ、phase-critical gate が残っていないかを軽く確認する。

### 読者価値

AI を「自律的に行動する OS」に近づけるには、自由に判断させるより、判断する場所としない場所を分ける方が重要。

### 記事タイトル案

- AI エージェントに必要なのは自由判断ではなく、判断する場所の設計
- ADAM を自律的にするための Focus Completion Guard
- AI Work OS の operations-first 実行設計

---

## seed 5: daily review は report 作成ではない

### 主張

daily review は report を書くことではない。

operations 更新、Todoist projection、archive_operations、daily report、content seed 抽出まで含めて review である。

### 読者価値

振り返りを「日報」に閉じると、次の実行順にも、発信素材にも、情報整理にもつながらない。

AI Work OS では daily review を operations / projection / report / content の接続点として扱う。

---

## paid article candidates

### 有料深掘り候補 A

AI Work OS における routing / rolling / review の責務分離

構成案:

1. なぜタスク管理だけでは AI OS にならないのか
2. routing: 情報を行き先へ送る
3. rolling: 候補を実行順へ配置する
4. review: 実績を正本へ戻す
5. 失敗例: routing を都度 issue 処理と誤認した
6. 修正後: 蓄積情報の価値化装置としての routing

### 有料深掘り候補 B

AI エージェントを自律的にするための Operations 設計

構成案:

1. 自律性と勝手な実行は違う
2. active_operations を SSOT にする
3. next / future / archive の役割
4. Proactive Focus Completion Guard
5. Todoist は projection であり正本ではない
6. 日中 execution と review / rolling の分離

---

## next content action

weekly review で次を確認する。

- この記事素材を notes/09_content/drafts へ育てるか
- routing core の実運用後に before / after を追記するか
- ADAM runtime reflection の失敗談を別 seed に分けるか
