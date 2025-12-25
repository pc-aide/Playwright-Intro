# assert

## title
````ts
// find out title
const title = await page.title();
console.log("home page title:", title);

// my account title
await expect(title).toEqual('My Account');
````

## url
````ts
await expect(page).toHaveURL(/\/account/);
````
