const express = require('express')
const router = express.Router()

const finData = require('../models/_finData')
const Partners = require('../models/partners')
const getUnits = require('../models/_getUnits')

router.get('/', async (req, res) => {
    try {
        const portfolio  = await finData()
        const totalUnits = await getUnits()

        // Additional Calculations
        const unitPrice = portfolio.AUM/totalUnits
                
        res.render('index', {
            pageTitle: 'Home',
            aum: portfolio.AUM,
            portfolio: portfolio.portfolio.sort((a, b) => b.currentVal - a.currentVal).slice(-5),
            portfolioValue: portfolio.portfolioVal,
            capGrowth: portfolio.capitalGrowth,
            unitPrice: unitPrice
        })
    } catch (error) {
        
    }
})

module.exports = router