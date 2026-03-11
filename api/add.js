export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  console.log("--- AI Work OS 稼働中 (v5-GOLDEN) ---");

  try {
    let token = process.env.TODOIST_API_TOKEN || "";
    // 万が一「Bearer 」という文字が既に入っていたら自動で消す（掃除機能）
    token = token.replace(/^Bearer\s+/i, "").trim();
    
    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body.title || "無題のタスク",
        due_string: req.body.due_string || "today"
      })
    });

    const data = await response.text();
    console.log("Todoistからの生の回答:", data);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Todoist接続エラー", detail: data });
    }

    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("エラー発生:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
