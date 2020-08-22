const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
require('dotenv').config()

//Routers
const indexRouter = require('./routes/index')
const partnersRouter = require('./routes/partners')
const tradesRouter = require('./routes/trades')
const ledgerRouter = require('./routes/ledger')
const testRouter = require('./routes/test')
const stockQuoteRouter = require('./routes/_stockQuote')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + 'public'));

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.on('open', () => console.log(`Connected to Mongoose`))

// Use routers
app.use('/partners', partnersRouter)
app.use('/trades', tradesRouter)
app.use('/ledger', ledgerRouter)
app.use('/test', testRouter)
app.use('/stquote', stockQuoteRouter)
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
