const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// router: main page, all data from database
router.get('/', (req, res) => {
    const userId = req.user._id
    Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(data => res.render('index', { data }))
        .catch(error => console.error(error))
})

module.exports = router