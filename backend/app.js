// app.js
import express from 'express';
import cors from 'cors';
import scrapeFlipkart from './scrapers/flipkart.js';
import scrapeAmazon from './scrapers/amazon.js';
import scrapeCroma from './scrapers/croma.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/search', async (req, res) => {
  const { country, query } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const scrapers = [
    scrapeFlipkart(query),
    scrapeAmazon(query),
    // scrapeWalmart(query),
    scrapeCroma(query),
    // scrapeReliance(query),
  ];

  const results = await Promise.allSettled(scrapers);
  const data = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .filter(i => i?.price)
    .sort((a, b) => a.price - b.price);

  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
