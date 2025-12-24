# Playwright-Intro

---

## Requirement
1. nodeJS
````ps1
# checkUp
npm -v
node -v
````

---

## init
````ps1
npm init playwright@latest
````
<img src="https://i.imgur.com/g7kp6rT.png">

---

## Install
### codebase
````ps1
# playwright browsers
npx playwright install

# add node_modules folder
npm i @playwright/test

# edge
npx playwright install msedge

# process env var
npm i @types/node

# GUI for headed
sudo apt-get update && sudo apt-get install -y xvfb
````

---

## test
### codeBase
````ps1
# optional : --headed
npx playwright test test /tests/login.spec.ts --headed

user="standard_user" MDP="secret_sauce" xvfb-run -a npx playwright test --headed

# report
npx playwright show-report
````
