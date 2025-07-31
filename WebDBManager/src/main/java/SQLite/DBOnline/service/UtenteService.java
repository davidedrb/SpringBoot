package SQLite.DBOnline.service;

import SQLite.DBOnline.model.Utente;
import SQLite.DBOnline.model.Reparto;
import SQLite.DBOnline.repository.RepartoRepository;
import SQLite.DBOnline.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private RepartoRepository repartoRepository;

    // Dependency Injection via constructor (preferred)
    public UtenteService(UtenteRepository utenteRepository) {
        this.utenteRepository = utenteRepository;
    }

    public List<Utente> getAllUtenti() {
        return utenteRepository.findAll();
    }

    public List<Utente> findByNomeAndCognome(String nome, String cognome) {
        return utenteRepository.findByNomeAndCognome(nome, cognome);
    }


    public String addUser(String nome, String cognome, String email, String stanza) {


        List<Reparto> reparto = repartoRepository.findByStanza(stanza);

        if (reparto.isEmpty()) {
            return "Errore: reparto con stanza '" + stanza + "' non trovato.";
        }

        Utente utente = new Utente();
        utente.setNome(nome);
        utente.setCognome(cognome);
        utente.setEmail(email);
        utente.setReparto(reparto.get(0)); // Passi l'intero oggetto Reparto

        utenteRepository.save(utente);
        return "Utente " + nome + " inserito con successo!";
    }

    public String modUser(Integer id, String colonna, String data){

        Optional<Utente> optionalUtente  = utenteRepository.findById(id);

        if (optionalUtente.isEmpty()) {
            return "Utente con ID " + id + " non trovato.";
        }

        Utente utente = optionalUtente.get();

        switch (colonna.toLowerCase()) {
            case "nome":
                utente.setNome(data);
                break;
            case "cognome":
                utente.setCognome(data);
                break;
            case "email":
                utente.setEmail(data);
                break;
            case "stanza":
                // Cerca il reparto in base alla stanza
                Reparto reparto = repartoRepository.findByStanza(data).stream().findFirst().orElse(null);
                if (reparto == null) {
                    return "Reparto con stanza '" + data + "' non trovato.";
                }
                utente.setReparto(reparto);
                break;
            default:
                return "Colonna '" + colonna + "' non valida.";
        }

        utenteRepository.save(utente);
        return "Utente aggiornato con successo!";
    }
}
