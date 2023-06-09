const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// router: main page, all data from database
router.get('/', (req, res) => {
    const userId = req.user._id
    console.log(userId)
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurant => res.render('index', { restaurant }))
        .catch(error => console.error(error))
})

module.exports = router