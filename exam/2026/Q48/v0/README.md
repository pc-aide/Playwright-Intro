# Q48

## 1
Which Playwright method creates a Locator object without immediately querying the DOM?
<br>
1. page.locator('button')
2. page.querySelector('button')
3. page.findElement('button')
4. page.getElement('button')
<details><summary>Answer</summary>1. page.locator('button')<br/><br/>page.locator() returns a Locator, a lazy reference that re-resolves the element each time an action runs. It does not query the DOM immediately. querySelector is a browser DOM API, and findElement/getElement are not Playwright methods.</details>	

## 2
What is the recommended way to select a button with the visible label 'Sign in' using a user-facing locator?
1. page.getByRole('button',{ name: 'Sign in'})
2. page.locator('button#signin')
3. page.getByButton('Sign in')
4. page.selectButton('Sing in')
<details><summary>Answer</summary>page.getByRole('button', { name: 'Sign in' })<br/><br/>getByRole is the most resilient, accessibility-first locator. Selecting the 'button' role with the accessible name 'Sign in' mirrors how users and assistive tech find the control. getByButton and selectButton do not exist.</details>

## 3
By default, which attribute does page.getByTestId() use to find elements?
1. data-testid
2. data-test
3. id
4. test-id
<details><summary>Answer</summary>data-testid<br/><br/>getByTestId resolves against the data-testid attribute by default. You can change this with the testIdAttribute option in the configuration, but data-testid is the out-of-the-box default.</details>

## 4
Which locator finds an input by its associated <label> text?
1. page.getByLabel('Email')
2. page.getByText('Email')
3. page.getByPlaceholder('Email')
4. page.getByTitle('Email')
<details><summary>Answer</summary>page.getByLabel('Email')<br/><br/>getByLabel locates a form control by its associated label text, which is the user-facing way to target inputs. getByText finds arbitrary text nodes, getByPlaceholder uses the placeholder attribute, and getByTitle uses the title attribute.</details>

## 5
You need to narrow a list of cards to only the one containing the text 'Premium'. Which is correct?
1. page.locator('.card').filter({ hasText: 'Premium'})
2. page.locator('.card').contains('Premium')
3. page.locator('.card').withText('Premium')
4. page.locator('.card').hasText('Premium')
<details><summary>Answer</summary>page.locator('.card').filter({ hasText: 'Premium' })<br/><br/>locator.filter({ hasText: 'Premium' }) returns a new locator scoped to matching elements. contains, withText, and hasText are not chainable Locator methods.</details>

## 6
Given multiple matching elements, how do you target the third one (zero-based)?
1. locator.nth(2)
2. locator.index(3)
3. locator.item(2)
4. locator.get(3)
<details><summary>Answer</summary>locator.nth(2)<br/><br/>ocator.nth(n) selects the element at the zero-based index n, so nth(2) is the third element. There are also .first() and .last() shortcuts. index, item, and get are not Locator methods.</details>

## 7
Which command navigates the page to a URL?
1. page.goto('https://example.com')
2. page.visit('https://example.com')
3. page.navigate('https://example.com')
4. page.open('https://example.com')
<details><summary>Answer</summary>page.goto('https://example.com')<br/><br/>page.goto(url) navigates and returns the main resource response. visit is Cypress syntax; navigate and open are not Playwright Page methods.</details>

## 8
What does page.goto() wait for by default before resolving?
1. The 'load' event
2. the 'networkidle' event
3. nothing; it returns immediately
4. the 'domcontenloaded' event only
<details><summary>Answer</summary>The 'load' event<br/><br/>By default page.goto() waits until the 'load' event fires. You can change this with the waitUntil option (e.g., 'domcontentloaded' or 'networkidle'), but 'load' is the default.</details>

