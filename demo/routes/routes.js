const express = require('express');
const router = express.Router();

//Questo file andrebbe separato in 3 parti





//Routes per gli user
const userController = require('../controllers/user');

router.post('/user/createUser', userController.createUser);
router.delete('/user/deleteAllUser', userController.deleteAllUser);
router.get('/user/searchUser/:username', userController.searchUser);
router.delete('/user/deleteOneUser/:username', userController.deleteOneUser);
router.post('/user/login', userController.login);
router.get('/user/donation', userController.donation);
router.patch('/user/changePriv', userController.changePriv);





//Routes per i film
const movieController = require('../controllers/movie');

router.post('/movie/createMovie', movieController.createMovie);
router.get('/movie/getAllMovie', movieController.getAllMovie);
router.delete('/movie/deleteAllMovie', movieController.deleteAllMovie);
router.get('/movie/searchMovieTitleRegist/:parametro', movieController.searchMovieTitleRegist);
router.delete('/movie/deleteOneMovie/:titolo/:regista', movieController.deleteOneMovie);





//Routes per le serie
const serieController = require('../controllers/serie');

router.post('/serie/createSerie', serieController.createSerie);
router.get('/serie/getAllSerie', serieController.getAllSerie);
router.delete('/serie/deleteAllSerie', serieController.deleteAllSerie);
router.get('/serie/searchSerieTitleRegist/:parametro', serieController.searchSerieTitleRegist);
router.delete('/serie/deleteOneSerie/:titolo/:regista', serieController.deleteOneSerie);





module.exports = router;