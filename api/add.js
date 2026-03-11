export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // --- 診断ログ ---
  const rawToken = process.env.TODOIST_API_TOKEN || "";
  const token = rawToken.replace(/^Bearer\s+/i, "").trim();
  
  console.log("--- AI Work OS 稼働中 (v7-DIAGNOSTIC) ---");
  console.log("鍵の状況: ", token ? `届いています（長さ:${token.length}文字）` : "❌ 届いていません！空っぽです");
  if (token) {
    console.log("鍵の断片: ", token.substring(0, 3) + "..." + token.substring(token.length - 3));
  }

  try {
    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body.title || "無題のタスク",
        due_string: req.body.due_string || "today"
      })
    });

    const data = await response.text();

    if (!response.ok) {
      console.error("Todoistエラー詳細:", data);
      return res.status(response.status).json({ error: "接続失敗", detail: data });
    }

    console.log("✅ 登録成功！");
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("エラー:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
