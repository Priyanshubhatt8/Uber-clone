const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const{registerSchema,loginSchema} = require('../validators/captain.validator')
const captainController = require('../controllers/captain.controller');

router.post('/register',validate(registerSchema), captainController.registerCaptain);
 router.post('/login',validate(loginSchema), captainController.loginCaptain);


module.exports = router;    