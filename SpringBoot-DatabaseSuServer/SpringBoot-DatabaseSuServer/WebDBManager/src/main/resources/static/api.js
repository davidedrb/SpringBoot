// Variabile globale dinamica
const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    // Se siamo in locale usa la porta 1111, altrimenti usa l'host corrente
    return hostname === 'localhost' || hostname === '127.0.0.1'
        ? 'http://localhost:1111/api'
        : `${protocol}//${hostname}${port ? ':' + port : ''}/api`;
};

export const API_URL = getBaseUrl();

// Validazione centralizzata
export const Validator = {
    isText: (val) => val.trim().length >= 2,
    isEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    isId: (val) => !isNaN(val) && parseInt(val) > 0
};

export const HospitalAPI = {
    // Ricerca Utente: POST perché inviamo dati sensibili
    async searchUtenti(nome, cognome) {
        const res = await fetch(`${API_URL}/utenti/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, cognome })
        });
        return res.json();
    },

    // Ricerca Ufficio: GET consentito (dati pubblici nel link)
    async getRepartiByUfficio(stanza) {
        const res = await fetch(`${API_URL}/reparti/search?stanza=${encodeURIComponent(stanza)}`);
        return res.json();
    },

    // Aggiunta: POST (Dati sensibili)
    async addUser(userData) {
        const res = await fetch(`${API_URL}/utenti/addUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return res.json();
    },

    // Modifica: POST
    async updateUser(id, colonna, valore) {
        const res = await fetch(`${API_URL}/utenti/modUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, colonna, valore })
        });
        return res.json();
    }
};