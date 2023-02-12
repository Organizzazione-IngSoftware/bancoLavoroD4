const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Movie = require('./models/movie');
const Serie = require('./models/serie')
const Review = require('./models/review');

//.exec() dopo le query



router.post('/makeReview', async (req, res) => {
    let utenteAutore = await User.findOne( { mail: req.body.mailAutore } );
    let contenuto = await Movie.findOne( { titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    if(!contenuto)
        contenuto = await Serie.findOne( { titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    if(!utenteAutore || !contenuto) {
        res.status(404).json({ error: 'Questo utente o questo titolo non sono esistenti' });; //404 not found
        console.log("Questo utente o questo titolo non sono esistenti");
        return;
    }
    if(req.body.voto<1 || req.body.voto>5) {
        res.status(400).json({ error: 'Il voto inserito non è accettabile' });; //400 bad request
        console.log("Il voto inserito non è accettabile");
        return;
    }

    let searchForOtherReviews = await Review.findOne( { mailAutore: req.body.mailAutore, titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    if(!searchForOtherReviews) { //Controllo che l'autore non abbia aggiunto già una recensione per il titolo in questione
        let newReview = new Review ({
            titolo: req.body.titolo.toLowerCase(),
            regista: req.body.regista.toLowerCase(),
            mailAutore: req.body.mailAutore,
            voto: req.body.voto,
            testo: req.body.testo
        });
        newReview = await newReview.save();
        let reviewId = newReview.id;
        res.location("/api/v1/review/" + reviewId).status(201).send(); //201 created
        console.log('Recensione salvata con successo');
    } else {
        res.status(409).json({ error: 'Questo utente ha già scritto una recensione per questo titolo' }); //409 conflict
        console.log("Questo utente ha già scritto una recensione per questo titolo");
    }
});



router.patch('/refreshPunteggio', async (req, res) => { 
    let contenuto = await Movie.findOne( { titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    if(!contenuto)
        contenuto = await Serie.findOne( { titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    if(!contenuto) {
        res.status(404).json({ error: 'Non abbiamo trovato un titolo con questi dati' }); //404 not found
        console.log("Non abbiamo trovato un titolo con questi dati");
        return;
    }

    let reviewList = await Review.find( { titolo: req.body.titolo.toLowerCase(), regista: req.body.regista.toLowerCase() } );
    let punteggio = 0;
    let numeroRecensioni = 0;
    reviewList = reviewList.map( (reviewList) => {
        numeroRecensioni++;
        punteggio += reviewList.voto;
    } );
    if(numeroRecensioni == 0) return ;
    punteggio = punteggio/numeroRecensioni;

    contenuto.valutazione = punteggio;
    contenuto = await contenuto.save();
    res.status(201).json({ message: 'Valutazione del titolo aggiornata con successo' });
    console.log("Valutazione del titolo aggiornata con successo");
});



router.get('/getAll', async (req, res) => { //api per test
    let myReviews = await Review.find({});
    myReviews = myReviews.map( (myReviews) => {
        return {
            self: '/api/v1/review/' + myReviews.id,
            titolo: myReviews.titolo,
            regista: myReviews.regista,
            mailAutore: myReviews.mailAutore,
            voto: myReviews.voto,
            testo: myReviews.testo,
        };
    });
    res.status(200).json(myReviews); //200 found
});



//Esporto le funzioni definite
module.exports = router;