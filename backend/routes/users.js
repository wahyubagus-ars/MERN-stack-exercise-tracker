const userRoute = require('express').Router()
let User = require('../models/user.models')

userRoute.route('/').get((err, res) => {
    User.find()
    .then(users =>  res.json(users))
    .catch(err => res.status(400).json('Errors: ' + err))
})

userRoute.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username})

    newUser.save()
    .then(users =>  res.json('User added'))
    .catch(err => res.status(400).json('Errors: ' + err))
})

module.exports = userRoute