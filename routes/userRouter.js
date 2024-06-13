const express = require('express')
const userRouter = express.Router()
const createUser = require('../controllers/userControllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/userControllers/verifyMailController')

userRouter.post('/register', createUser)
userRouter.get('/verify', verifyMail, sendConfirmationMail)

module.exports = userRouter