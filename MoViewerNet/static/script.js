var loggedUser = {};



function donazione() {
    fetch('../api/v1/user/donation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resp) => {
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) );
};



function putMovie() {
    var titolo = document.getElementById("movieTitolo").value;
    var regista = document.getElementById("movieRegista").value;
    var etaCons = document.getElementById("movieEtaCons").value;
    var copertina = document.getElementById("movieCopertina").value;
    var durata = document.getElementById("movieDurata").value;
    var generi = document.getElementById("movieGeneri").value;
    var piattaforme = document.getElementById("moviePiattaforme").value;
    fetch('../api/v1/movie/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, titolo: titolo, regista: regista, etaCons: etaCons, copertina: copertina, durata: durata, generi: generi, piattaforme: piattaforme } ),
    })
    .then((resp) => {
        if(! loggedUser.email) document.getElementById("movie").textContent = "non autorizzato";
        else document.getElementById("movie").textContent = "film presente nel db";
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) );
};



function registrati() {
    var mail = document.getElementById("signupEmail").value;
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    var passwordSupp = document.getElementById("signupPasswordSupp").value;
    fetch('../api/v1/user/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { mail: mail, username: username, password: password, passwordSupp: passwordSupp } ),
    })
    .then((resp) => {
        document.getElementById("signUp").textContent = "reg. effettuata";
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) );
};



function login() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    fetch('../api/v1/authentications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, password: password } ),
    })
    .then((resp) => resp.json())
    .then(function(data) {
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        if(loggedUser.email) document.getElementById("loggedUser").textContent = loggedUser.email;
        else document.getElementById("loggedUser").textContent = "none";
        return;
    }).catch( error => console.error(error) );
};



function trovaTuttiFilm() {
    const ul = document.getElementById('movies'); // Get the list where we will place our authors
    ul.textContent = '';
    fetch('../api/v1/movie/getAll')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please    
        return data.map(function(movie) { // Map through the results and for each run the code below  
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = movie.self
            a.textContent = movie.titolo;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
};



function trovaFilmTitoloRegista() {
    const ul = document.getElementById('moviesTR'); // Get the list where we will place our authors
    const name = document.getElementById('movieTRTitolo').value;
    ul.textContent = '';
    fetch('../api/v1/movie/getByTitleRegist/' + name)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        return data.map(function(movie) { // Map through the results and for each run the code below  
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = movie.self
            a.textContent = movie.titolo;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here   
}