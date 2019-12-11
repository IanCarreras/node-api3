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
            .catch(err => {
                res.status(500).json({ message: 'there was an error retrieving the user'})
            })
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

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}