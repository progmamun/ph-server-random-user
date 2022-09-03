const express = require('express');
const userControllers = require('../../controller/userController.js');
const validateUser = require('../../middleware/validateUser');
const uniqueIdValidation = require('../../middleware/uniqueIdValidation');
const validateUserId = require('../../middleware/validateUserId');
const bodyValidation = require('../../middleware/bodyValidation');
const router = express.Router();

router.route('/random').get(userControllers.getRandomUser);
router.route('/all').get(userControllers.getAllUsers);

router
  .route('/save')
  .post(userControllers.postSaveUser, validateUser, uniqueIdValidation);

router
  .route('/update/bulk-update')
  .patch(userControllers.balkUpdate, bodyValidation);

router.route('/update/:id').patch(userControllers.updateUser, validateUserId);

router.route('/delete/:id').delete(userControllers.deleteUser, validateUserId);

module.exports = router;
