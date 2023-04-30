const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurant')
const users = require('./modules/users')
const search = require('./modules/search')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/restaurant', authenticator, restaurants)
router.use('/search', search)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router