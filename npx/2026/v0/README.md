# npx

## run all tests
````sh
npx playwright test
````
<img src="https://i.imgur.com/BckVmcC.png">

* cfg :
<img src="https://i.imgur.com/Ae2wT5S.png">

* run :
<img src="https://i.imgur.com/aRwPqOK.png">

## tbl
````md
| # | Purpose | Command Syntax | Example |
|---|---------|----------------|---------|
| 3 | Run all tests | `npx playwright test` | `npx playwright test` |
| 4 | Run a specific test file | `npx playwright test <filename>` | `npx playwright test tests/login.spec.ts` |
| 5 | Run a specific test using test name pattern | `npx playwright test -g "name"` | `npx playwright test -g "should login successfully"` |
| 6 | Run specific test using line number | `npx playwright test <filename>:<line>` | `npx playwright test tests/login.spec.ts:15` |
| 7 | Run tests in a specific directory | `npx playwright test <dir>/` | `npx playwright test tests/api/` |
| 8 | Run tests with a specific tag (`@tag`) | `npx playwright test --grep "@tag"` | `npx playwright test --grep "@smoke"` |
| 9 | Run tests except those with a tag | `npx playwright test --grep-invert "@tag"` | `npx playwright test --grep-invert "@wip"` |
| 10 | Run tests in parallel (default) | `npx playwright test` | `npx playwright test` |
| 11 | Run tests sequentially | `npx playwright test --workers=1` | `npx playwright test --workers=1` |
| 12 | Run a specific test by name | `npx playwright test -g "<test name>"` | `npx playwright test -g "Search box should be visible"` |
| 13 | Run using a specific config file | `npx playwright test --config=<file>` | `npx playwright test --config=playwright.dev.config.ts` |
| 14 | Run using a specific project from config | `npx playwright test --project=<project>` | `npx playwright test --project=chromium` |
| 15 | Run tests with a specific reporter | `npx playwright test --reporter=<reporter>` | `npx playwright test --reporter=html` |
| 16 | Run tests in headed mode | `npx playwright test --headed` | `npx playwright test --headed` |
| 17 | Run tests in debug mode | `npx playwright test --debug` | `npx playwright test --debug` |
| 18 | Use environment variables | `ENV_VAR=value npx playwright test` | `BASE_URL=https://dev.site.com npx playwright test` |
````
