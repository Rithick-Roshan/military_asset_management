const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');

router.post('/register',authController.createUser);
router.post('/login', authController.login);
router.post('/createbase', authController.createBase);
module.exports = router;