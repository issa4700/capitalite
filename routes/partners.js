const express = require('express')
const router = express.Router()
const Partners = require('../models/partners')
const bcrypt = require('bcrypt')

// Show all partners
router.get('/', async (req, res) => {
    try {
        // Return list of partners
        const partners = await Partners.find({})

        async function getTotalUnits() {
            if (partners != null && partners.length > 0) {
                const aggregate = await Partners.aggregate([{
                    $group: {
                        _id: null,
                        "amount": {
                            $sum: "$unitsHeld"
                        }
                    }
                }])
                return aggregate[0].amount
            } else {
                return 0
            }
        }

        res.render('partners/index', {
            pageTitle: "Partners",
            partners: partners,
            totalUnits: await getTotalUnits()
        })

    } catch (err) {
        // REMOVE IN PRODUCTION
        console.log('Error:: \n' + err)
        res.redirect('/')
    }
})

// Display new author page
router.get('/new', (req, res) => {
    res.render('partners/new', { 
        pageTitle: "Add new partner", 
        partners: new Partners()
    })
})

// Show specific author
router.get('/:username', async (req, res) => {
    try {
        const partner = await Partners.findOne({ username: req.params.username })
        if (partner != null) {
            res.render('partners/partner', {
                pageTitle: partner.displayName, 
                partner: partner 
            })
        } else {
            res.redirect('/partners')
        }
    } catch (err) {
        res.redirect('/partners')
    }
})

// Add new author to DB
router.post('/', async (req, res) => {
    // Check if user already exists
    try {
        const partners = await Partners.find({ username: req.body.username })
        if (partners.length > 0) {
            // User exists
            res.render('partners/new', {
                pageTitle: "Error",
                errorMessage: `Partner already exists!`
            })
        } else {
            // User does not exist, thus create new user
            const partner = new Partners({
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                displayName: req.body.displayName,
                unitsHeld: req.body.unitsHeld
            })

            try {
                const newPartner = await partner.save()
                res.redirect(`partners`)
            } catch (err) {
                res.render('partners/new', {
                    errorMessage: `Error creating new partner! ${err}`
                })
            }
        }
    } catch (err) {
        res.render('partners/new', {
            errorMessage: `Error creating new partner! ${err}`
        })
    }    
})

module.exports = router