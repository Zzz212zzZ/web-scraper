// index.ts

import { processArticle } from './services/processArticle';

async function main() {
  try {
    const url = 'https://www.coinbase.com/en-sg/blog/demystifying-the-crypto-x-ai-stack';
    await processArticle(url);
    console.log('Article processing completed!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
