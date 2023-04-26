const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurant')
const users = require('./modules/users')
router.use('/', home)
router.use('/restaurant', restaurants)
router.use('/users', users)

module.exports = router