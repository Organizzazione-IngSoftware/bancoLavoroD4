const Tea = require('../models/tea');



const newTea = (req, res) => {
    console.log("qui");
    Tea.findOne({ name: req.body.name }, (err, data) => {
        if (!data) {
            const newTea = new Tea({
                name: req.body.name,
                image: req.body.image, // placeholder for now
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })
            newTea.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })         
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "Tea already exists" });
        }
    })
};



const getAllTea = (req, res) => {
    Tea.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};



const deleteAllTea = (req, res) => {
    Tea.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
    })
};



const getOneTea = (req, res) => {
    let name = req.params.name; //get the tea name
    console.log(name);
    Tea.findOne({ name: name }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Tea doesn't exist." });
        }
        else return res.json(data); //return the tea object if found
    });
};



const deleteOneTea = (req, res, next) => {
    let teaName = req.params.name;
    var query = { name: teaName };
    Tea.deleteOne(query, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Tea deleted successfully");
            res.json({ message: "DELETE 1 tea" });
        }

    });
};



//export controller functions
module.exports = {
    getAllTea,
    newTea,
    deleteAllTea,
    getOneTea,
    deleteOneTea
};