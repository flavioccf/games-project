const { Schema, model } = require("mongoose");

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    appid: {
      type: Number,
      required: true,
      unique: true
    },
  },
  { strict: false, collection: "games" }
);

const Game = model("Game", GameSchema);

module.exports = {
  find: (criteria) => {
    const { q, limit, page, fields, orderBy, sortBy = 1 } = criteria;
    const offset = page > 1 ? (page - 1) * limit : 0;
    const query = Game.find();
    if (q) {
      const regex = new RegExp(`.*${q}.*`, "i");
      const searchQuery = {
        $or: [
          { name: regex },
          { appid: regex }
        ],
      };
      query.find(searchQuery);
    }
    if (limit) query.limit(limit);
    if (offset) query.skip(offset);
    if (fields) query.select(fields.split(","));
    if (orderBy) query.sort({ [orderBy]: sortBy });
    return query.exec();
  },
  count: (criteria) => {
    const { q } = criteria;
    const query = Game.find();
    if (q) {
      const regex = new RegExp(`.*${q}.*`, "i");
      const searchQuery = {
        $or: [
          { name: regex },
          { appid: regex }
        ],
      };
      query.find(searchQuery);
    }
    return query.countDocuments();
  },
  store: (data) => {
    const game = new Game(data);
    return game.save();
  },
  bulkDelete: (data) => {
    return Game.deleteMany(data);
  },
  bulkCreate: (dataArray) => {
    return Game.insertMany(dataArray, { ordered: false }, (error, docs) => {
      if(error) return error;
      return docs;
    })
  },
  update: (id, data, options = { new: true }) => {
    return Game.findByIdAndUpdate(id, data, options);
  },
  destroy: (id) => {
    return Game.findByIdAndDelete(id);
  },
};
