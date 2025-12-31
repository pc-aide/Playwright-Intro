# Locators

Playwright provides **around 14 main locator types**, organized into **three categories**.

---

## 1. Semantic (User-Oriented) Locators — 7

These locators are **recommended** because they interact with the page like a real user would.

| Locator | Purpose |
|--------|--------|
| `getByRole()` | Find elements by ARIA role |
| `getByLabel()` | Find form fields linked to `<label>` |
| `getByPlaceholder()` | Find by placeholder text |
| `getByText()` | Find by visible text |
| `getByTitle()` | Find by `title` attribute |
| `getByAltText()` | Find images by alt text |
| `getByTestId()` | Find by `data-testid` attribute |

---

## 2. DOM / Technical Locators — 7

These locators target the HTML structure directly.

| Locator | Purpose |
|--------|--------|
| `locator(css)` | CSS selector |
| `locator(xpath)` | XPath selector |
| `getById()` | Find by HTML `id` |
| `frameLocator()` | Locate elements inside iframes |
| `filter()` | Advanced locator filtering |
| `nth()` | Select by index |
| `first()` / `last()` | Select first or last match |

---

## 3. Locator Modifiers (Compositional)

These methods refine or combine locators.

| Method | Purpose |
|------|--------|
| `has()` | Must contain another locator |
| `hasText()` | Must contain specific text |
| `and()` | Intersection of locators |
| `or()` | Union of locators |

---

## Summary

| Category | Count |
|--------|------|
| Semantic locators | 7 |
| DOM/Technical locators | 7 |
| Modifiers | 4+ |
| **Total main locator types** | **≈ 14** |

> Playwright recommends using semantic locators first to build more stable, maintainable, and user-like tests.
