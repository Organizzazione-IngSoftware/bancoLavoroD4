var loggedUser = {};



//Funzioni degli utenti

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
        if(data.isPrivate) document.getElementById("privacy").textContent = "profilo privato";
        else document.getElementById("privacy").textContent = "profilo pubblico";
        return;
    }).catch( error => console.error(error) );
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

function trovaUtente() {
    const ul = document.getElementById('userList');
    const name = document.getElementById('userSearchUsername').value;
    ul.textContent = '';
    fetch('../api/v1/user/findOne/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then(function(data) {
        return data.map(function(user) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = user.self
            a.textContent = user.username;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );   
};

function changePrivacy() { //!!!
    //const privacyValue = document.getElementById(privato).value;
    fetch('../api/v1/user/setMyPrivacy', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, mail: loggedUser.email, isPrivate: true} ),
    })
    .then((resp) => {
        //document.getElementById("privacy").textContent = privacyValue;
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) );
};

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



//Funzioni dei film

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
        else document.getElementById("movie").textContent = "controlla la lista dei film";
        console.log(resp);
        return;
    })
    .catch( error => console.error(error) );
};

function trovaTuttiFilm() {
    const ul = document.getElementById('movies');
    ul.textContent = '';
    fetch('../api/v1/movie/getAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then(function(data) {
        return data.map(function(movie) {
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
    .catch( error => console.error(error) );
};
trovaTuttiFilm();

function trovaFilmTitoloRegista() {
    const ul = document.getElementById('moviesTR');
    const name = document.getElementById('movieTRTitolo').value;
    ul.textContent = '';
    fetch('../api/v1/movie/getByTitleRegist/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then(function(data) {
        return data.map(function(movie) {
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
    .catch( error => console.error(error) ); 
};