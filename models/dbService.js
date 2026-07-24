import db from "./connectDB.js";

const collection = db.collection("score");

function createScore(data) {
    return collection.insertOne(data);
}

function TopGamePlayers(gameName) {
    return collection.find(gameName).sort({ points: -1 }).limit(10).toArray();
}

function TopGlobalPlayers() {
    return collection
        .find()
        .sort({ points: -1 })
        .limit(10)
        .project({
            _id: 0,
            playerName: 1,
            game: 1,
            points: 1,
            createdAt: 1,
        })
        .toArray();
}

function playerScores(name) {
    return collection
        .find({ playerName: name })
        .sort({ createdAt: -1 })
        .toArray();
}

export { createScore, playerScores, TopGamePlayers, TopGlobalPlayers };
