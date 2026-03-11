export default async function handler(req, res) {
  // 1. セキュリティ設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // 2. ログ出力（ここが v4 になっているか確認します）
  console.log("--- AI Work OS 稼働中 (v4-ULTIMATE) ---");

  try {
    const token = process.env.TODOIST_API_TOKEN;
    
    // 3. 通信先を「絶対」に最新版(v2)に固定するための書き方
    const todoistUrl = "https://api.todoist.com/rest/v2/tasks";
    console.log("送信先URL:", todoistUrl);

    const response = await fetch(todoistUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token.trim(), // 前後の余計な空白を消去
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: req.body.title || "無題のタスク",
        due_string: req.body.due_string || "today"
      })
    });

    const data = await response.text();
    console.log("Todoistからの生の返答:", data);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Todoistエラー", detail: data });
    }

    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error("重大なエラー:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
