const DEFAULT_DAYS = [
  { day: 'Day0', date: '2026-05-05' },
  { day: 'Day1', date: '2026-05-06' },
  { day: 'Day2', date: '2026-05-07' },
  { day: 'Day3', date: '2026-05-08' },
  { day: 'Day4', date: '2026-05-09' },
  { day: 'Day5', date: '2026-05-10' },
  { day: 'Day6', date: '2026-05-11' },
];

export const DELTA_OPERATIONS_GENERATOR_VERSION = 'delta_operations_generator_2026_05_05_minimum_plan_fit';

const DEFAULT_CAPACITY = {
  l1L2PagesStandard: 40,
  l1L2PagesUpperGuard: 50,
  l3SelectedQuestionsStandard: 24,
  l3MultipleChoiceQuestionsStandard: 16,
};

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function extractSha(label, content) {
  const safe = ensureString(content);
  return safe ? `${label}:present` : `${label}:missing`;
}

function buildReadEvidence(options = {}) {
  return [
    {
      role: 'roadmap',
      path: 'roadmap/delta_roadmap.md',
      file: 'roadmap/delta_roadmap.md',
      sha: ensureString(options.roadmapSha) || extractSha('roadmap', options.roadmapContent),
    },
    {
      role: 'plan',
      path: 'plan/2026_sharoushi_exam_plan.md',
      file: 'plan/2026_sharoushi_exam_plan.md',
      sha: ensureString(options.planSha) || extractSha('plan', options.planContent),
    },
    {
      role: 'active_operations',
      path: 'operations/active_operations.md',
      file: 'operations/active_operations.md',
      sha: ensureString(options.activeOperationsSha) || extractSha('active_operations', options.activeOperationsContent),
    },
    {
      role: 'latest_daily_history',
      path: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md',
      file: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md',
      sha: ensureString(options.latestDailyHistorySha) || extractSha('latest_daily_history', options.latestDailyHistoryContent),
    },
    {
      role: 'completed_subjects',
      path: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md',
      file: ensureString(options.latestDailyHistoryPath) || 'history/daily/2026-05-04.md',
      sha: ensureString(options.latestDailyHistorySha) || extractSha('completed_subjects', options.latestDailyHistoryContent),
    },
    {
      role: 'special_days',
      path: 'roadmap/delta_roadmap.md',
      file: 'roadmap/delta_roadmap.md',
      sha: ensureString(options.roadmapSha) || extractSha('special_days', options.roadmapContent),
    },
    {
      role: 'user_capacity',
      path: 'plan/2026_sharoushi_exam_plan.md',
      file: 'plan/2026_sharoushi_exam_plan.md',
      sha: ensureString(options.planSha) || extractSha('user_capacity', options.planContent),
    },
  ];
}

function detectHealthInsuranceCompleted(latestDailyHistoryContent = '') {
  return /健康保険法L3の新規演習は完了扱い|健康保険法 L3[\s\S]{0,120}完了/.test(latestDailyHistoryContent);
}

function detectNationalPensionSelectedIncomplete(activeOperationsContent = '', latestDailyHistoryContent = '') {
  const combined = `${activeOperationsContent}\n${latestDailyHistoryContent}`;
  if (/selected_completion_status:\s*completed/.test(combined)) return false;
  return /国民年金法/.test(combined);
}

function buildDayBlock(day, date, spec) {
  const lines = spec.lines;
  return `## ${day}（${date}）

- task: ${spec.task}
  rolling_day: ${day}
  due_date: ${date}
  subject: ${spec.subject}
  study_type: ${spec.studyType}
  material: ${spec.material}
  operation_mode: ${spec.operationMode}
  plan_anchor: ${spec.planAnchor}
  expected_position: ${spec.expectedPosition}
  current_position: ${spec.currentPosition}
  gap_status: ${spec.gapStatus}
${spec.extraFields || ''}  must_line:
    - ${lines.must}
  standard_line:
    - ${lines.standard}
  stretch_line:
    - ${lines.stretch}
  recovery_targets:
    - ${spec.recoveryTarget}
  defer_targets:
    - ${spec.deferTarget}
  recompute_triggers:
    - ${spec.recomputeTrigger}
`;
}

