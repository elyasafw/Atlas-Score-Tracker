import {
    createScore,
    playerScores,
    TopGamePlayers,
    TopGlobalPlayers,
    allScores,
    listGames,
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

async function getStats() {
    const scores = await allScores();

    const totalScores = scores.length;

    let pointsSum = 0;
    let highestScore = null;
    const gamesCount = {};

    for (const score of scores) {
        pointsSum += score.points;

        if (!highestScore || score.points > highestScore.points) {
            highestScore = {
                playerName: score.playerName,
                points: score.points,
                game: score.game,
            };
        }

        gamesCount[score.game] = (gamesCount[score.game] || 0) + 1;
    }

    let mostPopularGame = null;
    let mostPopularGameCount = 0;
    for (const game in gamesCount) {
        if (gamesCount[game] > mostPopularGameCount) {
            mostPopularGame = game;
            mostPopularGameCount = gamesCount[game];
        }
    }

    const averageScore = totalScores ? pointsSum / totalScores : 0;

    return {
        totalScores,
        averageScore,
        mostPopularGame,
        highestScore,
    };
}

async function getGames() {
    return await listGames();
}

export {
    createNewScore,
    getPlayerScores,
    tenTopGamePlayers,
    tenTopGlobalPlayers,
    getStats,
    getGames,
};
