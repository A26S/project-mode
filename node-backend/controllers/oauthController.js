// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const keys = require('../nodemon.json')

const User = require('../models/User')

const oauthController = {

    googleConfig: (accessToken, refreshToken, profile, next) => {
        User.findOne({ googleId: profile.id })
            .exec()
            .then(currentUser => {
                if (currentUser) {
                    next((err) => {
                        res.status(500).json({
                            error: err
                        })
                    }, currentUser)
                } else {
                    new User({
                        googleId: profile.id,
                        displayName: profile.displayName
                    })
                        .save()
                        .then(newUser => {
                            next((err) => {
                                res.status(500).json({
                                    error: err,
                                    message: 'could not create user'
                                })
                            }, newUser)
                        })
                    //
                }
            })
        //
    },

    authorizeUser: (req, res) => {
        const token = jwt.sign({ 
                id: req.user.id 
            }, 
            keys.JWT_KEY, {
                expiresIn: '1h'
            })
        return res.status(200).json({
            message: 'google success',
            token: token
        })
    } 

}

module.exports = oauthController