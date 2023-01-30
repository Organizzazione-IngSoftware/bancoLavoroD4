const Serie = require('../models/serie');
const User = require('../models/user');
const open = require('open');



const createSerie = async (req, res) => {
    const mySerie = await Serie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    if (!mySerie) {
        const newSerie = new Serie ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            etaCons: req.body.etaCons,
            copertina: req.body.copertina,
            generi: req.body.generi,
            piattaforme: req.body.piattaforme,
            stagioni: req.body.stagioni,
        });
        newSerie.save((err, data) => {
            if (err) return res.json({error: err});
            else return res.json({message: "Ho creato la serie: ", data});
        });
    } 
    else return res.json({ error: "Questa serie risulta già presente nel database"});
};



const getAllSerie = async (req, res) => {
    let mySerie = await Serie.find({});
    mySerie = mySerie.map( (mySerie) => {
        return {
            self: '/api/v1/serie/' + mySerie.id,
            titolo: mySerie.titolo
        };
    });
    res.status(200).json(mySerie);
};



const deleteAllSerie = async (req, res) => { //?
    Serie.deleteMany({}, err => {
        if (err) return res.json({error: err});
        else return res.json({message: "Eliminazione delle serie avvenuta con successo"});
    })
};



const searchSerieTitleRegist = async (req, res) => {
    const mySerie = await Serie.find({ $or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }] });
        if (!mySerie) return res.json({error: 'La ricerca non ha prodotto nessun contenuto'});
        else return res.json({message: "Le serie trovate sono le seguenti: ", mySerie});
};



const deleteOneSerie = async (req, res, next) => { //?
    let titoloPassato = req.params.titolo.toLowerCase();
    let registaPassato = req.params.regista.toLowerCase();
    var query = { titolo: titoloPassato, regista: registaPassato};
    Serie.deleteOne(query, (err, collection) => {
        if (err) return ({error: err});
        else return res.json({ message: "Successo: la serie non è ora presente nel database" });
    });
};



const getUpdatedSerieScore = (arrayRecensioni) => { //Funzione di supporto: non va chiamata dall'esterno
    let somma = 0;
    for(let i=0; i<arrayRecensioni.length; i++)                        
        somma += arrayRecensioni[i][1]; //Nella cella 1 è presente il punteggio legato alla recensione
    return somma/arrayRecensioni.length;
};



//Esporto le funzioni definite
module.exports = {
    createSerie,
    getAllSerie,
    deleteAllSerie,
    searchSerieTitleRegist,
    deleteOneSerie,
};