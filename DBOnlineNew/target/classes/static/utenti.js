
// utenti.js
import { HospitalAPI } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const utenti = await HospitalAPI.getUtenti();
        renderUtenti(utenti);
    } catch (error) {
        console.error("Error loading users:", error);
        document.getElementById('utenti-list').innerHTML = `
            <div class="error">Errore nel caricamento degli utenti</div>
        `;
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const utenti = await HospitalAPI.getUtenti();
        renderUtenti(utenti);
    } catch (error) {
        console.error("Error loading users:", error);
        document.getElementById('utenti-list').innerHTML = `
            <div class="error">Errore nel caricamento degli utenti</div>
        `;
    }
});

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
            <h3>${utente.nome || 'Nome non disponibile'} ${utente.cognome || 'Cognome non disponibile'}</h3>
            <p>Email: ${utente.email || 'Non specificato'}</p>
            ${utente.reparto ? `
                <p>Reparto: ${utente.reparto.stanza || 'N/D'} (Piano ${utente.reparto.piano || 'N/D'})</p>
            ` : '<p>Reparto: Non assegnato</p>'}
        `;
        container.appendChild(card);
    });
}