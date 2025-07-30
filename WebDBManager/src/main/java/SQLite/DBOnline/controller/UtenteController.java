package SQLite.DBOnline.controller;


import SQLite.DBOnline.model.Utente;
import SQLite.DBOnline.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/utenti")
public class UtenteController {
    @Autowired
    private UtenteService utenteService;

    @GetMapping
    public List<Utente> getAllUtenti() {
        return utenteService.getAllUtenti();
    }

    @GetMapping("/reparto/{repartoId}")
    public List<Utente> getUtentiByReparto(@PathVariable Long repartoId) {
        return utenteService.getUtentiByReparto(repartoId);
    }
}
