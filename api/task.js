export default async function handler(req, res) {
if (req.method !== 'POST') {
return res.status(405).json({ message: 'Method not allowed' });
}

const { title, due_string } = req.body;
const token = process.env.TODOIST_API_TOKEN;

const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': Bearer ${token},
},
body: JSON.stringify({
content: title,
due_string: due_string || 'today',
}),
});
