export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {

    const { title, due_string } = req.body

    const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TODOIST_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: title,
        due_string: due_string || 'today'
      })
    })

    const data = await response.json()

    res.status(200).json(data)

  } catch (error) {

    res.status(500).json({
      error: 'Task creation failed',
      detail: error.message
    })

  }
}
