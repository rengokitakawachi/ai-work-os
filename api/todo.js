export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // ★まずは ChatGPT推奨の「最新URL」をセットします
  const TODOIST_URL = "https://api.todoist.com/api/v1/tasks";
  const token = process.env.TODOIST_API_TOKEN;

  // --- Claude推奨の【真実のログ】 ---
  console.log("=== [FINAL DIAGNOSIS - v11] ===");
  console.log("送信先URL:", TODOIST_URL);
  console.log("鍵の有無:", !!token);
  console.log("受信データ(body):", JSON.stringify(req.body));

  try {
    const response = await fetch(TODOIST_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token?.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body?.title || "診断テスト",
        due_string: "today"
      })
    });

    const data = await response.text();
    console.log("Todoistからの生の回答:", data);
    res.status(response.status).send(data);
  } catch (error) {
    console.error("エラー:", error.message);
    res.status(500).send(error.message);
  }
}
