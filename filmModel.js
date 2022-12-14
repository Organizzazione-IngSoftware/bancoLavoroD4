//In questo file si trova lo schema dei film

const mongoose = require("mongoose");
const FilmSchema = new mongoose.Schema({
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
    durata: {
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

const Film = mongoose.model("Film", FilmSchema);
module.exports = Film;