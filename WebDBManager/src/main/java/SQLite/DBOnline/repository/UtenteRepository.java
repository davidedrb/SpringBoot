package SQLite.DBOnline.repository;

import SQLite.DBOnline.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UtenteRepository extends JpaRepository<Utente, Integer> {

    List<Utente> findByNomeAndCognome(String nome, String cognome);

    //@Query(value = "select * FROM utenti u WHERE u.nome = nome AND u.cognome = cognome")
    //List<Utente> findByNomeAndCognome(String nome, String cognome);


}
