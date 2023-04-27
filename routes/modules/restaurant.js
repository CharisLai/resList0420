const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// router: Create-get
router.get('/new', (req, res) => {
    res.render('new')
})

// router: Create -POST
router.post('/', (req, res) => {
    const userId = req.user._id
    return Restaurant.create({ ...req.body, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// router: show
router.get('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Restaurant.findOne({ _id, userId })
        .lean()
        .then(show => res.render('detail', { show }))
        .catch(error => console.log(error))
})

// router: search
router.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = restaurant.results.filter(data => {
        return data.name.toLowerCase().includes(keyword) || data.name.toLowerCase().includes(keyword)
    })
    res.render('index', { data: restaurants })
})

// router: Edit-GET
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(modify => res.render('edit', { modify }))
        .catch(error => console.log(error))
})
// router: Edit-POST
router.put('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return Restaurant.findOne({ _id, userId })
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
        .then(() => res.redirect(`/restaurant/${_id}`))
        .catch(error => console.log(error))
})
// router: Delete
router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOne({ _id, userId })
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router