import { DataSource } from "typeorm";
import { dbConfig } from "../config/database";

export const AppDataSource = new DataSource(dbConfig);

export async function initializeDatabase() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Database connection established");
        }
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
} 