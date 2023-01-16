//Controller per gli user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUser);
router.delete('/user', userController.deleteAllUser);
router.get('/user/:username', userController.searchUser);
router.delete('/user/:username', userController.deleteOneUser);
router.post('/userLogin', userController.login);
router.get('/userDonation', userController.donation);
router.post('/userChangePriv', userController.changePriv);





//Controller per i film
const movieController = require('../controllers/movie');

router.post('/movie', movieController.createMovie);
router.get('/movie', movieController.getAllMovie);
router.delete('/movie', movieController.deleteAllMovie);
router.get('/movie/:titolo', movieController.searchMovieTitle);
router.delete('/movie/:titolo', movieController.deleteOneMovie);

module.exports = router;