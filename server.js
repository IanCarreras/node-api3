const express = require('express');
const helmet = require('helmet')
const logger = require('./middleware/logger')
const validate = require('./middleware/validate')
const server = express()

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
server.use(helmet())
server.use(logger())
server.use(express.json())

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: err.message
    })
})

module.exports = server;