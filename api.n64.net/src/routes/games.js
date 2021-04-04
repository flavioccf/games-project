const express = require('express');
const Games = require('../models/Games');
const router = express.Router();

router.get('/', async (req, res) => {
    const { q, limit, page, fields, orderBy, sortBy } = req.query;
    const DEFAULT_LIMIT = 10;
    const DEFAULT_PAGE = 1;
    const DEFAULT_ORDER_BY = 'title'

    const criteria = {
        limit: Number(limit) || DEFAULT_LIMIT,
        page: Number(page) || DEFAULT_PAGE,
        fields: fields || null,
        orderBy: orderBy || DEFAULT_ORDER_BY,
        sortBy: sortBy !== undefined ? Number(sortBy) : 1,
        q: q || null
    }
    const result = await Games.find(criteria);
    return res.json({
        message: 'Games OK',
        data: result
    });
});

module.exports = router;