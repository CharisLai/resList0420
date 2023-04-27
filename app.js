const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
// router
const routes = require('./routes')
require('./config/mongoose')
const usePassport = require('./config/passport')
const app = express()
const PORT = process.env.PORT || 3000

//express-handlebar
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
// express-session
app.use(session({
    secret: 'What is this?',
    resave: false,
    saveUninitialized: true
}))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// method-Override
app.use(methodOverride('_method'))

// Passport
usePassport(app)
// connect-flash
app.use(flash())
// 登入狀態更換導航列
app.use((req, res, next) => {
    console.log(req.user)
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.fail_msg = req.flash('fail_msg')
    res.locals.errors = req.flash('errors')
    next()
})
// routes
app.use(routes)



app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})
