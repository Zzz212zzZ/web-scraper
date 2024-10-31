import { initializeDatabase } from '../services/database';
import { BlogRepository } from '../repositories/BlogRepository';
import { AppDataSource } from '../services/database';

async function testConnection() {
    try {
        await initializeDatabase();
        const blogRepository = new BlogRepository(AppDataSource);
        const blogs = await blogRepository.getAll();
        console.log('Total blogs in database:', blogs.length);
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

testConnection();
