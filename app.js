const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require("mongoose")
const dataList = require('./restaurant.json')
const port = 3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = express()
// mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// mongodb connection status
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('MongoDB Working!')
})
//express-handlebar
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// routes: index
app.get('/', (req, res) => {
    res.render('index', { data: dataList.results })
})

// routes: show
app.get('/restaurants/:id', (req, res) => {
    console.log('req.params.id', req.params.id)
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

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})