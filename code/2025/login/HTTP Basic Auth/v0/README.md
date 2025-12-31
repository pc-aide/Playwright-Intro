# HTTP Basic Auth

## popUp
<img src="https://i.imgur.com/kOxV5zS.png">

## auth.spec.ts
````ts
import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import { webkit, chromium, firefox } from 'playwright'

test('auth test', async()=>{

  const browser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();


  await page.goto('https://the-internet.herokuapp.com/basic_auth');




  await new Promise(() => {});

});
````
