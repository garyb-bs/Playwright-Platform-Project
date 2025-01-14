// @ts-check
export {};
const { test, expect } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

var username = "student";
var wrongUsername = "wrongStudent";
var password = "Password123";
var wrongPassword = "Password321";
var wrongUsernameText = "Incorrect username!";
var wrongPasswordText = "Incorrect password!";
var wrongUsernameAndPasswordText = "Incorrect username and password!";

test('A successful login was performed', async ({ page } : { page:any }) => {
  await page.goto('http://browserstacktraining.site');

  await page.locator("#loginButton").click();

  await percySnapshot(page, 'Login Page');

  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#message")).toHaveText("Login successful!");

  await percySnapshot(page, 'Login Successful');
});

test('The wrong username was entered', async ({ page } : { page:any }) => {
  await page.goto('http://browserstacktraining.site');

  await page.locator("#loginButton").click();

  await page.locator("#username").fill(wrongUsername);
  await page.locator("#password").fill(password);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#message")).toHaveText(wrongUsernameText);
});

test('The wrong password was entered', async ({ page } : { page:any }) => {
  await page.goto('http://browserstacktraining.site');

  await page.locator("#loginButton").click();

  await page.locator("#username").fill(username);
  await page.locator("#password").fill(wrongPassword);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#message")).toHaveText(wrongPasswordText);
});

test('Both the wrong username and password were entered', async ({ page } : { page:any }) => {
  await page.goto('http://browserstacktraining.site');

  await page.locator("#loginButton").click();

  await page.locator("#username").fill(wrongUsername);
  await page.locator("#password").fill(wrongPassword);
  await page.locator("#submit").click();

  // Expect a title "to contain" a substring.
  await expect(page.locator("#message")).toHaveText(wrongUsernameAndPasswordText);
});