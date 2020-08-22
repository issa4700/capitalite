// Outputs the total number of units
const Partners = require('../models/partners')

async function getTotalUnits() {
    const partners = await Partners.find({})
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

module.exports = async () => {
    let totalUnits = getTotalUnits()
    return totalUnits    
}