import express from "express";
import { middleSchema, scoreSchema } from "../middleware.js";
import {
    createNewScore,
    getPlayerScores,
    tenTopGamePlayers,
    tenTopGlobalPlayers,
    getStats,
    getGames,
} from "../models/controller.js";

const leaderboardRoute = express.Router();
const playersRoute = express.Router();
const statsRoute = express.Router();
const gamesRoute = express.Router();

gamesRoute.post("/scores", middleSchema(scoreSchema), async (req, res) => {
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

statsRoute.get("/", async (req, res) => {
    try {
        const stats = await getStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

gamesRoute.get("/", async (req, res) => {
    try {
        const games = await getGames();
        res.status(200).json({ success: true, data: games });
    } catch (error) {
        res.status(400).json({ success: false, message: error });
    }
});

export {  leaderboardRoute, playersRoute, statsRoute, gamesRoute };
