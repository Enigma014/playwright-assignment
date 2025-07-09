import { test, chromium, expect } from '@playwright/test';

test.setTimeout(90000);

test('Compare iPhone 15 Plus price on Flipkart vs Amazon (Interleaved)', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const amazonPage = await context.newPage();
  const flipkartPage = await context.newPage();

  const initialSearch = "iphone 15 plus";

  // Step 1: Search on Amazon
  console.log("➡️ Amazon: Searching...");
  await amazonPage.goto("https://www.amazon.in/");
  await amazonPage.fill('#twotabsearchtextbox', initialSearch);
  await amazonPage.press('#twotabsearchtextbox', 'Enter');
  await amazonPage.waitForTimeout(3000);

  // Step 2: Extract first product title
  const firstAmazonProduct = amazonPage.locator('div.s-main-slot div[data-component-type="s-search-result"]').first();
  await firstAmazonProduct.waitFor({ timeout: 5000 });

  const amazonTitle = await firstAmazonProduct.locator('h2 span').textContent();
  if (!amazonTitle) throw new Error("❌ Amazon title not found");

  console.log(`📦 Amazon Product Title: ${amazonTitle.trim()}`);

  // Step 3: Search on Flipkart using Amazon title
  console.log("➡️ Flipkart: Searching with Amazon title...");
  await flipkartPage.goto("https://www.flipkart.com/");
  try {
    const popup = flipkartPage.locator('button:has-text("✕")');
    if (await popup.isVisible()) await popup.click();
  } catch {}

  await flipkartPage.fill('input[name="q"]', amazonTitle);
  await flipkartPage.press('input[name="q"]', 'Enter');
  await flipkartPage.waitForTimeout(3000);

  
  // Step 4: Back to Amazon — extract price
  const amazonPrices = await amazonPage.locator('span.a-price-whole').allTextContents();
  const raw = amazonPrices.find(p => p.length > 2);
  const amazonPrice = raw ? parseInt(raw.replace(/[^0-9]/g, ''), 10) : null;

  if (!amazonPrice) throw new Error("❌ Amazon price not found");

  console.log(`🛍️ Amazon → ${amazonTitle.trim()} @ ₹${amazonPrice}`);
  //Step 5: Extract Flipkart title and price
  const item = flipkartPage.locator('div.tUxRFH').filter({
    hasText: 'iPhone 15 Plus',
  }).first();
  await item.waitFor({ timeout: 10000 });

  const flipkartTitle = await item.locator('div.KzDlHZ').first().textContent();
  const flipkartPriceText = await item.locator('div.Nx9bqj._4b5DiR').first().textContent();
  const flipkartPrice = flipkartPriceText ? parseInt(flipkartPriceText.replace(/[^0-9]/g, ''), 10) : null;

  if (!flipkartPrice || !flipkartTitle) throw new Error("❌ Flipkart product not found");

  console.log(`🛒 Flipkart → ${flipkartTitle.trim()} @ ₹${flipkartPrice}`);
  expect(flipkartPage.url()).toContain("flipkart.com");
  expect(amazonPage.url()).toContain("amazon.in");
  expect(amazonTitle.toLowerCase()).toContain("iphone");
  expect(flipkartTitle.toLowerCase()).toContain("iphone");
  if (flipkartPrice < amazonPrice) {
    console.log("✅ Flipkart is cheaper. ✅ Test Passed.");
  } else {
   console.log("❌ Flipkart is not cheaper. ❌ Test Failed.");
  }

  // Step 6: Assertions and Comparison
  
  expect(flipkartPrice).toBeLessThan(amazonPrice);
  

  
  await browser.close();
});
