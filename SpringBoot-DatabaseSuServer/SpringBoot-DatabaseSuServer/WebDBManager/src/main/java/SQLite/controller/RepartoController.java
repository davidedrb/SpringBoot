//package SQLite.DBOnline.controller;
//
//
//import SQLite.DBOnline.model.Reparto;
//import SQLite.DBOnline.service.RepartoService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/reparti")
//public class RepartoController {
//    @Autowired
//    private RepartoService repartoService;
//
//
//
//    @GetMapping("/UtentiReparti")
//    public List<Object[]> findUtentiByStanza(@RequestParam String stanza) {
//        return repartoService.findUtentiInStanza(stanza);
//    }
//}

package SQLite.DBOnline.controller;

import SQLite.DBOnline.service.RepartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reparti")
@CrossOrigin(origins = "*")
public class RepartoController {

    @Autowired
    private RepartoService repartoService;

    // Rimane GET perché la stanza è considerata un dato pubblico/da link
    @GetMapping("/search")
    public List<Object[]> findUtentiByStanza(@RequestParam String stanza) {
        return repartoService.findUtentiInStanza(stanza);
    }
}
