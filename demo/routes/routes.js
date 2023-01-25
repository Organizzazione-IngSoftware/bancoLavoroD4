const express = require('express');
const router = express.Router();





//Routes per gli user
const userController = require('../controllers/user');

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUser);
router.delete('/user', userController.deleteAllUser);
router.get('/user/:username', userController.searchUser);
router.delete('/user/:username', userController.deleteOneUser);
router.post('/userLogin', userController.login);
router.get('/userDonation', userController.donation);
router.patch('/userChangePriv', userController.changePriv);





//Routes per i film
const movieController = require('../controllers/movie');

router.post('/movie', movieController.createMovie);
router.get('/movie', movieController.getAllMovie);
router.delete('/movie', movieController.deleteAllMovie);
router.get('/movie/:parametro', movieController.searchMovieTitleRegist);
router.delete('/movie/:titolo/:regista', movieController.deleteOneMovie);
router.post('/movieReview', movieController.makeReview);





//Routes per le serie
const serieController = require('../controllers/serie');

router.post('/serie', serieController.createSerie);
router.get('/serie', serieController.getAllSerie);
router.delete('/serie', serieController.deleteAllSerie);
router.get('/serie/:parametro', serieController.searchSerieTitleRegist);
router.delete('/serie/:titolo/:regista', serieController.deleteOneSerie);
router.post('/serieReview', serieController.makeReview);





module.exports = router;