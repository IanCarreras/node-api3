const users = require('../users/userDb')
const posts = require('../posts/postDb')

function validateUserId() {
    return (req, res, next) => {
        users.getById(req.params.id)
            .then(user => {
                if (user) {
                    req.user = user
                    next()
                } 
                  
                res.status(400).json({ message: 'invalid user id'})
            })
            .catch(err => next(err))
    }
}

function validateUser() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: 'missing user data'})
        } else if (!req.body.name) {
            return res.status(400).json({ message: 'missing required name field'})
        }
        next()
    }
}

function validatePost() {
    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ message: 'missing post data'})
        } else if (!req.body.text) {
            return res.status(400).json({ message: 'missing required text field'})
        }
        next()
    }
}

function validatePostId() {
    return (req, res, next) => {
        posts.getById(req.params.id)
            .then(post => {
                if (post) {
                    req.post = post
                    next()
                } else {
                    res.status(404).json({ message: 'invalid id'})
                }
            })
            .catch(err => next(err))
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}