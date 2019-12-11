const express = require('express')
const users = require('./userDb')
const { validateUserId, validateUser } = require('../middleware/validate')

const router = express.Router()

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
})

router.post('/:id/posts', (req, res) => {
  // do your magic!
})

router.get('/', (req, res) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id', (req, res) => {
  // do your magic!
})

router.get('/:id/posts', (req, res) => {
  // do your magic!
})

router.delete('/:id', (req, res) => {
  // do your magic!
})

router.put('/:id', (req, res) => {
  // do your magic!
})

module.exports = router