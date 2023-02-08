const express = require('express');
const router = express.Router();
const open = require('open');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

//.exec() dopo le query



router.get('/getById/:id', async (req, res) => { //ok
    let myUser = await User.findById(req.params.id);
    res.status(200).json( {
        self: '/api/v1/user/' + myUser.id,
        username: myUser.username,
        isPrivate: myUser.isPrivate
    });
});



router.get('/getOneOrAll', async (req, res) => {
    let myUser;
    if (req.query.username)
        myUser = await User.find( {username: req.query.username} ).exec();
    else
        myUser = await User.find().exec();
    myUser = myUser.map( (entry) => {
        return {
            self: 'api/v1/user' + entry.id,
            username: entry.username,
            isPrivate: entry.isPrivate
        }
    });
    console.log("Ricerca eseguita");
    res.status(200).json(myUser);
});



router.post('/signUp', async (req, res) => { //ok
    console.log("ci sono");
    let myUser = await User.findOne({ $or: [{ mail: req.body.mail }, { username: req.body.username }] });
    if (!myUser && req.body.password==req.body.passwordSupp) {
        let newUser = new User ({
            mail: req.body.mail,
            username: req.body.username,
            password: req.body.password,
            isPrivate: false,
        });
        if(!newUser.mail || typeof newUser.mail != 'string' || !checkIfEmailInString(newUser.mail)) {
            console.log("invalid mail");
            res.status(400).json({ error: 'Quella inserita non risulta essere una mail valida' }); //400 bad request
            return;
        }
        newUser = await newUser.save();
        let userId = newUser.id;
        console.log('Utente salvato con successo nel database');
        res.location("/api/v1/user/" + userId).status(201).send(); //201 posted
    }
    else {
        console.log("Utente già esistente o password non coincidenti!");
        res.status(409).json({ error: 'Nel database esiste già un utente che utilizza una di queste credenziali' }); //409 conflict
    }
    });



router.get('/findOne/:username', async (req, res) => { //ok
    let myUser = await User.findOne({username: req.params.username});
    if(!myUser) {
        res.status(404).json({ error: 'Non ho trovato un utente con questo username' }); //404 not found
        return;
    }
    myUser = {
        self: '/api/v1/user/' + myUser.id,
        username: myUser.username,
        isPrivate: myUser.isPrivate
    };
    res.status(200).json(myUser); //200 found
    console.log('Ho trovato un utente con questo username');
});



router.patch('/setPrivacy', async (req, res) => { //ok
    let myUser = await User.findOne({ username: req.body.username });
    if (myUser) {
        myUser.isPrivate = req.body.isPrivate;
        myUser = await myUser.save();
        let userId = myUser.id;
        console.log('Impostazione di privacy aggiornate con successo');
        res.location("/api/v1/user/" + userId).status(201).send(); //201 posted (???)
    }
    else {
        console.log('Non esiste nel database un utente con questo username');
        res.status(404).send(); //404 not found
    }
});



router.delete('/deleteAll', async (req, res) => { //ok
    await User.deleteMany({});
    console.log('Utenti rimossi dal database');
    res.status(204).send(); //204 deleted
});



router.delete('/deleteOne/:username', async (req, res) => { //ok
    let myUser = await User.findOne({username: req.params.username})
    if(!myUser) {
        res.status(404).send(); //404 not found
        console.log('Non ho trovato nessun utente con questo username');
        return;
    }
    await myUser.deleteOne();
    console.log('Utente rimosso con successo');
    res.status(204).send(); //204 deleted
});



router.get('/donation', async (req, res) => { //ok
    open('https://www.paypal.com/donate/?hosted_button_id=DQ387XP5GBANN');
    res.status(200).send(); //200 success
    console.log("Ho aperto la pagina per effettuare la donazione");
});



function checkIfEmailInString(passedText) {
    var regularExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExp.test(passedText);
}





//Esporto le funzioni definite
module.exports = router;