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
3. page.locator('.card').hasText('Premium')
<details><summary>Answer</summary>True</details>
