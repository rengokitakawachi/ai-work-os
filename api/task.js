export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.TODOIST_API_TOKEN;

  // ログに (v3) と表示されるか確認します
  console.log("--- AI Work OS 稼働中 (v3-FINAL) ---");

  try {
    // 確実に REST API v2 を指定します
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
      // 失敗した場合の詳細をログに出すようにしました
      console.error("Todoistからのエラー回答:", responseText);
      throw new Error('Todoist応答エラー: ' + response.status);
    }

    return res.status(200).json(JSON.parse(responseText));
  } catch (error) {
    console.error("エラーが発生しました:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
