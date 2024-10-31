import { DataSource } from "typeorm";
import { Blog } from "../entities/Blog";

export class BlogRepository {
    private repository;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Blog);
    }

    async save(blog: Partial<Blog>): Promise<Blog> {
        return this.repository.save(blog);
    }

    async findByUrl(url: string): Promise<Blog | null> {
        return this.repository.findOne({ where: { url } });
    }

    async getAll(): Promise<Blog[]> {
        return this.repository.find({
            order: { scrapedAt: 'DESC' }
        });
    }
} 