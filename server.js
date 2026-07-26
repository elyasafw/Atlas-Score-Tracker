import "dotenv/config";
import express from "express";
import * as routers from "./routes/routers.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/games", routers.gamesRoute);
app.use("/leaderboard", routers.leaderboardRoute);
app.use("/player", routers.playersRoute);
app.use("/stats", routers.statsRoute);

app.listen(PORT, () => console.log(`App listening on port ${PORT} ...`));
