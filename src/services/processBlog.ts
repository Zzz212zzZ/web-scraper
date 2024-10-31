// processBlog.ts

import { scrapeCoinbaseBlog } from './scraper';
import { AppDataSource } from './database';
import { BlogRepository } from '../repositories/BlogRepository';

export async function processBlog(url: string) {
    try {
        const blogRepository = new BlogRepository(AppDataSource);

        // Check if blog already exists
        const existingBlog = await blogRepository.findByUrl(url);
        if (existingBlog) {
            console.log('Blog already exists');
            return;
        }

        // Scrape and save to database
        const content = await scrapeCoinbaseBlog(url);
        await blogRepository.save({
            source: 'coinbase',
            url,
            title: content.title,
            htmlContent: content.contentHTML
        });

        console.log('Successfully processed and saved blog');
    } catch (error) {
        console.error(`Error processing blog:`, error);
    }
}

