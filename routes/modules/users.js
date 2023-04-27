const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

// Login
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: true
}))

// register 
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []

    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All fields are required！' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Password and confirmation password do not match！' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }

    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: 'This Email registered' })
            return res.render('register', {
                errors,
                name,
                email,
                password,
                confirmPassword
            })
        }
        return User.create({
            name,
            email,
            password
        })
            .then(() => res.redirect('/'))
            .catch(error => console.error(error))
    })
        .catch(error => console.log(error))
})
// Logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You have successfully logged out')
    res.redirect('/users/login')
})
module.exports = router