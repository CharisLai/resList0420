const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require("mongoose")
const dataList = require('./restaurant.json')
const bodyParser = require('body-parser')
const restaurant = require('./models/restaurant')
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
app.use(bodyParser.urlencoded({ extended: true }))

// routes: index, all data from database
app.get('/', (req, res) => {
    restaurant.find()
        .lean()
        .then(data => res.render('index', { data: data }))
        .catch(error => console.error(error))
})
// routes: Create-get
app.get('/restaurant/new', (req, res) => {
    res.render('new')
})
// routes: show
app.get('/restaurants/:id', (req, res) => {
    const One = dataList.results.find(One => One.id.toString() === req.params.id)
    res.render('show', { show: One })
})

// routes: search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = dataList.results.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.name.toLowerCase().includes(keyword)
    })
    res.render('index', { data: restaurants })
})

// routes: Create -POST
app.post('/restaurants', (req, res) => {
    restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    console.log(req.body)
})

// routes: Show
app.get('/', (req, res) => {

})
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})