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

    reparti.forEach(riga => {
        if (!riga || riga.length === 0) return;

        const [stanza,piano,orario,nome, cognome, email] = riga;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <h3>Stanza: ${stanza || 'Non specificata'}</h3>
        <p>Piano: ${piano ?? 'Non specificato'}</p>
        <p>Orario: ${orario || 'Non specificato'}</p>
        <p>Nome: ${nome || 'Non specificato'}</p>
        <p>Cognome: ${cognome || 'Non specificato'}</p>
        <p>Email: ${email || 'Non specificato'}</p>
    `;
        container.appendChild(card);
    });
}