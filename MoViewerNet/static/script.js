var loggedUser = {}



function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    fetch('../api/v1/authentication/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {mail: email, password: password} ),
    }).then((resp) => resp.json())

    .then(function(data) {
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        document.getElementById("loggedUser").innerHTML = loggedUser.email;
        loadLendings();
        return;
    }).catch( error => console.error(error));
};



function loadMovies() {}
loadMovies();



function insertMovie() {}