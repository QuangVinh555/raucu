const express = require('express');
const UserControllers = require('../controllers/UserControllers');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);
router.get('/', verifyToken, UserControllers.get);

module.exports = router