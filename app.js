// express
const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
//express-handlebar
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})