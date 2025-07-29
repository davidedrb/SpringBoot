package SQLite.DBOnline.service;
import SQLite.DBOnline.model.Reparto;
import SQLite.DBOnline.repository.RepartoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RepartoService {
    private final RepartoRepository repartoRepository;

    // Costruttore con dependency injection
    public RepartoService(RepartoRepository repartoRepository) {
        this.repartoRepository = repartoRepository;
    }

    public List<Reparto> getReparti(String stanza) {
        return repartoRepository.findByStanza(stanza);
    }

}

