const User = require('../models/user');
const open = require('open');



const createUser = async (req, res) => {
    const myUser = await User.findOne({ $or: [{ mail: req.body.mail }, { username: req.body.username }] });
    if (!myUser && req.body.password==req.body.passwordSupp) {
        const newUser = new User ({
            mail: req.body.mail,
            username: req.body.username,
            password: req.body.password,
            isPrivate: false,
        });
        newUser.save((err, data) => {
            if (err) return res.json({error: err});
            else return res.json({message: "Ho creato l'utente: ", data});
        });
    }
    else if (req.body.password != req.body.passwordSupp) return res.json({error: "Le due password inserite non corrispondono"});
    else return res.json({error: "Hai inserito delle credenziali (mail o username) già presenti nel database"});
};



const searchUser = async (req, res) => {
    const myUser = await User.findOne({ username: req.params.username }); 
    if (!myUser) return res.json({error: "L'utente cercato non è presente nel database"});
    else return res.json({message: "L'utente cercato esiste all'interno del database"});
};



const login = async (req, res) => {
    const myUser = await User.findOne({ $or: [{ mail: req.body.keyword }, { username: req.body.keyword }] });
    if(!myUser || myUser.password!=req.body.password) return res.json({error: "Non esiste un utente con queste credenziali nel database"});
    else return res.json({message: "L'utente ha il diritto di loggarsi"});
};



const changePriv = async (req, res) => {
    const myUser = await User.findOne({ username: req.body.username });
    if (!myUser) return res.json({error: "L'utente a cui vorresti cambiare l'impostazione di visibilita' non è presente nel database"});
    else {
        myUser.isPrivate = req.body.isPrivate;
        myUser.save((err, data) => {
            if (err) return res.json({error: err});
            else return res.json({message: "Ho cambiato l'impostazione di privacy"});
        });           
    }
};



const deleteAllUser = async (req, res) => { //?
    User.deleteMany({}, err => {
        if (err) return standardError(err);
        else return res.json({ message: "Eliminazione degli utenti avvenuta con successo"});
    })
};



const deleteOneUser = async (req, res, next) => { //?
    User.deleteOne({ username: req.params.username }, (err, collection) => {
        if (err) return standardError(err);
        else return res.json({ message: "Successo: l'utente non è ora presente nel database" });
    });
};



const donation = async (req, res) => { //?
    await open('https://www.paypal.com/donate/?hosted_button_id=DQ387XP5GBANN');
    return res.json({message: "Ho aperto la pagina per effettuare la donazione"});
}





//Esporto le funzioni definite
module.exports = {
    createUser,
    deleteAllUser,
    searchUser,
    deleteOneUser,
    login,
    donation,
    changePriv
};