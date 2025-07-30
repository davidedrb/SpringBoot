package SQLite.DBOnline.service;

import SQLite.DBOnline.model.Utente;
import SQLite.DBOnline.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UtenteService {
    private final UtenteRepository utenteRepository;

    // Dependency Injection via constructor (preferred)
    public UtenteService(UtenteRepository utenteRepository) {
        this.utenteRepository = utenteRepository;
    }

    public List<Utente> getAllUtenti() {
        return utenteRepository.findAll();
    }

    public List<Utente> getUtentiByReparto(Long repartoId) {
        return null;
    }
}
