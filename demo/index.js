const app = require('./app/app.js');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require('dotenv').config();

/**
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */
const port = process.env.PORT || 8080;



//Configuro mongoose
// mongoose.Promise = global.Promise;
app.locals.db = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connessione al database effettuata");
        app.listen(port, () => {
            console.log(`Server in ascolto sulla porta ${port}`);
        });
    });