// @ts-check
export {};
const { test, expect } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

var username = "student";
var wrongUsername = "wrongStudent";
var password = "Password123";
var wrongPassword = "Password321";
var wrongUsernameText = "Your username is invalid!";
var wrongPasswordText = "Your password is invalid!";

test('A successful login was performed', async ({ page } : { page:any }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await percySnapshot(page, 'Login Page');

  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveURL("https://practicetestautomation.com/logged-in-successfully/");

  await percySnapshot(page, 'Login Successful');
});

test('The wrong username was entered', async ({ page } : { page:any }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator("#username").fill(wrongUsername);
  await page.locator("#password").fill(password);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#error")).toHaveText(wrongUsernameText);
});

test('The wrong password was entered', async ({ page } : { page:any }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await page.locator("#username").fill(username);
  await page.locator("#password").fill(wrongPassword);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#error")).toHaveText(wrongPasswordText);
});