import { HospitalAPI } from './api.js';



export async function loadAndRenderRepartiByNome(nome) {
    try {
        const reparti = await HospitalAPI.getRepartiByNome(nome);
        renderReparti(reparti);
    } catch (error) {
        console.error("Error loading departments:", error);
        document.getElementById('reparti-list').innerHTML = `
            <div class="error">Errore nel caricamento dei reparti</div>
        `;
    }
}



function renderReparti(reparti) {
    const container = document.getElementById('reparti-list');
    container.innerHTML = '';

    if (!reparti || reparti.length === 0) {
        container.innerHTML = '<div class="card">Nessun reparto trovato</div>';
        return;
    }

    reparti.forEach(reparto => {
        // Controllo per oggetti vuoti o dati mancanti
        if (!reparto || Object.keys(reparto).length === 0) return;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>Stanza: ${reparto.stanza || 'Non specificata'}</h3>
            <p>Piano: ${reparto.piano !== undefined ? reparto.piano : 'Non specificato'}</p>
            <p>Orario: ${reparto.orario || 'Non specificato'}</p>
        `;
        container.appendChild(card);
    });
}