## 9
Which import gives you the test and expect functions in a Playwright Test file?
1. import{ test, expect } from '@playwright/test'
2. import { test, expect } from 'playwright'
3. import { test, expect } from 'playwirhgt-core'
4. import { test, expect } from '@playwright/runner'
<details><summary>Answer</summary>import { test, expect } from '@playwright/test'<br/><br/>The Playwright Test runner exposes test and expect from '@playwright/test'. The 'playwright' and 'playwright-core' packages provide the library API but not the test runner's test/expect.</details>

## 10
Which command clicks a located element?
1. locator.click()
2. locator.press()
3. locator.tapClick()
4. locator.doClick()
<details><summary>Answer</summary>locator.click()<br/><br/>locator.click() performs a click after auto-waiting for actionability. press() sends keyboard keys; tapClick and doClick are not real methods.</details>

## 11
Which method types text into an input, replacing any existing value?
1. locator.fill('hello')
2. locator.setText('hello')
3. locator.write('hello')
4. locator.value('hello')
<details><summary>Answer</summary>locator.fill('hello')<br/><br/>locator.fill() focuses the element, clears it, and sets the value in one step. setText, write, and value are not Locator methods for entering text.</details>

## 12
To assert that an element is visible using a web-first assertion, you write:
1. await expect(locator).toBeVisible()
2. expect(locator.isVisible()).toBe(true)
3. await locator.shouldBeVisible()
4. await expect(locator).visible()
<details><summary>Answer</summary>await expect(locator).toBeVisible()<br/><br/>expect(locator).toBeVisible() is a web-first assertion that auto-retries until the element becomes visible or the timeout elapses. The other forms either don't auto-retry or are not valid Playwright matchers.</details>

## 13
Which assertion checks that an element contains a substring of text?
1. expect(locator).toContainText('Saved')
2. expect(locator).toHaveText('Saved')
3. expect(locator).toMathText('Saved')
4. expect(locator).toIncludeText('Saved')
<details><summary>Answer</summary>expect(locator).toContainText('Saved')<br/><br/>toContainText asserts a substring match, while toHaveText asserts the full (whitespace-normalized) text. toMatchText and toIncludeText are not Playwright matchers.</details>

## 14
Which launcher starts a Chromium browser when using the Playwright library directly?
1. chromium.launch()
2. browser.launchChromium()
3. playwright.startChromium()
4. chrome.open()
<details><summary>Answer</summary>chromium.launch()<br/><br/>With the library API you import { chromium } and call chromium.launch(). firefox and webkit are the other engines. The other options are not valid APIs.</details>

## 15
What is the correct way to create an isolated browsing session?
1. browser.newContext()
2. browser.newSession()
3. browser.incognito()
4. browser.newWindow()
<details><summary>Answer</summary>browser.newContext()<br/><br/>browser.newContext() creates a fresh, isolated context with its own cookies and storage, similar to an incognito profile. newSession, incognito, and newWindow are not Playwright methods.</details>

## 16
Inside a context, how do you open a new page (tab)?
1. context.newPage()
2. context.openTab()
3. context.createPage()
4. context.addPage()
<details><summary>Answer</summary>context.newPage()<br/><br/>context.newPage() opens a new page within the context. createPage, openTab, and addPage are not valid methods.</details>

## 17
Which call reads the current value of a text input?
1. locator.inputValue()
2. locator.getValue()
3. locator.textContent()
4. locator.value()
<details><summary>Answer</summary>locator.inputValue()<br/><br/>inputValue() returns the current value of an ___</details>

## 18
Which is the preferred replacement for a fixed page.waitForTimeout() delay?
1. a web-first assertion like expect(locator).toBeVisible()
2. a longer waitForTimeout
3. setTimeout in the test
4. Thread.sleep equivalent
<details><summary>Answer</summary>A web-first assertion like expect(locator).toBeVisible()<br/><br/>Hard-coded timeouts are flaky. Web-first assertions auto-wait and retry, making tests both faster and more reliable. Increasing the timeout or sleeping does not fix the underlying race condition.</details>

