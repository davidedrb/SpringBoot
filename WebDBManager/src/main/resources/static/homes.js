const API_URL = 'http://localhost:8080/api/users';

function displayResult(message, isError = false) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.style.color = isError ? 'red' : 'green';
}

async function saveUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        displayResult('Inserisci nome e email', true);
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const user = await response.json();
        displayResult(`Utente salvato con successo! ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);

        // Pulisci i campi dopo il salvataggio
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    } catch (error) {
        displayResult(`Errore durante il salvataggio: ${error.message}`, true);
        console.error('Errore:', error);
    }
}

async function getUser() {
    const email = document.getElementById('searchEmail').value;

    if (!email) {
        displayResult('Inserisci un email da cercare', true);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${encodeURIComponent(email)}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Utente non trovato');
            }
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const user = await response.json();
        displayResult(`Utente trovato: ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
    } catch (error) {
        displayResult(`Errore nella ricerca: ${error.message}`, true);
        console.error('Errore:', error);
    }
}