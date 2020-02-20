const express = require('express')

const router = express.Router()
const { signup, login } = require('../controllers/authController')
const { authorizeUser } = require('../controllers/oauthController')
const authenticateToken = require('../middleware/authenticateToken')
const { getCode, getUser } = require('../middleware/passportAuthenticate')

router.post('/signup', signup)

router.post('/login', login)

router.get('/google', getCode)

router.get('/google/redirect', getUser, authorizeUser)

router.post('/test', authenticateToken, (req, res) => {
    res.json({
        message: 'ok'
    })
})

// router.delete('/:userId', (req, res, next) => {
//     User.deleteOne({ __id: `ObjectId("${req.params.userId}")` })
    
//         .exec()
//         .then(result => {
//             console.log('deleting....................');
            
//             console.log(result)
//             console.log(req.params.userId)
//             res.status(200).json({
//                 message: 'deleted user'
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
//     //
// })

module.exports = router