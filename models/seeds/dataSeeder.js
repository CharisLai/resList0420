const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const db = require('../../config/mongoose')
// loading model and seeder.json
const User = require('../user')
const restaurant = require('../restaurant')
const dataList = require('../restaurant.json').results
const SEED_USER = [{
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    indexField: [0, 1, 2]
},
{
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    indexField: [3, 4, 5]
}
]
// mongodb connection status
db.once('open', () => {
    Promise
        .all(SEED_USER.map(user => {
            const { name, email, password, indexField } = user
            return User.create(
                {
                    name,
                    email,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
                }
            )
                .then(user => {
                    const restaurants = indexField.map(index => {
                        const restaurant = dataList[index]
                        restaurant.userId = user._id
                        return restaurant
                    })
                    console.log('MongoDB Working!')
                    return restaurant.create(restaurants)
                })
        }))
        .then(() => {
            console.log('DataSeeder is DONE.')
            process.exit()
        })
        .catch(error => console.error(error))
        .finally(() => db.close)
})