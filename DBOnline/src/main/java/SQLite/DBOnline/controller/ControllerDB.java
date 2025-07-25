package SQLite.DBOnline.controller;

import SQLite.DBOnline.managementDB.FrontEndRequest;
import SQLite.DBOnline.managementDB.ModifyDB;
import SQLite.DBOnline.managementDB.QueryDB;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class ControllerDB {
    private final QueryDB queryDB = new QueryDB();
    private final ModifyDB modifyDB = new ModifyDB();




    @PostMapping("/userquery")
    public ResponseEntity<String[][]> eseguiQuery(@RequestBody FrontEndRequest richiesta) {

        try {
            String[][] risultato = queryDB.UserQuery(richiesta.getName(),richiesta.getSourname());
            return ResponseEntity.ok(risultato);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new String[0][0]);

    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody FrontEndRequest richiesta) {
        try {
            return modifyDB.insertData(richiesta.getName(), richiesta.getSourname(), richiesta.getEmail(), richiesta.getReparto_id());
        }catch (Exception e){
            e.printStackTrace();
        }
        return "utente non inserito";
    }

    @PostMapping("/repartiQuery")
    public ResponseEntity<String[][]> repartiQuery(@RequestBody FrontEndRequest richiesta) {
        try{
            String[][] risultato = queryDB.repartoQuery(richiesta.getRoom());
            return ResponseEntity.ok(risultato);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok(new String[0][0]);
    }


    @PostMapping("/foundQuery")
    public ResponseEntity<String[][]> modifyQuery(@RequestBody FrontEndRequest richiesta)  {

        try {
            String[][] risultato = modifyDB.foundUserToUpdate(richiesta.getName(), richiesta.getSourname());
            return ResponseEntity.ok(risultato);
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok(new String[0][0]);
    }

    @PostMapping("/removeById")
    public String removeById(@RequestBody FrontEndRequest richiesta) throws SQLException {
        return modifyDB.removeUser(richiesta.getId());
    }


}
