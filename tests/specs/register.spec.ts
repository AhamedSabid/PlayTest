import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.describe('Registration Form - demo.automationtesting.in', () => {

  test('should successfully fill and submit the registration form', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Navigate to the registration page
    await registerPage.navigate();
    await expect(page).toHaveTitle(/Register/);

    // Fill personal details
    await registerPage.fillName('John', 'Doe');
    await registerPage.fillAddress('123 Test Street, Test City');
    await registerPage.fillEmail('johndoe@example.com');
    await registerPage.fillPhone('9876543210');

    // Select gender
    await registerPage.selectGender('Male');

    // Select hobbies
    await registerPage.selectHobbies(['Cricket', 'Movies']);

    // Select skill and country
    await registerPage.selectSkill('Python');
    await registerPage.selectCountry('India');

    // Set date of birth
    await registerPage.fillDateOfBirth('10', 'March', '1995');

    // Set password
    await registerPage.fillPassword('Test@1234');

    // Submit the form
    await registerPage.submit();
  });

  test('should load the registration page correctly', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.navigate();

    await expect(page.locator('h1, h2').first()).toBeVisible();
    await expect(page.locator('input[ng-model="FirstName"]')).toBeVisible();
    await expect(page.locator('input[ng-model="EmailAdress"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

});
