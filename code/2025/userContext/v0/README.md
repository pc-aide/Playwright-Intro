# userContext

## 2x browser : chat between two people
````ts
const browser = await chromium.launch();

// Contexte admin
const adminContext = await browser.newContext();
const adminPage = await adminContext.newPage();
await adminPage.goto('https://app/cart');
await adminPage.fill('#user', 'admin');
await adminPage.fill('#pass', 'admin123');
await adminPage.click('#login');

// Contexte naveen
const naveenContext = await browser.newContext();
const naveenPage = await naveenContext.newPage();
await naveenPage.goto('https://app/cart');
await naveenPage.fill('#user', 'naveen');
await naveenPage.fill('#pass', 'naveen123');
await naveenPage.click('#login');
````
