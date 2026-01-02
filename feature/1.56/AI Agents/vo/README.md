# AI Agents

## Playwright Test Agents (officiel)
1. Planner
2. Generator
3. Healer

## Install
````ps1
npm i -D @playwright/test@latest
````

````ps1
# --loop=vscode switch vscode by claude or opencode belong your editor AI
npx playwright init-agents --loop=vscode
````

## your scenario (ex. login)
````prompt
Login with username Kurt & password torchLight$04,
click Login,
verify homepage
````

## run with the healer
````ps1
npx playwright test --agent=healer
````
