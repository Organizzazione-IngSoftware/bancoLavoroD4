const Movie = require('../models/movie');
const User = require('../models/user');
const open = require('open');



const createMovie = async (req, res) => {
    const myMovie = await Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    if (!myMovie) {
        const newMovie = new Movie ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            etaCons: req.body.etaCons,
            copertina: req.body.copertina,
            durata: req.body.durata,
            generi: req.body.generi,
            piattaforme: req.body.piattaforme,
        });
        newMovie.save((err, data) => {
            if (err) return res.json({error: err});
            else return res.json({message: "Ho creato il film: ", data});
        });
    } 
    else return res.json({ error: "Questo film risulta già presente nel database"});
};



const getAllMovie = async (req, res) => {
    let myMovie = await Movie.find({});
    myMovie = myMovie.map( (myMovie) => {
        return {
            self: '/api/v1/movie/' + myMovie.id,
            titolo: myMovie.titolo
        };
    });
    res.status(200).json(myMovie);
};



const deleteAllMovie = async (req, res) => { //?
    Movie.deleteMany({}, err => {
        if (err) return res.json({error: err});
        else return res.json({message: "Eliminazione dei film avvenuta con successo"});
    })
};



const searchMovieTitleRegist = async (req, res) => {
    const myMovies = await Movie.find({ $or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }] });
    if (!myMovies) return res.json({error: 'La ricerca non ha prodotto nessun contenuto'});
    else return res.json({message: "i film trovati sono i seguenti: ", myMovies});
};



const deleteOneMovie = async (req, res, next) => { //?
    let titoloPassato = req.params.titolo.toLowerCase();
    let registaPassato = req.params.regista.toLowerCase();
    var query = { titolo: titoloPassato, regista: registaPassato};
    Movie.deleteOne(query, (err, collection) => {
        if (err) return ({error: err});
        else return res.json({ message: "Successo: il film non è ora presente nel database" });
    });
};



const getUpdatedMovieScore = (arrayRecensioni) => { //Funzione di supporto: non va chiamata dall'esterno
    let somma = 0;
    for(let i=0; i<arrayRecensioni.length; i++)                        
        somma += arrayRecensioni[i][1]; //Nella cella 1 è presente il punteggio legato alla recensione
    return somma/arrayRecensioni.length;
};





//Esporto le funzioni definite
module.exports = {
    createMovie,
    getAllMovie,
    deleteAllMovie,
    searchMovieTitleRegist,
    deleteOneMovie,
};