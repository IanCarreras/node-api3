const express = require('express');
const helmet = require('helmet')
const logger = require('./middleware/logger')
const server = express()
const userRouter = require('./users/userRouter')

server.use(helmet())
server.use(logger())
server.use(express.json())

server.use('/api/users', userRouter)

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

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;