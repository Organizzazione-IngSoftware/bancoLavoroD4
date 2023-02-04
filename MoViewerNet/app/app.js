const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const movie = require('./movie.js');
const serie = require('./serie.js');
const user = require('./user.js');



app.use((req, res, next) => {
    console.log("api chiamata: " + req.method + ' ' + req.url);
    next();
});



app.use('/api/v1/movie', movie);
app.use('/api/v1/serie', serie);
app.use('/api/v1/user', user);



app.use((req, res) => {
    res.status(404);
    res.json({ error: "Not found" });
});



module.exports = app;