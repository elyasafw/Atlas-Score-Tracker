import { createScore, TopGamePlayers } from "./dbService.js";

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

export { createNewScore, tenTopGamePlayers };
