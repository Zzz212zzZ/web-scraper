// processArticle.ts

import { scrapeCoinbaseBlog } from './scraper';

export async function processArticle(url: string) {
  try {
    // Scrape the page and generate the HTML file
    await scrapeCoinbaseBlog(url);
    console.log('Successfully processed article');
  } catch (error) {
    console.error(`Error processing article:`, error);
  }
}

