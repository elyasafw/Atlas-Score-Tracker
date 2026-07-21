import env from "dotenv";
import { MongoClient } from "mongodb";

env.config();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();

const db = client.db(process.env.DB_NAME);

export default db;
