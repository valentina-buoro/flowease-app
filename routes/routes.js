const express = require('express')
const route = express.Router()

route.get('/', async (req, res) => res.send('Welcome'))

module.exports = route