package SQLite.DBOnline.controller;


import SQLite.DBOnline.model.Utente;
import SQLite.DBOnline.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/id")
    public List<Utente> getUtentiByReparto(@RequestParam String nome, @RequestParam String cognome) {
        return utenteService.findByNomeAndCognome(nome, cognome);
    }

    @GetMapping("/addUser")
    public String addUser(@RequestParam String nome, @RequestParam String cognome, @RequestParam String email, @RequestParam String stanza) {
        return utenteService.addUser(nome, cognome,email,stanza);
    }

    @GetMapping("/modUser")
    public String modUser(@RequestParam Integer id, @RequestParam String colonna, @RequestParam String data) {
        return utenteService.modUser(id, colonna, data);
    }
}
