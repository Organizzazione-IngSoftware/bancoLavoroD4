const express = require('express');
const router = express.Router();
const open = require('open');
const User = require('./models/user');



router.get('/getById/:id', async (req, res) => { //ok
    let myUser = await User.findById(req.params.id);
    res.status(200).json({
        self: '/api/v1/user/' + myUser.id,
        username: myUser.username
    });
});



router.post('', async (req, res) => { //ok
    let myUser = await User.findOne({ $or: [{ mail: req.body.mail }, { username: req.body.username }] });
    if (!myUser && req.body.password==req.body.passwordSupp) {
        let newUser = new User ({
            mail: req.body.mail,
            username: req.body.username,
            password: req.body.password,
            isPrivate: false,
        });
        newUser = await newUser.save();
        let userId = newUser.id;
        console.log('Utente salvato con successo nel database');
        res.location("/api/v1/user/" + userId).status(201).send(); //201 posted
    }
    else {
        console.log('Esiste nel database un utente che utilizza queste credenziali');
        res.status(403).send();
    }
});



router.get('/:username', async (req, res) => { //ok
    let myUser = await User.findOne({username: req.params.username});
    if(!myUser) {
        res.status(404).send(); //404 not found
        console.log('Non ho trovato un utente con questo username');
        return;
    }
    myUser = {
        self: '/api/v1/user/' + myUser.id,
        username: myUser.username,
    };
    res.status(200).json(myUser); //200 found
    console.log('Ho trovato un utente con questo username');
});



router.post('/login', async (req, res) => { //ok
    let myUser = await User.findOne({ $or: [{ mail: req.body.keyword }, { username: req.body.keyword }] });
    if(!myUser || myUser.password!=req.body.password) {
        res.status(403).send(); //403 forbidden
        console.log('User doesnt exists');
    }
    else {
        res.status(200).send(); //200 found
        console.log('User can log');
    }
});



router.patch('', async (req, res) => { //ok
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



router.delete('', async (req, res) => { //ok
    await User.deleteMany({});
    console.log('Utenti rimossi dal database');
    res.status(204).send(); //204 deleted
});



router.delete('/:username', async (req, res) => { //ok
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



router.get('', async (req, res) => { //ok
    open('https://www.paypal.com/donate/?hosted_button_id=DQ387XP5GBANN');
    res.status(200).send();
    console.log("Ho aperto la pagina per effettuare la donazione");
});





//Esporto le funzioni definite
module.exports = router;