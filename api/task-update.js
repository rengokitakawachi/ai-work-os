export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    return res.status(500).json({
      error: '設定エラー: TODOIST_API_TOKEN が未設定です'
    });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : (req.body || {});

    const taskId =
      typeof body.task_id === 'string' || typeof body.task_id === 'number'
        ? String(body.task_id).trim()
        : '';

    if (!taskId) {
      return res.status(400).json({
        error: 'task_id は必須です'
      });
    }

    const updatePayload = {};

    if (typeof body.content === 'string' && body.content.trim()) {
      updatePayload.content = body.content.trim();
    }

    if (typeof body.description === 'string') {
      updatePayload.description = body.description;
    }

    if (Array.isArray(body.labels)) {
      updatePayload.labels = body.labels;
    }

    if (
      body.priority !== undefined &&
      Number.isInteger(Number(body.priority)) &&
      Number(body.priority) >= 1 &&
      Number(body.priority) <= 4
    ) {
      updatePayload.priority = Number(body.priority);
    }

    if (typeof body.due_string === 'string' && body.due_string.trim()) {
      updatePayload.due_string = body.due_string.trim();
    }

    if (typeof body.due_date === 'string' && body.due_date.trim()) {
      updatePayload.due_date = body.due_date.trim();
    }

    if (typeof body.due_datetime === 'string' && body.due_datetime.trim()) {
      updatePayload.due_datetime = body.due_datetime.trim();
    }

    if (typeof body.due_lang === 'string' && body.due_lang.trim()) {
      updatePayload.due_lang = body.due_lang.trim();
    } else if (updatePayload.due_string) {
      updatePayload.due_lang = 'ja';
    }

    if (typeof body.deadline_date === 'string' && body.deadline_date.trim()) {
      updatePayload.deadline_date = body.deadline_date.trim();
    }

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({
        error: '更新項目がありません'
      });
    }

    // エンドポイントを v1 から v2 へ修正
    const response = await fetch(
      `https://api.todoist.com/rest/v2/tasks/${encodeURIComponent(taskId)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      }
    );

    const text = await response.text();

    if (!response.ok) {
      console.error('Todoist API Error:', text);
      return res.status(response.status).json({
        error: '更新に失敗しました',
        detail: text
      });
    }

    return res.status(200).json({
      ok: true,
      task_id: taskId,
      updated: updatePayload,
      detail: text || null
    });
  } catch (error) {
    console.error('System Error:', error.message);
    return res.status(500).json({
      error: '通信エラーが発生しました',
      detail: error.message
    });
  }
}
