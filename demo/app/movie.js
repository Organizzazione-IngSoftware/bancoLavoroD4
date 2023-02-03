const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');



router.get('/getById/:id', async (req, res) => { //ok
    let myMovie = await Movie.findById(req.params.id);
    res.status(200).json({
        self: '/api/v1/movie/' + myMovie.id,
        titolo: myMovie.titolo
    });
});



router.post('', async (req, res) => { //ok
    let myMovie = await Movie.findOne({ titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() });
    if (!myMovie) {
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
        console.log('Film salvato con successo');
        res.location("/api/v1/movie/" + movieId).status(201).send(); //201 created
    } else {
        console.log('Questo film risulta essere già esistente nel database');
        res.status(403).send();
    }
});



router.get('', async (req, res) => { //ok
    let myMovies = await Movie.find({});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id,
            titolo: myMovies.titolo,
            regista: myMovies.regista
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.delete('', async (req, res) => { //ok
    await Movie.deleteMany({});
    console.log('Film rimosso dal database');
    res.status(204).send(); //204 deleted
});



router.get('/:parametro', async (req, res) => { //ok
    let myMovies = await Movie.find({$or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }]});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id,
            titolo: myMovies.titolo,
            regista: myMovies.regista
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.delete('/:titolo/:regista', async (req, res) => { //ok
    let myMovie = await Movie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!myMovie) {
        res.status(404).send(); //404 not found
        console.log('Il film cercato non esiste');
        return;
    }
    await myMovie.deleteOne();
    console.log('Il film è stato rimosso con successo');
    res.status(204).send(); //204 deleted
});





//Esporto le funzioni definite
module.exports = router;