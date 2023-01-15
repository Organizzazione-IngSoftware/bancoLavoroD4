const mongoose = require("mongoose"); //importo mongoose

//schema degli utenti
const UserSchema = new mongoose.Schema ({
    mail: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    passwordSupp: {type: String},
    isPrivate: { type: Boolean, required: true},
    codiceOrig: { type: Number},
    codiceIns: { type: Number},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;