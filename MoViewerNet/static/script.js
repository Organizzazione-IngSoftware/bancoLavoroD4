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
    .then((res) => res.json())
    .then(function(data) {
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        if(loggedUser.email) {
            document.getElementById("loggedUser").textContent = loggedUser.email;
            if(data.isPrivate) document.getElementById("privacy").textContent = "profilo privato";
            else document.getElementById("privacy").textContent = "profilo pubblico";
        }
        else document.getElementById("loggedUser").textContent = "none";
        return;
    }).catch( error => console.error(error) );
};

function registrati() {  //!!!
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
    .then((res) => {
        if(res.status == 400) document.getElementById("signUp").textContent = "email non valida o password diverse";
        else if(res.status == 409) document.getElementById("signUp").textContent = "esiste già un utente con queste credenziali";
        else document.getElementById("signUp").textContent = "utente registrato con successo";
        console.log(res);
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
    .then((res) => res.json())
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

function changePrivacy() {
    var privacyRadio = document.querySelector("input[type='radio'][name=privacyForm]:checked").value;
    var boolValue = (privacyRadio == 'profilo privato');
    fetch('../api/v1/user/setMyPrivacy', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, mail: loggedUser.email, isPrivate: boolValue} ),
    })
    .then((res) => {
        if(loggedUser.token) document.getElementById("privacy").textContent = privacyRadio;
        console.log(res);
        return;
    })
    .catch( error => console.error(error) );
};

function eliminaUtenti() {
    fetch('../api/v1/user/deleteAll', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
    })
    .then((res) => {
        if(!loggedUser.token)
            document.getElementById('feedbackDelete').textContent = "non autorizzato";
        else
        document.getElementById('feedbackDelete').textContent = "azione eseguita";
        console.log(res);
        return;
    })
    .catch( error => console.error(error) );
}

function donazione() {
    fetch('../api/v1/user/donation', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => {
        console.log(res);
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
    var generi = (document.getElementById("movieGeneri").value).split();
    var piattaforme = (document.getElementById("moviePiattaforme").value).split();
    fetch('../api/v1/movie/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, titolo: titolo, regista: regista, etaCons: etaCons, copertina: copertina, durata: durata, generi: generi, piattaforme: piattaforme } ),
    })
    .then((res) => {
        if(! loggedUser.email) document.getElementById("movie").textContent = "non autorizzato";
        else if(res.status == 409) document.getElementById("movie").textContent = "film già esistente";
        else {
            document.getElementById("movie").textContent = "ho aggiunto il film al database";
            trovaTuttiFilm();
        }
        console.log(res);
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
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(movie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = movie.self
            a.textContent = movie.titolo + ", " + movie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );
};
trovaTuttiFilm();

function eliminaFilm() {
    fetch('../api/v1/movie/deleteAll', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
    })
    .then((res) => {
        if(!loggedUser.token)
            document.getElementById('feedbackDeleteMovie').textContent = "non autorizzato";
        else {
            document.getElementById('feedbackDeleteMovie').textContent = "azione eseguita";
            const ul1 = document.getElementById('movies');
            const ul2 = document.getElementById('moviesTR');
            const ul3 = document.getElementById('globale');
            ul1.textContent = '';
            ul2.textContent = '';
            ul3.textContent = '';
            console.log(res);
        }
    })
    .catch( error => console.error(error) );
};

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
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(movie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = movie.self;
            a.textContent = movie.titolo + ", " + movie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) ); 
};



//Funzioni delle serie

function putSerie() {
    var titolo = document.getElementById("serieTitolo").value;
    var regista = document.getElementById("serieRegista").value;
    var etaCons = document.getElementById("serieEtaCons").value;
    var copertina = document.getElementById("serieCopertina").value;
    var generi = (document.getElementById("serieGeneri").value).split();
    var piattaforme = (document.getElementById("seriePiattaforme").value).split();
    fetch('../api/v1/serie/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, titolo: titolo, regista: regista, etaCons: etaCons, copertina: copertina, generi: generi, piattaforme: piattaforme } ),
    })
    .then((res) => {
        if(! loggedUser.email) document.getElementById("serie").textContent = "non autorizzato";
        else if(res.status == 409) document.getElementById("serie").textContent = "serie già esistente";
        else {
            document.getElementById("serie").textContent = "ho aggiunto il serie al database";
            trovaTuttiSerie();
        }
        console.log(res);
        return;
    })
    .catch( error => console.error(error) );
    trovaTuttiSerie();
};

