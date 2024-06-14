const express = require('express')
const userRouter = express.Router()
const createUser = require('../controllers/userControllers/signupController')
const { verifyMail, sendConfirmationMail } = require('../controllers/userControllers/verifyMailController')
const userLogin = require('../controllers/userControllers/loginController')
const { authenticate } = require('../middleware/authentication')
const getUser = require('../controllers/userControllers/viewProfileController')
const getUserById = require('../controllers/userControllers/viewUserController')
const updateUser = require('../controllers/userControllers/updateProfileController')
const upload = require('../utils/imageUpload')

userRouter.post('/register', createUser)
userRouter.get('/verify', verifyMail, sendConfirmationMail)
userRouter.post('/login', userLogin)
userRouter.get('/user', authenticate, getUser)
userRouter.get('/:user_id/user', getUserById)
userRouter.put('/user/edit', authenticate, upload.single('profile_picture'), updateUser)

module.exports = userRouter