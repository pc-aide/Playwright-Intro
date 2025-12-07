# Playwright Test for vsCode

---

## Install
<img src="https://i.imgur.com/7I3hann.png">

---

## Requirements
1. nodeJS
````ps1
# checkUp
node -v
npm -v
````

2. Playwright
````ps1
# args :
# -g global
# -D in your project
npm i -D playwright
````

3. browsers 
````ps1
npx playwright install
````

### Test
````ps1
# to stop record, just close the browser
# - o --output file name
npx playwright codegen https:rds.ca - test101.spec.ts
````
