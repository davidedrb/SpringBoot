import { loadAndRenderRepartiByNome } from './reparti.js';
import { utentiByNomeCognome } from './utenti.js';
import { resetPage } from './api.js';
import { addUserS } from './utenti.js';
import { modUser } from './utenti.js';



let selezione;
let colonna;
const format = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


//selezione funzione
document.addEventListener('DOMContentLoaded', function() {


    const menu = document.getElementById('menuTendina');
    try {
        document.getElementById("sections").style.display = 'flex';
    }catch {}


    // Versione che reagisce al cambio selezione (senza bottone)
    menu.addEventListener('change', function() {
        resetPage();
        selezione = this.value;
        if (selezione) {
            scelta(selezione);
        }
    });

    function scelta(opzione) {

        switch(opzione) {
            case 'opzione1':

                let nome1 = document.getElementById("nome");
                nome1.style.display = 'block';
                nome1.placeholder = "inserisci il nome dell'utente";
                let cognome1 = document.getElementById("cognome");
                cognome1.placeholder = "inserisci cognome dell'utente";
                cognome1.style.display = 'block';
                document.getElementById("utenti-section").style.display = 'block';
                break;
            case 'opzione2':
                let stanza2 = document.getElementById("stanza");
                stanza2.style.display = 'block';
                stanza2.placeholder = "inserisci in numero dell'uffifio";
                document.getElementById("reparti-section").style.display = 'block';
                break;
            case 'opzione3':
                let nome3 = document.getElementById("nome");
                nome3.style.display = 'block';
                nome3.placeholder = "inserisci il nome dell'utente";

                let cognome3 = document.getElementById("cognome");
                cognome3.placeholder = "inserisci cognome dell'utente";
                cognome3.style.display = 'block';

                let email3 = document.getElementById("email");
                email3.style.display = 'block';
                email3.placeholder = "inserisci l'email dell'utente";

                let stanza3 = document.getElementById("stanza");
                stanza3.style.display = 'block';
                stanza3.placeholder = "inserisci l'ufficio dell'utente";

                document.getElementById("aggiungi-utente-section").style.display = 'block';
                break;
            case 'opzione4':
                let nome4 = document.getElementById("nome");
                nome4.style.display = 'block';
                nome4.placeholder = "inserisci il nome dell'utente";

                let cognome4 = document.getElementById("cognome");
                cognome4.style.display = 'block';
                cognome4.placeholder = "inserisci cognome dell'utente";


                document.getElementById("menuColonne").style.display = 'flex';
                document.getElementById("utenti-section").style.display = 'block';
                break;
            case 'opzione5':
                //messaggio = 'SOpzione 5 scelta!';
                break;
            case 'opzione6':
                //messaggio = 'Opzione 6 scelta!';
                break;
            default:
                //messaggio = 'Selezione non riconosciuta';
        }
        //alert(messaggio);
    }
});

//selezione colonna per modifica
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menuColonne');
    try{
        document.getElementById("sections").style.display = 'flex';
    }catch {}

    menu.addEventListener('change', function() {
        let idUser4 = document.getElementById('idUser');
        idUser4.style.display = 'block';
        idUser4.placeholder = "inserisci l'id dell'utente";

        let data4 = document.getElementById('data');
        data4.style.display = 'block';
        data4.placeholder = "inserisci il nuovo valore";

        const select = this.value;
        if (select) {
            scelta(select);
        }
    })
    function scelta(opzione) {

        /*const nome = document.getElementById('nome');
        const cognome = document.getElementById('cognome');
        nome.style.display = 'none';
        cognome.style.display = 'none';*/


        if (opzione === 'opzione1') {
            colonna = "nome"
        } else if (opzione === 'opzione2') {
            colonna = "cognome"
        } else if (opzione === 'opzione3') {
            colonna = "email"
        } else if (opzione === 'opzione4') {
            colonna = "stanza"
        } else {
        }
    }
});





//persone in ufficio
document.getElementById('stanza').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        const data = document.getElementById("stanza").value;
        const d = format(data)
        loadAndRenderRepartiByNome(d);

    }
})

//cerca utente in base a nome e cognome
document.getElementById('nome').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        mostraUtenti();
    }
})
document.getElementById('cognome').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        mostraUtenti();
    }
})
function mostraUtenti(){
    let nome = document.getElementById("nome").value
    let cognome = document.getElementById("cognome").value
    if (nome && nome.trim() !== "" && cognome && cognome.trim() !== "") {
        const n = format(nome);
        const c = format(cognome);
        utentiByNomeCognome(nome,cognome);
    }

}


//aggiunta utente
document.getElementById('nome').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        addUser();
    }
})
document.getElementById('cognome').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        addUser();
    }
})
document.getElementById('email').addEventListener("keydown", function (e) {if (e.key === 'Enter') {
    addUser();
}})
document.getElementById('stanza').addEventListener("keydown", function (e) {if (e.key === 'Enter') {
    addUser();
}})

function addUser(){
    let nome = document.getElementById("nome").value
    let cognome = document.getElementById("cognome").value
    let email = document.getElementById("email").value
    let stanza = document.getElementById("stanza").value
    if(nome && nome.trim() !== "" && cognome && cognome.trim() !== "" && email && email.trim() !== "" && stanza && stanza.trim()){
        const n = format(nome);
        const c = format(cognome);
        const e = format(email);
        const s = format(stanza);
        addUserS(n, c, e, s);
    }

}

//modifica utente

document.getElementById("idUser").addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        modUser();
    }
})
document.getElementById('data').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        modUserS();
    }
})

function modUserS(){
    let idUser = document.getElementById('idUser').value
    let data = document.getElementById('data').value
    if (idUser && idUser.trim() !== "" && data && data.trim() !== "" && colonna !== "") {
        const id = format(idUser);
        const d = format(data);
        modUser(id, colonna, d);
    }
}

