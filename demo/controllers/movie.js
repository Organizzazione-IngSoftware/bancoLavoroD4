const Movie = require('../models/movie');
const User = require('../models/user')
const open = require('open');



const createMovie = (req, res) => {
    Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() }, (err, data) => {
        if (!data) {
            const newMovie = new Movie ({
                titolo: req.body.titolo.toLowerCase(),
                regista: req.body.regista.toLowerCase(),
                etaCons: req.body.etaCons,
                valutazione: -1,
                copertina: req.body.copertina,
                durata: req.body.durata,
                generi: req.body.generi,
                piattaforme: req.body.piattaforme,
            });
            newMovie.save((err, data) => {
                if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
                else return res.json(data);
            });
        } else {
            if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
            else return res.json({ message: "Questo film con questo specifico regista risulta già presente nel database"});
        }
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



const makeReview = (req, res) => {
    let authorUser = req.body.recensione[0];
    User.findOne({ username : authorUser }, (err, data) => {
        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
        else if (!data) return res.json({message: "L'autore di questa recensione non è presente nel database"});
        else {
            Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() }, (err, data) => {
                if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
                else if (!data) return res.json({message: "Il film a cui vorresti aggiungere la recensione non è presente nel database"});
                else {
                    for(let i=0; i<data.recensioni.length; i++)
                        if(data.recensioni[i][0] == authorUser)
                            return res.json({message: "Questo utente ha già aggiunto una recensione per questo titolo"});
                    data.recensioni.push(req.body.recensione);
                    data.valutazione = getUpdatedMovieScore(data.recensioni);
                    data.save(function (err) {
                        if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
                    });
                    return res.json({message: "La recensione è stata aggiunta con successo"});
                }
            });
        }
    });
};



const getUpdatedMovieScore = (arrayRecensioni) => { //Funzione di supporto: non va chiamata dall'esterno
    let somma = 0;
    for(let i=0; i<arrayRecensioni.length; i++)                        
        somma += arrayRecensioni[i][1];
    return somma/arrayRecensioni.length;   
};



//Esporto le funzioni definite
module.exports = {
    createMovie,
    getAllMovie,
    deleteAllMovie,
    searchMovieTitleRegist,
    deleteOneMovie,
    makeReview
};