function trovaTuttiSerie() {
    const ul = document.getElementById('series');
    ul.textContent = '';
    fetch('../api/v1/serie/getAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(serie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = serie.self
            a.textContent = serie.titolo + ", " + serie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );
};
trovaTuttiSerie();

function eliminaSerie() {
    fetch('../api/v1/serie/deleteAll', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
    })
    .then((res) => {
        if(!loggedUser.token)
            document.getElementById('feedbackDeleteSerie').textContent = "non autorizzato";
        else {
            document.getElementById('feedbackDeleteSerie').textContent = "azione eseguita";
            const ul1 = document.getElementById('series');
            const ul2 = document.getElementById('seriesTR');
            const ul3 = document.getElementById('globale');
            ul1.textContent = '';
            ul2.textContent = '';
            ul3.textContent = '';
            console.log(res);
        }
    })
    .catch( error => console.error(error) );
};

function trovaSerieTitoloRegista() {
    const ul = document.getElementById('seriesTR');
    const name = document.getElementById('serieTRTitolo').value;
    ul.textContent = '';
    fetch('../api/v1/serie/getByTitleRegist/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(serie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = serie.self;
            a.textContent = serie.titolo + ", " + serie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) ); 
};



//API delle recensioni

function putReview() {
    var titolo = document.getElementById("reviewTitolo").value;
    var regista = document.getElementById("reviewRegista").value;
    var mailAutore = loggedUser.email;
    var voto = document.getElementById("reviewVoto").value;
    var testo = document.getElementById("reviewTesto").value;
    if(!testo) testo = "";
    fetch('../api/v1/review/makeReview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { user: loggedUser.self, titolo: titolo, regista: regista, mailAutore: mailAutore, voto: voto, testo: testo } ),
    })
    .then((res) => {
        if(!loggedUser.email) document.getElementById("reviewFeedback").textContent = "non autorizzato";
        else if(res.status == 409) document.getElementById("reviewFeedback").textContent = "hai già recensito questo titolo";
        else if(res.status == 404) document.getElementById("reviewFeedback").textContent = "non esiste nessun elemento con questo titolo e questo regista";
        else if(res.status == 400) document.getElementById("reviewFeedback").textContent = "il voto inserito non è valido";
        else {
            document.getElementById("reviewFeedback").textContent = "ho aggiunto la recensione";
            trovaTutteRecensioni();
            fetch('../api/v1/review/refreshPunteggio', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( { titolo: titolo, regista: regista } ),
            })
            .catch( error => console.error(error) );
        }
    })
    .catch( error => console.error(error) );
};

function trovaTutteRecensioni() {
    const ul = document.getElementById('reviews');
    ul.textContent = '';
    fetch('../api/v1/review/getAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(review) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.textContent = review.titolo + ", " + review.regista + ", " + review.mailAutore + ", " + review.voto + ", " + review.testo;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );
};
trovaTutteRecensioni();



//Altre API

function trovaTitoloRegistaGlobale() {
    const ul = document.getElementById('globale');
    const name = document.getElementById('globalTitolo').value;
    ul.textContent = '';
    fetch('../api/v1/serie/getByTitleRegist/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(serie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = serie.self;
            a.textContent = serie.titolo + ", " + serie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );
    
    fetch('../api/v1/movie/getByTitleRegist/' + name, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then(function(data) {
        return data.map(function(movie) {
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);  
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${book.self}">${book.title}</a>`;
            let a = document.createElement('a');
            a.href = serie.self;
            a.textContent = movie.titolo + ", " + movie.regista;
            // span.innerHTML += `<button type="button" onclick="takeBook('${book.self}')">Take the book</button>`
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );
};