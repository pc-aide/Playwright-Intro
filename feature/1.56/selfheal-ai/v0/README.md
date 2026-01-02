# selfheal-ai
* not the offical of playwright
* auto‑heal locators

## install
````ps1
npm install playwright-selfheal-ai
````

## in your code
````ts
const { SelfHealAI } = require("playwright-selfheal-ai");
const selfHeal = new SelfHealAI(page);

await selfHeal.click("button[data-testid=login]");
````

## how it work
````ts
await page.fill("#username", "user");
await page.fill("#password", "pwd");
await page.click("#login");
await expect(page).toHaveURL("/home");
````

* self‑healing, if the UI change in :
````ts
<input data-testid="user-input" …
<button role="button" aria-label="Sign In"> …
````

* So instead of failing :
- ✅ The agent/tool will detect that `#username` no longer exists
- ✅ It searches for a nearby element (e.g., `getByLabel("User")` or `aria-label`)
- ✅ It updates the test or automatically reruns it
- ✅ Login scenario → success continues without failing (if plausible)

🧰 Recommendations

👉 Official Playwright Agents — best for natural integration, generation + healing.  
👉 Self-heal NPM libraries — simpler if you just want selector stability.  
👉 Playwright best practices — use `getByRole`, `data-testid`, etc. → greatly helps with auto-healing.
