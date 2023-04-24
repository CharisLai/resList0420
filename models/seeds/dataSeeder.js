const mongoose = require('mongoose')
const data = require('../restaurant')
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

    console.log('DataSeeder is DONE.')
})