export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ★ここを絶対に書き換えないでください★
  const TODOIST_URL = "https://api.todoist.com/rest/v2/tasks";
  const token = (process.env.TODOIST_API_TOKEN || "").trim();

  console.log("--- AI Work OS 最終章 (v8) ---");
  console.log("送信先:", TODOIST_URL);

  try {
    const response = await fetch(TODOIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body.title || "テストタスク",
        due_string: req.body.due_string || "today"
      })
    });

    const data = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({ error: "接続失敗", detail: data });
    }

    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
