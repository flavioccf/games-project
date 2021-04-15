const express = require("express");
const Games = require("../models/Games");
const router = express.Router();

router.get("/", async (req, res) => {
  const { q, limit, page, fields, orderBy, sortBy } = req.query;
  const DEFAULT_LIMIT = 10;
  const DEFAULT_PAGE = 1;
  const DEFAULT_ORDER_BY = "title";

  const criteria = {
    limit: Number(limit) || DEFAULT_LIMIT,
    page: Number(page) || DEFAULT_PAGE,
    fields: fields || null,
    orderBy: orderBy || DEFAULT_ORDER_BY,
    sortBy: sortBy !== undefined ? Number(sortBy) : 1,
    q: q || null,
  };
  try {
    const result = await Games.find(criteria);
    const count = await Games.count(criteria);
    return res.json({
      message: "Games listed",
      data: result,
      total: count,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const data = await Games.store(body);
    return res.json({
      message: "Game Stored",
      data: body,
    });
  } catch (error) {
    return res.status(403).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const game = await Games.update(id, body);
    if (game) {
      return res.json({
        message: "Game Updated",
        data: game,
      });
    } else {
      return res.status(404).json({
        message: "No data found to update",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { params } = req;
  const { id } = params;
  try {
    const game = await Games.destroy(id);
    if (game) {
      return res.json({
        message: "Game Deleted",
        data: game,
      });
    } else {
      return res.status(404).json({
        message: "No data found to delete",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send(error);
  }
});

module.exports = router;
