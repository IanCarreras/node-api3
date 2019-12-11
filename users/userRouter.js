const express = require('express')
const users = require('./userDb')
const posts = require('../posts/postDb')
const { validateUserId, validateUser, validatePost } = require('../middleware/validate')

const router = express.Router({ mergeParams: true })

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => next(err))
})

router.post('/:id/posts', validateUserId(), validatePost(), (req, res) => {
  posts.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => next(err))
})

router.get('/', (req, res) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => next(err))
})

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
})

router.get('/:id/posts', validateUserId(), validatePost, (req, res) => {
  users.getUserPosts(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ message: 'invalid id'})
      }
    }) 
    .catch(err => next(err))
})

router.delete('/:id', validateUserId(), (req, res) => {
  users.remove(req.params.id)
    .then(user => {
      if (user === 1) {
        res.status(200).json({ message: 'deleted user'})
      }
    })
    .catch(err => next(err))
})

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      }
    })
    .catch(err => next(err))
})

module.exports = router