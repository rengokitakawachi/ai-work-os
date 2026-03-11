export default async function handler(req, res) {
  // セキュリティ（CORS）設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Todoist 統合 API エンドポイント
  const TODOIST_URL = "https://api.todoist.com/api/v1/tasks";
  const token = (process.env.TODOIST_API_TOKEN || "").trim();

  // 必須チェック
  if (!token) {
    return res.status(500).json({ error: "設定エラー: APIトークンが未設定です" });
  }

  try {
    const response = await fetch(TODOIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body?.title || "新しいタスク",
        due_string: "today"
      })
    });

    const data = await response.text();

    if (!response.ok) {
      console.error("Todoist API Error:", data); // エラー時のみログを残す
      return res.status(response.status).json({ error: "登録に失敗しました", detail: data });
    }

    return res.status(200).json(JSON.parse(data));

  } catch (error) {
    console.error("System Error:", error.message);
    return res.status(500).json({ error: "通信エラーが発生しました" });
  }
}
