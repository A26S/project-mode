const express = require('express')
const mongoose = require('mongoose')
const keys = require('./nodemon.json')

const authRoutes = require('./routes/auth')


const app = express()
app.use(express.json())
mongoose.connect(keys.MONGO_ATLAS_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use('/auth', authRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))