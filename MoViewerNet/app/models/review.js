const mongoose = require("mongoose"); //importo mongoose

//schema degli utenti
const ReviewSchema = new mongoose.Schema ({
    titolo: { type: String, required: true },
    regista: { type: String, required: true},
    mailAutore: { type: String, required: true},
    voto: { type: Number, required: true},
    testo: { type: String}
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;