const express = require('express');
const posts = require('./postDb')
const { validateUserId, validateUser, validatePost, validatePostId} = require('../middleware/validate')
const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => next(err))
});

router.get('/:id', validatePostId(), (req, res) => {
  res.json(req.post)
});

router.delete('/:id', (req, res) => {
  posts.remove(req.user.id)
    .then(post => {
      if (post === 1) {
        res.status(200).json({ message: 'deleted post'})
      }
    })
    .catch(err => next(err))
});

router.put('/:id', (req, res) => {
  posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      }
    })
    .catch(err => next(err))
});

module.exports = router;