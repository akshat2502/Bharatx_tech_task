import puppeteer from 'puppeteer';

const scrapeAliExpress = async (query) => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(query)}`, { waitUntil: 'domcontentloaded' });

  const results = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.manhattan--container--1lP57Ag').forEach(el => {
      const title = el.querySelector('a > h1, a > h2')?.innerText;
      const link = el.querySelector('a')?.href;
      const priceText = el.querySelector('.manhattan--price-sale--1CCSZfK span')?.innerText?.replace(/[US$,]/g, '');
      const price = priceText ? parseFloat(priceText) : null;
      if (title && price) items.push({ title, price, link, source: 'AliExpress' });
    });
    return items;
  });

  await browser.close();
  return results;
};

export default scrapeAliExpress;