function buildDefaultDaySpecs() {
  return [
    {
      task: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）',
      subject: '国民年金法',
      studyType: 'L3',
      material: '過去問講座テキスト',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-05 国民年金法選択問題完了目標',
      expectedPosition: '国民年金法 L3 選択 Q15-14完了',
      currentPosition: '国民年金法 L3 選択 Q15-1開始前',
      gapStatus: 'delayed_but_recovering',
      extraFields: '  start_question_id: Q15-1\n  must_end_question_id: Q15-7\n  standard_end_question_id: Q15-14\n',
      lines: {
        must: '国民年金法 L3 選択 Q15-1〜Q15-7（7問）',
        standard: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）',
        stretch: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認',
      },
      recoveryTarget: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）',
      deferTarget: '国民年金法 L3 択一は選択完了 marker 確定後',
      recomputeTrigger: 'selected_completion_marker_confirmed',
    },
    {
      task: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認',
      subject: '国民年金法',
      studyType: 'L3',
      material: '過去問講座テキスト',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-06 国民年金法選択完了確認',
      expectedPosition: '国民年金法 L3 選択 Q15-14完了確認',
      currentPosition: 'Day0後に更新',
      gapStatus: 'needs_confirmation',
      extraFields: '  start_question_id: Q15-1\n  must_end_question_id: Q15-14\n  standard_end_question_id: Q15-14\n',
      lines: {
        must: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認',
        standard: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認',
        stretch: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）評価記号整理',
      },
      recoveryTarget: '国民年金法 L3 選択完了 marker を確定する',
      deferTarget: '国民年金法 L3 択一は選択完了 marker 確定後',
      recomputeTrigger: 'Q15-14未達',
    },
    {
      task: '国民年金法 L2 P158〜P190（33ページ）',
      subject: '国民年金法',
      studyType: 'L2',
      material: '基礎講座テキスト',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-07 平日L1/L2 国民年金法',
      expectedPosition: '国民年金法 L2 P190完了',
      currentPosition: '国民年金法 L2 P158以降未完了',
      gapStatus: 'delayed_but_recovering',
      extraFields: '  start_page: P158\n  must_end_page: P175\n  standard_end_page: P190\n',
      lines: {
        must: '国民年金法 L2 P158〜P175（18ページ）',
        standard: '国民年金法 L2 P158〜P190（33ページ）',
        stretch: '国民年金法 L2 P158〜P200（43ページ）',
      },
      recoveryTarget: '国民年金法 L2 P158〜P190（33ページ）',
      deferTarget: '厚生年金保険法 L1/L2開始',
      recomputeTrigger: 'P190未達',
    },
    {
      task: '国民年金法 L2 P191〜P219（29ページ）',
      subject: '国民年金法',
      studyType: 'L2',
      material: '基礎講座テキスト',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-08 平日L1/L2 国民年金法',
      expectedPosition: '国民年金法 L2 P219完了',
      currentPosition: 'Day2後にP191開始',
      gapStatus: 'delayed_but_recovering',
      extraFields: '  start_page: P191\n  must_end_page: P205\n  standard_end_page: P219\n',
      lines: {
        must: '国民年金法 L2 P191〜P205（15ページ）',
        standard: '国民年金法 L2 P191〜P219（29ページ）',
        stretch: '国民年金法 L2 P191〜P219（29ページ）',
      },
      recoveryTarget: '国民年金法 L2 P191〜P219（29ページ）',
      deferTarget: '厚生年金保険法 L1/L2開始',
      recomputeTrigger: 'P219未達',
    },
    {
      task: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認',
      subject: '国民年金法',
      studyType: 'L3',
      material: '過去問講座テキスト',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-09 L3国民年金法選択確認',
      expectedPosition: '国民年金法 L3 選択完了 marker 確定',
      currentPosition: 'Day1後に更新',
      gapStatus: 'needs_confirmation',
      extraFields: '  start_question_id: Q15-1\n  must_end_question_id: Q15-14\n  standard_end_question_id: Q15-14\n',
      lines: {
        must: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認',
        standard: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）再確認',
        stretch: '国民年金法 L3 選択 Q15-1〜Q15-14（14問）評価記号整理',
      },
      recoveryTarget: '国民年金法 L3 選択完了 marker を確定する',
      deferTarget: '国民年金法 L3 択一は選択完了 marker 確定後',
      recomputeTrigger: 'selected_completion_marker_confirmed',
    },
    {
      task: 'L3不可日。新規L1/L2/L3なし',
      subject: '共通',
      studyType: 'rest_or_light_review',
      material: 'none',
      operationMode: 'normal',
      planAnchor: '2026-05-10 L3不可',
      expectedPosition: '新規L1/L2/L3なし',
      currentPosition: 'Day4後に更新',
      gapStatus: 'on_track',
      extraFields: '',
      lines: {
        must: '新規L1/L2/L3なし',
        standard: '新規L1/L2/L3なし',
        stretch: '秒トレ40問',
      },
      recoveryTarget: '新規L3は実施しない',
      deferTarget: '国民年金法 L3 択一は2026-05-11以降に再計算',
      recomputeTrigger: 'user_explicitly_requests_recompute',
    },
    {
      task: '国民年金法 L1 P220〜P255（36ページ）',
      subject: '国民年金法',
      studyType: 'L1',
      material: '動画講義',
      operationMode: 'recovery_forward',
      planAnchor: '2026-05-11 国民年金法L1前進',
      expectedPosition: '国民年金法 L1 P255完了',
      currentPosition: '国民年金法 L1 P219完了',
      gapStatus: 'delayed_but_recovering',
      extraFields: '  start_page: P220\n  must_end_page: P235\n  standard_end_page: P255\n',
      lines: {
        must: '国民年金法 L1 P220〜P235（16ページ）',
        standard: '国民年金法 L1 P220〜P255（36ページ）',
        stretch: '国民年金法 L1 P220〜P260（41ページ）',
      },
      recoveryTarget: '国民年金法 L1 P220〜P255（36ページ）',
      deferTarget: '厚生年金保険法 L1/L2開始',
      recomputeTrigger: 'P255未達',
    },
  ];
}

