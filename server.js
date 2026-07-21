import env from "dotenv";
import express from "express";

env.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`App listening on port ${PORT} ...`));
