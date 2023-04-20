// express
const express = require('express')
const app = express()
const port = 3000
// restaurant data
const dataList = require('./restaurant.json')

const exphbs = require('express-handlebars')
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

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})