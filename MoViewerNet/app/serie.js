const express = require('express');
const router = express.Router();
const Serie = require('./models/serie');



router.post('/create', async (req, res) => { //ok
    let mySerie = await Serie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    if (!mySerie) {
        let newSerie = new Serie ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            etaCons: req.body.etaCons,
            copertina: req.body.copertina,
            stagioni: req.body.stagioni,
            generi: req.body.generi,
            piattaforme: req.body.piattaforme,
        });
        newSerie = await newSerie.save();
        let serieId = newSerie.id;
        console.log('Serie salvata con successo');
        res.location("/api/v1/serie/" + serieId).status(201).send(); //201 created
    } else {
        console.log('Questa serie risulta essere già esistente nel database');
        res.status(409).send(); //409 conflict
    }
});



router.get('/getAll', async (req, res) => { //ok
    let mySeries = await Serie.find({});
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id,
            titolo: mySeries.titolo,
            valutazione: mySeries.valutazione,
            copertina: mySeries.copertina,
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('/deleteAll', async (req, res) => { //ok
    await Serie.deleteMany({});
    console.log('Tutte le serie sono state rimosse con successo dal database');
    res.status(204).send(); //204 deleted
});



router.get('/getByTitleRegist/:parametro', async (req, res) => { //ok
    let mySeries = await Serie.find({$or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }]});
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id,
            titolo: mySeries.titolo,
            valutazione: mySeries.valutazione,
            copertina: mySeries.copertina,
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('/deleteOne/:titolo/:regista', async (req, res) => { //ok
    let mySerie = await Serie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!mySerie) {
        res.status(404).send(); //404 not found
        console.log('La serie che si vuole eliminare non esiste');
        return;
    }
    await mySerie.deleteOne();
    console.log('La serie è stata rimossa con successo');
    res.status(204).send(); //204 deleted
});



router.get('/:id', async (req, res) => { //ok
    let mySerie = await Serie.findById(req.params.id);
    res.status(200).json( { //200 success
        self: '/api/v1/serie/' + mySerie.id,
        titolo: mySerie.titolo,
        regista: mySerie.regista,
        etaCons: mySerie.etaCons,
        valutazione: mySerie.valutazione,
        copertina: mySerie.copertina,
        generi: mySerie.generi,
        piattaforme: mySerie.piattaforme,
        stagioni: mySerie.stagioni,
        recensioni: mySerie.recensioni
    });
});





//Esporto le funzioni definite
module.exports = router;