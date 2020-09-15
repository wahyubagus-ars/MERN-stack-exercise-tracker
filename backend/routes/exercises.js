const exerciseRouter = require('express').Router()
let Exercise = require('../models/exercise.model')

exerciseRouter.route('/').get((err, res) => {
    Exercise.find()
    .then(exercise =>  res.json(exercise))
    .catch(err => res.status(400).json('Errors: ' + err))
})

exerciseRouter.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(exercise =>  res.json('exercises added: ' + exercise))
    .catch(err => res.status(400).json('Errors: ' + err))
})

exerciseRouter.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise =>  res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

exerciseRouter.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise =>  res.json('Exercise data deleted!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

exerciseRouter.route('/update/:id').post((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise =>  {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date(req.body.date);

        exercise.save()
        .then(exercise =>  res.json('exercises updated: ' + exercise))
        .catch(err => res.status(400).json('Errors: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = exerciseRouter