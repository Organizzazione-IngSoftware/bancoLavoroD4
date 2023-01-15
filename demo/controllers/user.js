const User = require('../models/user');



const newUser = (req, res) => {
    User.findOne({ mail: req.body.mail }, (err, data) => {
        if (!data) {
            const newUser = new User ({
                mail: req.body.mail,
                username: req.body.username,
                password: req.body.password,
                isPrivate: req.body.isPrivate,
            })
            newUser.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })         
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({ message: "User already exists" });
        }
    })
};



const getAllUser = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};



const deleteAllUser = (req, res) => {
    User.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
    })
};



const getOneUser = (req, res) => {
    let passato = req.params.username; //get the username
    User.findOne({ username: passato }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "User doesn't exist." });
        }
        else return res.json(data); //return the user object if found
    });
};



const deleteOneUser = (req, res, next) => {
    let passato = req.params.username;
    var query = { username: passato };
    User.deleteOne(query, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            console.log("User deleted successfully");
            res.json({ message: "DELETED USER" });
        }
    });
};



//export controller functions
module.exports = {
    getAllUser,
    newUser,
    deleteAllUser,
    getOneUser,
    deleteOneUser
};