const { test, expect } = require('@playwright/test');

test('First plywright Program', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator('#username').fill("rahulshetty");
  await page.locator("[type='password']").fill("Learning@830$3mK2");
  await page.locator('#signInBtn').click();
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  await page.locator('#username').fill("");
  await page.locator('#username').fill("rahulshettyacademy");
  await page.locator('#signInBtn').click();
  await page.locator(".card-body a").first().waitFor();
  console.log(await page.locator('.card-body a').allTextContents());
});

test('plywright Program', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("select.form-control").selectOption("consult");
  await page.locator("[value='user']").click();
  await page.locator("#okayBtn").click();
  await expect(page.locator("[value='user']")).toBeChecked();
  await expect(page.locator("[href='https://rahulshettyacademy.com/documents-request']")).toHaveAttribute("class", "blinkingText");

  const [newpage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("[href='https://rahulshettyacademy.com/documents-request']").click()
  ]);

  const text = await newpage.locator(".red").textContent();
  const text1 = text.split("@");
  const domain = text1[1].split(" ")[0];
  await page.locator('#username').fill(domain);
  console.log(await page.locator('#username').inputValue());
  await page.pause();
});

test('@Webst Client App login', async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();

  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = await page.locator("tbody tr");
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test('Playwright Special locators', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", { name: 'Submit' }).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link", { name: "Shop" }).click();
  await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
});

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const expectedList = [monthNumber, date, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
  await page.locator(`//abbr[text()='${date}']`).click();

  const inputs = page.locator('.react-date-picker__inputGroup__input');
  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
  }
});