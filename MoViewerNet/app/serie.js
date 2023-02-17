const express = require('express');
const router = express.Router();
const Serie = require('./models/serie');



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



router.get('/getByTitleRegist/:parametro', async (req, res) => {
    let mySeries = await Serie.find({$or: [{ titolo: {"$regex": req.params.parametro.toLowerCase(), "$options": "i"} }, { regista: {"$regex": req.params.parametro.toLowerCase(), "$options": "i"} }]});
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