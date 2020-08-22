const mongoose = require('mongoose')

const tradeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    trxDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    tickerExchange: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    amountShares: {
        type: Number,
        required: true
    },
    avgPrice: {
        type: Number,
        required: true
    },
    trxFees: {
        type: Number,
        required: true
    },
    grossAmount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Trade', tradeSchema)