import { Client } from "pg";
import { config } from "../config/app.config";

const database = new Client({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: Number(config.DB_PORT),
});

export const connectDatabase = async () => {
  try {
    await database.connect();
    console.log("✅ Connected to the database successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export default database;
