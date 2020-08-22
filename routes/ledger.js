const express = require('express')
const router = express.Router()
const Ledger = require('../models/ledger')

// Show all partners
router.get('/', async (req, res) => {
    try {
        const ledger = await Ledger.find({}).sort({ "trxDate": -1 }).limit(10)

        res.render('ledger/index', {
            pageTitle: "Ledger",
            ledger: ledger
        })

    } catch (err) {
        res.status(500).send(`Error:: ${err}`)
    }
})

// Display new trade page
router.get('/new', (req, res) => {
    res.render('ledger/new', {pageTitle:"New ledger"})
})

// Add new author to DB
router.post('/', async (req, res) => {

    try {
        const trxType = req.body.trxType
        let grossAmount = req.body.grossAmount

        if (!trxType === 'deposit' || !trxType === 'withdraw') {
            throw 'Invalid ledger type!'
        }

        if (trxType && trxType === 'withdraw') {
            grossAmount = Math.abs(grossAmount) * -1
        }

        const ledger = new Ledger({
            trxType: req.body.trxType,
            trxDate: req.body.trxDate,
            grossAmount: grossAmount,
            comment: req.body.comment
        })

        const newLedger = await ledger.save()
        res.redirect('ledger')
    } catch (err) {
        res.render('ledger/new', {
            pageTitle: "Error",
            errorMessage: `Error creating new ledger! <br> ${err}`
        })
    }
})

module.exports = router