const express = require("express");
const dotenv = require("dotenv");
const cookieParset = require("cookie-parser");
dotenv.config();
const getSteamGames = require("../src/models/seeds/import");

const connect = require("./models/index");
const gamesRouter = require("./routes/games");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
connect();

app.get("/", (req, res) => {
  return res.json({
    msg: "Running OK!",
  });
});

app.use("/games", gamesRouter);

app.listen(3000, () => {
  console.log("API Running on port 3000");
});
