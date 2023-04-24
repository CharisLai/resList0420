const mongoose = require('mongoose')

// loading model and seeder.json
const data = require('../restaurant')
const dataList = require('../restaurant.json').results
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// mongodb connection status
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('MongoDB Working!')
    data.create(dataList)
        .then(() => {
            console.log('DataSeeder is DONE.')
            db.close()
        })
        .catch(err => console.error)
})