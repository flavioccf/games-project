const fs = require('fs');
const dotenv = require('dotenv');
const { Schema, model, connect } = require('mongoose');
const { strict } = require('assert');
dotenv.config();

const GameSchema = new Schema({
    title: String
}, {strict: false, collection: 'games'});

const Game = model('Game', GameSchema);

const parseJSON = (data) => {
    try {
        return JSON.parse(data);
    } catch(error) {
        return null;
    }
}   

const connectToDB = () => {
    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    return connect(process.env.MONGO_DB, options);
}

const readGamesFromFile = (filename) => {
    const promiseCallback = (resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) return reject(err);
            const json = parseJSON(data);
            if(!json) return reject(`${filename} No parsable`);
            return resolve(json);
        });
    }
    return new Promise(promiseCallback);
}

const storeGame = (data) => {
    const game = new Game(data);
    return game.save();
}

const importGames = async () => {
    await connectToDB();
    const games = await readGamesFromFile('games.json');
    for (let index = 0; index < games.length; index++) {
        const game = games[index];   
        await storeGame(game);    
        console.log(game.title); 
    }
    process.exit;
}

importGames();