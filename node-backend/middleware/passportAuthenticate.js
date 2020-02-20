const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../nodemon.json')

const { googleConfig } = require('../controllers/oauthController')

passport.use(
    new GoogleStrategy({
        clientID: keys.GOOGLE.CLIENT_ID,
        clientSecret: keys.GOOGLE.CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, googleConfig)
)

const passportAuthenticate = {

    getCode: passport.authenticate('google', {
        session: false,
        scope: ['profile']
    }),

    getUser: passport.authenticate('google', { session: false })

}

module.exports = passportAuthenticate