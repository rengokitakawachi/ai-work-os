export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.TODOIST_API_TOKEN;

  try {
    // ここが最新の "rest/v2" になっている必要があります
    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content: req.body.title,
        due_string: req.body.due_string || 'today'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Todoistエラー: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
