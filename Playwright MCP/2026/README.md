# Playwright MCP

* A **Model Context Protocol** server that provides browser automation capabilities using Playwright. Enables LLMs to interact with web pages through structured accessibility snapshots — no vision models required.

## Example

````txt
You: Navigate to https://demo.playwright.dev/todomvc and add "Buy groceries".

→ browser_navigate { url: "https://demo.playwright.dev/todomvc" }
→ browser_snapshot

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]

→ browser_type { ref: "e5", text: "Buy groceries", submit: true }
→ browser_snapshot

  - heading "todos" [level=1]
  - textbox "What needs to be done?" [ref=e5]
  - listitem:
    - checkbox "Toggle Todo" [ref=e10]
    - text: "Buy groceries"
  - contentinfo:
    - text: "1 item left"
````
