const dotenv = require('dotenv').config()
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const routes = require('./routes/user');
mongoose.set('strictQuery', true);

app.use(express.json());
app.use('/', routes);

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Errore: ", err);
        console.log("Connessione a mongoDB -- Stato:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Applicazione in ascolto sulla porta ' + listener.address().port)
});