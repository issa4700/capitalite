const express = require('express')
const router = express.Router()
const Trade = require('../models/trade')

// Show all partners
router.get('/', async (req, res) => {
    try {
        const trades = await Trade.find({}).sort({trxDate: 1})
        const totalFees = trades.reduce((acc, val) => acc + val.trxFees, 0)

        res.render('trades/index', {
            pageTitle: "Trades",
            trades: trades,
            totalFees: totalFees
        })

    } catch (err) {
        res.status(500)
        res.render('error', {error: err})
    }
})

// Display new trade page
router.get('/new', (req, res) => {
    res.render('trades/new', {pageTitle: "Add trade"})
})

// Show specific author
router.get('/view/:id', async (req, res) => {
    try {
        const partner = await Partners.findOne({ username: req.params.username })
        if (partner != null) {
            res.render('partners/partner', { partner: partner })
        } else {
            res.redirect('/partners')
        }
    } catch (err) {
        res.status(500)
        res.render('error', { error: err })
    }
})

// Add new author to DB
router.post('/', async (req, res) => {
    const avgPrice = req.body.avgPrice
    const trxFees = req.body.trxFees
    const trxType = req.body.trxType

    const grossAmount = () => {
        return req.body.amountShares * avgPrice
    }

    let { amountShares } = req.body
    if (trxType === 'sell') {
        amountShares = amountShares*-1
    }

    const trade = new Trade({
        type: req.body.trxType,
        trxDate: req.body.trxDate,
        tickerExchange: req.body.tickerExchange,
        ticker: req.body.ticker,
        amountShares: amountShares,
        avgPrice: avgPrice,
        trxFees: trxFees,
        grossAmount: grossAmount()
    })

    try {
        const newTrade = await trade.save()
        res.redirect('trades')
    } catch (err) {
        res.render('partners/new', {
            pageTitle: `New Trade`,
            errorMessage: err
        })
    }
})

module.exports = router