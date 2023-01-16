const Movie = require('../models/movie');
const open = require('open');



const createMovie = (req, res) => {
    const newMovie = new Movie ({
        titolo: req.body.titolo,
        regista: req.body.regista,
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



const searchMovieTitle = (req, res) => {
    let passato = req.params.titolo;
    Movie.find({ titolo: passato }, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else if (!data) return res.json({message: "Il film cercato non è presente nel database"});
        else return res.json(data);
    });
};



const deleteOneMovie = (req, res, next) => {
    let passato = req.params.titolo;
    var query = { titolo: passato };
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
    searchMovieTitle,
    deleteOneMovie
};