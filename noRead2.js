//Un esempio che non ci serve al momento visto durante i primi tutorial

const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.set('strictQuery', false);
const mongoAtlasUri = "mongodb+srv://moViewerNet:FiletMignon546@clusterprinc.qjxmkkq.mongodb.net/?retryWrites=true&w=majority";

try {
    mongoose.connect (
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected"),
    );
} catch (e) {
    console.log("Could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));