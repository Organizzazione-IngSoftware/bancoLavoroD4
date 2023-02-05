const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');



router.get('/getSomeOrAll', async (req, res) => {
    let myMovie;
    if (req.query.parametro)
        myMovie = await Movie.find( {$or: [{ titolo: req.query.parametro.toLowerCase() }, { regista: req.query.parametro.toLowerCase() }]} ).exec();
    else
        myMovie = await Movie.find().exec();
    myMovie = myMovie.map( (entry) => {
        return {
            self: 'api/v1/movie' + entry.id,
            titolo: entry.titolo,
            valutazione: entry.valutazione,
            copertina: entry.copertina,
            durata: entry.durata,
        }
    });
    console.log("Ricerca eseguita");
    res.status(200).json(myMovie);
});



router.get('/getById/:id', async (req, res) => { //ok
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
        recensioni: myMovie.recensioni
    });
});



router.post('/create', async (req, res) => { //ok
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
        res.status(409).send(); //409 conflict
    }
});



router.get('/getAll', async (req, res) => { //ok
    let myMovies = await Movie.find({});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id,
            titolo: myMovies.titolo,
            valutazione: myMovies.valutazione,
            copertina: myMovies.copertina,
            durata: myMovies.durata,
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.delete('/deleteAll', async (req, res) => { //ok
    await Movie.deleteMany({});
    console.log('Tutti i film sono stati rimossi con successo dal database');
    res.status(204).send(); //204 deleted
});



router.get('/getByTitleRegist/:parametro', async (req, res) => { //ok
    let myMovies = await Movie.find({$or: [{ titolo: req.params.parametro.toLowerCase() }, { regista: req.params.parametro.toLowerCase() }]});
    myMovies = myMovies.map( (myMovies) => {
        return {
            self: '/api/v1/movie/' + myMovies.id,
            titolo: myMovies.titolo,
            valutazione: myMovies.valutazione,
            copertina: myMovies.copertina,
            durata: myMovies.durata,
        };
    });
    res.status(200).json(myMovies); //200 found
});



router.delete('/deleteOne/:titolo/:regista', async (req, res) => { //ok
    let myMovie = await Movie.findOne({titolo: req.params.titolo.toLowerCase(), regista:req.params.regista.toLowerCase()});
    if(!myMovie) {
        res.status(404).send(); //404 not found
        console.log('Il film che si vuole eliminare non esiste');
        return;
    }
    await myMovie.deleteOne();
    console.log('Il film è stato rimosso con successo');
    res.status(204).send(); //204 deleted
});





//Esporto le funzioni definite
module.exports = router;