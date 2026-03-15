//package SQLite.DBOnline.controller;
//
//
//import SQLite.DBOnline.model.Utente;
//import SQLite.DBOnline.service.UtenteService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/utenti")
//public class UtenteController {
//    @Autowired
//    private UtenteService utenteService;
//
//    @GetMapping
//    public List<Utente> getAllUtenti() {
//        return utenteService.getAllUtenti();
//    }
//
//    @GetMapping("/id")
//    public List<Utente> getUtentiByReparto(@RequestParam String nome, @RequestParam String cognome) {
//        return utenteService.findByNomeAndCognome(nome, cognome);
//    }
//
//    @GetMapping("/addUser")
//    public String addUser(@RequestParam String nome, @RequestParam String cognome, @RequestParam String email, @RequestParam String stanza) {
//        return utenteService.addUser(nome, cognome,email,stanza);
//    }
//
//    @GetMapping("/modUser")
//    public String modUser(@RequestParam Integer id, @RequestParam String colonna, @RequestParam String data) {
//        return utenteService.modUser(id, colonna, data);
//    }
//}

package SQLite.controller;

import SQLite.model.Utente;
import SQLite.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/utenti")
@CrossOrigin(origins = "*") // Importante per permettere le chiamate dal frontend
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    // Ricerca: Ora riceve un JSON con nome e cognome
    @PostMapping("/search")
    public List<Utente> getUtentiByNomeCognome(@RequestBody Map<String, String> payload) {
        String nome = payload.get("nome");
        String cognome = payload.get("cognome");
        return utenteService.findByNomeAndCognome(nome, cognome);
    }

    // Aggiunta: Riceve l'intero oggetto Utente (o i suoi campi) via JSON
    @PostMapping("/addUser")
    public String addUser(@RequestBody Map<String, String> payload) {
        return utenteService.addUser(
                payload.get("nome"),
                payload.get("cognome"),
                payload.get("email"),
                payload.get("stanza")
        );
    }

    // Modifica: Riceve ID, colonna e nuovo valore via JSON
    @PostMapping("/modUser")
    public String modUser(@RequestBody Map<String, Object> payload) {
        Integer id = Integer.parseInt(payload.get("id").toString());
        String colonna = (String) payload.get("colonna");
        String data = (String) payload.get("valore"); // "valore" deve corrispondere alla chiave nel JS
        return utenteService.modUser(id, colonna, data);
    }
}
