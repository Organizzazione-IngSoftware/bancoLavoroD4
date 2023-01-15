const express = require('express');
const router = express.Router();
const teaController = require('../controllers/tea');

router.post('/tea', teaController.newTea);
router.get('/tea', teaController.getAllTea);
router.delete('/tea', teaController.deleteAllTea);
router.get('/tea/:name', teaController.getOneTea);
router.delete('/tea/:name', teaController.deleteOneTea);

module.exports = router;