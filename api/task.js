export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.TODOIST_API_TOKEN;

  // ログを出力（あとで Vercel でこれが出ているか確認します）
  console.log("--- AI Work OS 稼働中 (v2) ---");

  try {
    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        content: req.body.title,
        due_string: req.body.due_string || 'today'
      })
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error('Todoist応答エラー: ' + response.status + ' ' + responseText);
    }

    return res.status(200).json(JSON.parse(responseText));
  } catch (error) {
    console.error("エラー詳細:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
