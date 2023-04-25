const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require("mongoose")

const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
// const restaurant = require('./models/restaurant')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
// connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// mongodb connection status
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('MongoDB is Working!')
})
//express-handlebar
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
// body-parser
app.use(express.urlencoded({ extended: true }))

// routes: main page, all data from database
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(data => res.render('index', { data }))
        .catch(error => console.error(error))
})
// routes: Create-get
app.get('/new', (req, res) => {
    res.render('new')
})
// routes: show
app.get('/restaurant/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(show => res.render('detail', { show }))
        .catch(error => console.log(error))
})

// routes: search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = restaurant.results.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.name.toLowerCase().includes(keyword)
    })
    res.render('index', { data: restaurants })
})

// routes: Create -POST
app.post('/restaurants', (req, res) => {
    const userId = req.user._id
    return Restaurant.create({ ...req.body, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    // console.log(req.body)
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})