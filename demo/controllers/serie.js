const Serie = require('../models/serie');
const User = require('../models/user');
const open = require('open');



const createSerie = (req, res) => {
    let titoloPassato = req.body.titolo.toLowerCase();
    let registaPassato = req.body.regista.toLowerCase();
    Serie.findOne({ titolo: titoloPassato, regista: registaPassato }, (err, data) => {
        if (!data) {
            const newSerie = new Serie ({
                titolo: titoloPassato,
                regista: registaPassato,
                etaCons: req.body.etaCons,
                copertina: req.body.copertina,
                generi: req.body.generi,
                stagioni: req.body.stagioni,
                piattaforme: req.body.piattaforme,
            });
            newSerie.save((err, data) => {
                if (err) return standardError(err);
                else return res.json(data);
            });
        } else {
            if (err) return standardError(err);
            else return res.json({ message: "Questa serie risulta già presente nel database"});
        }
    })
};



const getAllSerie = (req, res) => {
    Serie.find({}, (err, data) => {
        if (err) return standardError(err);
        else return res.json(data);
    })
};



const deleteAllSerie = (req, res) => {
    Serie.deleteMany({}, err => {
        if (err) return standardError(err);
        else return res.json({ message: "Eliminazione delle serie avvenuta con successo"});
    })
};



const searchSerieTitleRegist = (req, res) => {
    let passato = req.params.parametro.toLowerCase();
    Serie.find({ $or: [{ titolo: passato }, { regista: passato }] }, (err, data) => {
        if (err) return standardError(err);
        if (!data) return res.json('La ricerca non ha prodotto nessun contenuto');
        else return res.json(data);
    });
};



const deleteOneSerie = (req, res, next) => {
    let titoloPassato = req.params.titolo.toLowerCase();
    let registaPassato = req.params.regista.toLowerCase();
    var query = { titolo: titoloPassato, regista: registaPassato};
    Serie.deleteOne(query, (err, collection) => {
        if (err) return standardError(err);
        else return res.json({ message: "Successo: la serie non è ora presente nel database" });
    });
};



const makeReview = (req, res) => {
    let authorUser = req.body.recensione[0];
    User.findOne({ username : authorUser }, (err, data) => {
        if (err) return standardError(err);
        else if (!data) return res.json({message: "L'autore di questa recensione non è presente nel database"});
        else {
            let titoloPassato = req.body.titolo.toLowerCase();
            let registaPassato = req.body.regista.toLowerCase();
            Serie.findOne({ titolo: titoloPassato, regista: registaPassato }, (err, data) => {
                if (err) return standardError(err);
                else if (!data) return res.json({message: "La serie a cui vorresti aggiungere la recensione non è presente nel database"});
                else {
                    for(let i=0; i<data.recensioni.length; i++)
                        if(data.recensioni[i][0] == authorUser)
                            return res.json({message: "Questo utente ha già aggiunto una recensione per questo titolo"});
                    let recensionePassata = req.body.recensione;
                    recensionePassata[3] = 0; //Nelle celle 3 e 4 sono contenuti il numero di reazioni
                    recensionePassata[4] = 0;
                    data.recensioni.push(recensionePassata);
                    data.valutazione = getUpdatedSerieScore(data.recensioni);
                    data.save(function (err) {
                        if (err) return standardError(err);
                    });
                    return res.json({message: "La recensione è stata aggiunta con successo"});
                }
            });
        }
    });
};



const getUpdatedSerieScore = (arrayRecensioni) => { //Funzione di supporto: non va chiamata dall'esterno
    let somma = 0;
    for(let i=0; i<arrayRecensioni.length; i++)                        
        somma += arrayRecensioni[i][1]; //Nella cella 1 è presente il punteggio legato alla recensione
    return somma/arrayRecensioni.length;
};



const standardError = (err) => { //Altra funzione di supporto
    return res.json(`Qualcosa è andato storto. Riprova: ${err}`);
}



//Esporto le funzioni definite
module.exports = {
    createSerie,
    getAllSerie,
    deleteAllSerie,
    searchSerieTitleRegist,
    deleteOneSerie,
    makeReview
};