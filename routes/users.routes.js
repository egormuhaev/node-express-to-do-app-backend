const Router = require('express').Router
const router = new Router()
const userController = require('../controller/users.controller')

router.post('/user/sign_up', userController.addNewUser)
router.post('/user/validation/email', userController.validationEmailSignUp)
router.post('/user/validation/password', userController.validationPasswordSignUp)
router.post('/user/validation/username', userController.validationUsernameSignUp)
router.post('/user/sign_in', userController.getUser) 
router.get('/user/:id', userController.getUserById)


module.exports = router