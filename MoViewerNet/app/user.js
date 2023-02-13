const express = require('express');
const router = express.Router();
const open = require('open');
const User = require('./models/user');

//.exec() dopo le query



router.post('/signUp', async (req, res) => {
    let myUser = await User.findOne({ $or: [{ mail: req.body.mail }, { username: req.body.username }] });
    if (!myUser && req.body.password==req.body.passwordSupp && req.body.password.length>=8 && req.body.username) {
        let newUser = new User ({
            mail: req.body.mail,
            username: req.body.username,
            password: req.body.password,
            isPrivate: true, //default
        });
        if(!newUser.mail || typeof newUser.mail != 'string' || !checkIfEmailInString(newUser.mail)) {
            res.status(400).json({ error: 'Quella inserita non risulta essere una mail valida' }); //400 bad request
            console.log("Quella inserita non risulta essere una mail valida");
            return;
        }
        newUser = await newUser.save();
        let userId = newUser.id;
        res.location("/api/v1/user/" + userId).status(201).send(); //201 posted
        console.log('Utente salvato con successo nel database');
    }
    else {
        if(req.body.password != req.body.passwordSupp) {
            res.status(400).json({ error: 'Hai inserito due password diverse' }); //400 bad request
            console.log("Hai inserito due password diverse");
        } else if(req.body.password.length < 8) {
            res.status(400).json({ error: 'Hai inserito una password non conforme' }); //400 bad request
            console.log("Hai inserito una password non conforme");
        } else if(!req.body.username) {
            res.status(400).json({ error: 'Non hai inserito un username' }); //400 bad request
            console.log("Non hai inserito un username");
        }
        else {
            res.status(409).json({ error: 'Nel database esiste già un utente che utilizza una di queste credenziali' }); //409 conflict
            console.log("Nel database esiste già un utente che utilizza una di queste credenziali");
        }
    }
});



router.get('/findOne/:username', async (req, res) => {
    let myUser = await User.find({username: req.params.username});
    if(!myUser) {
        res.status(404).json({ error: 'Non ho trovato un utente con questo username' }); //404 not found
        console.log("Non ho trovato un utente con questo username");
        return;
    }
    myUser = myUser.map((myUser) => {
        return {
            self: '/api/v1/user/' + myUser.id,
            username: myUser.username,
            isPrivate: myUser.isPrivate
        };
    });
    res.status(200).json(myUser); //200 found
    console.log('Ho trovato un utente con questo username');
});



router.patch('/setMyPrivacy', async (req, res) => {
    let myUser = await User.findOne({ mail: req.body.mail });
    if (myUser) {
        myUser.isPrivate = req.body.isPrivate;
        myUser = await myUser.save();
        let userId = myUser.id;
        res.location("/api/v1/user/" + userId).status(201).send(); //201 posted
        console.log('Impostazione di privacy aggiornate con successo');
    }
    else {
        res.status(404).json({ error: 'Non esiste nel database un utente con questo username' }); //404 not found
        console.log('Non esiste nel database un utente con questo username');
    }
});



router.delete('/deleteAll', async (req, res) => { //api per test
    await User.deleteMany({});
    res.status(204).json( {message: 'Ho rimosso tutti gli utenti dal database'}); //204 deleted
    console.log('Ho rimosso tutti gli utenti dal database');
});



router.get('/donation', async (req, res) => {
    open('https://www.paypal.com/donate/?hosted_button_id=DQ387XP5GBANN');
    res.status(200).json({ message: 'Ho aperto la pagina per effettuare la donazione'}); //200 success
    console.log("Ho aperto la pagina per effettuare la donazione");
});



router.get('/:id', async (req, res) => {
    let myUser = await User.findById(req.params.id);
    res.status(200).json( {
        self: '/api/v1/user/' + myUser.id,
        username: myUser.username,
        isPrivate: myUser.isPrivate
    });
});



function checkIfEmailInString(passedText) {
    var regularExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExp.test(passedText);
}



//Esporto le funzioni definite
module.exports = router;