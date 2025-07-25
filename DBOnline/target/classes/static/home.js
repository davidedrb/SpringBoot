
try {
    document.getElementById("cambia").addEventListener("click", function() {
        window.open("/?showUsers=true", "_blank");
    });
}catch{ //cambio pagina
    console.log("button not fount");
}

function Reparti(){
    alert("reparti");
} //vedi lista



try {
    let testo = "";
    let insert = document.getElementById("input");
    insert.style.display = "block";
    let input
    document.getElementById("menu").addEventListener("change", function (){
        const valore = this.value;
        document.getElementById("scelta").textContent = valore;


        if(valore === "Utente") {
            //insert = document.getElementById("input")
            insert.style.display = "block";
            insert.placeholder= "inserisci nome, cognome dell'utente"

            document.getElementById("input").addEventListener("keydown", function (event){
                if(event.key === "Enter"){
                    testo = "";
                    input = insert.value
                    const [nome, cognome] = input.split(",").map(parte => parte.trim());
                    let n = nome.substring(0, 1).toUpperCase() + nome.substring(1).toLowerCase();
                    let c = cognome.substring(0, 1).toUpperCase() + cognome.substring(1).toLowerCase();

                    fetch('http://localhost:8080/api/userquery', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: n,
                            sourname: c
                        })
                    })
                        .then(res => res.json())
                        .then(data =>{
                            testo = data.map(riga =>riga.join (' | ')).join('\n');
                            document.getElementById('utentetrovato').value = "Nome | Cognome | email | ufficio" + '\n';
                            document.getElementById('utentetrovato').value += testo;
                        })
                        .catch(error => console.error('Errore', error));
                }

            })
        }
        else if (valore === "Ufficio"){
            //insert = document.getElementById("input")
            //insert.style.display = "block";
            insert.placeholder= "inserisci il numero dell'ufficio"

            document.getElementById("input").addEventListener("keydown", function (event){
                if(event.key === "Enter"){
                    testo = "";
                    input = insert.value;
                    const stanza = input.trim()
                    const s = stanza.substring(0, 1).toUpperCase() + stanza.substring(1).toLowerCase();

                    fetch("http://localhost:8080/api/repartiQuery",{
                        method: 'POST', headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            room : s
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            testo = data.map(riga =>riga.join (' | ')).join('\n');
                            document.getElementById('utentetrovato').value = "Ufficio |Nome | Cognome | email" + '\n';
                            document.getElementById('utentetrovato').value += testo;
                        })
                        .catch(error => console.error('Errore', error))
                }

                })




        }//da fare
        else if (valore === "InserireUtente"){
            //insert = document.getElementById("input")
            //insert.style.display = "block";
            insert.placeholder= "inserisci nome, cognome, email, reparto_id per aggiungere un nuovo utente";
            document.getElementById("input").addEventListener("keydown", function (event){
                if(event.key === "Enter"){
                    testo = "";
                    input = insert.value
                    const [nome, cognome, email, reparto_id] = input.split(",").map(parte => parte.trim());
                    let n = nome.substring(0, 1).toUpperCase() + nome.substring(1).toLowerCase();
                    let c = cognome.substring(0, 1).toUpperCase() + cognome.substring(1).toLowerCase();
                    let e = email.substring(0, 1).toUpperCase() + email.substring(1).toLowerCase();
                    let r = reparto_id.substring(0, 1).toUpperCase() + reparto_id.substring(1).toLowerCase();
                    fetch("http://localhost:8080/api/addUser", {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: n,
                            sourname: c,
                            email: e,
                            reparto_id: parseInt(r)
                        })
                    })
                        .then(response =>response.text())
                        .then(data => {
                            testo = data;
                            document.getElementById("utentetrovato").value = testo;
                        })
                        .catch(error => console.log('Error', error))
                    }
                })
        }
        else if (valore === "RimuoviUtente"){
            //insert = document.getElementById("input");
            //insert.style.display = "block";
            insert.placeholder= "inserisci nome, cognome dell'utente";
            document.getElementById("input").addEventListener("keydown", function (event){
                if(event.key === "Enter"){
                    testo = "";
                    input = insert.value
                    const [nome, cognome] = input.split(",").map(parte => parte.trim());
                    let n = nome.substring(0, 1).toUpperCase() + nome.substring(1).toLowerCase();
                    let c = cognome.substring(0, 1).toUpperCase() + cognome.substring(1).toLowerCase();

                    fetch('http://localhost:8080/api/foundQuery', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: n,
                            sourname: c
                        })
                    })
                        .then(res => res.json())
                        .then(data =>{
                            testo = data.map(riga =>riga.join (' | ')).join('\n');
                            document.getElementById('utentetrovato').value = "id | Nome | Cognome | email | ufficio" + '\n';
                            document.getElementById('utentetrovato').value += testo;
                            let utente =  document.getElementById("userUpdate")
                            utente.style.display = "block";
                            document.getElementById("userUpdate").addEventListener("keydown", function (event){
                                if(event.key === "Enter"){
                                    let id = "";
                                    id = utente.value.trim();

                                    fetch('http://localhost:8080/api/removeById', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: parseInt(id)
                                        })
                                    })
                                        .then(response => response.text())
                                        .then(data => {
                                            document.getElementById('utentetrovato').value = "utente rimosso con successo" + '\n';
                                            document.getElementById('utentetrovato').value += testo + '\n';
                                            document.getElementById('utentetrovato').value += data;
                                            })
                                        .catch(error => console.error('Error', error))

                                }
                            })
                        })
                        .catch(error => console.error('Errore', error));
                }

            })
        }//da finire

    });

}catch {
    console.log("Errore con select")
}




