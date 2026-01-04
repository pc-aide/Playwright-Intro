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
# add node_modules folder
npm i @playwright/test

# playwright browsers
npx playwright install

# edge
npx playwright install msedge

# process env var
npm i @types/node

# GUI for headed
sudo apt-get update && sudo apt-get install -y xvfb
````

---

## test
### Windows
````ps1
# --project=setup-chrome or --project=setup-edge
# generated auth.json
$env:user = "standard_user"; $env:MDP = "secret_sauce"; `
 npx playwright test setup/login.setup.ts --headed --project=setup-chrome

# test in tests folder
# --project=chrome or --project=edge
npx playwright test tests/add-to-cart.spec.ts --headed --project=chrome

# all-in-one
 $env:user = "standard_user"; $env:MDP = "secret_sauce"; `
 npx playwright test setup/login.setup.ts --headed --project=setup-chrome ; `
 npx playwright test tests/add-to-cart.spec.ts --headed --project=chrome
````
### codeBase
````ps1
# optional : --headed
# generated .auth.json
user="standard_user" MDP="secret_sauce" xvfb-run -a npx playwright test setup/login.setup.ts --headed --project=setup-chrome

# run only test in tests folder
xvfb-run -a npx playwright test /tests/ --headed --project=chrome

# report
npx playwright show-report
````
