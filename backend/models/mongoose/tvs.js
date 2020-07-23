const mongoose = require('mongoose');

const tvsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    place: String,
    number: String,
    channel: String,
    show: String,
    isactive: String
})

module.exports = mongoose.model('Tvs', tvsSchema);