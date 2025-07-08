// scrapers/croma.js
import puppeteer from 'puppeteer';

const scrapeCroma = async (query) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.croma.com/searchB?q=${encodeURIComponent(query)}`, {
      waitUntil: 'networkidle2'
    });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('.product-item');
      return Array.from(items).map((item) => {
        const title = item.querySelector('.product-title')?.innerText;
        const price = item.querySelector('.new-price')?.innerText;
        const link = item.querySelector('a')?.href;
        if (!title || !price) return null;

        return {
          productName: title,
          link,
          price: parseInt(price.replace(/[₹,]/g, '')),
          currency: 'INR',
        };
      }).filter(Boolean);
    });

    await browser.close();
    return results;
  } catch (err) {
    console.error("Croma scraper failed:", err);
    return [];
  }
};

export default scrapeCroma;
