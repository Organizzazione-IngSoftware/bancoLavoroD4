const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


const authentication = require('./authentication.js');
const tokenChecker = require('./tokenChecker.js');


const movie = require('./movie.js');
const serie = require('./serie.js');
const user = require('./user.js');
const review = require('./review.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/', express.static(process.env.FRONTED || 'static'));
app.use('/', express.static('static'));


app.use((req, res, next) => {
    console.log("api chiamata: " + req.method + ' ' + req.url);
    next();
});


app.use('/api/v1/authentications', authentication);
app.use('/api/v1/movie/create', tokenChecker);
app.use('/api/v1/movie/deleteAll', tokenChecker);
app.use('/api/v1/movie/deleteOne', tokenChecker);
app.use('/api/v1/serie/create', tokenChecker);
app.use('/api/v1/serie/deleteAll', tokenChecker);
app.use('/api/v1/serie/deleteOne', tokenChecker);
app.use('/api/v1/user/setMyPrivacy', tokenChecker);
app.use('/api/v1/user/deleteAll', tokenChecker);
app.use('/api/v1/review/makeReview', tokenChecker);


app.use('/api/v1/movie', movie);
app.use('/api/v1/serie', serie);
app.use('/api/v1/user', user);
app.use('/api/v1/review', review);


app.use((req, res) => {
    res.status(404);
    res.json({ error: "Not found" });
});


module.exports = app;