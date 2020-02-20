const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = Schema({
    username: {
        type: String,
        unique: true 
    },
    password: {
        type: String
    },
    googleId: {
        type: String,
        unique: true
    },
    displayName: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User