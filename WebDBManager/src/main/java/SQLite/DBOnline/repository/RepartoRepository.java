package SQLite.DBOnline.repository;


import SQLite.DBOnline.model.Reparto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepartoRepository extends JpaRepository<Reparto, Long> {
    List<Reparto> findByStanza(String stanza);

    /*@Query(value = "SELECT * FROM utenti u JOIN reparti r ON u.reparto_id = r.id WHERE r.stanza = :stanza", nativeQuery = true)
    List<Reparto> findUtentiInStanza(@Param("stanza") String stanza);*/

    @Query(value = "SELECT r.stanza,r.piano,r.orario,u.nome, u.cognome, u.email FROM utenti u JOIN reparti r ON u.reparto_id = r.id WHERE r.stanza = :stanza", nativeQuery = true)
    List<Object[]> findUtentiInStanza(@Param("stanza") String stanza);

    /*@Query(value = "SELECT u.nome, u.cognome, r.nome AS nomeReparto, r.stanza FROM utenti u JOIN reparti r ON u.reparto_id = r.id WHERE r.stanza = :stanza", nativeQuery = true)
    List<Object[]> findUtentiInStanza(@Param("stanza") String stanza);*/


}

