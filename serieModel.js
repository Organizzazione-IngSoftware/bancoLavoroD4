//In questo file si trova lo schema delle

const mongoose = require("mongoose");
const SerieSchema = new mongoose.Schema({
    titolo: {
        type: String,
        required: true,
    },
    regista: {
        type: String,
        required: true,
    },
    etaConsigliata: {
        type: String,
        required: true,
    },
    valutazione: {
        type: Number,
        required: false,
    },
    immagineCopertina: {
        type: String,
        required: true,
    },
    numeroStagioniTotale: {
        type: Number,
        required: true,
    },
    generi: {
        type: [String],
        required: true,
    },
    piattaforme: {
        type: [String],
        required: true,
    }
});

const Serie = mongoose.model("Serie", SerieSchema);
module.exports = Serie;