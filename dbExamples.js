//Qui viene mostrato un esempio di query di inserimento di un utente 



//Importazione librerie
const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userModel");
const filmModel = require("./filmModel");
const serieModel = require("./serieModel");
mongoose.set('strictQuery', false);
const app = express();
const mongoAtlasUri = "mongodb+srv://moViewerNet:FiletMignon546@clusterprinc.qjxmkkq.mongodb.net/?retryWrites=true&w=majority";



//Connessione al database
try {
    mongoose.connect (
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("Could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));



//Aggiunta di un utente al database
const user = new userModel({ mail: 'LeonardoDC@gmail.com', username: 'leonardoDC', password: 'pippopluto53'});
user.save(function (err) {
    if(err) return handleError(err);
    console.log("User added");
});



//Aggiunta di un film al database
const film = new filmModel({ titolo: 'Il signore degli anelli', regista: 'Peter Jackson', etaConsigliata: 8,
                             immagineCopertina: 'https://pad.mymovies.it/filmclub/2002/01/011/coverlg_home.jpg',
                             durata: 190, generi: ['azione','fantasy'], piattaforme: ['Prime Video'],
                            });
film.save(function (err) {
    if(err) return handleError(err);
    console.log("Film added");
});



//Aggiunta di una serie al database
const serie = new serieModel({ titolo: 'Breaking Bad', regista: 'Vince Gilligan', etaConsigliata: 16,
                             immagineCopertina: 'https://pop.proddigital.com.br/wp-content/uploads/sites/8/2021/11/breaking-bad.jpg',
                             numeroStagioniTotale: 5, generi: ['azione'], piattaforme: ['Netflix'],
                            });
serie.save(function (err) {
    if(err) return handleError(err);
    console.log("Serie added");
});



/* Esempi più avanzati che ci serviranno più avanti
userModel.insertMany(
    [{ name: 'mario rossi', age: 56},
    { name: 'Paolo Cannone', age: 30}],
    function (err) {
        console.log("array of users added");
});
userModel.findOne( {name: 'mario rossi'}, function(err, user) 
{
    console.log("age: ", user.age);
});   */