## 19
Which CLI command records a test by capturing your browser interactions?
1. npx playwright codegen
2. npx playwright record
3. npx playwright capture
4. npx playwright generate
<details><summary>Answer</summary>npx playwright codegen<br/><br/>npx playwright codegen opens a browser and generates test code from your interactions. record, capture, and generate are not codegen commands.</details>

## 20
What does the locator.check() method do?
1. Ensures a checkbox or radio button is checked
2. Asserts that a checkbox is checked
3. Toggles a checkbox on or off
4. Verifies an element exists
<details><summary>Answer</summary>Ensures a checkbox or radio button is checked<br/><br/>check() performs the action of checking a checkbox/radio (a no-op if already checked). It is an action, not an assertion. To assert checked state use expect(locator).toBeChecked().</details>

## 21
Which assertion verifies the page's URL?
1. await expect(page).toHaveURL('https://example.com/home')
2. await expect(page).toBeURL('https://example.com/home')
3. await expect(page.url()).toHaveURL(...)
4. await expect(page).urlls(...)
<details><summary>Answer</summary>await expect(page).toHaveURL('https://example.com/home')<br/><br/>expect(page).toHaveURL() is the web-first assertion for the page URL and accepts a string, RegExp, or predicate. toBeURL and urlIs are not matchers.</details>

## 22
Which method selects an option in a <select> dropdown by its value attribute?
1. locator.selectOption('us')
2. locator.choose('us')
3. locator.pickOption('us')
4. locator.setOption('us')
<details><summary>Answer</summary>locator.selectOption('us')<br/><br/>selectOption() selects by value (string), label ({ label }), or index ({ index }). choose, pickOption, and setOption are not methods.</details>

## 23
How do you assert that exactly 5 elements match a locator?
1. await expect(locator).toHaveCount(5)
2. await expect(locator).toHaveLength(5)
3. await expect(locator.count()).toBe(5)
4. await expect(locator).countEquals(5)
<details><summary>Answer</summary>await expect(locator).toHaveCount(5)<br/><br/>toHaveCount(n) is the auto-retrying assertion for the number of matched elements. toHaveLength is a generic Jest-style matcher that won't auto-retry on a locator, and the others are invalid.</details>

## 24
What does page.reload() do?
1. Reloads the current page
2. Navigates back in history
3. Clears the browser cache
4. Restarts the browser
<details><summary>Answer</summary>Reloads the current page<br/><br/>page.reload() reloads the current page and returns the main resource response. Going back is page.goBack(); it does not clear cache or restart the browser.</details>

## 25
Which keyboard method presses a single key or key combination on a focused element?
1. locator.press('Enter')
2. locator.key('Enter')
3. locator.sendKey('Enfer')
4. locator.hitKey('Enter')
<details><summary>Answer</summary>locator.press('Enter')<br/><br/>locator.press() accepts a key name or combination like 'Control+A'. key, sendKey, and hitKey are not Playwright methods.</details>

## 26
Which assertion checks an input's current value?
1. await expect(locator).toHaveValue('john@x.com')
2. await expect(locator).toHaveText('john@x.com')
3. await expect(locator).toContainValue('john@x.com')
4. await expect(locator).toBeValue('john@x.com')
<details><summary>Answer</summary>await expect(locator).toHaveValue('john@x.com')<br/><br/>toHaveValue asserts the value of an input/textarea/select. toHaveText is for visible text content; toContainValue and toBeValue are not matchers.</details>

## 27
What is the default file name for Playwright's configuration?
1. playwright.config.ts (or .js)
2. pw.config.ts
3. playwright.json
4. test.config.ts
<details><summary>Answer</summary>playwright.config.ts (or .js)<br/><br/>Playwright reads playwright.config.ts/js by default. The config defines projects, the use block, reporters, retries, and more. The other names are not the default.</details>

