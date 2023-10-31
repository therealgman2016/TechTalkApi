const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./routes/users')
const pokemonRouter = require('./routes/pokemon')
const pokemon = require('./models/pokemon')

const SERVERDEVPORT = 4741
const CLIENTDEVPORT = 5173

mongoose.connect(process.env.DATABASE_URL)

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${CLIENTDEVPORT}` }))

const PORT = process.env.PORT || SERVERDEVPORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)
app.use('/pokemon', pokemonRouter)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

module.exports = app