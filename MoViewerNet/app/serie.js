const express = require('express');
const router = express.Router();
const Serie = require('./models/serie');
const Movie = require('./models/movie');



router.post('/create', async (req, res) => { //api per test
    let myMovie = await Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    let mySerie = await Serie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() }); //non voglio che esistano più contenuti con lo stesso titolo o lo stesso regista, che siano serie o film
    if (!myMovie && !mySerie) {
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
        res.location("/api/v1/serie/" + serieId).status(201).send(); //201 created
        console.log('Serie salvata con successo');
    } else {
        res.status(409).json({ error: 'Questo titolo risulta essere già esistente nel database' }); //409 conflict
        console.log('Questo titolo risulta essere già esistente nel database');
    }
});



router.get('/getAll', async (req, res) => {
    let mySeries = await Serie.find({});
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id, //dati sufficienti alla rappresentazione delle miniature
            titolo: mySeries.titolo,
            regista: mySeries.regista,
            valutazione: mySeries.valutazione,
            copertina: mySeries.copertina,
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('/deleteAll', async (req, res) => { //api per test
    await Serie.deleteMany({});
    res.status(204).json({ message: 'Ho eliminato tutte le serie dal database' }); //204 deleted
    console.log('Ho eliminato tutte le serie dal database');
});



router.get('/getByTitleRegist/:parametro', async (req, res) => {
    let mySeries = await Serie.find({$or: [{ titolo: {"$regex": req.params.parametro.toLowerCase(), "$options": "i"} }, { regista: req.params.parametro.toLowerCase() }]});
    mySeries = mySeries.map( (mySeries) => {
        return {
            self: '/api/v1/serie/' + mySeries.id, //sufficienti per la rappresentazione delle miniature
            titolo: mySeries.titolo,
            regista: mySeries.regista,
            valutazione: mySeries.valutazione,
            copertina: mySeries.copertina,
        };
    });
    res.status(200).json(mySeries); //200 found
});



router.delete('/deleteOne/:titolo/:regista', async (req, res) => { //api per test
    let mySerie = await Serie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!mySerie) {
        res.status(404).json({ error: 'La serie che si vuole eliminare non esiste' }); //404 not found
        console.log('La serie che si vuole eliminare non esiste');
        return;
    }
    await mySerie.deleteOne();
    res.status(204).json({ message: 'La serie è stata rimossa con successo' }); //204 deleted
    console.log('La serie è stata rimossa con successo');
});



router.get('/:id', async (req, res) => {
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
    });
});





//Esporto le funzioni definite
module.exports = router;