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
  // await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');



  await new Promise(() => {});

});
````

## login pass
<img src="https://i.imgur.com/2yrIEPZ.png">

## API
````api
GET https://the-internet.herokuapp.com/basic_auth with auth type basic auth
````

<img src="https://i.imgur.com/9EXNWPD.png">

* base64<br/>
<img src="https://i.imgur.com/bNw0zo3.png">
* console btoa modeDev Chrome<br/>
<img src="https://i.imgur.com/iJC65X0.png">
