export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TODOIST_URL = 'https://api.todoist.com/api/v1/tasks';
  const token = (process.env.TODOIST_API_TOKEN || '').trim();

  if (!token) {
    return res.status(500).json({ error: '設定エラー: APIトークンが未設定です' });
  }

  try {
    const url = new URL(req.url, `https://${req.headers.host}`);

    const allowedParams = [
      'project_id',
      'section_id',
      'label_id',
      'filter',
      'lang',
      'ids',
      'cursor',
      'limit'
    ];

    const query = new URLSearchParams();

    for (const key of allowedParams) {
      const value = url.searchParams.get(key);
      if (value !== null && value !== '') {
        query.append(key, value);
      }
    }

    const requestUrl = query.toString()
      ? `${TODOIST_URL}?${query.toString()}`
      : TODOIST_URL;

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Todoist API Error:', text);
      return res.status(response.status).json({
        error: '取得に失敗しました',
        detail: text
      });
    }

    const data = text ? JSON.parse(text) : {};

    const tasks = Array.isArray(data)
      ? data
      : Array.isArray(data.results)
        ? data.results
        : [];

    const next_cursor =
      data && typeof data === 'object' && 'next_cursor' in data
        ? data.next_cursor
        : null;

    return res.status(200).json({
      ok: true,
      count: tasks.length,
      next_cursor,
      tasks
    });

  } catch (error) {
    console.error('System Error:', error.message);
    return res.status(500).json({
      error: '通信エラーが発生しました',
      detail: error.message
    });
  }
}
