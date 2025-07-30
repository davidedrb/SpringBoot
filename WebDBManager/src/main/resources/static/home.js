try {
    document.getElementById("cambia").addEventListener("click", function () {
        window.open("/?showUsers=true", "_blank");
    });
} catch {
    console.log("button not found");
}

function Reparti() {
    alert("reparti");
}

try {
    const userUpdate = document.getElementById("userUpdate");
    const insert = document.getElementById("input");
    const menu = document.getElementById("menu");
    const output = document.getElementById("utentetrovato");
    const colonne = document.getElementById("colonne");
    const dataUpdate = document.getElementById("dataUpdate");


    const resetFields = () => {
        output.value = "";
        userUpdate.style.display = "none";
        colonne.style.display = "none";
        dataUpdate.style.display = "none";
        userUpdate.value = "";
        dataUpdate.value = "";
    };

    const format = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    let currentListener = null;

    menu.addEventListener("change", function () {
        const valore = this.value;
        document.getElementById("scelta").textContent = valore;
        resetFields();
        insert.style.display = "block";
        insert.value = "";

        // Reset previous keydown listener
        if (currentListener) insert.removeEventListener("keydown", currentListener);

        // Set new placeholder
        insert.placeholder = {
            "Utente": "inserisci nome, cognome dell'utente",
            "Ufficio": "inserisci il numero dell'ufficio",
            "InserireUtente": "inserisci nome, cognome, email, reparto_id",
            "RimuoviUtente": "inserisci nome, cognome dell'utente",
            "ModificaUtente": "inserisci nome, cognome dell'utente"
        }[valore] || "";

        currentListener = async function (event) {
            if (event.key !== "Enter") return;

            resetFields(); // Nasconde e svuota tutto prima di iniziare
            const input = insert.value;
            const parts = input.split(",").map(p => p.trim());
            let testo = "";

            switch (valore) {
                case "Utente": {
                    const [nome, cognome] = parts;
                    const n = format(nome), c = format(cognome);

                    try {
                        const res = await fetch('http://localhost:8080/api/userquery', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: n, sourname: c })
                        });
                        const data = await res.json();
                        testo = data.map(r => r.join(" | ")).join('\n');
                        output.value = "Nome | Cognome | email | ufficio\n" + testo;
                    } catch (error) {
                        console.error("Errore", error);
                    }
                    break;
                }

                case "Ufficio": {
                    const stanza = format(input.trim());

                    try {
                        const res = await fetch("http://localhost:8080/api/repartiQuery", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ room: stanza })
                        });
                        const data = await res.json();
                        testo = data.map(r => r.join(" | ")).join('\n');
                        output.value = "Ufficio | Nome | Cognome | email\n" + testo;
                    } catch (error) {
                        console.error("Errore", error);
                    }
                    break;
                }

                case "InserireUtente": {
                    const [nome, cognome, email, reparto_id] = parts;
                    const n = format(nome), c = format(cognome), e = email.toLowerCase(), r = parseInt(reparto_id);

                    try {
                        const res = await fetch("http://localhost:8080/api/addUser", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: n, sourname: c, email: e, reparto_id: r })
                        });
                        const data = await res.text();
                        output.value = data;
                    } catch (error) {
                        console.log("Error", error);
                    }
                    break;
                }

                case "RimuoviUtente": {
                    const [nome, cognome] = parts;
                    const n = format(nome), c = format(cognome);

                    try {
                        const res = await fetch('http://localhost:8080/api/foundQuery', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: n, sourname: c })
                        });
                        const data = await res.json();
                        testo = data.map(r => r.join(" | ")).join('\n');
                        output.value = "id | Nome | Cognome | email | ufficio\n" + testo;

                        userUpdate.style.display = "block";

                        userUpdate.addEventListener("keydown", async function onRemove(event) {
                            if (event.key !== "Enter") return;
                            const id = parseInt(userUpdate.value.trim());

                            try {
                                const res = await fetch('http://localhost:8080/api/removeById', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id })
                                });
                                resetFields();

                                const result = await res.text();
                                output.value += result + '\n' + testo;
                            } catch (error) {
                                console.error("Error", error);
                            }
                        },);
                    } catch (error) {
                        console.error("Errore", error);
                    }
                    break;
                }

                case "ModificaUtente": {
                    const [nome, cognome] = parts;
                    const n = format(nome), c = format(cognome);

                    try {
                        const res = await fetch('http://localhost:8080/api/foundQuery', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: n, sourname: c })
                        });
                        const data = await res.json();
                        testo = data.map(r => r.join(" | ")).join('\n');
                        output.value = "id | Nome | Cognome | email | ufficio\n" + testo;

                        colonne.style.display = "block";

                        colonne.addEventListener("change", function () {
                            userUpdate.style.display = "block";

                            userUpdate.addEventListener("keydown", function onIdEnter(event) {
                                if (event.key !== "Enter") return;

                                dataUpdate.style.display = "block";

                                dataUpdate.addEventListener("keydown", async function onDataEnter(event) {
                                    if (event.key !== "Enter") return;

                                    const colonna = colonne.value;
                                    const id = parseInt(userUpdate.value.trim());
                                    const d = format(dataUpdate.value);

                                    try {
                                        const res = await fetch("http://localhost:8080/api/modifyById", {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ id, data: d, collum: colonna })
                                        });
                                        const result = await res.text();
                                        output.value = "utente aggiornato con successo\n" + testo + '\n' + result;
                                        resetFields();
                                    } catch (error) {
                                        console.error("Error", error);
                                    }
                                },);
                            },);
                        }, );
                    } catch (error) {
                        console.error("Error", error);
                    }
                    break;
                }
            }
        };

        insert.addEventListener("keydown", currentListener);
    });

} catch {
    console.log("Errore con select");
}
