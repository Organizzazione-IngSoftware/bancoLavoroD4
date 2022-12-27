const fs = require("fs");

const readPromisify = function(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, (err, data) => {
            if (err) throw reject(err);
            resolve(data); data
        });
    });
}

readPromisify('/file.md')
.then(function(data) {
    console.log("Promise resolved");
})
.catch(function(err) {
    console.log("Promise rejected");
});