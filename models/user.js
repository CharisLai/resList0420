const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: ture
    },
    email: {
        type: String,
        required: ture
    },
    password: {
        type: String,
        required: ture
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)