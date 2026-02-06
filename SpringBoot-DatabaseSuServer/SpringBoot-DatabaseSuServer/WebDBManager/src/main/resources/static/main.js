import { HospitalAPI, Validator } from './api.js';

const dynamicForm = document.getElementById('dynamicForm');
const results = document.getElementById('results');
const feedback = document.getElementById('feedback');

document.getElementById('mainAction').addEventListener('change', (e) => {
    const action = e.target.value;
    renderForm(action);
    clearUI();
});

function clearUI() {
    results.innerHTML = '';
    feedback.className = 'feedback';
    feedback.textContent = '';
}

function showMsg(msg, isError = false) {
    feedback.textContent = msg;
    feedback.className = `feedback ${isError ? 'error' : 'success'}`;
}

function renderForm(action) {
    dynamicForm.innerHTML = '';
    if (!action) return;

    const forms = {
        search_user: `
            <input type="text" id="f_nome" placeholder="Nome">
            <input type="text" id="f_cognome" placeholder="Cognome">
            <button id="doAction">Cerca Utente</button>`,
        search_office: `
            <input type="text" id="f_stanza" placeholder="Numero Stanza/Ufficio">
            <button id="doAction">Cerca Reparto</button>`,
        add: `
            <input type="text" id="f_nome" placeholder="Nome">
            <input type="text" id="f_cognome" placeholder="Cognome">
            <input type="email" id="f_email" placeholder="Email">
            <input type="text" id="f_stanza" placeholder="Stanza">
            <button id="doAction">Salva</button>`,
        edit: `
            <input type="number" id="f_id" placeholder="ID Utente">
            <select id="f_col">
                <option value="nome">Nome</option>
                <option value="cognome">Cognome</option>
                <option value="email">Email</option>
                <option value="stanza">Stanza</option>
            </select>
            <input type="text" id="f_val" placeholder="Nuovo Valore">
            <button id="doAction">Aggiorna</button>`
    };

    dynamicForm.innerHTML = forms[action];
    document.getElementById('doAction').onclick = () => handleAction(action);
}

async function handleAction(action) {
    clearUI();
    try {
        if (action === 'search_user') {
            const n = document.getElementById('f_nome').value;
            const c = document.getElementById('f_cognome').value;
            if (!Validator.isText(n) || !Validator.isText(c)) throw "Inserire Nome e Cognome validi";
            const data = await HospitalAPI.searchUtenti(n, c);
            renderResults(data);
        }
        else if (action === 'search_office') {
            const s = document.getElementById('f_stanza').value;
            if (!s) throw "Inserire un numero ufficio";
            const data = await HospitalAPI.getRepartiByUfficio(s);
            renderResults(data);
        }
        else if (action === 'add') {
            const userData = {
                nome: document.getElementById('f_nome').value,
                cognome: document.getElementById('f_cognome').value,
                email: document.getElementById('f_email').value,
                stanza: document.getElementById('f_stanza').value
            };
            if (!Validator.isEmail(userData.email)) throw "Email non valida";
            const res = await HospitalAPI.addUser(userData);
            showMsg("Utente aggiunto con successo!");
        }
        else if (action === 'edit') {
            const id = document.getElementById('f_id').value;
            const col = document.getElementById('f_col').value;
            const val = document.getElementById('f_val').value;
            if (!Validator.isId(id)) throw "ID non valido";
            await HospitalAPI.updateUser(id, col, val);
            showMsg("Aggiornamento completato!");
        }
    } catch (err) {
        showMsg(err, true);
    }
}

function renderResults(data) {
    if (!data || data.length === 0) {
        results.innerHTML = '<p>Nessun risultato trovato.</p>';
        return;
    }

    results.innerHTML = data.map(item => {
        // Caso A: Il dato è un array (risultato di RepartoController / Object[])
        if (Array.isArray(item)) {
            const [stanza, piano, orario, nome, cognome, email] = item;
            return `
                <div class="card">
                    <h3>${nome || 'N/D'} ${cognome || ''}</h3>
                    <p><strong>Ufficio/Stanza:</strong> ${stanza || 'Non specificata'}</p>
                    <p><strong>Piano:</strong> ${piano || 'N/D'} - <strong>Orario:</strong> ${orario || 'N/D'}</p>
                    ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                </div>
            `;
        }

        // Caso B: Il dato è un oggetto (risultato di UtenteController)
        return `
            <div class="card">
                <h3>${item.nome || ''} ${item.cognome || ''}</h3>
                <p><strong>Ufficio:</strong> ${item.stanza || (item.reparto ? item.reparto.stanza : 'N/D')}</p>
                ${item.email ? `<p><strong>Email:</strong> ${item.email}</p>` : ''}
                ${item.id ? `<p><small>ID: ${item.id}</small></p>` : ''}
            </div>
        `;
    }).join('');
}