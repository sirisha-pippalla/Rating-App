const mongoose = require('mongoose');
const filmList = mongoose.Schema(
    {
        "name": {
            type: String,
            required: [true, ("Film name is mandotary")]
        },

        "rating": {
            type: Number,
            required: true
        },

    },
    {
        timestamps: true,
    }
)

const filmData = mongoose.model('filmlist', filmList);
module.exports = filmData;