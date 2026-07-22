import { createScore, TopGamePlayers, TopGlobalPlayers } from "./dbService.js";

async function createNewScore(req, res) {
    const data = req.body;
    data.createdAt = new Date();
    const newScore = await createScore(data);
    const createdScore = {
        _id: newScore.insertedId,
        ...data,
    };
    return createdScore;
}

async function tenTopGamePlayers(req, res) {
    const topPlayers = await TopGamePlayers(req.params);
    return topPlayers;
}

async function tenTopGlobalPlayers() {
    const topPlayers = await TopGlobalPlayers();
    return topPlayers;
}

export { createNewScore, tenTopGamePlayers, tenTopGlobalPlayers };
