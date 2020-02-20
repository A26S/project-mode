const jwt = require('jsonwebtoken')
const keys = require('../nodemon.json')

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, keys.JWT_KEY)
        res.status(200).json({
            decoded: decoded,
            message: 'authed'
        })
        next()
    } catch (err) {
        res.status(401).json({
            error: err,
            message: 'could not verify token'
        })
    }
}

module.exports = authenticateToken