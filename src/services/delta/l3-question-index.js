export const DELTA_L3_QUESTION_INDEX_VERSION = 'delta_l3_question_index_2026_05_09_national_pension_multiple_choice';

const QUESTION_RANGE_PATTERN = /Q(\d+)-(\d+)\s*[〜~]\s*Q\1-(\d+)（(\d+)問）/g;
const NO_EXERCISE_PATTERN = /Q(\d+)-0/g;
const ANY_Q_PATTERN = /Q(\d+)-(\d+)/g;

const FORBIDDEN_L3_AMBIGUOUS_TERMS = [
  'n問相当',
  '問相当',
  'できるところまで',
  '章だけ',
  '前半',
  '後半',
  '実在未確認',
  '教材インデックス確認',
  'インデックス確認',
  '確認済み次問',
  '次問から',
  '未通過',
  'Qx以降',
  'Qx-last',
  '章の最後まで',
];

export const DELTA_L3_QUESTION_INDEX = {
  国民年金法: {
    multiple_choice: {
      1: { range: 'Q1-1〜Q1-16', start: 1, end: 16, count: 16 },
      2: { range: 'Q2-1〜Q2-5', start: 1, end: 5, count: 5 },
      3: { range: 'Q3-1〜Q3-3', start: 1, end: 3, count: 3 },
      4: { range: 'Q4-1〜Q4-4', start: 1, end: 4, count: 4 },
      5: { range: 'Q5-0', count: 0, no_exercise: true },
      6: { range: 'Q6-1〜Q6-2', start: 1, end: 2, count: 2 },
      7: { range: 'Q7-1〜Q7-2', start: 1, end: 2, count: 2 },
      8: { range: 'Q8-1〜Q8-3', start: 1, end: 3, count: 3 },
      9: { range: 'Q9-1〜Q9-10', start: 1, end: 10, count: 10 },
      10: { range: 'Q10-0', count: 0, no_exercise: true },
      11: { range: 'Q11-1〜Q11-7', start: 1, end: 7, count: 7 },
      12: { range: 'Q12-1〜Q12-1', start: 1, end: 1, count: 1 },
      13: { range: 'Q13-1〜Q13-2', start: 1, end: 2, count: 2 },
      14: { range: 'Q14-1〜Q14-17', start: 1, end: 17, count: 17 },
    },
  },
};

function isOperationLine(line) {
  return (
    /^\|\s*\d{4}-\d{2}-\d{2}\s*\|/.test(line) ||
    line.startsWith('- task:') ||
    line.startsWith('- 国民年金法') ||
    line.startsWith('task:') ||
    line.startsWith('standard_line:') ||
    line.startsWith('must_line:') ||
    line.startsWith('stretch_line:')
  );
}

function lineMentionsKnownL3(line) {
  return isOperationLine(line) && line.includes('L3') && line.includes('国民年金法') && line.includes('択一');
}

function uniqueErrors(errors) {
  return [...new Set(errors)];
}

function validateKnownQuestionReference(subject, chapter, question, line, errors) {
  const chapterIndex = DELTA_L3_QUESTION_INDEX[subject]?.multiple_choice?.[chapter];
  if (!chapterIndex) {
    errors.push(`L3_question_chapter_not_in_index:${subject}:Q${chapter}-${question}`);
    return;
  }
  if (question === 0) {
    if (!chapterIndex.no_exercise) errors.push(`L3_Q0_only_allowed_for_no_exercise_chapter:${subject}:Q${chapter}-0`);
    return;
  }
  if (chapterIndex.no_exercise) {
    errors.push(`L3_question_in_no_exercise_chapter:${subject}:Q${chapter}-${question}`);
    return;
  }
  if (question < chapterIndex.start || question > chapterIndex.end) {
    errors.push(`L3_question_not_in_index:${subject}:Q${chapter}-${question}:allowed:${chapterIndex.range}`);
  }
}

function validateQuestionRangesInLine(subject, line, errors) {
  const rangeMatches = [...line.matchAll(QUESTION_RANGE_PATTERN)];
  const noExerciseMatches = [...line.matchAll(NO_EXERCISE_PATTERN)];
  const anyQMatches = [...line.matchAll(ANY_Q_PATTERN)];

  if (rangeMatches.length === 0 && noExerciseMatches.length === 0) {
    errors.push(`L3_question_range_required:${subject}:${line.slice(0, 120)}`);
    return;
  }

  for (const match of rangeMatches) {
    const chapter = Number(match[1]);
    const start = Number(match[2]);
    const end = Number(match[3]);
    const statedCount = Number(match[4]);
    const computedCount = end - start + 1;
    const chapterIndex = DELTA_L3_QUESTION_INDEX[subject]?.multiple_choice?.[chapter];

    if (start > end) errors.push(`L3_question_range_reversed:${subject}:Q${chapter}-${start}〜Q${chapter}-${end}`);
    if (computedCount !== statedCount) {
      errors.push(`L3_question_count_mismatch:${subject}:Q${chapter}-${start}〜Q${chapter}-${end}:stated:${statedCount}:actual:${computedCount}`);
    }
    if (!chapterIndex) {
      errors.push(`L3_question_chapter_not_in_index:${subject}:Q${chapter}-${start}〜Q${chapter}-${end}`);
      continue;
    }
    if (chapterIndex.no_exercise) {
      errors.push(`L3_question_range_in_no_exercise_chapter:${subject}:Q${chapter}-${start}〜Q${chapter}-${end}`);
      continue;
    }
    if (start < chapterIndex.start || end > chapterIndex.end) {
      errors.push(`L3_question_range_not_in_index:${subject}:Q${chapter}-${start}〜Q${chapter}-${end}:allowed:${chapterIndex.range}`);
    }
  }

  for (const match of noExerciseMatches) {
    const chapter = Number(match[1]);
    validateKnownQuestionReference(subject, chapter, 0, line, errors);
  }

  for (const match of anyQMatches) {
    const chapter = Number(match[1]);
    const question = Number(match[2]);
    validateKnownQuestionReference(subject, chapter, question, line, errors);
  }
}

export function validateL3QuestionIndex(content, errors) {
  const localErrors = [];
  const lines = String(content || '').split('\n').map((line) => line.trim()).filter(Boolean);

  for (const line of lines) {
    if (!lineMentionsKnownL3(line)) continue;

    for (const term of FORBIDDEN_L3_AMBIGUOUS_TERMS) {
      if (line.includes(term)) localErrors.push(`L3_ambiguous_question_target_forbidden:${term}`);
    }

    validateQuestionRangesInLine('国民年金法', line, localErrors);
  }

  errors.push(...uniqueErrors(localErrors));
}
