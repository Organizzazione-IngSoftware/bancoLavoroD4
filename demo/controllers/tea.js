const Tea = require('../models/tea');

console.log("controller");
const newTea = (req, res, next) => {
    console.log("eccomi");
    res.json({message: "POST new tea"});
};

module.exports = {newTea};