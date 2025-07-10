import aws4 from 'aws4';
import { promises as fs } from 'fs';
import path from 'path';

const PRODUCT_FILE = path.join(process.cwd(), 'balkonkraftwerk-vergleich24', 'app', 'products.json');
const CACHE_FILE = path.join(process.cwd(), 'balkonkraftwerk-vergleich24', 'app', 'api', 'amazon', 'priceCache.json');

function collectAsins(obj, set) {
  if (!obj || typeof obj !== 'object') return;
  if (Object.prototype.hasOwnProperty.call(obj, 'asin')) {
    const val = obj.asin;
    if (val && val !== '-') set.add(val);
  }
  for (const value of Object.values(obj)) {
    if (typeof value === 'object') collectAsins(value, set);
  }
}

async function readCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeCache(cache) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function fetchPrice(asin) {
  const accessKey = process.env.AMAZON_ACCESS_KEY;
  const secretKey = process.env.AMAZON_SECRET_KEY;
  const partnerTag = process.env.AMAZON_PARTNER_TAG;
  if (!accessKey || !secretKey || !partnerTag) {
    throw new Error('Amazon credentials missing');
  }
  const region = 'eu-west-1';
  const host = 'webservices.amazon.de';
  const endpoint = `https://${host}/paapi5/getitems`;

  const payload = {
    ItemIds: [asin],
    Resources: ['Offers.Listings.Price'],
    PartnerTag: partnerTag,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.de',
  };

  const options = {
    host,
    path: '/paapi5/getitems',
    service: 'ProductAdvertisingAPI',
    region,
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
  options.headers['X-Amz-Target'] = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems';
  options.headers['Content-Encoding'] = 'amz-1.0';
  aws4.sign(options, { accessKeyId: accessKey, secretAccessKey: secretKey });

  const response = await fetch(endpoint, {
    method: options.method,
    headers: options.headers,
    body: options.body,
  });
  const data = await response.json();
  const item = data.ItemsResult?.Items?.[0];
  const listing = item?.Offers?.Listings?.[0];
  const priceObj = listing?.Price;
  const price = priceObj?.DisplayAmount || null;
  let listPrice = null;
  if (priceObj && priceObj.Savings && typeof priceObj.Amount === 'number') {
    const originalAmount = priceObj.Amount + priceObj.Savings.Amount;
    listPrice = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: priceObj.Currency,
    }).format(originalAmount);
  }
  return { price, listPrice };
}

async function main() {
  const productsData = await fs.readFile(PRODUCT_FILE, 'utf8');
  const products = JSON.parse(productsData);
  const asins = new Set();
  products.forEach(p => collectAsins(p, asins));

  const cache = await readCache();
  for (const asin of asins) {
    try {
      console.log('Fetching', asin);
      const { price, listPrice } = await fetchPrice(asin);
      cache[asin] = { price, listPrice, timestamp: Date.now() };
    } catch (err) {
      console.error('Error fetching', asin, err.message);
    }
  }
  await writeCache(cache);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
