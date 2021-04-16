const dotenv = require("dotenv");
const { strict } = require("assert");
const axios = require("axios");
dotenv.config();
const steamUrl = process.env.STEAM_GAMES_URL;
const Game = require("../Games");

const getSteamGames = async () => {
  try {
    const gamesList = await axios.get(steamUrl);
    return gamesList.data.applist.apps;
  } catch (error) {
    throw new Error(error);
  }
}

const importGames = async () => {
  try {
    const games = await getSteamGames();
    console.log(games.length);
    await Game.bulkDelete({});
    const bulk = await Game.bulkCreate(games);
    console.log(bulk)
  } catch (error) {
    throw new Error(error);
  }
};

importGames();
