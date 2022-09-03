const express = require('express');
const userControllers = require('../../controller/userController.js');
const router = express.Router();

router.route('/').get(userControllers.getAllUsers);

module.exports = router;
