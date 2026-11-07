import { backendGet } from './server';

export async function getCollections() {
  return (await backendGet('/api/products/collections', { revalidate: 3600 }))?.collections || [];
}

export async function getCollection(slug) {
  return (await getCollections()).find((item) => item.slug === slug) || null;
}

const SKIN_LABEL = { fair: 'fair', wheatish: 'wheatish', dusky: 'dusky', dark: 'deep' };
const join = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0] || '');
const price = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

// Short, factual copy from the live data: price range, discounts, skin tones.
export function collectionCopy(collection) {
  const noun = collection.title.replace(/ for Men.*$/, '').toLowerCase();
  const range = `${collection.count} ${noun} from ${price(collection.minPrice)}${collection.maxPriceSeen > collection.minPrice ? ` to ${price(collection.maxPriceSeen)}` : ''}`;
  const deal = collection.bestDiscount >= 20 ? `, with discounts up to ${collection.bestDiscount}%` : '';
  const skin = collection.suitsSkin?.length ? ` ${collection.colour[0].toUpperCase()}${collection.colour.slice(1)} flatters ${join(collection.suitsSkin.map((key) => SKIN_LABEL[key]))} skin.` : '';
  return {
    intro: `${range} from official brand stores like Levi's, Rare Rabbit and Jack & Jones${deal}.${skin}`,
    faqs: [
      { q: `Where can I buy ${noun} for men online?`, a: `PrimeFit lists ${range} from official brand stores${deal}. Each piece links straight to the brand's own site, so you get their prices, delivery and returns.` },
      collection.suitsSkin?.length
        ? { q: `Which skin tone suits ${collection.colour}?`, a: `${collection.colour[0].toUpperCase()}${collection.colour.slice(1)} works best on ${join(collection.suitsSkin.map((key) => SKIN_LABEL[key]))} skin tones. Take the PrimeFit style quiz to see colours picked for your exact skin tone, height and build.` }
        : { q: `How do I pick the right ${noun} for my body type?`, a: `Shorter men look best in slim and regular fits, broad builds in regular fits and darker solids, and tall men can carry relaxed fits. PrimeFit's style quiz ranks every piece for your height, build and skin tone.` },
      { q: `What is the price range of ${noun} on PrimeFit?`, a: `Prices currently range from ${price(collection.minPrice)} to ${price(collection.maxPriceSeen)}. Prices are refreshed from the stores every day.` },
    ],
  };
}
