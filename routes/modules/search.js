const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    const userId = req.user._id
    const keyword = req.query.keyword.trim().toLowerCase()
    return Restaurant.find({ userId })
        .lean()
        .then((restaurant) => {
            const Search = restaurant.filter((data) => {
                return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
            })
            res.render('index', { restaurant: Search, keyword })
            console.log(keyword)
        })
        .catch(error => {
            console.error(error)
            res.render('error')
        })
})
module.exports = router