const User = require('../models/user');



const newUser = (req, res) => {
    let checkPassword1 = req.body.password;
    let checkPassword2 = req.body.passwordSupp;
    var confronto = false;
    if (checkPassword1 == checkPassword2)
        confronto = true;
    User.findOne({ mail: req.body.mail }, (err, data) => {
        if (!data && confronto) {
            const newUser = new User ({
                mail: req.body.mail,
                username: req.body.username,
                password: req.body.password,
                isPrivate: false,
            })
            newUser.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })         
        } else {
            if (err) return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
            if (confronto) return res.json({ message: "L'utente è già esistente"});
            else return res.json({ message: "Le password inserite non coincidono"});
        }
    })
};



const getAllUser = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};



const deleteAllUser = (req, res) => {
    User.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "L'eliminazione degli utenti non è andata a buon fine" });
        }
        return res.json({ message: "Eliminazione degli utenti avvenuta con successo" });
    })
};



const getOneUser = (req, res) => {
    let passato = req.params.username; //get the username
    User.findOne({ username: passato }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste" });
        }
        else return res.json(data); //return the user object if found
    });
};



const deleteOneUser = (req, res, next) => {
    let passato = req.params.username;
    var query = { username: passato };
    User.deleteOne(query, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            res.json({ message: "Successo: l'utente non è più presente nel database" });
        }
    });
};



const login = (req, res) => {
    User.findOne({ mail: req.body.mail }, (err, data) => {
        if (data && data.password==req.body.password) return res.json({ message: "Ho trovato l'utente in questione cercando in base alla mail"});
        else {
            User.findOne({ username: req.body.username }, (err, data) => {
                if (data && data.password==req.body.password) return res.json({ message: "Ho trovato l'utente in questione cercando in base all'username'"});
                else return res.json({ message: "L'utente in questione non è presente nel database"});
            });
        }
    });
};



//export controller functions
module.exports = {
    getAllUser,
    newUser,
    deleteAllUser,
    getOneUser,
    deleteOneUser,
    login
};