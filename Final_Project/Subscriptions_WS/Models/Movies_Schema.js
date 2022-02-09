const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    name: String,
    genres: Array,
    image:Object,
    premiered:Date,
})

module.exports = mongoose.model('movies',moviesSchema);