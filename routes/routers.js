import express from "express";
import { middleSchema, scoreSchema } from "../middleware.js";
import {
    createNewScore,
    getPlayerScores,
    tenTopGamePlayers,
    tenTopGlobalPlayers,
} from "../models/controller.js";

const leaderboardRoute = express.Router();
const playersRoute = express.Router();
const statsRoute = express.Router();
const gameRoute = express.Router();

gameRoute.post("/scores", middleSchema(scoreSchema), async (req, res) => {
    try {
        const newDate = await createNewScore(req, res);
        res.status(200).json({ success: true, data: newDate });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

leaderboardRoute.get("/:game", async (req, res) => {
    try {
        const players = await tenTopGamePlayers(req, res);
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

leaderboardRoute.get("/", async (req, res) => {
    try {
        const players = await tenTopGlobalPlayers();
        res.status(200).json({ success: true, data: players });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

playersRoute.get("/:name", async (req, res) => {
    try {
        const playerScores = await getPlayerScores(req);
        console.log(playerScores)
        res.status(200).json({ success: true, data: playerScores });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

export { gameRoute, leaderboardRoute, playersRoute, statsRoute };
