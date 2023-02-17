const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');



router.get('/getAll', async (req, res) => {
    let myMovies = await Movie.find({});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id, //dati sufficienti alla rappresentazione delle miniature
            titolo: myMovies.titolo,
            regista: myMovies.regista,
            valutazione: myMovies.valutazione,
            copertina: myMovies.copertina,
            durata: myMovies.durata,
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.get('/getByTitleRegist/:parametro', async (req, res) => {
    let myMovies = await Movie.find({$or: [{ titolo: {"$regex": req.params.parametro.toLowerCase(), "$options": "i"} }, { regista: {"$regex": req.params.parametro.toLowerCase(), "$options": "i"} }]});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id, //sufficienti per la rappresentazione delle miniature
            titolo: myMovies.titolo,
            regista: myMovies.regista,
            valutazione: myMovies.valutazione,
            copertina: myMovies.copertina,
            durata: myMovies.durata,
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.get('/:id', async (req, res) => {
    let myMovie = await Movie.findById(req.params.id);
    res.status(200).json( { //200 success
        self: '/api/v1/movie/' + myMovie.id,
        titolo: myMovie.titolo,
        regista: myMovie.regista,
        etaCons: myMovie.etaCons,
        valutazione: myMovie.valutazione,
        copertina: myMovie.copertina,
        generi: myMovie.generi,
        piattaforme: myMovie.piattaforme,
        durata: myMovie.durata,
    });
});





//Esporto le funzioni definite
module.exports = router;