const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortID: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'User',
    },
    clicks: {
        type: Number,
        default: 0,
    },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;