const { Schema, model } = require('mongoose');

const GameSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    otherTitle: [String],
    developers: [String],
    publishers: [String],
    genres: [String],
    firstReleased: Date,
    japanRelease: Date,
    usaRelease: Date,
    euroRelease: Date,
}, {strict: false, collection: 'games'});

const Game = model('Game', GameSchema);

module.exports = {
    find: (criteria) => {
        const { q, limit, page, fields, orderBy, sortBy = 1 } = criteria;
        const offset = (page > 1) ? (page - 1) * limit : 0;
        const query = Game.find();
        if(q) {
            const regex = new RegExp(`.*${q}.*`,'i');
            const searchQuery = {
                $or: [
                    {title: regex},
                    {otherTitle: regex},
                    {publishers: regex},
                    {developers: regex}
                ]
            };
            query.find(searchQuery);
        }
        if(limit) query.limit(limit);
        if(offset) query.skip(offset);
        if(fields) query.select(fields.split(','));
        if(orderBy) query.sort({[orderBy]: sortBy});
        return query.exec();
    },    
}