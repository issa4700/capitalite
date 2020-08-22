const express = require('express')
const router = express.Router()
const axios = require('axios').default
const cheerio = require('cheerio')

const stockQuote = require('../models/_stockQuote')

router.get('/:stnum', async (req, res) => {

    try {
        const stocks = [req.params.stnum]

        const quotes = await stockQuote(stocks)

        res.json(quotes)

    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err}`)
    }
})

module.exports = router