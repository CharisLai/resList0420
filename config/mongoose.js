const mongoose = require("mongoose")
// connect MongoDB
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

// mongodb connection status
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('MongoDB is Working!')
})
module.exports = db
