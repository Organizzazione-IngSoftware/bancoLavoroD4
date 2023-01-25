const User = require('../models/user');
const open = require('open');



const createUser = (req, res) => {
    let checkPassword1 = req.body.password;
    let checkPassword2 = req.body.passwordSupp;
    let confronto = (checkPassword1 == checkPassword2);
    User.findOne({ $or: [{ mail: req.body.mail }, { username: req.body.username }] }, (err, data) => {
        if (!data && confronto) {
            const newUser = new User ({
                mail: req.body.mail,
                username: req.body.username,
                password: req.body.password,
                isPrivate: false,
            });
            newUser.save((err, data) => {
                if (err) return standardError(err);
                else return res.json(data);
            })         
        }
        else if (err) return standardError(err);
        else if (!confronto) return res.json({ message: "Le due password inserite non coincidono"});
        else return res.json({ message: "Hai utilizzato una mail o un username già utilizzati"});
    })
};



const getAllUser = (req, res) => {
    User.find({}, (err, data) => {
        if (err) return standardError(err);
        else return res.json(data);
    })
};



const deleteAllUser = (req, res) => {
    User.deleteMany({}, err => {
        if (err) return standardError(err);
        else return res.json({ message: "Eliminazione degli utenti avvenuta con successo"});
    })
};



const searchUser = (req, res) => {
    let passato = req.params.username;
    User.findOne({ username: passato }, (err, data) => {
        if (err) return standardError(err);
        else if (!data) return res.json({message: "L'utente cercato non è presente nel database"});
        else return res.json(data);
    });
};



const deleteOneUser = (req, res, next) => {
    var query = { username: req.params.username };
    User.deleteOne(query, (err, collection) => {
        if (err) return standardError(err);
        else return res.json({ message: "Successo: l'utente non è ora presente nel database" });
    });
};



const login = (req, res) => {
    User.findOne({ mail: req.body.keyword }, (err, data) => {
        if (err) return standardError(err);
        else if (data && data.password==req.body.password) return res.json({ message: "Ho trovato l'utente in questione cercando in base alla mail"});
        else {
            User.findOne({ username: req.body.keyword }, (err, data) => {
                if (err) return standardError(err);
                else if (data && data.password==req.body.password) return res.json({ message: "Ho trovato l'utente in questione cercando in base all'username'"});
                else return res.json({ message: "L'utente in questione non è presente nel database"});
            });
        }
    });
};



const donation = (req, res) => {
    open('https://www.paypal.com/donate/?hosted_button_id=DQ387XP5GBANN');
}



const changePriv = (req, res) => {
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) return standardError(err);
        else if (!data) return res.json({message: "L'utente a cui vorresti cambiare l'impostazione di visibilita' non è presente nel database"});
        else {
            data.isPrivate = req.body.isPrivate;
            data.save(function (err) {
                if(err) return standardError(err);
            });
            return res.json({message: "La modifica è andata a buon fine"});
        }
    });
}



const standardError = (err) => { //Altra funzione di supporto
    return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
}



//Esporto le funzioni definite
module.exports = {
    getAllUser,
    createUser,
    deleteAllUser,
    searchUser,
    deleteOneUser,
    login,
    donation,
    changePriv
};