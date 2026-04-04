https://www.todoist.com/ja/help/articles/use-chatgpt-with-todoist-WEeLx9d8h

Want to manage Todoist without switching tabs 47 times? Connecting Todoist’s MCP (Model Context Protocol) server to ChatGPT lets you read, create, and update tasks and projects from a chat. 

This is especially helpful for weekly reviews, planning a project, or turning a brain-dump into a clean set of next actions. 

##  Check the requirements

  * You’ll need access to **ChatGPT Developer Mode (beta)**. Depending on your plan (and if you’re using a team workspace), this may be controlled by your admin.
  * You’ll be signing in with **OAuth**, which means you’re authorizing ChatGPT to access Todoist through the official Todoist MCP server.  


##  Step 1: Enable beta developer features in ChatGPT

  1. Open **ChatGPT Settings**.
  2. Go to **Apps**.
  3. Open **Advanced Settings**.
  4. Turn on **Developer mode (beta)**.

注

Developer mode is powerful (it enables "write" actions through connected tools), so only enable it if you’re comfortable reviewing and approving actions that can change your data. 

##  Step 2: Add the Todoist MCP server

  1. In ChatGPT, go to **Settings → Apps.**
  2. Choose the option to **add a custom app / custom connector** (wording varies slightly by plan and UI).
  3. For the server URL, use: <https://ai.todoist.net/mcp>
  4. Continue to authentication.

ヒント

The Todoist MCP server is hosted using Streamable HTTP, so you don’t need to run anything locally. For full technical details, see the [Todoist MCP documentation](https://developer.todoist.com/api/v1/#tag/Todoist-MCP). 

##  Step 3: Sign in to Todoist and approve access

ChatGPT will open a Todoist authorization screen. Log in and approve the requested permissions. 

You’ll see exactly what Todoist access is being requested during OAuth. Take a quick look before approving. 

##  What ChatGPT will have access to

Once connected, ChatGPT can use the Todoist MCP server to: 

  1. **Read** your Todoist tasks and projects.
  2. **Create** tasks and projects.
  3. **Update** tasks and projects (for example: rename, reschedule, move to a project).

警告

Because this connection supports "write" actions, ChatGPT can make changes to your Todoist data when you ask it to (or when it’s following your instructions). Developer mode is intended for people who understand the risks and want that extra power. 

##  Examples of what you can do

Here are a few prompts that work well once you’re connected: 

CategoryExample prompts

Inbox triage

Look at my Todoist Inbox and suggest five quick wins I can finish today. 

Turn these messy tasks into clearer next actions, and ask me questions only where you truly need more context. 

Weekly review support

List my overdue tasks by project and suggest what to reschedule vs. drop. 

Show me everything due in the next 7 days and help me choose a realistic plan. 

Project planning

Create a project called 'Website refresh' with sections for 'Content', 'Design', and 'Launch', then add a first-pass task list. 

Move anything tagged 'waiting' into a 'Waiting for' section and add a follow-up task for next Tuesday." 

Natural-language task capture

"Add a task: 'Call the dentist next week' and put it in my Personal project." 

"Create a task for 'Submit expenses' every last Friday." 

Anything you can describe clearly, ChatGPT can usually translate into structured Todoist changes – just skim before confirming. 

##  Privacy and data handling

When you connect an app in ChatGPT, the data shared is handled according to the app’s terms and privacy policies, which you’ll see before enabling the app. 

If you want extra peace of mind, consider using ChatGPT’s data controls. For example, opting out of having chats used to improve models, and being thoughtful about what you paste into any AI chat. 

##  Disconnecting Todoist MCP

You can disconnect in two places: 

  1. **In ChatGPT:** open **Settings → Connectors** and remove or disable the Todoist connector/app.
  2. **In Todoist:** revoke access from Todoist’s **Integrations** settings (where you manage developer/integration access).

##  Troubleshooting

###  You don’t see Developer mode (beta)

It may not be available on your plan yet, or it may be disabled by your workspace admin. 

###  OAuth window doesn’t open or keeps failing

Try disabling strict pop-up blockers for the sign-in flow and retry. 

###  Connected, but actions aren’t available

Make sure **Developer mode is enabled** and that the connector is switched on for the current chat. 

##  Get in touch

If you have questions about connecting Todoist MCP to ChatGPT or want to learn more, [get in touch with us](https://www.todoist.com/contact/login?returnTo=%2Fcontact). We –  ![](https://images.ctfassets.net/5zyjowl7hbbz/48UVRmj9Kk4K5vKcyDOpIO/57b7e49f6b4b2246d912efd519b49ac0/marija_profile.png) ![](https://images.ctfassets.net/5zyjowl7hbbz/1o0d3cGZtT4vHXWmvHO8GB/58595cca67c37bfba4998cee59a2ab5b/rikke.jpeg) ![](https://images.ctfassets.net/5zyjowl7hbbz/1Dw1XTRW20pkg2eS1zhrKK/a39c9ed0a62521040a3b027fae0372c5/Keita.png) Marija, Rikke, Keita, and any of our other teammates – are more than happy to help! 
