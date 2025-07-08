// scrapers/amazon.js
import puppeteer from 'puppeteer';

const scrapeAmazon = async (query) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(query)}`, {
      waitUntil: 'networkidle2'
    });

    const results = await page.evaluate(() => {
      const items = document.querySelectorAll('.s-result-item');
      return Array.from(items).map((item) => {
        const title = item.querySelector('h2 span')?.innerText;
        const link = item.querySelector('h2 a-link-normal a')?.href;
        const price = item.querySelector('.a-price .a-offscreen')?.innerText;
        if (!title || !price) return null;

        return {
          productName: title,
          link: `https://www.amazon.in${link}`,
          price: parseInt(price.replace(/[₹,]/g, '')),
          currency: 'INR',
        };
      }).filter(Boolean);
    });

    await browser.close();
    return results;
  } catch (err) {
    console.error("Amazon scraper failed:", err);
    return [];
  }
};

export default scrapeAmazon;
