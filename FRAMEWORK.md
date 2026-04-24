# UI Playwright Automation Framework

## Overview
This framework uses [Playwright](https://playwright.dev/) with the **Page Object Model (POM)** design pattern to keep tests clean, maintainable, and reusable.

---

## Project Structure

```
tests/
  specs/          # Test files (.spec.ts)
pages/            # Page classes (POM)
utils/            # Shared utility helpers
playwright.config.ts
```

---

## Page Object Model (POM)

Each page of the application gets its own class under `pages/`.  
Page classes encapsulate locators and actions for that page only.

**Example — `pages/LoginPage.ts`:**
```ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private loginButton   = this.page.locator('#login-btn');

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

---

## Utilities

Small, reusable helpers live under `utils/`.

### Click Helper — `utils/actions.ts`
```ts
import { Locator } from '@playwright/test';

export async function clickElement(locator: Locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.click();
}
```

### Fill Text Helper — `utils/actions.ts`
```ts
export async function fillText(locator: Locator, text: string) {
  await locator.waitFor({ state: 'visible' });
  await locator.clear();
  await locator.fill(text);
}
```

---

## Writing a Test

Import the page class and utilities into your spec file.

**Example — `tests/specs/login.spec.ts`:**
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('user@example.com', 'password123');

  await expect(page).toHaveURL('/dashboard');
});
```

---

## Guidelines

- One page class per application page.
- Keep locators inside the page class — never in spec files.
- Use utilities from `utils/actions.ts` for common interactions.
- Prefer `data-testid` attributes for locators when possible.
- Never add hard waits (`page.waitForTimeout`); rely on Playwright's auto-waiting.
