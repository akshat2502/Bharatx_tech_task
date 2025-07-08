import puppeteer from 'puppeteer';

const scrapeAmazonUSA = async (query) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

  const results = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('[data-component-type="s-search-result"]').forEach(el => {
      const title = el.querySelector('h2 a span')?.innerText;
      const link = 'https://www.amazon.com' + el.querySelector('h2 a')?.getAttribute('href');
      const priceWhole = el.querySelector('.a-price-whole')?.innerText?.replace(/,/g, '');
      const priceFraction = el.querySelector('.a-price-fraction')?.innerText;
      const price = priceWhole && priceFraction ? parseFloat(`${priceWhole}.${priceFraction}`) : null;
      if (title && price) items.push({ title, price, link, source: 'Amazon USA' });
    });
    return items;
  });

  await browser.close();
  return results;
};

export default scrapeAmazonUSA;
