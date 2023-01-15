const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/user', userController.newUser);
router.get('/user', userController.getAllUser);
router.delete('/user', userController.deleteAllUser);
router.get('/user/:username', userController.getOneUser);
router.delete('/user/:username', userController.deleteOneUser);

module.exports = router;