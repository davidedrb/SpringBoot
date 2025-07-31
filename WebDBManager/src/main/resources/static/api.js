// api.js - Versione corretta con export
const API_BASE_URL = 'http://localhost:8080/api';


//reset della pagina al cambio del menu
export function resetPage(){
    const nome = document.getElementById('nome');
    const cognome = document.getElementById('cognome');
    const stanza =  document.getElementById('stanza');
    const email = document.getElementById('email');
    const idUser = document.getElementById('idUser');
    const modificaUser = document.getElementById('modificaUser');
    const data = document.getElementById('data');




    const repartiS = document.getElementById('reparti-section');
    const utentiS = document.getElementById('utenti-section');
    const aggUtenteS = document.getElementById('aggiungi-utente-section');
    const modUtenteS = document.getElementById('modifica-utente-section');

    nome.value= '';
    cognome.value= '';
    stanza.value= '';
    email.value= '';
    idUser.value= '';
    modificaUser.value= '';
    data.value =  '';

    nome.style.display = 'none';
    cognome.style.display = 'none';
    stanza.style.display = 'none';
    email.style.display = 'none';
    idUser.style.display = 'none';
    modificaUser.style.display = 'none';
    data.style.display = 'none';

    repartiS.style.display = 'none';
    utentiS.style.display = 'none';
    aggUtenteS.style.display = 'none';
    modUtenteS.style.display = 'none';
}


async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
async function fetchText(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();  // 👈 Risposta come testo normale
    } catch (error) {
        console.error('Error fetching text data:', error);
        return 'Errore imprevisto';
    }
}


// Esporta le funzioni
export const HospitalAPI = {
    //getReparti: async () => await fetchData('/reparti'),
    getUtenti: async (nome, cognome) => await fetchData(`/utenti/id?nome=${encodeURIComponent(nome)}&cognome=${encodeURIComponent(cognome)}`),
    getRepartiByNome: async (nome) => await fetchData(`/reparti/UtentiReparti?stanza=${encodeURIComponent(nome)}`),
    addUser: async (nome, cognome, email, stanza) => await fetchText(`/utenti/addUser?nome=${encodeURIComponent(nome)}&cognome=${encodeURIComponent(cognome)}&email=${encodeURIComponent(email)}&stanza=${encodeURIComponent(stanza)}`),
    modUser: async (id, colonna, data) => await fetchText(`/utenti/modUser?id=${encodeURIComponent(id)}&colonna=${encodeURIComponent(colonna)}&data=${encodeURIComponent(data)}`),
};