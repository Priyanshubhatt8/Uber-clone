const express = require('express')
const router = express.Router()
const{registerSchema,loginSchema} = require('../validators/auth.validator')
const validate = require('../middlewares/validate')
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', validate(registerSchema),userController.registerUser)
router.post('/login',validate(loginSchema),userController.login)
router.get('/profile',authMiddleware.authenticate,userController.getUserProfile)
router.get('/logout',authMiddleware.authenticate,userController.logout)

module.exports = router