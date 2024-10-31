import { DataSourceOptions } from "typeorm";
import { Blog } from "../entities/Blog";

export const dbConfig: DataSourceOptions = {
    type: "postgres",
    url: "postgresql://blogs_owner:0avPuV5ImeQK@ep-tight-math-a57h768s.us-east-2.aws.neon.tech/blogs",
    ssl: {
        rejectUnauthorized: true
    },
    entities: [Blog],
    synchronize: true,
    logging: true
};
