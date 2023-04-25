const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// router: main page, all data from database
router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(data => res.render('index', { data }))
        .catch(error => console.error(error))
})

module.exports = router