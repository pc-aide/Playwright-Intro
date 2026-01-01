# debug

## promise
````ts
// prevents your script from exiting!
// but default auto closed after 30s
await new Promise(() => {}); 
````

## pause
````ts
  // pause debug
  await page.pause();
````

## promise noTimeout
````ts
import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('locator test', async() => {
    test.setTimeout(0); // disable the timeout debugging

    const browser: Browser = await chromium.
    launch({ headless: false, channel: 'chrome' }); // msedge, chrome
    const page: Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    // Create a web element(locator) + perform action on it(click, fill)
    // 1 Id:unique
    const firstName:Locator = page.locator('id=input-firstname');
    const lastName:Locator = page.locator('id=input-lastname');

    // action on it
    await firstName.fill("Kurt");
    await lastName.fill("Warner");

    // 2 class name

    // pause debugging
    await new Promise(() => {});

});
````
<img src="https://i.imgur.com/4co0XPM.png">
