const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const bodyParser = require('body-parser')

//express-handlebar
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// router
const routes = require('./routes')
require('./config/mongoose')

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// method-Override
app.use(methodOverride('_method'))
// routes
app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
