import {
    createScore,
    playerScores,
    TopGamePlayers,
    TopGlobalPlayers,
} from "./dbService.js";

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

async function getPlayerScores(req) {
    const allScores = await playerScores(req.params.name);
    const bestScores = {};
    for (const score of allScores) {
        const gameName = score.game;
        const points = score.points;
        if (!bestScores[gameName] || points > bestScores[gameName.points]) {
            bestScores[gameName] = points;
        }
    }
    const bestPerGame = [];
    for (const game in bestScores) {
        bestPerGame.push({ game,  best: bestScores[game] });
    }
    return {
        allScores: allScores.map((score) => score.points),
        bestPerGame,
    };
}

export {
    createNewScore,
    getPlayerScores,
    tenTopGamePlayers,
    tenTopGlobalPlayers,
};
