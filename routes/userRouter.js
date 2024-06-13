const express = require('express')
const userRouter = express.Router()
const createUser = require('../controllers/userControllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/userControllers/verifyMailController')
const userLogin = require('../controllers/userControllers/loginController')

userRouter.post('/register', createUser)
userRouter.get('/verify', verifyMail, sendConfirmationMail)
userRouter.post('/login', userLogin)

module.exports = userRouter