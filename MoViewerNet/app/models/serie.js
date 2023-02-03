const mongoose = require("mongoose"); //importo mongoose

//schema delle serie
const SerieSchema = new mongoose.Schema ({
    titolo: { type: String, required: true },
    regista: { type: String, required: true },
    etaCons: {type: String},
    valutazione: { type: Number},
    copertina: { type: String, required: true},
    generi: { type: [String], required: true},
    piattaforme: { type: [String], required: true},
    stagioni: { type: [[Number]], required: true},
    recensioni: { type: [[]]},
});

const Serie = mongoose.model('Serie', SerieSchema);
module.exports = Serie;