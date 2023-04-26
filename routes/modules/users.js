const express = require('express')
const router = express.Router()
const User = require('../../models/user')
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', (req, res) => {

})
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ email }).then(user => {
        if (user) {
            console.log('User already exists.')
            function alert() {
                window.alert("test")
            }
            res.render('register', {
                name,
                email,
                password,
                confirmPassword
            })
        } else {
            return User.create({
                name,
                email,
                password
            })
                .then(() => res.redirect('/'))
                .alert('Redirect Done. Welcome to Record List')
                .catch(error => console.error(error))
        }
    })
        .catch(error => console.log(error))
})
module.exports = router