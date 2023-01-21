const Movie = require('../models/movie');
const open = require('open');



const createMovie = (req, res) => {
    const newMovie = new Movie ({
        titolo: req.body.titolo.toLowerCase(),
        regista: req.body.regista.toLowerCase(),
        etaCons: req.body.etaCons,
        valutazione: -1,
        copertina: req.body.copertina,
        durata: req.body.durata,
        generi: req.body.generi,
        piattaforme: req.body.piattaforme
        });
        newMovie.save((err, data) => {
            if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
            else return res.json(data);
        })
};



const getAllMovie = (req, res) => {
    Movie.find({}, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json(data);
    })
};



const deleteAllMovie = (req, res) => {
    Movie.deleteMany({}, err => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json({ message: "Eliminazione dei film avvenuta con successo"});
    })
};



const searchMovieTitleRegist = (req, res) => {
    let passato = req.params.parametro.toLowerCase();
    Movie.find({ $or: [{ titolo: passato }, { regista: passato }] }, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        if (!data) return res.json('La ricerca non ha prodotto nessun contenuto');
        else return res.json(data);
    });
};



const deleteOneMovie = (req, res, next) => {
    let titoloPassato = req.params.titolo.toLowerCase();
    let registaPassato = req.params.regista.toLowerCase();
    var query = { titolo: titoloPassato, regista: registaPassato};
    Movie.deleteOne(query, (err, collection) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else return res.json({ message: "Successo: il film non è più presente nel database" });
    });
};



//Esporto le funzioni definite
module.exports = {
    createMovie,
    getAllMovie,
    deleteAllMovie,
    searchMovieTitleRegist,
    deleteOneMovie
};