import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildProjectionPayload,
  decideProjectionAction,
  applyTodoistTaskId,
} from './projection.js';

function buildTask({
  task = 'sample task',
  rollingDay = 'Day0',
  dueDate,
  dueType,
  whyNow = ['reason 1'],
  notes = ['note 1', 'note 2', 'note 3'],
  sourceRef = ['notes/04_operations/active_operations.md', 'src/example.js', 'ignored-third'],
  todoistTaskId = '',
  status,
  completed,
} = {}) {
  return {
    task,
    rolling_day: rollingDay,
    ...(dueDate ? { due_date: dueDate } : {}),
    ...(dueType ? { due_type: dueType } : {}),
    why_now: whyNow,
    notes,
    source_ref: sourceRef,
    ...(status ? { status } : {}),
    ...(completed !== undefined ? { completed } : {}),
    ...(todoistTaskId
      ? {
          external: {
            todoist_task_id: todoistTaskId,
          },
        }
      : {}),
  };
}

test('buildProjectionPayload builds description and uses due_string for standard due date', () => {
  const payload = buildProjectionPayload(
    buildTask({
      task: 'implement tests',
      dueDate: '2026-04-20',
    })
  );

  assert.equal(payload.content, 'implement tests');
  assert.equal(payload.due_string, '2026-04-20');
  assert.equal(payload.deadline_date, undefined);
  assert.match(payload.description, /why_now: reason 1/);
  assert.match(payload.description, /notes: note 1 \/ note 2/);
  assert.match(payload.description, /source_ref: notes\/04_operations\/active_operations.md, src\/example.js/);
  assert.match(payload.description, /ref: notes\/04_operations\/active_operations.md/);
});

test('buildProjectionPayload uses deadline_date when due_type is deadline', () => {
  const payload = buildProjectionPayload(
    buildTask({
      dueDate: '2026-04-21',
      dueType: 'deadline',
    })
  );

  assert.equal(payload.deadline_date, '2026-04-21');
  assert.equal(payload.due_string, undefined);
});

test('buildProjectionPayload falls back to rolling day date when due_date is absent', () => {
  const payload = buildProjectionPayload(buildTask({ dueDate: undefined }), {
    rollingDayDate: '2026-04-22',
  });

  assert.equal(payload.due_string, '2026-04-22');
});

test('decideProjectionAction returns create for newly added task without todoist id', () => {
  const result = decideProjectionAction({
    previousTask: null,
    currentTask: buildTask(),
    currentTodoistTask: null,
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'create');
});

test('decideProjectionAction returns update for newly added task with matched todoist task', () => {
  const result = decideProjectionAction({
    previousTask: null,
    currentTask: buildTask(),
    currentTodoistTask: { id: 'todoist-1', content: 'sample task' },
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'update');
});

test('decideProjectionAction returns close when completed task leaves active', () => {
  const result = decideProjectionAction({
    previousTask: buildTask({ todoistTaskId: 'todoist-1', completed: true }),
    currentTask: null,
    currentTodoistTask: null,
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'close');
});

test('decideProjectionAction returns delete when incomplete task leaves active', () => {
  const result = decideProjectionAction({
    previousTask: buildTask({ todoistTaskId: 'todoist-1' }),
    currentTask: null,
    currentTodoistTask: null,
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'delete');
});

test('decideProjectionAction returns update when task content changes', () => {
  const result = decideProjectionAction({
    previousTask: buildTask({ todoistTaskId: 'todoist-1', task: 'old title' }),
    currentTask: buildTask({ todoistTaskId: 'todoist-1', task: 'new title' }),
    currentTodoistTask: { id: 'todoist-1', content: 'old title' },
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'update');
});

test('decideProjectionAction returns noop when payload has no effective difference', () => {
  const currentTask = buildTask({ todoistTaskId: 'todoist-1', dueDate: '2026-04-20' });
  const payload = buildProjectionPayload(currentTask);

  const result = decideProjectionAction({
    previousTask: buildTask({ todoistTaskId: 'todoist-1', dueDate: '2026-04-20' }),
    currentTask,
    currentTodoistTask: {
      id: 'todoist-1',
      content: payload.content,
      description: payload.description,
      due: { date: payload.due_string },
      deadline: { date: '' },
    },
    rollingDayDate: '2026-04-20',
  });

  assert.equal(result.action, 'noop');
});

test('applyTodoistTaskId stores todoist_task_id under external', () => {
  const result = applyTodoistTaskId({
    task: buildTask(),
    todoistTaskId: 'todoist-99',
  });

  assert.equal(result.external.todoist_task_id, 'todoist-99');
  assert.equal(result.task, 'sample task');
});
