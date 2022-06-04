const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    author: {
        email: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        surname: {
            type: String,
            require: true
        },
        age: {
            type: Number,
            require: true
        },
        alias: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        }
    },
    text: {
        type: String,
        require: true
    },
    timestamp: {
        type: Date, 
        default: new Date()
    },
}, {versionKey: false})

module.exports = messageSchema;