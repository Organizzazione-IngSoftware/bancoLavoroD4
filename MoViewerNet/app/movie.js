const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');
const Serie = require('./models/serie');



router.post('/create', async (req, res) => { //api per test
    let myMovie = await Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    let mySerie = await Serie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() }); //non voglio che esistano più contenuti con lo stesso titolo o lo stesso regista, che siano serie o film
    if (!myMovie && !mySerie) {
        let newMovie = new Movie ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            etaCons: req.body.etaCons,
            copertina: req.body.copertina,
            durata: req.body.durata,
            generi: req.body.generi,
            piattaforme: req.body.piattaforme,
        });
        newMovie = await newMovie.save();
        let movieId = newMovie.id;
        res.location("/api/v1/movie/" + movieId).status(201).send(); //201 created
        console.log('Film salvato con successo');
    } else {
        res.status(409).json({ error: 'Questo titolo risulta essere già esistente nel database' }); //409 conflict
        console.log('Questo titolo risulta essere già esistente nel database');
    }
});



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



router.delete('/deleteAll', async (req, res) => { //api per test
    await Movie.deleteMany({});
    res.status(204).json({ message: 'Ho eliminato tutti i film dal database' }); //204 deleted
    console.log('Ho eliminato tutti i film dal database');
});



router.get('/getByTitleRegist/:parametro', async (req, res) => {
    let myMovies = await Movie.find({$or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }]});
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



router.delete('/deleteOne/:titolo/:regista', async (req, res) => { //api per test
    let myMovie = await Movie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!myMovie) {
        res.status(404).json({ error: 'Il film che si vuole eliminare non esiste' }); //404 not found
        console.log('Il film che si vuole eliminare non esiste');
        return;
    }
    await myMovie.deleteOne();
    res.status(204).json({ message: 'Il film è stato rimosso con successo' }); //204 deleted
    console.log('Il film è stato rimosso con successo');
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