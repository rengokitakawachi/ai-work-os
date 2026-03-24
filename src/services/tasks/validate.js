// src/services/tasks/validate.js

import { createError } from './error.js';

function ensureString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function ensureOptionalString(value) {
  return value === undefined || value === null ? '' : ensureString(value);
}

function ensureOptionalArray(value) {
  return Array.isArray(value) ? value : [];
}

function ensureOptionalInteger(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const num = Number(value);

  return Number.isInteger(num) ? num : null;
}

function isAssigneeFormat(value) {
  return /^@[a-z0-9][a-z0-9-_]*$/i.test(value);
}

function assertNonEmptyString(value, field, context) {
  if (!ensureString(value)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: `${field} required`,
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field,
      },
    });
  }
}

function assertStringArray(value, field, context) {
  if (!Array.isArray(value)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: `${field} must be array`,
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field,
      },
    });
  }

  const invalid = value.find((item) => ensureString(item).length === 0);

  if (invalid !== undefined) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: `${field} must contain non-empty strings`,
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field,
      },
    });
  }
}

function assertPriority(value, context) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  const priority = Number(value);

  if (!Number.isInteger(priority) || priority < 1 || priority > 4) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'priority must be integer between 1 and 4',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'priority',
      },
    });
  }
}

function assertDuration(value, context) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  const duration = Number(value);

  if (!Number.isInteger(duration) || duration <= 0) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'duration_minutes must be positive integer',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'duration_minutes',
      },
    });
  }
}

function assertAssignee(value, context) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  const assignee = ensureString(value);

  if (!isAssigneeFormat(assignee)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'assignee format invalid',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'assignee',
        expected: '@name',
      },
    });
  }
}

function assertStatus(value, context) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  const status = ensureString(value);

  if (!['open', 'closed'].includes(status)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'status must be open or closed',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'status',
      },
    });
  }
}

function assertListStatus(value, context) {
  if (value === undefined || value === null || value === '') {
    return;
  }

  const status = ensureString(value);

  if (status !== 'open') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'status must be open',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'status',
        supported: ['open'],
      },
    });
  }
}

export function validateCreate(body, context) {
  assertNonEmptyString(body?.title, 'title', context);

  if (body?.description !== undefined && typeof body.description !== 'string') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'description must be string',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'description',
      },
    });
  }

  if (body?.due_string !== undefined && typeof body.due_string !== 'string') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'due_string must be string',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'due_string',
      },
    });
  }

  if (body?.labels !== undefined) {
    assertStringArray(body.labels, 'labels', context);
  }

  if (body?.subtasks !== undefined) {
    assertStringArray(body.subtasks, 'subtasks', context);
  }

  assertPriority(body?.priority, context);
  assertDuration(body?.duration_minutes, context);
  assertAssignee(body?.assignee, context);
}

export function validateList(query, context) {
  const limit = ensureOptionalInteger(query?.limit);

  if (query?.limit !== undefined && limit === null) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'limit must be integer',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'limit',
      },
    });
  }

  if (limit !== null && (limit <= 0 || limit > 200)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'limit must be between 1 and 200',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'limit',
      },
    });
  }

  assertAssignee(query?.assignee, context);
  assertListStatus(query?.status, context);

  const stringFields = [
    'project_id',
    'section_id',
    'parent_id',
    'label',
    'cursor',
  ];

  for (const field of stringFields) {
    const value = query?.[field];
    if (value !== undefined && value !== null && typeof value !== 'string') {
      throw createError({
        status: 400,
        code: 'INVALID_REQUEST',
        message: `${field} must be string`,
        category: 'validation',
        step: context.step,
        resource: context.resource,
        action: context.action,
        retryable: false,
        details: {
          field,
        },
      });
    }
  }
}

export function validateUpdate(params, body, context) {
  assertNonEmptyString(params?.id, 'id', context);

  const hasUpdatableField = [
    body?.title,
    body?.description,
    body?.due_date,
    body?.labels,
    body?.assignee,
    body?.priority,
    body?.status,
  ].some((value) => value !== undefined);

  if (!hasUpdatableField) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'at least one updatable field required',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {},
    });
  }

  if (body?.title !== undefined && !ensureString(body.title)) {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'title must be non-empty string',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'title',
      },
    });
  }

  if (body?.description !== undefined && typeof body.description !== 'string') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'description must be string',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'description',
      },
    });
  }

  if (body?.due_date !== undefined && typeof body.due_date !== 'string') {
    throw createError({
      status: 400,
      code: 'INVALID_REQUEST',
      message: 'due_date must be string',
      category: 'validation',
      step: context.step,
      resource: context.resource,
      action: context.action,
      retryable: false,
      details: {
        field: 'due_date',
      },
    });
  }

  if (body?.labels !== undefined) {
    assertStringArray(body.labels, 'labels', context);
  }

  assertPriority(body?.priority, context);
  assertAssignee(body?.assignee, context);
  assertStatus(body?.status, context);
}

export function normalizeCreateInput(body) {
  return {
    title: ensureString(body?.title),
    description: ensureOptionalString(body?.description),
    due_string: ensureOptionalString(body?.due_string),
    labels: ensureOptionalArray(body?.labels).map((item) => ensureString(item)),
    assignee: ensureOptionalString(body?.assignee),
    priority: ensureOptionalInteger(body?.priority),
    duration_minutes: ensureOptionalInteger(body?.duration_minutes),
    subtasks: ensureOptionalArray(body?.subtasks).map((item) => ensureString(item)),
  };
}

export function normalizeListInput(query) {
  const limit = ensureOptionalInteger(query?.limit);

  return {
    project_id: ensureOptionalString(query?.project_id),
    section_id: ensureOptionalString(query?.section_id),
    parent_id: ensureOptionalString(query?.parent_id),
    label: ensureOptionalString(query?.label),
    assignee: ensureOptionalString(query?.assignee),
    status: ensureOptionalString(query?.status),
    cursor: ensureOptionalString(query?.cursor),
    limit,
  };
}

export function normalizeUpdateInput(params, body) {
  return {
    id: ensureString(params?.id),
    title: body?.title === undefined ? undefined : ensureString(body.title),
    description: body?.description === undefined ? undefined : body.description,
    due_date: body?.due_date === undefined ? undefined : ensureString(body.due_date),
    labels:
      body?.labels === undefined
        ? undefined
        : body.labels.map((item) => ensureString(item)),
    assignee: body?.assignee === undefined ? undefined : ensureString(body.assignee),
    priority:
      body?.priority === undefined ? undefined : ensureOptionalInteger(body.priority),
    status: body?.status === undefined ? undefined : ensureString(body.status),
  };
}
