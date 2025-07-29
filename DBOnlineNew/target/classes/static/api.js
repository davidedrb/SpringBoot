// api.js - Versione corretta con export
const API_BASE_URL = 'http://localhost:8080/api';

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

// Esporta le funzioni
export const HospitalAPI = {
    getReparti: async () => await fetchData('/reparti'),
    getUtenti: async () => await fetchData('/utenti'),
    //getUtentiByReparto: async (repartoId) => await fetchData(`/utenti/reparto/${repartoId}`)
};