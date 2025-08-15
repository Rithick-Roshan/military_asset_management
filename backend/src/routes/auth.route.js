const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register',authController.createUser);
router.get('/login', authController.login);
module.exports = router;