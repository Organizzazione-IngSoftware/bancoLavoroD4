for(var i=0; i<process.argv.length; i++)
    console.log(i + ' -> ' + (process.argv[i]));


var fs = require("fs");
var fileName = process.argv[2];
fs.readFile(fileName, "utf8", function(error, data) {
    console.log(data);
    if(error) throw error;
});
console.log("Program ended");

//Questa è una chiamata asincrona e l'esecuzione dell'applicazione non viene bloccata
//Il primo parametro deve necessariamente essere il nome di un file