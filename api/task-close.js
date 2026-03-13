export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    return res.status(500).json({ error: '設定エラー: APIトークンが未設定です' });
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
      return res.status(400).json({ error: 'task_id は必須です' });
    }

    const response = await fetch(`https://api.todoist.com/api/v1/tasks/${encodeURIComponent(taskId)}/close`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Todoist API Error:', text);
      return res.status(response.status).json({
        error: '完了に失敗しました',
        detail: text
      });
    }

    return res.status(200).json({
      ok: true,
      task_id: taskId,
      status: 'closed'
    });
  } catch (error) {
    console.error('System Error:', error.message);
    return res.status(500).json({
      error: '通信エラーが発生しました',
      detail: error.message
    });
  }
}
