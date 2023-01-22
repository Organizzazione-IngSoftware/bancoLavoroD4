const Serie = require('../models/serie');
const open = require('open');



const createSerie = (req, res) => {
    const newSerie = new Serie ({
        titolo: req.body.titolo.toLowerCase(),
        regista: req.body.regista.toLowerCase(),
        etaCons: req.body.etaCons,
        valutazione: -1,
        copertina: req.body.copertina,
        generi: req.body.generi,
        piattaforme: req.body.piattaforme,
        stagioni: req.body.stagioni
        });
        newSerie.save((err, data) => {
            if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
            else return res.json(data);
        })
};



const getAllSerie = (req, res) => {
    Serie.find({}, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json(data);
    })
};



const deleteAllSerie = (req, res) => {
    Serie.deleteMany({}, err => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json({ message: "Eliminazione dei film avvenuta con successo"});
    })
};



const searchSerieTitleRegist = (req, res) => {
    let passato = req.params.parametro.toLowerCase();
    Serie.find({ $or: [{ titolo: passato }, { regista: passato }] }, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        if (!data) return res.json('La ricerca non ha prodotto nessun contenuto');
        else return res.json(data);
    });
};



const deleteOneSerie = (req, res, next) => {
    let titoloPassato = req.params.titolo.toLowerCase();
    let registaPassato = req.params.regista.toLowerCase();
    var query = { titolo: titoloPassato, regista: registaPassato};
    Serie.deleteOne(query, (err, collection) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json({ message: "Successo: la serie non è più presente nel database" });
    });
};



//Esporto le funzioni definite
module.exports = {
    createSerie,
    getAllSerie,
    deleteAllSerie,
    searchSerieTitleRegist,
    deleteOneSerie
};