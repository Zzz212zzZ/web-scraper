import { scrapeCoinbaseBlog } from './scraper'

async function testScraper() {
  try {
    const testUrl =
      'https://www.coinbase.com/en-sg/blog/announcing-the-launch-of-silver-and-stellar-futures-from-coinbase-derivatives'
    console.log('Testing scraper with URL:', testUrl)

    const content = await scrapeCoinbaseBlog(testUrl)

    console.log('Scraping successful!')
    console.log('Title:', content.title)
    console.log('Content length:', content.contentHTML.length)
    console.log(
      'First 500 chars of content:',
      content.contentHTML.substring(0, 500)
    )
  } catch (error) {
    console.error('Error:', error)
  } finally {
    process.exit(0)
  }
}

// Run the test
testScraper()
