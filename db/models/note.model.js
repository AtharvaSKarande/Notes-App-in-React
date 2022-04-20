const mongoose = require('mongoose');

const noteScema = new mongoose.Schema({
    text: String,
    link: String,
});

module.exports = mongoose.model("Note",noteScema);