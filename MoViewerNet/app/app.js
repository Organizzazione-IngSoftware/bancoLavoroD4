const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const tokenChecker = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token) res.status(401).json( {success: false, message: 'No token provided' });
    jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
        if(err) res.status(403).json( {success: false, message: 'Token not valid'} );
        else {
            req.loggedUser = decoded;
            next();
        }
    })
}



const movie = require('./movie.js');
const serie = require('./serie.js');
const user = require('./user.js');



app.use((req, res, next) => {
    console.log("api chiamata: " + req.method + ' ' + req.url);
    next();
});



app.use('api/v1/authentication', authentication);
app.use('/api/v1/movie/create', tokenChecker);
app.use('/api/v1/movie/deleteAll', tokenChecker);
app.use('/api/v1/movie/deleteOne', tokenChecker);
app.use('/api/v1/serie/create', tokenChecker);
app.use('/api/v1/serie/deleteAll', tokenChecker);
app.use('/api/v1/serie/deleteOne', tokenChecker);
app.use('/api/v1/user/setPrivacy', tokenChecker);
app.use('/api/v1/user/deleteAll', tokenChecker);
app.use('/api/v1/user/deleteOne', tokenChecker);



app.use('/api/v1/movie', movie);
app.use('/api/v1/serie', serie);
app.use('/api/v1/user', user);



app.use((req, res) => {
    res.status(404);
    res.json({ error: "Not found" });
});



module.exports = app;