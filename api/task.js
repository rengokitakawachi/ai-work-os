export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : (req.body || {})

    const { title, due_string } = body

    if (!title) {
      return res.status(400).json({
        error: 'title is required',
        receivedBody: body
      })
    }

    const todoistResponse = await fetch('https://api.todoist.com/rest/v2/tasks', {
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

    const responseText = await todoistResponse.text()

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { raw: responseText }
    }

    if (!todoistResponse.ok) {
      return res.status(todoistResponse.status).json({
        error: 'Todoist API error',
        status: todoistResponse.status,
        details: responseData
      })
    }

    return res.status(200).json({
      success: true,
      task: responseData
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Task creation failed',
      message: error.message
    })
  }
}
