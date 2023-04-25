const db = require('../../config/mongoose')
// loading model and seeder.json
const Restaurant = require('../restaurant')
const dataList = require('../restaurant.json').results

// mongodb connection status
db.once('open', () => {
    console.log('MongoDB Working!')
    Restaurant.create(dataList)
        .then(() => {
            console.log('DataSeeder is DONE.')
            db.close()
        })
        .catch(err => console.error)
})