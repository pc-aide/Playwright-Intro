# 2026

## wait 
|n|name|eg|O/P|
|-|----|--|---|
|1|networkidle|`await page.waitForLoadState('networkidle');`|
|2|pause|`await page.waitForTimeout(1000);`|

## url
|n|name|eg|O/P|
|-|-----|-|---|
|1|// securite.spec.ts<br/>`test('sécurité VAC', async ({ page }) => {`<br/>`await page.goto(prefix.vac);`<br/>` `<br/>`await bypass(page);`<br/>`});`<br/><br/>// bypass.ts - fonction <br/>`export async function bypass(page) {`<br/>`  const url = page.url();`<br/>` `<br/>`  if (url.includes('CSPQ')) {`<br/>`    // code CSPQ`<br/>`  }`<br/>` `<br/>`  if (url.includes('vac')) {`<br/>`    // code vac`<br/>`  }`<br/>`}`
