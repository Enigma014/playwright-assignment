<img width="1470" alt="Screenshot 2025-07-09 at 10 19 12 PM" src="https://github.com/user-attachments/assets/d2e5004a-5df1-4b38-9a73-632a073dfa97" />
<img width="1470" alt="Screenshot 2025-07-09 at 10 19 44 PM" src="https://github.com/user-attachments/assets/8028a3b7-84c2-4476-affc-fb053dab329d" />
<strong>📦 Flipkart vs Amazon Price Comparison using Playwright</strong>

This Playwright automation script compares the price of iPhone 15 Plus on Flipkart and Amazon and verifies if Flipkart offers a cheaper price.

🚀 Features
🔍 Searches for iPhone 15 Plus on both Flipkart and Amazon.
🪄 Extracts the title and price of the first matching product.
🔁 Interleaved search: uses the Amazon product title to refine Flipkart search.
✅ Validates page title, URL, and product match.
💰 Fails the test if Flipkart is not cheaper than Amazon.
💻 Runs in Chromium (headed mode for visibility).
🛠️ Tech Stack
Playwright
TypeScript / JavaScript
Node.js
📦 Installation
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
▶️ Running the Test
npx playwright test tests/compare-prices.spec.ts --project=chromium --headed
✅ Sample Output
➡️ Amazon: Searching...
📦 Amazon Product Title: Apple iPhone 15 Plus (128 GB) - Black
➡️ Flipkart: Searching with Amazon title...
🛍️ Amazon → Apple iPhone 15 Plus (128 GB) - Black @ ₹72490# 📦 Flipkart vs Amazon Price Comparison using Playwright

This Playwright automation script compares the price of **iPhone 15 Plus** on Flipkart and Amazon and verifies if Flipkart offers a cheaper price.

---

## 🚀 Features

- 🔍 Searches for **iPhone 15 Plus** on both Flipkart and Amazon.  
- 🪄 Extracts the **title and price** of the first matching product.  
- 🔁 **Interleaved search**: uses the Amazon product title to refine Flipkart search.  
- ✅ Validates **page title**, **URL**, and **product match**.  
- 💰 **Fails the test** if Flipkart is not cheaper than Amazon.  
- 💻 Runs in **Chromium** (headed mode for visibility).  

---

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript / JavaScript
- Node.js

---
## Running Tests
npx playwright test tests/compare-prices.spec.ts --project=chromium --headed

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install

Ensure you have a stable internet connection as the test scrapes live websites.
Flipkart sometimes shows popups — the script handles that automatically.
Results may vary based on real-time pricing.

