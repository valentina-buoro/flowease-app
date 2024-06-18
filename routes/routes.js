const express = require('express')
const route = express.Router()

const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const milestoneRouter = require('./milestoneRouter')
const clockingRouter = require('./clockingRouter')

route.get('/', async (req, res) => res.send('Welcome'))
route.use('/users', userRouter)
route.use('/projects', projectRouter)
route.use('/milestones', milestoneRouter)
route.use('/clockings', clockingRouter)

module.exports = route