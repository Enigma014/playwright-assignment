import { test, chromium, expect } from '@playwright/test';

test.setTimeout(90000);

test('Compare iPhone 15 Plus price on Flipkart vs Amazon', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const [flipkartPage, amazonPage] = await Promise.all([
    context.newPage(),
    context.newPage(),
  ]);

  const product = "iphone 15 plus";
// --- Amazon ---
// 🔍 --- Amazon --- 🔍
console.log("➡️ Amazon: Navigating...");
await amazonPage.goto("https://www.amazon.in/");
await amazonPage.fill('#twotabsearchtextbox', product);
await amazonPage.press('#twotabsearchtextbox', 'Enter');
await amazonPage.waitForTimeout(3000);

const amazonPrices = await amazonPage.locator('span.a-price-whole').allTextContents();
const amazonRaw = amazonPrices.find(p => p.length > 2); // e.g. skip single digits
const amazonPrice = amazonRaw ? parseInt(amazonRaw.replace(/[^0-9]/g, ''), 10) : null;

if (!amazonPrice) throw new Error("❌ Could not extract Amazon price");
//const amazonTitle = await amazonPage.locator('span.a-text-normal').first().textContent();
const firstAmazonProduct = amazonPage.locator('div.s-main-slot div[data-component-type="s-search-result"]').first();
await firstAmazonProduct.waitFor({ timeout: 5000 });

const amazonTitle = await firstAmazonProduct.locator('h2 span').textContent();


console.log(`🛒 Amazon Product: ${amazonTitle?.trim()}`);
console.log(`🛍️ Amazon Price: ₹${amazonPrice}`);


  // --- Flipkart ---
  console.log("➡️ Navigating to Flipkart...");
  await flipkartPage.goto("https://www.flipkart.com/");
  try {
    const popup = flipkartPage.locator('button:has-text("✕")');
    if (await popup.isVisible()) await popup.click();
  } catch {}

  await flipkartPage.fill('input[name="q"]', product);
  await flipkartPage.press('input[name="q"]', 'Enter');
  await flipkartPage.waitForTimeout(3000);

  const item = flipkartPage.locator('div.tUxRFH').filter({
    hasText: 'iPhone 15 Plus',
  }).first();
  await item.waitFor({ timeout: 10000 });

  const flipkartTitle = await item.locator('div.KzDlHZ').first().textContent();
  const flipkartPriceText = await item.locator('div.Nx9bqj._4b5DiR').first().textContent();

  if (!flipkartPriceText) throw new Error("❌ No price on Flipkart");
  const flipkartPrice = parseInt(flipkartPriceText.replace(/[^0-9]/g, ''), 10);
  if (isNaN(flipkartPrice)) throw new Error(`❌ Price parsing failed for Flipkart: ${flipkartPriceText}`);

  console.log(`🛒 Flipkart Product: ${flipkartTitle?.trim()}`);
  console.log(`🛒 Flipkart Price: ₹${flipkartPrice}`);
  


  // Comparison
  if (flipkartPrice < amazonPrice) {
    console.log("✅ Flipkart is cheaper.Testcase passes.");
  } else {
    console.log("✅ Amazon is cheaper.Testcase fails.");
  }
  expect(flipkartTitle?.toLowerCase()).toContain("iphone 15 plus");
  expect(amazonTitle?.toLowerCase()).toContain("iphone 15 plus");
  // ✅ Validate URLs and page titles
expect(flipkartPage.url()).toContain("flipkart.com");
expect(await flipkartPage.title()).toMatch(/iphone/i);

expect(amazonPage.url()).toContain("amazon.in");
expect(await amazonPage.title()).toMatch(/iphone/i);

// ✅ Flipkart must be cheaper
expect(flipkartPrice).toBeLessThan(amazonPrice);

  

  await browser.close();
});
