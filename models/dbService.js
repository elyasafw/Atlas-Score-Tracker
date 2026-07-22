import db from "./connectDB.js";

const collection = db.collection("score");

function createScore(data) {
    return collection.insertOne(data);
}

function TopGamePlayers(gameName) {
    return collection.find(gameName).sort({ points: -1 }).limit(10).toArray();
}

export { createScore, TopGamePlayers };
