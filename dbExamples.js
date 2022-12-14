const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models");
mongoose.set('strictQuery', false);
const app = express();
const mongoAtlasUri = "mongodb+srv://moViewerNet:FiletMignon546@clusterprinc.qjxmkkq.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect (
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("Could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

const user = new userModel({ mail: 'LeonardoDC@gmail.com', username: 'leonardoDC', password: 'pippopluto53'});
user.save(function (err) {
    if(err) return handleError(err);
    console.log("User added");
});






/*

userModel.insertMany(
    [{ name: 'mario rossi', age: 56},
    { name: 'Paolo Cannone', age: 30}],
    function (err) {
        console.log("array of users added");
});

userModel.findOne( {name: 'mario rossi'}, function(err, user) 
{
    console.log("age: ", user.age);
});

*/