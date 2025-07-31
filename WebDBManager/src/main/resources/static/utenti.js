
import { HospitalAPI } from './api.js';


export async function utentiByNomeCognome(nome, cognome) {
    try {
        const utenti = await HospitalAPI.getUtenti(nome,cognome);
        renderUtenti(utenti);
    } catch (error) {
        console.error("Error loading users:", error);
        document.getElementById('utenti-list').innerHTML = `
            <div class="error">Errore nel caricamento degli utenti</div>
        `;
    }
}

export async function addUserS(nome, cognome, email, stanza) {
    try {
        const addUser= await HospitalAPI.addUser(nome, cognome, email, stanza);
        renderAdduser(addUser);
    }catch(error) {
        console.error("Error adding user:", error);
        document.getElementById('aggiungi-utente-list').innerHTML = `
        <div class="error">Errore nell'aggiunta dell'utente</div>
        `}


}

export async function modUser(id, colonna, data) {
    try{
        const modUserS = await HospitalAPI.modUser(id, colonna, data);
        renderModUser(modUserS);
    }catch(error) {
        console.error("Error mod user:", error);
        document.getElementById('aggiungi-utente-list').innerHTML = `
        <div class="error">Errore con la modifica dell'utente</div>`
    }
}

//cerca utenti
function renderUtenti(utenti) {
    const container = document.getElementById('utenti-list');
    container.innerHTML = '';

    if (!utenti || utenti.length === 0) {
        container.innerHTML = '<div class="card">Nessun utente trovato</div>';
        return;
    }

    utenti.forEach(utente => {
        if (!utente || Object.keys(utente).length === 0) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3>${(utente.nome && utente.cognome) ? utente.nome + ' ' + utente.cognome : 'Utente non trovato'}</h3>
        <p>Email: ${utente.email || 'Email non specificata'}</p>
        <p>Ufficio: ${utente.reparto.stanza || 'Ufficio non specificato'}</p>
        <p>ID: ${utente.id || 'ID non specificato'}</p>
        `;
        console.log('Utenti ricevuti:', utenti);
        container.appendChild(card);
    });
}


//aggiunta utenti
function renderAdduser(addUser) {
    const container = document.getElementById('aggiungi-utente-list');
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <p>Stato: ${addUser || 'Utente non inserito'}</p>
    `;
    container.appendChild(card);
}


//modifica utente
function renderModUser(modUser) {

    const container = document.getElementById('modifica-utente-list');
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <p>Stato: ${modUser || 'Utente non inserito'}</p>`

}