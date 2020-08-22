const Trade = require('../models/trade')
const Ledger = require('../models/ledger')
const stockQuote = require('../models/_stockQuote')

module.exports = async () => {
    try {
        // Aggregate values
        const totalCash = Ledger.aggregate([{ $group: { _id: null, amount: { $sum: "$grossAmount" } } }])
        const stocksHeld = Trade.aggregate([{ $group: { _id: "$ticker", amountShares: { $sum: "$amountShares" } } }])
        const tradeTransaction = Trade.aggregate([{ $group: { _id: "$type", grossAmount: { $sum: "$grossAmount" } } }])
        const trxFees = Trade.aggregate([{ $group: { _id: null, totalFees: { $sum: "$trxFees" } } }])

        // Return promise
        const finData = await Promise.all([totalCash, stocksHeld, tradeTransaction, trxFees])

        // Initialize Data
        const cashDeposited = finData[0][0] ? finData[0][0].amount : 0
        const buyAmount = finData[2].find(trx => trx._id === 'buy') ? finData[2].find(trx => trx._id === 'buy').grossAmount : 0
        const sellAmount = finData[2].find(trx => trx._id === 'sell') ? finData[2].find(trx => trx._id === 'sell').grossAmount : 0
        const totalFees = finData[3].length > 0 ? finData[3][0].totalFees : 0
        const stocks = finData[1] ? finData[1] : null

        // Portfolio Calculations
        const quotes = await stockQuote(stocks.map(stock => stock._id))

        let portfolio = []
        stocks.forEach((stock, index) => {
            let quote = quotes.find(s => s.ticker == stock._id)
            portfolio.push({
                id: stock._id,
                ticker: quote.name,
                name: quote.companyName,
                shares: stock.amountShares,
                currentVal: quote.stockPrice * stock.amountShares,
                change: {
                    amount: quote.change.amount,
                    percentage: quote.change.percentage
                }
            })
        })

        

        // Additional Calculations
        const cashLiquid    = cashDeposited - buyAmount + sellAmount - totalFees
        const portfolioVal  = portfolio.reduce((acc, cur) => acc + cur.currentVal, 0)
        const AUM           = portfolioVal + cashLiquid
        const capitalGrowth = (((AUM-cashDeposited)/cashDeposited)*100).toFixed(2) + "%"; 

        const data = {
            AUM,
            capitalGrowth,
            cashDeposited,
            cashLiquid,
            buyAmount,
            sellAmount,
            totalFees,
            portfolioVal,
            portfolio
        }

        return data
    } catch (error) {
        throw error
    }
}