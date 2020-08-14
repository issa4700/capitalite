const { Mongoose } = require("mongoose")

const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    unitsHeld: {
        type: Number,
        required: true,
        default: 0
    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Partners', partnerSchema)