

package SQLite.controller;

import SQLite.service.RepartoService;
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
