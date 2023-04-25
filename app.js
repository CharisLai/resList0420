const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
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
// method-Override
app.use(methodOverride('_method'))

// router: main page, all data from database
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(data => res.render('index', { data }))
        .catch(error => console.error(error))
})
// router: Create-get
app.get('/restaurant/new', (req, res) => {
    res.render('new')
})

// router: show
app.get('/restaurant/:id', (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    Restaurant.findById(id)
        .lean()
        .then(show => res.render('detail', { show }))
        .catch(error => console.log(error))
})

// router: search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = restaurant.results.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.name.toLowerCase().includes(keyword)
    })
    res.render('index', { data: restaurants })
})

// router: Create -POST
app.post('/restaurants', (req, res) => {
    const id = req.params.id
    return Restaurant.create({ ...req.body })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
// router: Edit-GET
app.get('/restaurant/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(modify => res.render('edit', { modify }))
        .catch(error => console.log(error))
})
// router: Edit-POST
app.put('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return Restaurant.findById(id)
        .then(modify => {
            modify.name = name
            modify.name_en = name_en
            modify.category = category
            modify.image = image
            modify.location = location
            modify.phone = phone
            modify.google_map = google_map
            modify.rating = rating
            modify.description = description
            return modify.save()
        })
        .then(() => res.redirect(`/restaurant/${id}`))
        .catch(error => console.log(error))
})
// router: Delete
app.delete('/restaurant/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})