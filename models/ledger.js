const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    trxType: {
        type: String,
        required: true
    },
    trxDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    grossAmount: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
})

module.exports = mongoose.model('Ledger', ledgerSchema)