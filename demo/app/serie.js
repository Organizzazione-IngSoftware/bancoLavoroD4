const express = require('express');
const router = express.Router();
const Serie = require('./models/serie');



router.get('/getById/:id', async (req, res) => { //ok
    let mySerie = await Serie.findById(req.params.id);
    res.status(200).json({
        self: '/api/v1/serie/' + mySerie.id,
        titolo: mySerie.titolo
    });
});



router.post('', async (req, res) => { //ok
    let mySerie = await Serie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    if (!mySerie) {
        let newSerie = new Serie ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            etaCons: req.body.etaCons,
            copertina: req.body.copertina,
            generi: req.body.generi,
            piattaforme: req.body.piattaforme,
            stagioni: req.body.stagioni,
        });
        newSerie = await newSerie.save();
        let serieId = newSerie.id;
        console.log('Serie salvata con successo');
        res.location("/api/v1/serie/" + serieId).status(201).send(); //201 posted
    } else {
        console.log('Questa serie risulta essere già esistente nel database');
        res.status(403).send();
    }
});



router.get('', async (req, res) => { //ok
    let mySeries = await Serie.find({});
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id,
            titolo: mySeries.titolo,
            regista: mySeries.regista,
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('', async (req, res) => { //ok
    await Serie.deleteMany({});
    console.log('Serie rimossa dal database');
    res.status(204).send(); //204 deleted
});



router.get('/:parametro', async (req, res) => { //ok
    let mySeries = await Serie.find({ $or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }] });
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id,
            titolo: mySeries.titolo,
            regista: mySeries.regista
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('/:titolo/:regista', async (req, res) => { //ok
    let mySerie = await Serie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!mySerie) {
        res.status(404).send(); //404 not found
        console.log('Non ho trovato la serie che vuoi eliminare');
        return;
    }
    await mySerie.deleteOne();
    console.log('Serie rimossa dal database');
    res.status(204).send(); //204 removed
});





//Esporto le funzioni definite
module.exports = router;