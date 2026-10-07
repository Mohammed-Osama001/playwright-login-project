import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import loginData from '../testData/loginData.json';

test('should login successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password
  );

  await expect(page).toHaveURL(
    /practicetestautomation\.com\/logged-in-successfully\//
  );

  await expect(
    page.getByText(/Congratulations|successfully logged in/i)
  ).toBeVisible();

  await expect(loginPage.logoutButton).toBeVisible();
});

test('should display error for invalid username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    loginData.invalidUser.username,
    loginData.invalidUser.password
  );

  await expect(loginPage.errorMessage).toBeVisible();

  await expect(loginPage.errorMessage).toHaveText(
    'Your username is invalid!'
  );
});

test('should display error for invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    loginData.invalidPassword.username,
    loginData.invalidPassword.password
  );

  await expect(loginPage.errorMessage).toBeVisible();

  await expect(loginPage.errorMessage).toHaveText(
    'Your password is invalid!'
  );
});

