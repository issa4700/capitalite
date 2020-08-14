const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
require('dotenv').config()

//Routes
const partnersRouter = require('./routes/partners')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.error(error))
db.on('open', () => console.log(`Connected to Mongoose`))

// Use routers
app.use('/partners', partnersRouter)

app.listen(process.env.PORT || 3000)
