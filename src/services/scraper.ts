import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';
import * as path from 'path';

puppeteer.use(StealthPlugin());

async function scrapeCoinbaseBlog(url: string): Promise<{
    title: string;
    contentHTML: string;
}> {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Navigating to blog...');
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    await page.waitForSelector('[color="foregroundMuted"]', { timeout: 15000 });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const articleContent = await page.evaluate(() => {
      const titleElement = document.querySelector('h1');
      const title = titleElement?.textContent?.trim() || 'Untitled';

      function cleanElement(element: Element): string {
        // Skip empty or whitespace-only text nodes
        if (element.nodeType === 3 && (!element.textContent?.trim())) {
          return '';
        }

        // Skip image elements
        if (element.tagName.toLowerCase() === 'img') {
          return '';
        }

        const clone = element.cloneNode(true) as HTMLElement;
        
        function cleanNode(node: HTMLElement) {
          // Remove all attributes except href for links
          const attributes = Array.from(node.attributes);
          attributes.forEach(attr => {
            if (!(node.tagName.toLowerCase() === 'a' && attr.name === 'href')) {
              node.removeAttribute(attr.name);
            }
          });

          // Recursively clean child nodes
          Array.from(node.childNodes).forEach(child => {
            if (child.nodeType === 1) { // Element node
              cleanNode(child as HTMLElement);
            }
          });
        }

        cleanNode(clone);

        // Special handling for list items
        if (clone.tagName.toLowerCase() === 'li') {
          // If the li is not inside a ul/ol, wrap it
          if (!element.parentElement?.matches('ul, ol')) {
            return `<ul>${clone.outerHTML}</ul>`;
          }
        }

        // If it's a ul/ol, make sure it's preserved
        if (clone.tagName.toLowerCase() === 'ul' || clone.tagName.toLowerCase() === 'ol') {
          return clone.outerHTML;
        }

        return clone.outerHTML;
      }

      // Get all foregroundMuted elements
      const foregroundMutedElements = Array.from(
        document.querySelectorAll('[color="foregroundMuted"]')
      );

      // Process each foregroundMuted element
      const processedContent = new Set<string>();
      const contentHTML = foregroundMutedElements
        .map(container => {
          // Get the text content first to check if it's worth processing
          const containerText = container.textContent?.trim();
          if (!containerText || containerText.length < 2) {
            return '';
          }

          // Skip if we've seen this exact content before
          if (processedContent.has(containerText)) {
            return '';
          }

          processedContent.add(containerText);

          // Clean and return the HTML content
          return cleanElement(container);
        })
        .filter(html => html.length > 0)
        .join('\n');

      return {
        title,
        contentHTML,
      };
    });

    const outputDir = path.join(__dirname, '..', 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${articleContent.title}</title>
  <style>
    body { 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    }
    p { line-height: 1.6; margin-bottom: 1em; }
    h1, h2, h3 { margin-top: 1.5em; color: #333; }
    a { color: #1652f0; text-decoration: none; }
    a:hover { text-decoration: underline; }
    ul, ol { 
      margin: 1em 0;
      padding-left: 2em;
    }
    li { 
      margin-bottom: 0.5em;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <article>
    <h1>${articleContent.title}</h1>
    ${articleContent.contentHTML}
  </article>
</body>
</html>`;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const htmlFilename = `article_${timestamp}.html`;
    const htmlPath = path.join(outputDir, htmlFilename);

    fs.writeFileSync(htmlPath, htmlContent);
    console.log('HTML file generated:', htmlPath);

    return articleContent;
  } catch (error) {
    console.error('Error scraping Coinbase blog:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export { scrapeCoinbaseBlog };