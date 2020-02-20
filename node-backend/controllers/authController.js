const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../nodemon.json')

const User = require('../models/User')

const authController = {

    signup: (req, res) => {
        User.findOne({ username: req.body.username })
            .exec()
            .then(user => {
                if (user) {
                    return res.status(409).json({
                        message: 'username already taken'
                    })
                } else {
                    bcrypt.hash(req.body.password, 10, (err, securePassword) => {
                        if (err) {
                            res.statusCode(500).json({
                                error: err,
                                message: 'issue with bcrypt'
                            })
                        } else {
                            const user = new User({
                                username: req.body.username,
                                password: securePassword,
                                displayName: req.body.nickname
                            })
                            user
                                .save()
                                .then(result => {
                                    res.status(201).json({
                                        user: result,
                                        message: 'user created'
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err,
                                        message: 'couldnt create user'
                                    })
                                })
                            //
                        }
    
                    })
                }
            })
        //
    },

    login: (req, res) => {
        User.findOne({ username: req.body.username })
            .exec()
            .then(user => {
                if (!user) {
                    res.status(400).json({
                        message: 'couldnt find username'
                    })
                } else {
                    bcrypt.compare(req.body.password, user.password, (err, result) => {
                        if (err) {
                            res.status(400).json({
                                error: err,
                                message: 'issue with bcrypt'
                            })
                        } else if (!result) {
                            res.status(401).json({
                                message: 'incorrect password'
                            })
                        } else {
                            const token = jwt.sign({ 
                                id: user.id 
                            }, 
                            keys.JWT_KEY, { 
                                expiresIn: '1h'
                            })
                            return res.status(200).json({
                                user: user.id,
                                message: 'logging you in ...',
                                token: token
                            })
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        //
    }
    
}

module.exports = authController