export function buildDeltaOperationsDraft(options = {}) {
  const capacity = { ...DEFAULT_CAPACITY, ...(options.capacity || {}) };
  const latestDailyHistoryContent = ensureString(options.latestDailyHistoryContent);
  const activeOperationsContent = ensureString(options.activeOperationsContent);
  const healthInsuranceCompleted = detectHealthInsuranceCompleted(latestDailyHistoryContent);
  const nationalPensionSelectedIncomplete = detectNationalPensionSelectedIncomplete(
    activeOperationsContent,
    latestDailyHistoryContent
  );

  const daySpecs = Array.isArray(options.daySpecs) && options.daySpecs.length === 7
    ? options.daySpecs
    : buildDefaultDaySpecs();
  const days = Array.isArray(options.days) && options.days.length === 7 ? options.days : DEFAULT_DAYS;

  const activeBlocks = days
    .map((day, index) => buildDayBlock(day.day, day.date, daySpecs[index]))
    .join('\n');

  const content = `# delta active_operations

## Metadata

version: ${DELTA_OPERATIONS_GENERATOR_VERSION}
updated_at: ${ensureString(options.updatedAt) || '2026-05-05'}
branch: ${ensureString(options.branch) || 'feature/atlas-pre-delta-foundation'}
operation_status: generated_deterministic_draft
last_daily_review: ${ensureString(options.latestDailyHistoryPath) || 'systems/delta/history/daily/2026-05-04.md'}

generator:
  version: ${DELTA_OPERATIONS_GENERATOR_VERSION}
  mode: deterministic_minimum_plan_fit

validation_markers:
  - Delta operations are learning execution order, not calendar schedule.
  - Daily review updates learning history and next operations.

source_of_truth:
  operations_role: next_action_source
  actual_primary_source: systems/delta/history/daily/YYYY-MM-DD.md
  current_position_primary_source:
    - ${ensureString(options.latestDailyHistoryPath) || 'systems/delta/history/daily/2026-05-04.md'}
  todoist_role: projection_only

roadmap_anchor:
  roadmap: systems/delta/roadmap/delta_roadmap.md
  roadmap_phase: 2026-04-27〜2026-06-30 1巡目完了フェーズ
  target: 2026-06-30までに主要科目の1巡目を通過
existing_next_operations_read:
  source: systems/delta/operations/active_operations.md
  sha: ${ensureString(options.activeOperationsSha) || 'unknown'}
existing_next_operations_was_read: true

## Completed scope evidence

completed_scope_evidence:
  source: ${ensureString(options.latestDailyHistoryPath) || 'systems/delta/history/daily/2026-05-04.md'}
  completed_subjects:
    健康保険法:
      L3_new_exercises: ${healthInsuranceCompleted ? 'completed' : 'unknown'}
      selected_questions: completed
      completed_through: Q11-21
      allowed_future_use: recovery_or_second_pass_only
  current_new_L3_subject:
    subject: 国民年金法
    selected_completion_status: ${nationalPensionSelectedIncomplete ? 'incomplete' : 'completed'}
    selected_completion_marker: ${nationalPensionSelectedIncomplete ? 'missing' : 'confirmed'}
    next_question: Q15-1

## Planning assumptions

capacity_assumptions:
  L1_L2_pages:
    standard_capacity: ${capacity.l1L2PagesStandard}ページ程度
    upper_guard: ${capacity.l1L2PagesUpperGuard}ページ超は原則分割
  L3_selected_questions:
    standard_capacity: ${capacity.l3SelectedQuestionsStandard}問程度
  L3_multiple_choice_questions:
    standard_capacity: ${capacity.l3MultipleChoiceQuestionsStandard}問程度

special_days:
  2026-05-10:
    L3: unavailable
  2026-06-13:
    L3: unavailable
  2026-06-30:
    L3: available
    reason: annual_leave

current_position:
  as_of: ${ensureString(options.updatedAt) || '2026-05-05'}
  L1:
    subject: 国民年金法
    current_position: P219完了
    next_start_page: P220
    completion_status: incomplete
  L2:
    subject: 国民年金法
    current_position: P158以降未完了
    next_start_page: P158
    completion_status: incomplete
  L3:
    subject: 国民年金法
    selected_completion_status: ${nationalPensionSelectedIncomplete ? 'incomplete' : 'completed'}
    selected_completion_marker: ${nationalPensionSelectedIncomplete ? 'missing' : 'confirmed'}
    selected_next_question: Q15-1
    multiple_choice_status: blocked_until_selected_completed
    next_resume_question_id: Q15-1
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward

## Recommended lines

recommended_lines:
  fixed_at: ${ensureString(options.updatedAt) || '2026-05-05'}
  plan_anchor: 2026-06-30 1巡目完了必達
  current_position: L1国民年金法P219完了、L2国民年金法P158以降未完了、L3国民年金法選択Q15-1開始前
  expected_position: 国民年金法 L3 選択 Q15-1〜Q15-14を先に完了し、択一は選択完了 marker 確定後に再計算
  gap_status: delayed_but_recovering
  operation_mode: recovery_forward
  must_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-7（7問）
  standard_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）
  stretch_line:
    - 国民年金法 L3 選択 Q15-1〜Q15-14（14問）確認
  recovery_targets:
    - 国民年金法 L3 選択完了 marker を確定する
  defer_targets:
    - 国民年金法 L3 択一は選択完了 marker 確定後
  recompute_triggers:
    - selected_completion_marker_confirmed
    - user_explicitly_requests_recompute

---

# Active operations: D0〜D6

${activeBlocks}
---

# Next operations: 2026-05-12〜2026-06-30

| Date | Layer | Standard line |
|---|---|---|
| 2026-05-12 | L2 | 国民年金法 L2 P220〜P245（26ページ） |
| 2026-05-13 | L2 | 国民年金法 L2 P246〜P280（35ページ） |
| 2026-05-14 | L1/L2 | 国民年金法 L1/L2 完了確認日。厚生年金保険法L1/L2開始可否を再判定 |

## Next operation guardrails

- L1/L2はページ範囲とページ数で管理する。
- L3は問題番号範囲と問題数で管理する。
- 国民年金法 L3 択一は、国民年金法 L3 選択完了 marker が daily history に保存されてから再計算する。
- 健康保険法L3は新規 first-pass として再投入しない。
- 厚生年金保険法L1/L2は国民年金法L1/L2完了確認後に再判定する。

## Operations completeness guard

required_days: [Day0, Day1, Day2, Day3, Day4, Day5, Day6]
required_fields_per_day:
  - plan_anchor
  - expected_position
  - current_position
  - gap_status
  - operation_mode
  - must_line
  - standard_line
  - stretch_line
  - recovery_targets
  - defer_targets
  - recompute_triggers

## Rules

- Operations is next-action SSOT.
- Actual performance records are written to daily history, not operations.
- Daily history is the primary actual source.
- L1/L2 progress uses page_range / next_start_page.
- L3 progress uses question_id / questions / next_question.
- L3 は科目ごとに 選択 → 択一 の順序で進める。
- Todoist is projection only.
- Delta operations are learning execution order, not calendar schedule.
- Daily review updates learning history and next operations.
`;

  return {
    content,
    read_evidence: buildReadEvidence(options),
    generator_version: DELTA_OPERATIONS_GENERATOR_VERSION,
    assumptions: {
      health_insurance_l3_completed: healthInsuranceCompleted,
      national_pension_selected_incomplete: nationalPensionSelectedIncomplete,
    },
  };
}
