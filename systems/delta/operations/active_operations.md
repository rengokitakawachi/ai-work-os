# delta active_operations

## Day0

- task: 2026-04-29 健康保険法 L3 択一 Q1-1〜Q2-7 完了済み
  source_ref:
    - systems/delta/history/2026-04.md
  rolling_day: Day0
  due_date: 2026-04-29
  due_type: date
  subject: 健康保険法
  topic: 択一 Q1-1〜Q2-7
  study_type: L3
  material: 過去問講座テキスト
  status: completed
  notes:
    - history に実績記録済み
    - Q1-1〜Q2-7 まで実施
    - 秒トレ40問完了

## Day1

- task: 2026-04-30 平日バージョン：国民年金法 L1 6章完了 + L2 P148〜P160
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/roadmap/delta_roadmap.md
    - systems/delta/history/2026-04.md
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  subject: 国民年金法
  topic: 6章 障害基礎年金
  study_type: L1/L2
  material: 動画講義 / 基礎講座テキスト
  why_now:
    - ユーザー指定により 2026-04-30 は平日バージョンで運用する
    - 平日は原則 L1 / L2 を進める
    - L1・L2 は国民年金法5章まで揃っているため、次は6章へ進む
    - ユーザー指定により、少なくともL1は6章を終わらせる
  notes:
    - 最低ライン: 秒トレ40問 + L1 国民年金法6章完了
    - 標準ライン: L1 国民年金法6章完了 + L2 基礎テキスト P148〜P160
    - 余力ライン: L2 基礎テキスト P165まで
    - L2最低ライン: P148〜P154まで進める
    - L3 健康保険法 Q3-1以降は明日は原則やらない
    - Q1-2、Q2-2、Q2-6、Q2-7 は最優先回収対象として保持する
    - Q1-3、Q2-1、Q2-5 は次優先回収対象として保持する

- task: 秒トレ40問
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day1
  due_date: 2026-04-30
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ
  why_now:
    - 秒トレは毎日40問を目安に継続する固定運用である
  notes:
    - メイン教材の代替ではなく、記憶維持・短時間反復・忘却防止のための補助教材

## Day2

- task: 2026-05-01 方針未確定：平日バージョン継続またはGW L3集中へ戻す
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/history/2026-04.md
  rolling_day: Day2
  due_date: 2026-05-01
  due_type: date
  subject: 国民年金法 / 健康保険法
  topic: 翌日レビューで決定
  study_type: L1/L2 or L3
  material: 動画講義 / 基礎講座テキスト / 過去問講座テキスト
  why_now:
    - 2026-04-30 の平日バージョン実績を見て、翌日をL1/L2継続にするかL3へ戻すか判断する
  notes:
    - 平日バージョン継続なら国民年金法 L1/L2 を進める
    - GW L3集中へ戻すなら健康保険法 L3 択一 Q3-1以降へ進む
    - いずれの場合も秒トレ40問は継続

- task: 秒トレ40問
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day2
  due_date: 2026-05-01
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ

## Day3

- task: 健康保険法 L3 択一 Q3-1以降
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day3
  due_date: 2026-05-02
  due_type: date
  subject: 健康保険法
  topic: 択一 Q3-1以降
  study_type: L3
  material: 過去問講座テキスト
  status: deferred
  why_now:
    - 2026-04-30 は平日バージョンに切り替えたため、L3は後続日に再配置する
  notes:
    - 実施日は 2026-04-30 の日次レビュー後に再判断
    - L3は問題番号ベースで記録する

## Day4

- task: 健康保険法 L3 ×・△ 回収
  source_ref:
    - systems/delta/history/2026-04.md
  rolling_day: Day4
  due_date: 2026-05-03
  due_type: date
  subject: 健康保険法
  topic: Q1・Q2の弱点回収
  study_type: L3
  material: 過去問講座テキスト
  priority_1_cross:
    - Q1-2
    - Q2-2
    - Q2-6
    - Q2-7
  priority_2_triangle:
    - Q1-3
    - Q2-1
    - Q2-5
  notes:
    - × は最優先回収
    - △ は次優先回収
    - ○ は余力があれば確認

## Day5

- task: 秒トレ40問
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
  rolling_day: Day5
  due_date: 2026-05-03
  due_type: date
  study_type: 秒トレ
  material: iPhoneアプリ

## Day6

- task: 国民年金法または健康保険法の次アクションは日次レビューで決定
  source_ref:
    - systems/delta/plan/2026_sharoushi_exam_plan.md
    - systems/delta/history/2026-04.md
  rolling_day: Day6
  due_date: 2026-05-04
  due_type: date
  subject: 国民年金法 / 健康保険法
  topic: 未確定
  study_type: L1/L2 or L3
  material: 動画講義 / 基礎講座テキスト / 過去問講座テキスト
  notes:
    - 2026-04-30 と 2026-05-01 の実績を見て再配置する

---

## Rules

- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.
- Todoist projection is optional.
- 実績は operations に書かず、history に集約する。
- operations はこれからやること、予定、実行順、次アクションの正本とする。
- 平日は原則 L1 / L2、土日祝は L3、毎日秒トレ40問。
- 2026-04-30 はユーザー指定により平日バージョン。
- 2026-04-30 は少なくとも L1 国民年金法6章を完了する。
- L2 標準ラインは国民年金法 基礎テキスト P148〜P160。
- L2 余力ラインは P165まで。
- L3 は問題番号ベースで管理する。
- L3 は各問題に理解度主軸で ◎ / ○ / △ / × を付ける。
- 正答数・正誤は補助情報として記録する。
- 評価記号は正答数から自動決定しない。
- 復習優先度は × → △ → ○ → ◎ とする。
- 健康保険法では Q5 / Q6 は存在しない。
- 健康保険法 Q8 は演習対象なし扱い。
- △・× は必ず後で回収できるように問題番号を残す。
- ○ は余力があれば2巡目で確認する。
- ◎ は原則スキップ可能。