## 28
Which hook runs before each test in a describe block?
1. test.beforeEach()
2. test.setup()
3. test.BeforeAll() only
4. test.init()
<details><summary>Answer</summary>test.beforeEach()<br/><br/>test.beforeEach() runs before every test. test.beforeAll() runs once before all tests in the group. setup and init are not hooks.</details>

## 29
Which method retrieves the value of an element's HTML attribute, such as href?
1. locator.getAttribute('href')
2. locator.attr('href')
3. locator.attribute('href')
4. locator.pop('href')
<details><summary>Answer</summary>locator.getAttribute('href')<br/><br/>getAttribute(name) returns the attribute value (or null). attr, attribute, and prop are not Locator methods.</details>

## 30
How do you run all tests with the Playwright Test runner?
1. npx playwright test
2. npx playwright run
3. npx playwright start
4. npx playwright exec
<details><summary>Answer</summary>npx playwright test<br/><br/>npx playwright test discovers and runs your tests. run, start, and exec are not valid runner commands.</details>

## 31
Which locator targets an element by placeholder text 'Search products'?
1. page.getByPlaceholder('Search products')
2. page.getByText('Search products')
3. page.getByLabel('Search products')
4. page.getByHint('Search products')
<details><summary>Answer</summary>page.getByPlaceholder('Search products')<br/><br/>getByPlaceholder matches the placeholder attribute of an input. getByText/getByLabel target different things, and getByHint does not exist.</details>

## 32
Which assertion verifies the page title?
1. await expect(page).toHaveTitle('Dashboard')
2. await expect(page).toHaveText('Dashboard')
3. await expect(page.title()).toHaveTitle('Dashboard')
4. await expect(page).titles('Dashboard')
<details><summary>Answer</summary>await expect(page).toHaveTitle('Dashboard')<br/><br/>expect(page).toHaveTitle() asserts the document title and accepts a string or RegExp. The others are not valid forms.
</details>

## 33
What does locator.hover() do?
1. moves the mouse over the element
2. Clicks & holds the element
3. Scrolls to the element only
4. Focuses the element via keyboard
<details><summary>Answer</summary>Moves the mouse over the element<br/><br/>hover() moves the mouse over the element after auto-waiting for actionability, useful for revealing tooltips or menus. It does not click, and focusing is done with focus().</details>

## 34
Which option makes the browser visible (non-headless) when launching?
1. { headless: false }
2. { visible: true }
3. { gui: true }
4. { headed: 'on' }
<details><summary>Answer</summary>{ headless: false }<br/><br/>Passing { headless: false } to launch() shows the browser UI. From the test runner you can also use the --headed flag. visible, gui, and headed:'on' are not valid launch options.</details>

## 35
Which method returns the number of elements a locator matches?
1. locator.count()
2. locator.lenght()
3. locator.size()
4. locator.total()
<details><summary>Answer</summary>locator.count()<br/><br/>locator.count() returns a Promise resolving to the number of matched elements. length, size, and total are not Locator methods.</details>

## 36
To group related tests together, you use:
1. test.describe('group', ()=> {...})
2. test.group('group', () => {...})
3. test.suite('group', () => {...})
4. describe.test('group', () => {...})
<details><summary>Answer</summary>test.describe('group', () => { ... })<br/><br/>test.describe() declares a group of tests, enabling shared hooks and organization. group, suite, and describe.test are not part of the API.</details>

## 37
Which assertion checks that a checkbox is currently checked?
1. await expect(locator).toBeChecked()
2. await expect(locator).toBeSelected()
3. await expect(locator).toBeTrue()
4. await expect(loctor).isChecked()
<details><summary>Answer</summary>await expect(locator).toBeChecked()<br/><br/>toBeChecked() is the web-first assertion for checkbox/radio state. isChecked() is a one-shot boolean getter, not an assertion; the others are invalid.</details>

## 38
