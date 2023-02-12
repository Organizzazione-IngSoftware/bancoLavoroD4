const mongoose = require("mongoose"); //importo mongoose

//schema dei movie
const MovieSchema = new mongoose.Schema ({
    titolo: { type: String, required: true },
    regista: { type: String, required: true },
    etaCons: {type: String},
    valutazione: { type: Number}, //Attributo calcolato
    copertina: { type: String, required: true},
    durata: { type: String, required: true},
    generi: { type: [String], required: true},
    piattaforme: { type: [String], required: true},
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;