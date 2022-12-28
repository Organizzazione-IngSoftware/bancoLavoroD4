const dotenv = require('dotenv').config()
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const routes = require('./routes/tea');

app.use(express.json());
app.use('/', routes);

mongoose.connect(
    process.env.MONGODB_URI,
    {usedNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if(err) return console.log("Error: ", err);
        console.log("MongoDB conn -- state: ", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});