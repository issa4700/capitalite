const express = require('express')
const router = express.Router()
const Trade = require('../models/trade')
const Ledger = require('../models/ledger')

const currency = require('../models/_currency')
const finData = require('../models/_finData')
const stockQuote = require('../models/_stockQuote')

// Show all partners
router.get('/', async (req, res) => {
    try {
        const data = await finData()
        
        res.json(data)
    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err}`)
    }
})

router.get('/api', async (req, res) => {
    
    try {
        const portfolio = await finData()
        res.json({ portfolio })

    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err}`)
    }
})

module.exports = router