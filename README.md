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
# generated .auth.json
user="standard_user" MDP="secret_sauce" xvfb-run -a npx playwright test setup/login.setup.ts --headed --project=setup-chrome

# run only test in tests folder
xvfb-run -a npx playwright test /tests/ --headed

# report
npx playwright show-report
````
