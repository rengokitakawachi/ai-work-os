export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TODOIST_URL = 'https://api.todoist.com/api/v1/tasks';
  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    return res.status(500).json({ error: '設定エラー: APIトークンが未設定です' });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : (req.body || {});

    const title = body.title || '新しいタスク';
    const due_string = body.due_string || 'today';

    const response = await fetch(TODOIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: title,
        due_string: due_string
      })
    });

    const data = await response.text();

    if (!response.ok) {
      console.error('Todoist API Error:', data);
      return res.status(response.status).json({
        error: '登録に失敗しました',
        detail: data
      });
    }

    return res.status(200).json(JSON.parse(data));

  } catch (error) {
    console.error('System Error:', error.message);
    return res.status(500).json({
      error: '通信エラーが発生しました',
      detail: error.message
    });
  }
}
