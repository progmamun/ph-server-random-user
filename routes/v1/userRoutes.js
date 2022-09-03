const express = require('express');
const userControllers = require('../../controller/userController.js');
const router = express.Router();

router.route('/random').get(userControllers.getRandomUser);
router.route('/all').get(userControllers.getAllUsers);

router.route('/save').post(userControllers.postSaveUser);

module.exports = router;
