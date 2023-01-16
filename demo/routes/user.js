const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/userCreate', userController.newUser);
router.get('/user', userController.getAllUser);
router.delete('/user', userController.deleteAllUser);
router.get('/user/:username', userController.getOneUser);
router.delete('/user/:username', userController.deleteOneUser);
router.post('/user', userController.login);

module.exports = router;