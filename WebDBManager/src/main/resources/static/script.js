import { loadAndRenderRepartiByNome } from './reparti.js';

const format = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
document.addEventListener('DOMContentLoaded', function() {


    const menu = document.getElementById('menuTendina');
    try {
        document.getElementById("sections").style.display = 'flex';
    }catch {}


    // Versione che reagisce al cambio selezione (senza bottone)
    menu.addEventListener('change', function() {
        const selezione = this.value;
        if (selezione) {
            mostraAlert(selezione);
        }
    });

    function mostraAlert(opzione) {



        let messaggio;
        switch(opzione) {
            case 'opzione1':
                messaggio = 'Hai selezionato la prima opzione!';
                break;
            case 'opzione2':
                messaggio = 'Seconda opzione selezionata!';
                let insertData = document.getElementById("insertData");
                insertData.style.display = 'flex';
                insertData.placeholder = "inserisci in numero dell'uffifio";
                document.getElementById("reparti-section").style.display = 'block';
                break;
            case 'opzione3':
                messaggio = 'Opzione 3 scelta!';
                break;
            case 'opzione4':
                messaggio = 'Opzione 4 scelta!!';
                break;
            case 'opzione5':
                messaggio = 'SOpzione 5 scelta!';
                break;
            case 'opzione6':
                messaggio = 'Opzione 6 scelta!';
                break;
            default:
                messaggio = 'Selezione non riconosciuta';
        }
        alert(messaggio);
    }
});

document.getElementById('insertData').addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        const data = document.getElementById("insertData").value;
        const d = format(data)
        loadAndRenderRepartiByNome(d);

    }
})