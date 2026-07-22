import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
try {
    await client.connect();
} catch (error) {
    console.error(error);
}

const db = client.db(process.env.DB_NAME);

export default db;
