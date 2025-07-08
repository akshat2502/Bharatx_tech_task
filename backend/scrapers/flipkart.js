// scrapers/flipkart.js
import puppeteer from 'puppeteer';

const scrapeFlipkart = async (query) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.flipkart.com/search?q=${encodeURIComponent(query)}`);

    const data = await page.evaluate(() => {
      const items = document.querySelectorAll('div._2kHMtA');
      return Array.from(items).map((i) => {
        const title = i.querySelector('._4rR01T')?.innerText;
        const price = i.querySelector('._30jeq3')?.innerText;
        const link = i.querySelector('a')?.href;
        if (!title || !price) return null;
        return {
          productName: title,
          price: parseInt(price.replace(/[₹,]/g, '')),
          currency: 'INR',
          link: link.startsWith('http') ? link : `https://www.flipkart.com${link}`,
        };
      }).filter(Boolean);
    });

    await browser.close();
    return data;
  } catch (err) {
    console.error("Flipkart scraper failed:", err);
    return [];
  }
};

export default scrapeFlipkart;
