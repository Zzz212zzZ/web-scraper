import { processBlog } from './services/processBlog';
import { initializeDatabase } from './services/database';
import { config } from './config/urls';

async function main() {
    try {
        await initializeDatabase();
        
        for (const url of config.urls) {
            await processBlog(url);
        }
        
        console.log('Blog processing completed!');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();