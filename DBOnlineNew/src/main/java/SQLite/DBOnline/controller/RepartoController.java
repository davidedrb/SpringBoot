package SQLite.DBOnline.controller;


import SQLite.DBOnline.model.Reparto;
import SQLite.DBOnline.service.RepartoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/reparti")
public class RepartoController {
    @Autowired
    private RepartoService repartoService;

    @GetMapping
    public List<Reparto> getAllReparti(String stanza) {
        return repartoService.getReparti(stanza);
    }
}
