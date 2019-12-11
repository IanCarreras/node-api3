module.exports = (type) => (req, res, next) => {
    // use type parameter for switch cases
    console.log({
        method: req.method,
        url: req.url,
        path: req.path,
        timestamp: new Date().toISOString()
    })
    next()
}