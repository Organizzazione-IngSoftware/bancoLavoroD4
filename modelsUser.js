const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordSupp: {
        type: String,
        required: false,
    },
    codiceOriginale: {
        type: Number,
        required: false,
    },
    codiceInserito: {
        type: Number,
        required: false,
    },
    isPrivate: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;


/*prova aaaaaaaaaaa*/