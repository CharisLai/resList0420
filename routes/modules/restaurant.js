const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// router: Create-get
router.get('/new', (req, res) => {
    res.render('new')
})

// router: show
router.get('/:id', (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    Restaurant.findById(id)
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

// router: Create -POST
router.post('/', (req, res) => {
    const id = req.params.id
    return Restaurant.create({ ...req.body })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
// router: Edit-GET
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(modify => res.render('edit', { modify }))
        .catch(error => console.log(error))
})
// router: Edit-POST
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router