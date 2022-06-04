const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }, 
    text: {
        type: String,
        required: true
    }
});

module.exports = messageSchema;