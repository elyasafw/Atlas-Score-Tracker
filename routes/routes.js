import express from "express";

const leaderboardRoute = express.Router();
const playersRoute = express.Router();
const statsRoute = express.Router();
const gameRoute = express.Router();

export { gameRoute, leaderboardRoute, playersRoute, statsRoute };
