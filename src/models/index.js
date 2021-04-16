const { connect } = require("mongoose");
const { options } = require("../routes/games");
const MONGODB_URL = process.env.MONGODB_URL;

console.log(MONGODB_URL);

module.exports = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  return connect(MONGODB_URL, options);
};
